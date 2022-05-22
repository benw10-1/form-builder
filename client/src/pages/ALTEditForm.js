
import React, { useState, useEffect } from "react";
import { queries, mutations, Auth, parseProps } from "../utils"
import { useParams } from "react-router-dom"

import Titler  from "../components/Titler.js";
import  Editor  from "../components/Editor.js";



function ALTEditForm() {

    let form1 = {
        _id : 1999,
        title : "Ye Examplar",
        description : "'tis to prove the encoded instructions",
        piecerefs:[ 
            {type:"question", props:{qtype:"text", qtext:"Why?", qsubtext: "srsly?", inSize:"5" }},
            {type:"question", props:{qtype:"multiple", qtext:"Choose wisely?", qoptions:["6", "a goat","a cow"]}},
            {type:"break", props:{}},
            {type:"header", props:{htext:"Now listen", hsubtext: "very carefully"}},
            {type:"header", props:{htext:"Keep listening"}},
            {type:"question", props:{qtype:"multiple", qtext:"Choose recklessly?", qoptions:["7", "a goat","a chicken"]}}
        ]

    }

    return(
        <div>
            <Titler form={form1}/>
            <Editor pieces={form1.piecerefs}/>
        </div>
        
    )


    

    
}

export default ALTEditForm;
