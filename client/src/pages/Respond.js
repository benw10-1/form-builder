
import React, { useState, useEffect, useRef } from "react";
import { queries, mutations, Auth, parseProps, dayTime } from "../utils"
import { useParams } from "react-router-dom"


import {
    Fab,
    Container,
    CssBaseline,
    Typography,
    Box,
    Link,
    Avatar,
    Skeleton,
    Modal,
    TextField,
    Divider,
    Card,
    
    
} from "@mui/material";

import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
import MoreHorizFilled from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import TitleRounded from '@mui/icons-material/TitleRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import "./nstyle.css"

function Respond() {

const gray = {
    color: "rgba(0,0,0,0.5)"
}

const pink = {
    color: "rgba(200,0,0,0.5)"

}
const sliderboxsx = {
    width: "30%"
}

const deloptsx = {
    display: "flex",
}

const editiconsx = {

    opacity:".9",
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize:"30px",
    opacity: ".25",
    "&:hover": {
        opacity: ".85",
        cursor: "pointer"  }
} 

const iconboxsx = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    opacity: ".0",
    "&:hover": { 
        opacity: "1.0",
        }    
}

const checkiconsx = {
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize:"30px",
    opacity: ".25",
    "&:hover": {
        opacity: ".85",
        cursor: "pointer"  }

}
const deliconsx = {
    position: "absolute",
    top: "0px",
    right: "40px",
    fontSize:"30px",
    opacity: ".25",
    "&:hover": {
        opacity: ".85",
        cursor: "pointer"  }

}
const checkiconboxsx = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    opacity: ".25",
    "&:hover": {
        opacity: ".85",
        cursor: "pointer"  }

}

const freeiconsx = {
    
    opacity: ".25",
    "&:hover": {
        opacity: ".85",
        cursor: "pointer"  }

}

const boxsx = {
    
    position:"relative", 
    width:"100%",
}
const editboxsx = {
    position:"relative", 
    width:"100%",
    borderLeft: "5px solid #42A5F5",
    paddingLeft: "10px"

}
const noneditboxsx = {
    position:"relative", 
    width:"100%",
    borderLeft: "5px solid white",
    paddingLeft: "10px"

}

const formsx = {
    /* Auto layout */
    
    padding: "63px 61px 63px 61px",
    overflow: "auto",

    position: "absolute",
    width: "800px",
    minHeight: "100vh",
    left: "382px",
    top:"0px",

    /* Light/Background/Paper */
    background: "#FFFFFF",

    /* Elevation/1 */
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px"
}






const toolbarsx = {
    opacity: ".0",
    "&:hover": { 
        opacity: "1.0",
     } 

}
const toolssx = {

    maxWidth: "500px",
    height: "40px",
    display: "flex",
    justifyContent: "space-evenly",
    margin: "auto",
    display:"flex",
    alignItems: "center"
}

const toolboxsx = {
    display:"flex",
    marginRight: "15px",
    marginLeft: "15px",
    opacity: ".25",
    "&:hover": { 
        opacity: ".85",
        cursor: "pointer" },
}

const fontsx = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
}

const titlesx = {
    fontSize: "34px",
    lineHeight: "123.5%",
    letterSpacing: "0.25px"

}

const headsx = {
    fontSize: "24px",
    lineHeight: "123.5%",
    letterSpacing: "0.25px"

}

const normsx = {
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "0.15px"

}

const subsx = {
    fontSize: "12px",
    lineHeight: "166%",
    letterSpacing: "0.4px"

}

const centered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
const plussx = {
    width: "20px"
}
const hoversx = {
    "&:hover": { cursor: "pointer" }
}


    const [pieces, _setPieces] = useState([]);
    const pieceArrRef = useRef(pieces);
    const setPieces = (d) => {
        _setPieces(d);
        pieceArrRef.current = d;
    }

    const [form, _setForm] = useState({});
    const formRef = useRef(form);
    const setForm = (f) => {
        _setForm(f);
        formRef.current = f;
    }

    const [responses, _setResponses] = useState({});
    const responsesRef = useRef(responses);
    const setResponses = (g) => {
        _setResponses(g);
        responsesRef.current = g;
    }

    const [resp, _setResp] = useState({});
    const respRef = useRef(resp);
    const setResp = (c) => {
        _setResp(c);
        respRef.current = c;
    }

