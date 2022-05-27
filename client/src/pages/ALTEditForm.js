
import React, { useState, useEffect, useRef } from "react";
import { queries, mutations, Auth, parseProps } from "../utils"
import { useParams } from "react-router-dom"

import * as uuid from "uuid";



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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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


const gray = {
    color: "rgba(0,0,0,0.5)"
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
    height: "1040px",
    left: "382px",
    top: "83px",

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

    width: "673px",
    height: "40px",
    display: "flex",
    margin: "auto",
    display:"flex",
    alignItems: "center"
}

const toolboxsx = {
    display:"flex",
    marginRight: "25px",
    "&:hover": { 
        boxShadow: 15,
        cursor: "pointer" },
}

const fontsx = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "400",
    //display: flex;
    //align-items: center;
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




const NormalRender = ( {piece} ) => {
    
    let parsed= parseProps(piece.props);
    if(piece._type == "header"){
        return (
            <>
                <Typography sx={{...fontsx,...headsx}}>{parsed.htext}</Typography>
                {parsed.hsubtext && <Typography sx={{...fontsx,...normsx}}>{parsed.hsubtext}</Typography>}
               
            </>
        )
    }else if (piece._type == "break"){
        return (
            <>
                <br/>
                <Divider variant="middle" />
                
            </>    
        )
    }else if (piece._type == "question"){

        if(parsed.qtype == "text"){
            //if text box height is given use box, else line
            if(parsed.inSize && parsed.inSize!=1){
                let r = parsed.inSize;
                return (
                    <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}<br/>
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
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}
                    <TextField id="standard-basic" label="This should be a prop" variant="standard" />

                    </>
                )

            }
            
        }else if (parsed.qtype == "check"){
            var renoc = [];
            if(parsed.qoptions){
                for (var i = 0; i < parsed.qoptions.length; i++) {renoc.push(<FormControlLabel control={<Checkbox />} label={parsed.qoptions[i]} />)}
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
                console.log(parsed.qoptions);
                for (var i = 0; i < parsed.qoptions.length; i++) {renor.push( <FormControlLabel  control={<Radio />} value={parsed.qoptions[i]} label={parsed.qoptions[i]}/>)}
            }
                ////okok the component below has to be a unique identifier, right?
            return (
                <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    <FormControl>
                        <FormLabel >{parsed.qsubtext}</FormLabel>
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label"  name="radio-buttons-group">
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







function ALTEditForm() {


    

    ////////////////////////scratch/function area/////////////////////////////////////////////////////////////////////

    const [pieces, _setPieces] = useState([]);
    const pieceArrRef = useRef(pieces);
    const setPieces = (d) => {
        _setPieces(d);
        pieceArrRef.current = d;
    }

    const [aPiece, _setAPiece] = useState({});
    const pieceRef = useRef(aPiece);
    const setAPiece = (c) => {
        _setAPiece(c);
        pieceRef.current = c;
    }

    const optionRef = useRef({});


    const [titledesc, setTitleDesc] = useState({});

    const [editing, _setEditing] = useState('');
    const editRef = useRef(editing);
    const setEditing = (b) => {
        _setEditing(b);
        editRef.current = b;
    }

    const EditingRender = ( {piece} ) => {

        setAPiece(piece)

        const handleChange = (e) => {
            let P = pieceRef.current;
            P.props = P.props.filter(pr=>pr.key!=e.target.name);
            P.props.push({key: e.target.name, value: e.target.value});
            setAPiece(P);
        };

        const handleOptionChange = (e) => {
            optionRef.current = { key: "qoptions", value: e.target.value }
        }
        
        const submitOption = () => {
            if(optionRef.current){
                console.log(pieceArrRef.current);

                let P = pieceRef.current;
                P.props.push(optionRef.current)
                setAPiece(P);
                const index = pieceArrRef.current.map(e => e.piid).indexOf(piece.piid);
                setPieces([...pieceArrRef.current.slice(0,index), pieceRef.current, ...pieceArrRef.current.slice(index+1)]);
                optionRef.current=(null);

                console.log(pieceArrRef.current);

            }
            
        }


        const deleteOption = (f) => {
            let P = pieceRef.current;
            P.props = P.props.filter(pr=> !(pr.key=="qoptions"&&pr.value==f) );
            setAPiece(P);
            const index = pieceArrRef.current.map(e => e.piid).indexOf(piece.piid);
            setPieces([...pieceArrRef.current.slice(0,index), pieceRef.current, ...pieceArrRef.current.slice(index+1)]);
            optionRef.current=(null);

        }


        //let parsed= parseProps(pieceRef.current.props);
        let parsed= parseProps(piece.props);

        if(piece._type == "header"){
            return (
                <>
                
                
                    <TextField
          
                        label="Header"
                        name="htext"
                        placeholder="Section Title"
                        variant="standard"
                        defaultValue={parseProps(pieceRef.current.props).htext}
                        onChange={handleChange}
                    /><br/>
                
                
                    <TextField
          
                        label="Subheader"
                        name="hsubtext"
                        placeholder="Section Subtitle"
                        variant="standard"
                        defaultValue={parseProps(pieceRef.current.props).htext}
                        onChange={handleChange}
                    />
                    
                
                  
                </>
            )
        }else if (piece._type == "break"){
            return (
                <>
                    <br/>
                    <Divider variant="middle" />
                    
                </>    
            )
        }else if (piece._type == "question"){
    
            if(parsed.qtype == "text"){
                //if text box height is given use box, else line
                if(parsed.inSize && parsed.inSize!=1){
                    let r = parsed.inSize;
                    return (
                        <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}<br/>
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
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}
                        <TextField id="standard-basic" label="This should be a prop" variant="standard" />
    
                        </>
                    )
    
                }
                
            }else if (parsed.qtype == "check"){
                var renoc = [];
                var rend = [];

            
                if(parsed.qoptions){    
                    console.log(parsed.qoptions);
                    for (var i = 0; i < piece.props.length; i++) {
                        let aa= piece.props[i].value;
                        if(piece.props[i].key=="qoptions"){
                            renoc.push(
                                <Box sx={deloptsx} >
                                    <FormControlLabel control={<Checkbox />} label={aa} />
                                    <DeleteIcon sx={{...freeiconsx, marginTop: "10px"}} onClick={()=>{ deleteOption(aa) }}/>
                                </Box>)
                        }
                        }
                }
                return (
                    <>
                        <TextField
                            label="Question text"
                            name="qtext"
                            placeholder="Question"
                            variant="standard"
                            defaultValue={parseProps(pieceRef.current.props).qtext}
                            onChange={handleChange}
                        /><br/>         
                        <TextField
                            label="Question Subtext"
                            name="qsubtext"
                            placeholder="Subquestion"
                            variant="standard"
                            defaultValue={parseProps(pieceRef.current.props).qsubtext}
                            onChange={handleChange}
                        />
                       
                            <FormGroup>
                                {renoc}
                            </FormGroup><br/>
                            
                        

                        <TextField
                        label="Answer option"
                        name="qoptions"
                        placeholder="Answer"
                        variant="standard"
                        onChange={handleOptionChange}
                        />
                        <CheckCircleIcon sx={freeiconsx} onClick={()=>{ submitOption()}}/>
                        

                    </>
                )

            }else if (parsed.qtype == "radio"){
                //if text box height is given, set it, else 1 line
                var renor = [];
                if(parsed.qoptions){
                    for (var i = 0; i < parsed.qoptions.length; i++) {renor.push( <FormControlLabel  control={<Radio />} value={parsed.qoptions[i]} label={parsed.qoptions[i]}/>)}
                }
                    ////okok the component below has to be a unique identifier, right?
                return (
                    <>
                        <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                        <FormControl>
                            <FormLabel >{parsed.qsubtext}</FormLabel>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label"  name="radio-buttons-group">
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
        }else {
            return (
                <div>
                    <h4> A typeless piece appeared in the wild</h4>
                </div>
                
            )
        } 
    };


    ///////////////////////////popmenu stuff////////////////
    const BasicMenu = ({l})=> {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (e) => {
          setAnchorEl(e.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
      
        return (
          <div>
            <Box sx={toolboxsx} 
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
                <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                <Typography sx={{...fontsx,...normsx,...gray}}>Add Question</Typography>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>{
                  handleClose();
                  addPiece("question",l,"ss");
                  }}>Single Select</MenuItem>
              <MenuItem onClick={()=>{
                  handleClose();
                  addPiece("question",l,"ms");
                  }}>Multiple Select</MenuItem>
              <MenuItem onClick={()=>{
                  handleClose();
                  addPiece("question",l,"st");
                  }}>Single Line Text</MenuItem>
                  <MenuItem onClick={()=>{
                  handleClose();
                  addPiece("question",l,"mt");
                  }}>Multiple Line Text</MenuItem>
            </Menu>
          </div>
        );
    }

///////////////////end popup menu stuff////////////////////////////////////////////////

    const Toolbar = ({location})=> {
        return(
            <Card sx={toolssx}>
                    <Box sx={toolboxsx} >
                        <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                        <Typography sx={{...fontsx,...normsx,...gray}}>Add Question</Typography>
                    </Box>
                    <Box sx={toolboxsx} onClick={()=>{addPiece("header",location)}}>
                        <TitleRounded sx={{...plussx,...gray}} fontSize={"medium"} />
                        <Typography sx={{...fontsx,...normsx,...gray}}>Add Header</Typography>  
                    </Box>
                    <Box sx={toolboxsx} onClick={()=>{addPiece("break",location)}}>
                        <MoreHorizFilled sx={{...plussx,...gray}} fontSize={"medium"} />
                        <Typography sx={{...fontsx,...normsx,...gray}}>Add Divider</Typography>  
                    </Box>
                    <Box sx={toolboxsx} onClick={()=>{logPieces()}}>
                        <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                        <Typography sx={{...fontsx,...normsx,...gray}}>log pieces</Typography>
                    </Box>
                    <BasicMenu l={location}/>
                    

    
                </Card>
        )
    }

    function Editor ({pieces}) {

        //prob add key below
        //this is where we check which piece is in editing mode, now we only have non editing mode 
        var renP = [];
        for (var i = 0; i < pieces.length; i++) {
            
            let a = pieces[i].piid;

            //if currently being edited then editing render
            if(a==editRef.current){
                renP.push( 
                    <>
                    <Box sx={toolbarsx}>
                        <Toolbar location={a}/>
                    </Box>
                    <Box sx={editboxsx} key={i} >
                        <Box sx={boxsx}  key={i} > 
                            <Box sx={checkiconboxsx}>
                                <DeleteIcon sx={deliconsx} onClick={()=>{ delPiece(a)}}/>
                                <CheckCircleIcon sx={checkiconsx} onClick={()=>{edit('-1')}}/>
                            </Box>
                            <EditingRender piece={pieces[i]} Key={i} /> 
                        </Box>
                    </Box>
                    
                    </>
                );


            }else{
                renP.push( 
                    <>
                    <Box sx={toolbarsx}>
                        <Toolbar location={a}/>
                    </Box>
                    <Box sx={noneditboxsx} key={i} >
                        <Box sx={boxsx}  key={i} > 
                            <Box sx={iconboxsx}>
                                <EditIcon sx={editiconsx} onClick={()=>{ edit(a)}}/>
                            </Box>
                            <NormalRender piece={pieces[i]} Key={i} />
                        </Box>
                    </Box>
                    </>
                );

            }
            
        }
        return (
            <>
            {renP}
            <br/>
            <Toolbar location={'-1'}/>
            </>
        )
        
    
    }

    useEffect(() => {

        ///dummy data///////////////////////////////////////////////////////////////

        let form1 = {
            _id : 1999,
            title : "Ye Examplar",
            published: true,
            description : "'tis to prove the encoded instructions",
            pieces:[ 
            {_id: "89", _type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"},{key:"inSize", value:"5" }]},
            {_id: "89", _type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose wisely?"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
            {_id: "89", _type:"break", props:[]},
            {_id: "89", _type:"header", props:[{key:"htext", value:"Now listen"},{ key:"hsubtext", value: "very carefully"}]},
            {_id: "89", _type:"header", props:[{key:"htext", value:"Keep listening"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"check"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}
            ]
    
        }

        let piece1 = { _type:"question", props:[{key:"qtype", value:"check"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}


        ///end dummy data////////////////////////////////////////////////////////////////////




        

        //setPieces(form1.pieces);//replace this line with setPieces(<get pieces of this form>)/SEE AT BOTTOM /////////////////////////******************
        setTitleDesc({title: form1.title, description: form1.description})
        setPieces(form1.pieces.map((piece)=>{
                let z = {
                    _id: piece._id,
                    piid: uuid.v4(), 
                    _type: piece._type, 
                    props: piece.props
                }
                return z;   
        }));

        setEditing('-1');
        
        
    }, [])

    function removeIds(){
        setPieces(pieces.map(  (piece)=>{
            if(piece._id){
                let z = {
                    _id: piece._id,
                    _type: piece._type, 
                    props: piece.props
                };
                return z;
            }else{
                let z = { 
                    type: piece.type, 
                    props: piece.props
                };
                return z;
            }   
        }));
    }



    function saveToDb(){
        removeIds();
        console.log(pieces);//replace this line with a mutation to save pieces to form!!!!!!!!!!********************************************
    }


    
    
    function logPieces(){
        console.log(pieces);
    }
/////////////////////////////////////////////////////////////CHANGE THESES VALUES, WE DON"T WANT GOATS TO SHOW UP IF THEY LEAVE IT BLANK!!///OR NOT////
    function addPiece(type,loc,qt="-1"){

        const P = { piid: uuid.v4(), _type: type, props:[]};

        if(type=="break"){
            setEditing('-1');
        }else {
            if(type=="question"){
                if(qt=="ss"){
                    P.props.push({key:"qtype", value:"radio"},{ key:"qtext", value:""}, {key:"qsubtext", value:""});
                }else if(qt=="ms"){
                    P.props.push({key:"qtype", value:"check"},{ key:"qtext", value:""}, {key:"qsubtext", value:""})
                }else if(qt=="st"){
                    P.props.push({key:"qtype",value:"text"},{ key:"qtext",value:""},{ key:"qsubtext", value: ""})
                }else if(qt=="mt"){
                    P.props.push({key:"qtype",value:"text"},{ key:"qtext",value:""},{ key:"qsubtext", value: ""},{key:"inSize", value:"" })
                }else {
                    console.log("why though");
                }
            }else{
                P.props.push({key:"htext", value:""},{ key:"hsubtext", value: ""})

            }
            setEditing(P.piid);
        }

        if(loc=="-1"){
            setPieces([...pieces, P]);
        } else {
            const index = pieces.map(e => e.piid).indexOf(loc);
            setPieces([...pieces.slice(0,index), P, ...pieces.slice(index)]);
        }
        
    }
/*
This is unnecessary (and doesn't work) because shallow references? disconcerting but ok...
    function savePiece(loc){
        const index = pieceArrRef.current.map(e => e.piid).indexOf(loc);
        setPieces([...pieceArrRef.current.slice(0,index), pieceRef.current, ...pieceArrRef.current.slice(index+1)])
        
    };
*/
    

    function edit(a){
        setEditing(a);
        console.log(editRef.current)
    }

    function delPiece(c){
        setEditing('-1');
        setPieces(pieces.filter(p => p.piid != c))
    }


    
    ////////////////////////end scratch/function area/////////////////////////////////////////////////////////////////////


    return(
        <Card sx={formsx}>
            <Titler form={titledesc} sx={{borderLeft: "5px solid white"}}/>
            <Editor pieces={pieceArrRef.current}/>
        </Card>
        
    )


    

    
}

export default ALTEditForm;



/*
let { id } = useParams()

    let [loading, setLoading] = useState(true)
    let [pieces, setPieces] = useState([])

    // same logic as Dashboard.js
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login")
                return
            }
            let reqPieces = (await queries.getPiecesByID(id)).result ?? []
            if (!reqPieces) {
                window.location.replace(window.location.origin + "/dashboard")
            }
            else {
                setPieces(reqPieces)
                setLoading(false)
            }
        }
        req()
    }, [])
*/




