export function handleCheckedCountry(id) {
    return {
        type: 'CHECKEDCOUNTRY',
        id: id
    }
}

export function handlePeriod(value) {
    return {
        type: 'ADJUSTPERIOD',
        value: value
    }
}