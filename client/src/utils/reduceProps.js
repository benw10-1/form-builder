function reduceProps(props) {
    return props.reduce((prev, curr) => {
        if (curr.key === "qtype") prev.qtype = curr.value
        else if (curr.key === "qoptions") prev.qoptions.push(curr.value)
        else if (curr.key === "qtitle") prev.qtitle = curr.value
        else if (curr.key === "qdesc") prev.qdesc = curr.value
        else if (curr.key === "qreq") prev.qreq = curr.value === "true"
        else if (curr.key === "qlabel") prev.qlabel = curr.value
        return prev
    }, { qtype: "", qoptions: [], qtitle: "", qdesc: "", qreq: false, qlabel: "" })
}

export default reduceProps;