import { combineReducers } from 'redux'
import countryInitial from './country.json'

const country = (state = {}, action) => {
    switch (action.type) {
        case 'CHECKEDCOUNTRY':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                checked: !state.checked
            })
        default:
            return state
    }
}
// record country/region is checked or not
const countries = (state = countryInitial, action) => {
    switch (action.type) {
        case 'CHECKEDCOUNTRY':
            return state.map(item =>
                country(item, action));
        default:
            return state
    }
}
// record the period user want to view
const valueOfPeriod = (state = [25200, 75600], action) => {
    switch (action.type) {
        case 'ADJUSTPERIOD':
            return action.value
        default:
            return state
    }

}

export default combineReducers({
    countries,
    valueOfPeriod
})