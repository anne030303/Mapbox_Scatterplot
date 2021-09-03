import React, { useRef, useEffect, useState } from 'react';
import './Mapframe.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import sampleData from '../../sampleData.json';
import { useSelector } from 'react-redux';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_Accesstokens;

function unixTimestamp2time(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return (hours * 3600 + minutes * 60 + seconds)
}

function unixTimestamp2timestring(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return (year + '-' + String(month).padStart(2, "0") + '-' + String(day).padStart(2, "0") + ' ' + String(hours).padStart(2, "0") + ':' + String(minutes).padStart(2, "0"))
}

export default function App() {
    const countries = (useSelector(state => state.countries));
    const valueOfPeriod = (useSelector(state => state.valueOfPeriod));
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(139.5416);
    const [lat, setLat] = useState(35.7107);
    const [zoom, setZoom] = useState(10);

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
        const geojson = [];
        sampleData.forEach(element => {
            geojson.push(JSON.parse('{"type": "Feature", ' +
                '"properties": {' +
                ' "imei": "' + element.imei +
                '", "homeCountry": "' + element.homeCountry +
                '", "unixTimestamp": ' + element.unixTimestamp +
                ', "time": ' + unixTimestamp2time(element.unixTimestamp) +
                ', "city": "' + element.city + '"' +
                '},' +
                '"geometry":{"type":"Point", "coordinates":[' + element.lon + ',' + element.lat + ']}}'));
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
                //  + country.id,
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
            // Change the cursor style as a UI indicator.
            map.current.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const color = countries.filter(country => country['country/region'] === e.features[0].properties.homeCountry)[0]['color']
            const description =
                `<div><span class="dot" style="background-color:${color}"></span>${e.features[0].properties.homeCountry}</div>` +
                `<div>${e.features[0].properties.imei}</div>` +
                `<div>${unixTimestamp2timestring(e.features[0].properties.unixTimestamp)}</div>`;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
        });

        map.current.on('mouseleave', 'point', () => {
            map.current.getCanvas().style.cursor = '';
            popup.remove();
        });

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