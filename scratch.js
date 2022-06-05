
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
function unparseProps(props) {
    const parsed = []
    props.forEach(x => {
        if (x.length !== 2) return new Error("Invalid prop!")
        let [key, value] = x

        if (value.length) value.forEach(y => {parsed.push([key, y])})
        else parsed.push(x)
    })
    
    return parsed
}

let form1 = {
    _id : 1999,
    title : "Ye Examplar",
    published: true,
    description : "'tis to prove the encoded instructions",
    pieces:[ 
        {type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"},{key:"inSize", value:"5" }]},
        {type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"}]},
        {type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose wisely?"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
        {type:"break", props:[]},
        {type:"header", props:[{key:"htext", value:"Now listen"},{ key:"hsubtext", value: "very carefully"}]},
        {type:"header", props:[{key:"htext", value:"Keep listening"}]},
        {type:"question", props:[{key:"qtype", value:"check"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
        {type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}
    ]

}




console.log(form1.pieces[2].props);
console.log(parseProps(form1.pieces[2].props));



