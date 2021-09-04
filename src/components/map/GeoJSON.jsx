import sampleData from '../../sampleData.json';
import { unixTimestamp2time } from '../helpers/helpers';

// create geojson by json file

const geojson = [];
const validItems = ['imei', 'homeCountry', 'unixTimestamp', 'city', 'lon', 'lat']
sampleData.forEach(element => {
    let hasAll = validItems.every(validItem => element.hasOwnProperty(validItem));
    if (hasAll) {
        geojson.push(JSON.parse('{"type": "Feature", ' +
            '"properties": {' +
            ' "imei": "' + element.imei +
            '", "homeCountry": "' + element.homeCountry +
            '", "unixTimestamp": ' + element.unixTimestamp +
            ', "time": ' + unixTimestamp2time(element.unixTimestamp) +
            ', "city": "' + element.city + '"' +
            '},' +
            '"geometry":{"type":"Point", "coordinates":[' + element.lon + ',' + element.lat + ']}}'));
    }
});

export default geojson;