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
        let loggedIn = Auth.loggedIn();
        if (!loggedIn) {
            window.location.replace(window.location.origin + "/login");
            return;
        }
        if (id) {
            queries.getFormByID(id).then(async form => {
                if (form?.result && form.result.published) {
                    window.location.replace(window.location.origin + "/respond/" + id);
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
    }, []);

    const backToEditing = (event) => {
        event.preventDefault();
        window.location.assign = `/editform/${id}`;
    }

    const submit = (event) => {
        event.preventDefault();
        if (!responding) return
        const _responses = pieces.map((piece, i) => {
            const response = {
                key: piece._id,
                value: responses[i] ?? "",
            }
            return response;
        })
        mutations.respond(ep, _responses).then(() => {
            setSubmitted(true);
        })
    }

    const leftbut = responding ? null : <Button variant="outlined" startIcon={<ArrowBack />} onClick={backToEditing} sx={{ width: "220px", padding: "8px 0" }}>Back to Editing</Button>

    const right = (responding || window.innerWidth < 1250) ? null : <Box sx={{ width: "100%" }} />

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
