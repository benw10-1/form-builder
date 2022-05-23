let form1 = {
    _id : 1999,
    title : "Ye Examplar",
    description : "'tis to prove the encoded instructions",
    piecerefs:[ 
        {type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"},{key:"inSize", value:"5" }]},
        {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose wisely?"},{key: "qoptions", value:["6", "a goat","a cow"]}]},
        {type:"break", props:[]},
        {type:"header", props:[{key:"htext", value:"Now listen"},{ key:"hsubtext", value: "very carefully"}]},
        {type:"header", props:[{key:"htext", value:"Keep listening"}]},
        {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose recklessly?"},{ key:"qoptions", value:["7", "a goat","a chicken"]}]},
        {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose recklessly?"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}
    ]

}
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

for (let i = 0; i<7; i++){
    console.log(`form1.piecerefs[${i}].props`);
    console.log(form1.piecerefs[i].props);
    console.log(`parseProps(form1.piecerefs[${i}].props)`);
    console.log(parseProps(form1.piecerefs[i].props));

}

