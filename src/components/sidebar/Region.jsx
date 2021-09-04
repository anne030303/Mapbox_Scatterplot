import React from 'react';
import './Region.css'
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './Regionstyle';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';

export default function Region() {
    const countries = (useSelector(state => state.countries));
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChecked = (id, checked) => {
        dispatch({
            type: 'CHECKEDCOUNTRY',
            id: id
        });
    };

    return (
        <div>
            <h3>Country/Region</h3>
            <div className="checklist">
                {countries.map((item) => (
                    <label key={item.id}>
                        <Checkbox
                            checked={item.checked}
                            className={classes.root}
                            onChange={() => handleChecked(item.id, item.checked)}
                            disableRipple
                            color="default"
                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                            icon={<span className={classes.icon} />}
                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                        />
                        {item['country/region']}
                    </label>
                ))}
            </div>
        </div>
    )
}