
import React, { useState, useEffect } from "react";
import { queries, mutations, Auth, parseProps } from "../utils"
import { useParams } from "react-router-dom"

import {
    Fab,
    Container,
    CssBaseline,
    Paper,
    Typography,
    Box,
    Link,
    Avatar,
    Skeleton,
    Modal,
    TextField,
    Button,
    Divider
    
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const cardsx = {
    width: "280px",
    height: "136px",
    "&:hover": { boxShadow: 15 },
    position: "relative",
    margin: "26px 51px 0 0"
}
const centered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
const plussx = {
    width: "14px"
}
const hoversx = {
    "&:hover": { cursor: "pointer" }
}


const editingRender = ( piece ) => {

    if(piece.type == "header")

  return (
    <div >
      Yoo
    </div>
  );
};

const NormalRender = ( {piece} ) => {
    let parsed= parseProps(piece.props);
    if(piece.type == "header"){
        return (
            <>
                <Typography variant="h4" component="h3">{parsed.htext}</Typography>
                {parsed.hsubtext && <Typography variant="h5" component="h5">{parsed.hsubtext}</Typography>}
               
            </>
        )
    }else if (piece.type == "break"){
        return (
            <>
                <br/>
                <Divider variant="middle" />
                <br/>
            </>    
        )
    }else if (piece.type == "question"){

        if(parsed.qtype == "text"){
            //if text box height is given, set it, else 1 line
            let r = 1;
            if(parsed.inSize && parsed.inSize!=1){
                r = parsed.inSize;
                return (
                    <>
                    <Typography variant="body1" component="x">{parsed.qtext}</Typography><br/>
                    {parsed.qsubtext  && <Typography variant="body2" component="x">{parsed.qsubtext}</Typography>}<br/>
                    <TextField
                        id="outlined-multiline-static"
                        //label="Multiline" 
                        //maybe put the title here idk
                        multiline
                        rows={r}
                        placeholder="Maybe add a placeholder prop idk"
                    />

                    </>
                )
            } else{
                return (
                    <>
                    <Typography variant="body1" component="x">{parsed.qtext}</Typography><br/>
                    {parsed.qsubtext  && <Typography variant="body2" component="x">{parsed.qsubtext}</Typography>}<br/>
                    <TextField id="standard-basic" label="This should be a prop" variant="standard" />

                    </>
                )

            }
            
        }else if (parsed.qtype == "multiple"){
            //if text box height is given, set it, else 1 line
            var reno = [];
            for (var i = 0; i < parsed.qoptions.length; i++) {reno.push(<button type="button" >{parsed.qoptions[i]}</button>)}
                ////okok the component below has to be a unique identifier, right?
            return (
                <>
                    <Typography variant="body1" component="x">{parsed.qtext}</Typography>
                    {parsed.qsubtext  && <Typography variant="body2" component="x">{parsed.qsubtext}</Typography>}
                    <div>{reno}</div>

                    
    

                    
                </>
            )
        }else {
            return (
                <div>
                    <h4> A qtypeless question appeared in the wild</h4>
                </div>
                
            )
    
        }
    }else {
        return (
            <div>
                <h4> A typeless piece appeared in the wild</h4>
            </div>
            
        )
    } 
};

const Titler = ({form}) => {

    

    return (
        <>
            <Typography variant="h3" component="h3">{form.title}</Typography>
            {form.description && <Typography variant="subtitle1" component="h5">{form.description}</Typography>}
            <br/>
            <Divider variant="middle" />
            <br/>
        </>
    
    )
};

function Editor ({pieces}) {

    //prob add key below
    //this is where we check which piece is in editing mode, now we only have non editing mode 
    var renP = [];
    for (var i = 0; i < pieces.length; i++) {
        //if not currently being edited then normal render
        renP.push( 
            
            <Box > 
                <NormalRender  piece={pieces[i]} Key={i} /> 
                
                
                <br/>
                <EditIcon sx={{opacity:"0.5"}}/>
                <br/><br/>
            </Box>

        );
    }
    return (
        <div>{renP}</div>
    )

   
}



function ALTEditForm() {

    let form1 = {
        _id : 1999,
        title : "Ye Examplar",
        description : "'tis to prove the encoded instructions",
        piecerefs:[ 
            {type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"},{key:"inSize", value:"5" }]},
            {type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"}]},
            {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose wisely?"},{key: "qoptions", value:["6", "a goat","a cow"]}]},
            {type:"break", props:[]},
            {type:"header", props:[{key:"htext", value:"Now listen"},{ key:"hsubtext", value: "very carefully"}]},
            {type:"header", props:[{key:"htext", value:"Keep listening"}]},
            {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose recklessly?"},{ key:"qoptions", value:["7", "a goat","a chicken"]}]},
            {type:"question", props:[{key:"qtype", value:"multiple"},{ key:"qtext", value:"Choose recklessly?"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}
        ]
    
    }
    


    return(
        <Container sx={{overflow:"auto"}}>
            <Titler form={form1}/>
            <Editor pieces={form1.piecerefs}/>
            <AddIcon sx={plussx} fontSize={"medium"} />
            
            <Avatar variant={"circular"} size={"40px"} sx={{ padding: "13px", ...hoversx }} onClick={()=>{console.log("yoo")}}>
                    <AddIcon sx={plussx} fontSize={"medium"} />
            </Avatar>
        </Container>
        
    )


    

    
}

export default ALTEditForm;

