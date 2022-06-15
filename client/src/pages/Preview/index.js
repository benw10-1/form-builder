import React, { useState, useEffect, useRef } from "react";
import { PaperCenter } from '../Layouts';
import { useParams } from "react-router-dom";
import { mutations, queries, Auth } from "../../utils";
import {
    Button,
    Box,
    Typography,
    Skeleton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Piece from "../EditForm/Piece"

function Preview({ responding }) {
    const [rerender, setRerender] = useState(false)
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [pieces, _setPieces] = useState([]);
    const [responses, setResponses] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    let { id, ep } = useParams();

    const pieceRef = useRef(pieces);

    const resizer = (event) => {
        setRerender(Math.random() * 100)
    }

    const setPieces = (pieces) => {
        pieceRef.current = pieces;
        _setPieces(pieces);
    };

    const setResponse = (i, response) => {
        responses[i] = response;
        setResponses([...responses]);
    }

    useEffect(() => {
        window.addEventListener("resize", resizer)
        return () => window.removeEventListener("resize", resizer)
    }, [])

    useEffect(() => {
        if (id) {
            let loggedIn = Auth.loggedIn();
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login");
                return;
            }
            queries.getFormByID(id).then(async form => {
                if (!form || form.errors || !form.result) {
                    window.location.replace(window.location.origin + "/");
                    return;
                }
                if (form.result.published) {
                    window.location.replace(window.location.origin + "/respond/" + (form.result.endpoint ?? id));
                    return;
                }
                setForm(form?.result ?? {});
                setPieces((await queries.getPiecesByID(id))?.result ?? []);
                setLoading(false);
            });
        }
        else if (ep) {
            queries.getFormByEndpoint(ep).then(async form => {
                setForm(form?.result ?? {});
                setPieces((await queries.getPiecesByEndpoint(ep))?.result ?? []);
                setLoading(false);
            });
        }
        else {
            window.location.replace(window.location.origin + "/");
        }
    }, []);

    const backToEditing = (event) => {
        event.preventDefault();
        window.location.assign(`/editform/${id}`)
    }

    const submit = (event) => {
        event.preventDefault();
        let ok = true
        const _errors = []
        const _responses = pieces.map((piece, i) => {
            const required = piece.props.reduce((acc, p) => {
                if (p.key === "qreq") {
                    return acc || p.value === "true";
                }
                return acc
            }, false)
            const val = responses[i];
            if (required && (!val || val === "")) {
                ok = false
                _errors[i] = "This is a required field"
            }
            const response = {
                key: piece._id,
                value: val ?? "",
            }
            return response;
        })
        setErrors(_errors)
        if (!responding) return
        if (ok) mutations.respond(ep, _responses).then(() => {
            setSubmitted(true);
        })
    }

    const leftbut = responding ? null : (window.innerWidth <= 900 ? null : <Button variant="outlined" startIcon={<ArrowBack />} onClick={backToEditing} sx={{ width: "220px", padding: "8px 0" }}>Back to Editing</Button>)

    const right = responding ? null : (window.innerWidth <= 900 ? <Button variant="outlined" startIcon={<ArrowBack />} onClick={backToEditing} sx={{ width: "100%", padding: "8px 0" }}>Back to Editing</Button> : null)

    const titlesx = {
        width: "100%",
        paddingBottom: "24px",
    }

    const paperhead = (
        <Box sx={titlesx}>
            <Typography variant="h4" marginBottom={"6px"} >
                {form.title ?? "Form"}
            </Typography>
            {true ? <Typography variant="body1" >{form.description ?? "Some description"}</Typography> : null}
        </Box>
    )

    const contsx = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }

    const submitcontsx = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "10px",
    }

    const paperbody = loading ? (<Skeleton />) : (
        <Box sx={contsx}>
            {submitted ? <Typography variant="h4" sx={{ marginTop: "12px" }} >Thank you for your response!</Typography> : (
                <React.Fragment>
                    {pieces.map((p, i) => {
                        return (
                            <Piece
                                {...p}
                                setResponse={(response) => {
                                    setResponse(i, response);
                                }}
                                index={i}
                                key={p._id ?? i}
                                error={errors[i]}
                            />
                        )
                    })}
                    <Box sx={submitcontsx}>
                        <Button variant="contained" color="primary" onClick={submit} sx={{ width: "128px", padding: "8px 0" }} >Submit</Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )

    return (
        <PaperCenter left={leftbut} buttons={right} paper={[paperhead, paperbody]} hasSignOut={!responding} />
    )
}

export default Preview
