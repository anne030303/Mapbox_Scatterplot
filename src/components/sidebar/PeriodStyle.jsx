import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

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

export default CustomSlider;