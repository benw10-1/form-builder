import React, { useState, useRef, useEffect } from "react";
import { genProp, reduceProps, packProps } from "../../utils";
import Question from "./Question";
import Header from "./Header";
import Break from "./Break";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Copy from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";
import { MobileMenu } from "../Layouts/PaperCenter";

import {
    Divider,
    Box,
    Switch,
    Typography
} from "@mui/material";

function BottomMenu({ handlers: { setRequired, copyThis, removeThis, editThis }, states: { required } }) {
    const [contWidth, setContWidth] = useState(1);
    const [childWidth, setChildWidth] = useState(0);

    const collapse = contWidth <= childWidth;

    const contsx = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }

    const iconsx = {
        width: "100%",
        height: "100%",
        "&:hover": {
            color: "rgb(21, 101, 192)",
        },
        cursor: "pointer",
        opacity: .75,
        transition: "all 0.2s ease-in",
        boxShadow: 0,
        border: 0,
        background: "transparent",
    }

    const bottomsx = {
        padding: "10px 0",
        display: "flex",
        justifyContent: collapse ? "center" : "end",
        alignItems: "center",
        width: "100%",
    }

    const optionsx = {
        marginLeft: collapse ? "0" : "14px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap"
    }

    const optiontextsx = {
        fontSize: "12px",
        fontFamily: "'Roboto', sans-serif",
        letterSpacing: ".4px",
        fontWeight: "400",
        display: "flex",
        alignItems: "center",
    }

    const miniboxsx = {
        margin: collapse ? "10px 0" : "0 10px",
        height: "100%",
        display: "grid",
        placeItems: "center",
    }

    const buttons = (
        <React.Fragment>
            <Box onClick={editThis} sx={miniboxsx}>
                <Check sx={{ ...iconsx, opacity: "1", width: "25px", height: "25px" }} />
            </Box>
            <Box onClick={copyThis} sx={miniboxsx}>
                <Copy sx={{ ...iconsx, opacity: "1", width: "25px", height: "25px" }} />
            </Box>
            <Box onClick={removeThis} sx={miniboxsx}>
                <CancelIcon sx={{ ...iconsx, opacity: "1", width: "25px", height: "25px" }} />
            </Box>
            <Divider orientation={collapse ? "horizontal" : "vertical"} flexItem={true} />
            <Box sx={optionsx}>
                <Typography sx={optiontextsx}>Required</Typography>
                <Switch checked={required} onChange={setRequired} />
            </Box>
        </React.Fragment>
    )

    return (
        <Box sx={contsx} ref={(ref) => { if (ref) setContWidth(ref.offsetWidth) }}>
            {collapse ? null : <Divider flexItem fullWidth sx={{ marginTop: "16px" }} />}
            <Box sx={bottomsx}>
                {collapse ? <MobileMenu
                    buttons={buttons}
                    origin={{
                        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                        transformOrigin: { vertical: 'top', horizontal: 'center' },
                    }} inline={true} /> : (
                    <Box ref={(ref) => { if (ref) setChildWidth(ref.offsetWidth) }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {buttons}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

function Piece({ _type, form_ref, props, editingThis, editThis, index, setProps, setEditRef, copyThis, removeThis, setResponse, error }) {
    const [hover, setHover] = useState(false);
    const thisRef = useRef(null);
    useEffect(() => {
        const enter = () => {
            setHover(true);
        }
        const leave = () => {
            setHover(false);
        }

        if (thisRef.current && editThis) {
            thisRef.current.focus()
            thisRef.current.addEventListener("mouseenter", enter)
            thisRef.current.addEventListener("mouseleave", leave)
        }

        return () => {
            if (thisRef.current) {
                thisRef.current.removeEventListener("mouseenter", enter)
                thisRef.current.removeEventListener("mouseleave", leave)
            }
        }
    }, [thisRef.current])

    useEffect(() => {
        if (editThis && editingThis && thisRef.current) {
            setEditRef(thisRef.current);
        }
    }, [editingThis])

    const reduced = reduceProps(props)

    const [required, _setRequired] = useState(reduced.qreq);

    const editProp = setProps ? (prop, value) => {
        if (value === reduced[prop]) return
        reduced[prop] = value
        setProps(packProps(reduced))
    } : null

    const setRequired = (event) => {
        _setRequired(event.target.checked)
        editProp("qreq", event.target.checked)
    }

    const basepiecesx = {
        width: "100%",
        position: "relative",
        marginTop: "24px",
        marginBottom: editingThis ? "0" : "12px",
        transition: "height 0.25s ease-in",
    }

    let piece
    if (_type === "question") {
        if (!reduced.qtype) reduced.qtype = "text"
        if (!reduced.qtitle) reduced.qtitle = "Question Title"
        if (!reduced.qdesc) reduced.qdesc = ""
        if (editThis) piece = <Question reduced={reduced} editing={editingThis} editProp={editProp} error={error} />
        else piece = <Question reduced={reduced} setResponse={setResponse} error={error} />
    }
    // if (_type === "break") {
    //     piece = <Break reduced={reduced} editing={editingThis} editProp={editProp} />
    // }
    // if (_type === "header") {
    //     piece = <Header reduced={reduced} editing={editingThis} editProp={editProp} />
    // }

    const iconcontsx = {
        position: "absolute",
        top: "0",
        right: "0",
        cursor: "pointer",
        width: "25px",
        height: "25px",
        display: "grid",
        placeItems: "center",
    }
    const iconsx = {
        width: "100%",
        height: "100%",
        "&:hover": {
            color: "rgb(21, 101, 192)",
        },
        cursor: "pointer",
        opacity: {
            xs: .75,
            md: (hover && !editingThis) ? .75 : 0,
        },
        transition: "all 0.2s ease-in",
        boxShadow: 0,
        border: 0,
        background: "transparent",
    }

    const editIcon = (
        <Box sx={iconcontsx} onClick={editThis}>
            <EditIcon sx={iconsx} />
        </Box>
    )

    return (
        <Box sx={basepiecesx} ref={thisRef} >
            {(editThis && !editingThis) ? editIcon : null}
            {piece}
            {(editThis && editingThis) ? <BottomMenu handlers={{ setRequired, copyThis, removeThis, editThis }} states={{ required }} /> : null}
        </Box>
    )
}

export default Piece;