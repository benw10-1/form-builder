function parseProps(props) {
    const parsed = {}
    props.forEach(x => {
        let { key, value } = x
        let found = parsed[key]
        if (found) {
            if (typeof found !== "object") value = [found, value]
            else value = [...found, value]
        }
        parsed[key] = value
    })
    
    return parsed
}

function unparseProps(props) {
    if (!props.length) return props
    const parsed = []
    props.forEach(x => {
        if (x.length !== 2) return new Error("Invalid prop!")
        let [key, value] = x

        if (value.length) value.forEach(y => {parsed.push([key, y])})
        else parsed.push(x)
    })
    
    return parsed
}

export { parseProps, unparseProps }

export default parseProps