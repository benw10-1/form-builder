
import React, { useState, useEffect, useRef } from "react";
import { queries, mutations, parseProps } from "../utils"
import { useParams } from "react-router-dom"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import "./nstyle.css"


function Success({ err }) {
    return (
        <Box sx={{ width: "100%" }}>
            {err ? <Typography variant="h6" color="error">There has been an error with your response</Typography> :
                (<React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Success!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Your response has been submitted.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Thank you for your contribution.
                    </Typography>
                </React.Fragment>)}
        </Box>
    );
}
function Respond() {


    const pink = {
        color: "rgba(200,0,0,0.5)"

    }
    const boxsx = {

        position: "relative",
        width: "100%",
    }
    const noneditboxsx = {
        position: "relative",
        width: "100%",
        borderLeft: "5px solid white",
        paddingLeft: "0"
    }

    const formsx = {
        /* Auto layout */

        padding: "63px 61px 63px 61px",
        overflow: "auto",
        width: "800px",
        minHeight: "100vh",
        /* Light/Background/Paper */
        background: "#FFFFFF",

        /* Elevation/1 */
        boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
        borderRadius: "4px"
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

    const handleChange = (e) => {
        let loc = e.target.name
        const index = responsesRef.current.map(ob => ob.key).indexOf(loc);
        let P = { key: loc, value: e.target.value }
        responsesRef.current = [...responsesRef.current.slice(0, index), P, ...responsesRef.current.slice(index + 1)];

    };

    const handleChangeR = (e) => {
        let loc = e.target.name
        const index = responsesRef.current.map(ob => ob.key).indexOf(loc);
        let P = responsesRef.current[index]
        P.value = { ...P.value, [e.target.value]: e.target.checked }
        responsesRef.current = [...responsesRef.current.slice(0, index), P, ...responsesRef.current.slice(index + 1)];

    };

    const RespondRender = ({ piece }) => {
        let a = piece._id;

        let parsed = parseProps(piece.props);
        if (piece._type == "header") {
            if (parsed.htext == "" && parsed.hsubtext == "") {
                return (
                    <>
                        <Typography sx={{ ...fontsx, ...headsx, ...pink }}>Empty Header</Typography>
                    </>
                )
            } else {
                return (
                    <>
                        <Typography sx={{ ...fontsx, ...headsx }}>{parsed.htext}</Typography>
                        {parsed.hsubtext && <Typography sx={{ ...fontsx, ...normsx }}>{parsed.hsubtext}</Typography>}
                    </>
                )

            }

        } else if (piece._type == "break") {
            return (
                <>
                    <br />
                    <Divider variant="middle" />

                </>
            )
        } else if (piece._type == "question") {
            //{parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}<br/>
            if (parsed.qtext == "" && parsed.qsubtext == "") {
                return (
                    <>
                        <Typography sx={{ ...fontsx, ...headsx, ...pink }}>Empty Question</Typography>
                    </>
                )
            } else {

                if (parsed.qtype == "text") {
                    //if text box height is given use box, else line
                    if (parsed.inLength && parsed.inLength != 1) {
                        let r = parsed.inLength;

                        return (
                            <>
                                <Typography sx={{ ...fontsx, ...normsx }}>{parsed.qtext}</Typography><br />
                                <TextField
                                    sx={{ width: `${parsed.inWidth}%` }}
                                    multiline
                                    rows={r}
                                    name={a}
                                    label={parsed.qsubtext}
                                    onChange={handleChange}
                                />
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Typography sx={{ ...fontsx, ...normsx }}>{parsed.qtext}</Typography>
                                <TextField
                                    sx={{ width: `${parsed.inWidth}%` }}
                                    label={parsed.qsubtext}
                                    variant="standard"
                                    name={a}
                                    onChange={handleChange} />
                            </>
                        )

                    }

                } else if (parsed.qtype == "check") {
                    let L

                    const handleChangeL = (e) => {
                        if (e.target.checked) {
                            L = true
                        } else {
                            L = false
                        }
                        handleChangeR(e);

                    }
                    var renoc = [];

                    if (parsed.qoptions) {
                        for (var i = 0; i < piece.props.length; i++) {
                            let aa = piece.props[i].value;
                            if (piece.props[i].key == "qoptions") {
                                renoc.push(<FormControlLabel control={<Checkbox />} label={aa} checked={L} value={aa} name={a} onChange={handleChangeL} />)
                            }
                        }
                    }

                    return (
                        <>
                            <Typography sx={{ ...fontsx, ...normsx }}>{parsed.qtext}</Typography>
                            <FormLabel >{parsed.qsubtext}</FormLabel>
                            <FormGroup>
                                {renoc}
                            </FormGroup>

                        </>
                    )
                } else if (parsed.qtype == "radio") {
                    //if text box height is given, set it, else 1 line
                    var renor = [];
                    if (parsed.qoptions) {
                        for (var i = 0; i < piece.props.length; i++) {
                            let aa = piece.props[i].value;
                            if (piece.props[i].key == "qoptions") {
                                renor.push(<FormControlLabel control={<Radio />} label={aa} value={aa} />)
                            }
                        }
                    }

                    ////okok the component below has to be a unique identifier, right?
                    return (
                        <>
                            <Typography sx={{ ...fontsx, ...normsx }}>{parsed.qtext}</Typography>
                            <FormControl>
                                <FormLabel >{parsed.qsubtext}</FormLabel>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name={a} onChange={handleChange} >
                                    {renor}
                                </RadioGroup>
                            </FormControl>
                        </>
                    )
                } else {
                    return (
                        <div>
                            <h4> A qtypeless question appeared in the wild</h4>
                        </div>
                    )

                }

            }
        } else {
            return (
                <div>
                    <h4> A typeless piece appeared in the wild</h4>
                </div>

            )
        }
    };

    const Titler = ({ form }) => {


        return (
            <>
                <Typography sx={{ ...fontsx, ...titlesx }}>{form.title}</Typography>
                {form.description && <Typography sx={{ ...fontsx, ...normsx }}>{form.description}</Typography>}
                <br />
                <Divider flexItem={true} />
                <br />
            </>

        )
    };
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    async function submit() {

        let ans = [...responsesRef.current];

        for (let h = 0; h < ans.length; h++) {
            if (typeof (ans[h].value) != 'string') {
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
                let ch = 0;

                for (const key in ans[h].value) {


                    if (ans[h].value[key] == true) {
                        if (ch == 0) {
                            newval = key;
                            ch++;

                        } else {
                            newval = newval + "__sep__" + key
                        }

                    }
                }
                ans[h].value = newval;
            }
        }

        console.log(ans);
        setError((await mutations.respond(id, ans)).errors)
        setDisabled(true);
    }

    function SubButton({ disabled }) {
        if (disabled) return
        return (
            <Button variant="outlined" onClick={submit} color="error" disabled={disabled}>SUBMIT</Button>
        )
    }

    function Renderer({ pieces }) {

        var renP = [];
        for (var i = 0; i < pieces.length; i++) {

            renP.push(
                <>
                    <Box sx={noneditboxsx}  >
                        <Box sx={boxsx}   >
                            <RespondRender piece={pieces[i]} />
                        </Box>
                    </Box>
                    <br />
                </>
            );

        }
        return (
            <>
                {disabled ? <Success err={error} /> : renP}
            </>
        )


    }




    const { id } = useParams();
    let [loading, setLoading] = useState(true)
    //let [pieces, setPieces] = useState([])

    useEffect(() => {

        async function req() {

            let reqForm = (await queries.getFormByEndpoint(id)).result ?? {}
            let reqPieces = (await queries.getPiecesByEndpoint(id)).result ?? []
            setForm(reqForm)
            setPieces(reqPieces)
            setResponses(reqPieces.map((piece) => {
                if (piece._type == "question") {
                    if (piece.props[0].value == "check") {
                        let y = {};
                        for (let j = 0; j < piece.props.length; j++) {
                            if (piece.props[j].key == "qoptions") {
                                y = { ...y, [piece.props[j].value]: false }
                            }
                        }

                        let z = { key: piece._id, value: y };
                        return z;
                    } else {
                        let z = { key: piece._id, value: "" };
                        return z;
                    }
                } else {
                    let z = { key: piece._id, value: "" };
                    return z;
                }

            }))

            console.log(formRef.current)
            console.log(pieceArrRef.current)
            setLoading(false)

        }
        req()
    }, [])

    return (
        <>
            <CssBaseline />

            <Container disableGutters maxWidth={true} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={formsx}>
                    <Titler form={form} sx={{ borderLeft: "5px solid white" }} />
                    <Renderer pieces={pieces} />
                    <br />
                    <SubButton disabled={disabled} />
                    <br />
                    <br />
                </Card>
            </Container>

        </>
    )
}

export default Respond;
