import React, { useRef, useEffect, useState } from 'react';
import './Mapframe.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import geojsondata from './GeoJSON';
import { useSelector } from 'react-redux';
import { unixTimestamp2timestring } from '../helpers/helpers';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_Accesstokens;



export default function App() {
    const countries = (useSelector(state => state.countries));
    const valueOfPeriod = (useSelector(state => state.valueOfPeriod));
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(139.5416);
    const [lat, setLat] = useState(35.7107);
    const [zoom, setZoom] = useState(10);
    const geojson = geojsondata;

    useEffect(() => {
        if (!map.current) return;
        const countryfilter = countries
            .filter(country => country.checked === true)
            .map(country => { return country['country/region'] })
        map.current.setFilter("point", ["all",
            ['in', 'homeCountry', ...countryfilter],
            ['>', 'time', valueOfPeriod[0]],
            ['<', 'time', valueOfPeriod[1]]]);

    }, [countries, valueOfPeriod]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            map.current.addSource("points", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": geojson
                }
            });
            const matchExpression = ['match', ['get', 'homeCountry']];
            countries.forEach(country => {
                matchExpression.push(country["country/region"], country.color);
            });
            matchExpression.push('rgba(0, 0, 0, 0)');
            map.current.addLayer({
                "id": "point",
                "type": "circle",
                "source": "points",
                "paint": {
                    "circle-radius": 4,
                    "circle-color": matchExpression,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff'
                },
                'filter': ["all",
                    ['>', 'time', valueOfPeriod[0]],
                    ['<', 'time', valueOfPeriod[1]]]
            });
            // })

        });
        const popup = new mapboxgl.Popup({
            className: "popup",
            closeButton: false
        });

        map.current.on('mouseenter', 'point', (e) => {
            map.current.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();
            const color = countries.filter(country => country['country/region'] === e.features[0].properties.homeCountry)[0]['color']
            const description =
                `<div><span class="dot" style="background-color:${color}"></span>${e.features[0].properties.homeCountry}</div>` +
                `<div>${e.features[0].properties.imei}</div>` +
                `<div>${unixTimestamp2timestring(e.features[0].properties.unixTimestamp)}</div>`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
        });

        // map.current.on('mouseleave', 'point', () => {
        //     map.current.getCanvas().style.cursor = '';
        //     popup.remove();
        // });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}