const handleChange = (e) => {
    let loc =e.target.name
    const index = responsesRef.current.map(ob => ob.key).indexOf(loc);
    let P = {key: loc, value: e.target.value}
    responsesRef.current=[...responsesRef.current.slice(0,index), P, ...responsesRef.current.slice(index+1)];
    
};

const handleChangeR = (e) => {
    let loc =e.target.name
    const index = responsesRef.current.map(ob => ob.key).indexOf(loc);
    let P = responsesRef.current[index]
    P.value={...P.value, [e.target.value]:e.target.checked}
    responsesRef.current=[...responsesRef.current.slice(0,index), P, ...responsesRef.current.slice(index+1)];
    
};







const RespondRender = ( {piece} ) => {

    







    let a = piece._id;

    let parsed= parseProps(piece.props);
    if(piece._type == "header"){
        if(parsed.htext==""&&parsed.hsubtext==""){
            return (
                <>
                <Typography sx={{...fontsx,...headsx,...pink}}>Empty Header</Typography>
                </>
            )
        }else{
            return (
                <>
                    <Typography sx={{...fontsx,...headsx}}>{parsed.htext}</Typography>
                    {parsed.hsubtext && <Typography sx={{...fontsx,...normsx}}>{parsed.hsubtext}</Typography>}
                   
                </>
            )

        }
        
    }else if (piece._type == "break"){
        return (
            <>
                <br/>
                <Divider variant="middle" />
                
            </>    
        )
    }else if (piece._type == "question"){
//{parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}<br/>
        if(parsed.qtext==""&&parsed.qsubtext==""){
            return (
                <>
                    <Typography sx={{...fontsx,...headsx,...pink}}>Empty Question</Typography>
                </>
            )
        }else{

            if(parsed.qtype == "text"){
                //if text box height is given use box, else line
                if(parsed.inLength && parsed.inLength!=1){
                    let r = parsed.inLength;
                    
                    return (
                        <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography><br/>
                        <TextField 
                            sx={{width:`${parsed.inWidth}%`}}
                            multiline
                            rows={r}
                            name={a}
                            label={parsed.qsubtext}
                            onChange={handleChange}
                            
                            
                        />
                         
    
                        </>
                    )
                } else{
                    return (
                        <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        <TextField  
                            sx={{width:`${parsed.inWidth}%`}} 
                            label={parsed.qsubtext}  
                            variant="standard" 
                            name={a} 
                            onChange={handleChange} />
    
                        </>
                    )
    
                }
                
            }else if (parsed.qtype == "check"){
                let L

                const handleChangeL = (e) =>{
                    if(e.target.checked){
                        L = true
                    }else {
                        L = false
                    }
                    handleChangeR(e);

                } 
                var renoc = [];
                
                if(parsed.qoptions){
                    for (var i = 0; i < piece.props.length; i++) {
                        let aa= piece.props[i].value;
                        if(piece.props[i].key=="qoptions"){
                            renoc.push(<FormControlLabel control={<Checkbox />} label={aa} checked={L} value={aa} name={a} onChange={handleChangeL} />)
                        }
                    }
                }
                
                return (
                    <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        <FormLabel >{parsed.qsubtext}</FormLabel>
                        <FormGroup>
                            {renoc}
                        </FormGroup>
    
                    </>
                )
            }else if (parsed.qtype == "radio"){
                //if text box height is given, set it, else 1 line
                var renor = [];
                if(parsed.qoptions){    
                    for (var i = 0; i < piece.props.length; i++) {
                        let aa= piece.props[i].value;
                        if(piece.props[i].key=="qoptions"){
                            renor.push(<FormControlLabel control={<Radio />} label={aa} value={aa}/>)
                        }
                    }
                }
                
                    ////okok the component below has to be a unique identifier, right?
                return (
                    <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        <FormControl>
                            <FormLabel >{parsed.qsubtext}</FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label"  name={a} onChange={handleChange} >
                                {renor}
                            </RadioGroup>
                        </FormControl>
                    </>
                )
            }else {
                return (
                    <div>
                        <h4> A qtypeless question appeared in the wild</h4>
                    </div>    
                )

            }

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
            <Typography sx={{...fontsx,...titlesx}}>{form.title}</Typography>
            {form.description && <Typography sx={{...fontsx,...normsx}}>{form.description}</Typography>}
            <br/>
            <Divider variant="middle" />
            <br/>
        </>
    
    )
};





    async function submit () {

        let ans = [...responsesRef.current];
        
        for (let h=0; h<ans.length; h++){
            if(typeof(ans[h].value)!= 'string'){
                /*
                let newval = [];
                for (const key in ans[h].value) {
                    if(ans[h].value[key]==true){
                        newval.push(key)
                    }   
                }
                ans[h].value=newval; 
                */

                let newval = "";
                for (const key in ans[h].value) {
                    if(ans[h].value[key]==true){
                        newval= newval + " / " + key
                    }   
                }
                ans[h].value=newval + " / "; 
            } 
        }
        
        console.log(ans);
        await mutations.respond(id,ans);
        
    }

    function SubButton () {
        return(        
            <Button variant="outlined" onClick={submit} color="error">SUBMIT</Button>   
        )
    }

    function logResponses () {
        console.log(responsesRef.current);
        
    }





    function Renderer ({pieces}) {

        var renP = [];
        for (var i = 0; i < pieces.length; i++) {
            
            renP.push( 
                <> 
                    <Box sx={noneditboxsx}  >
                        <Box sx={boxsx}   > 
                            <RespondRender piece={pieces[i]} />
                        </Box>
                    </Box> 
                    <br/>
                </>
            );
  
        }
        return (
            <>
            {renP}
            </>
        )
        
    
    }

  

    
    const { id } = useParams();
    let [loading, setLoading] = useState(true)
    //let [pieces, setPieces] = useState([])

    useEffect(() => {

        async function req() {
            
            let reqForm = (await queries.getFormByID(id)).result ?? {}
            let reqPieces = (await queries.getPiecesByID(id)).result ?? []
            setForm(reqForm)
            setPieces(reqPieces)
            setResponses(reqPieces.map((piece)=>{
                if(piece._type=="question"){
                    if(piece.props[0].value=="check"){
                        let y = {};
                        for (let j=0; j<piece.props.length; j++){
                            if(piece.props[j].key=="qoptions"){
                                y={...y, [piece.props[j].value]: false}
                            }
                        }
                        
                        let z={key:piece._id, value: y};
                        return z;
                    }else{
                        let z={key:piece._id, value: ""};
                        return z;
                    }
                }else{
                    let z={key:piece._id, value:""};
                    return z;
                }
                
            }))

            console.log(formRef.current)
            console.log(pieceArrRef.current)
            setLoading(false)
            
        }
        req()
        


        ///dummy data///////////////////////////////////////////////////////////////

       
        
    }, [])

    



    
    ////////////////////////end scratch/function area/////////////////////////////////////////////////////////////////////

    
   
    return(
        <>
        <CssBaseline />
        <Box sx={toolboxsx} onClick={()=>{logResponses()}}>
                        <AddIcon sx={plussx} fontSize={"medium"} />
                        <Typography sx={{...fontsx,...normsx}}>log responses</Typography>
                </Box>
        <Box  display="flex" flexDirection="row" sx={{height:"100%"}}>
            <Card sx={formsx}>
                <Titler form={form} sx={{borderLeft: "5px solid white"}}/>
                <Renderer pieces={pieces} />
                <br/>
                <SubButton/>
                <br/>
                <br/>
            </Card>
            
        </Box>

        </>
        
        
    )


    

    
}

export default Respond;
