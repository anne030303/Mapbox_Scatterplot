import moment from "moment"

// record only time
export function unixTimestamp2time(timestamp) {
    let date = moment.unix(timestamp).utcOffset('+0900');
    let hours = date.hour();
    let minutes = date.minutes();
    let seconds = date.seconds();
    return (hours * 3600 + minutes * 60 + seconds)
}
// time string for popup's description
export function unixTimestamp2timestring(timestamp) {
    return moment.unix(timestamp).utcOffset('+0900').format("YYYY-MM-DD HH:mm");;
}

// time string for slider's label
export function percent2TimeString(value) {
    let hours = Math.floor((value * 1440 / 100) / 60);
    let minutes = Math.round(Math.round((value * 1440 / 100) % 60) / 10) * 10;
    if (minutes === 60) {
        hours += 1;
        minutes = 0;
    }
    let newValue = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return newValue
}

// for slider bar
export function time2Percent(props) {
    var newValue = props.map((num) => {
        return num * 100 / 86399
    })
    return newValue
}
export function percent2Time(props) {
    var newValue = props.map((num) => {
        return num * 86399 / 100
    })
    return newValue
}