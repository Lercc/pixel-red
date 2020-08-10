const rounded = function (value) {
    if (value) {
        value = parseFloat(value)
        return value.toFixed(4)
    }
}

export { rounded };