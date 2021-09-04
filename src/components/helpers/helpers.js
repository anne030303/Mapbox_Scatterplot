export function unixTimestamp2time(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return (hours * 3600 + minutes * 60 + seconds)
}

export function unixTimestamp2timestring(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return (year + '-' + String(month).padStart(2, "0") + '-' + String(day).padStart(2, "0") + ' ' + String(hours).padStart(2, "0") + ':' + String(minutes).padStart(2, "0"))
}

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