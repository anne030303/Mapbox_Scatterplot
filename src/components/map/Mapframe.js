import React, { useRef, useEffect, useState } from 'react';
import './Mapframe.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import sampleData from '../../sampleData.json';
import { useSelector } from 'react-redux';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_Accesstokens;


export default function App() {
    const countries = (useSelector(state => state.countries));
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(139.5416);
    const [lat, setLat] = useState(35.7107);
    const [zoom, setZoom] = useState(10);


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
                ', "city": "' + element.city + '"' +
                '},' +
                '"geometry":{"type":"Point", "coordinates":[' + element.lon + ',' + element.lat + ']}}'));
        });

        map.current.on('load', () => {
            countries.forEach(country => {
                map.current.addSource("point" + country.id, {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": geojson.filter((item) => {
                            return (item.properties.homeCountry === country['country/region']) ? true : false
                        })
                    }
                });
                map.current.addLayer({
                    "id": "point" + country.id,
                    "type": "circle",
                    "source": "point" + country.id,
                    "paint": {
                        "circle-radius": 4,
                        "circle-color": country.color,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#ffffff'
                    }
                });
            })

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