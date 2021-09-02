import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { useSelector, useDispatch } from 'react-redux';


const CustomSlider = withStyles({
    root: {
        color: '#aaaaaa',
        height: 3,
        padding: '13px 0',
        margin: '10px 15px',
        width: '80%',
    },
    thumb: {
        height: 24,
        width: 16,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        borderRadius: '10%',
        marginTop: -9,
        marginLeft: -8,
        boxShadow: '#aaaaaa 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            // display: inline - block!important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
        '& .label': {
            position: 'absolute',
            marginTop: 70,
            marginLeft: -5
        }
    },
    active: {},
    track: {
        height: 8,
        marginTop: -1,
    },
    rail: {
        color: '#ffffff',
        opacity: 1,
        height: 4,
    },
})(Slider);

function percent2TimeString(value) {
    let hour_value = Math.floor((value * 1440 / 100) / 60);
    let minute_value = Math.round(Math.round((value * 1440 / 100) % 60) / 10) * 10;
    if (minute_value === 60) {
        hour_value += 1;
        minute_value = 0;
    }
    let newValue = `${String(hour_value).padStart(2, "0")}:${String(minute_value).padStart(2, "0")}`;
    return newValue
}

function CustomThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
            <span className="label">{percent2TimeString(props['aria-valuenow'])}</span>
        </span>

    );
}

function Time2Percent(props) {
    var newValue = props.map((num) => {
        return num * 100 / 86399
    })
    return newValue
}
function percent2Time(props) {
    var newValue = props.map((num) => {
        return num * 86399 / 100
    })
    return newValue
}

export default function Period() {
    const value = (useSelector(state => state.valueOfPeriod));
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        dispatch({
            type: 'ADJUSTPERIOD',
            value: percent2Time(newValue)
        });
    };



    return (
        <div>
            <h3>Period</h3>
            <CustomSlider
                onChange={handleChange}
                ThumbComponent={CustomThumbComponent}
                getAriaLabel={(index) => (index === 0 ? 'Minimum' : 'Maximum')}
                value={Time2Percent(value)}
            />
        </div>
    )
}