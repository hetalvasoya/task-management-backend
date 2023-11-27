const regexString = (data) => {
    return new RegExp(['^', data, "$"].join(''),"i")
}

module.exports = {
    regexString
}