function propReducer(props) {
    return props.reduce((prev, curr) => {
        if (curr.key === "qtype") prev.qtype = curr.value
        else if (curr.key === "qoptions") prev.qoptions.push(curr.value)
        else if (curr.key === "qtext") prev.qtext = curr.value
        return prev
    }, { qtype: "", qoptions: [], qtext: "" })
}

module.exports = propReducer