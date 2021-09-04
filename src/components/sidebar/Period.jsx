import React from 'react';
import CustomSlider from './PeriodStyle';
import { useSelector, useDispatch } from 'react-redux';
import { percent2TimeString, time2Percent, percent2Time } from '../helpers/helpers';

// set the custom slider thumb content
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
                value={time2Percent(value)}
            />
        </div>
    )
}