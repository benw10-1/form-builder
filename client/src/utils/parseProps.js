function parseProps(props) {
    const parsed = {}
    props.forEach(x => {
        let { key, value } = x
        let found = parsed[key]
        if (found) {
            if (typeof found !== "object") value = [found, value]
            else value = [...found, value]
        }
        parsed[x.key] = value
    })
    
    return parsed
}

export default parseProps