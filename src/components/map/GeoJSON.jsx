import sampleData from '../../sampleData.json';
import { unixTimestamp2time } from '../helpers/helpers';

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

export default geojson;