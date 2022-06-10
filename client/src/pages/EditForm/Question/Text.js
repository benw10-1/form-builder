import React, { useState, useRef, useEffect } from "react";
// import { genProp } from "../../utils";
import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

function Text({ reduced, editing, editProp, }) {
    const [title, _setTitle] = useState(reduced.qtitle ?? "");
    const [desc, _setDesc] = useState(reduced.qdesc ?? "");
    const [value, _setValue] = useState("");
    const [titleError, _setTitleError] = useState(false);
    const [inpError, _setInpError] = useState(false);

    // console.log(reduced)

    const setTitle = (event) => {
        editProp("qtitle", event.target.value)
        if (event.target.value.length === 0) {
            _setTitleError("Needs a title")
        }
        else {
            _setTitleError(false)
        }
        _setTitle(event.target.value)
    }

    const setDesc = (event) => {
        editProp("qdesc", event.target.value)
        _setDesc(event.target.value)
    }

    const setValue = (event) => {
        _setValue(event.target.value)
        validate(event.target.value)
    }

    const setInpError = (error) => {
        _setInpError(error)
    }

    const validate = (val) => {
        if (reduced.qreq && (!val || val === "")) {
            setInpError("Required")
            return false
        }
        setInpError(false)
        return true
    }

    const contsx = {
        width: "100%",
    }
    const fieldsx = {
        width: "100%",
        marginBottom: "12px",
    }

    const inner = () => {
        if (editing) return (
            <React.Fragment>
                <TextField
                    hiddenLabel
                    value={title}
                    variant="filled"
                    onChange={setTitle}
                    placeholder="Question Title"
                    sx={fieldsx}
                    error={titleError}
                    helperText={titleError}
                />
                <TextField
                    hiddenLabel
                    value={desc}
                    variant="standard"
                    onChange={setDesc}
                    placeholder="Question Placeholder/Description"
                    sx={fieldsx}
                />
            </React.Fragment>
        )

        const titlesx = {
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.15px",
            color: "rgba(0, 0, 0, 0.87)",
            fontWeight: "400",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: editing ? "18px" : "12px",
            fontFamily: "'Roboto', sans-serif",
        }

        const valsx = {
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: "'Roboto', sans-serif",
            width: "100%",
            maxWidth: "430px",
            "& .MuiInput-input": {
                padding: "8px 0",
                fontSize: "16px",
                lineHeight: "24px",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "400",
                color: "rgba(0, 0, 0, 0.87)",
                letterSpacing: "0.15px",
                "&:disabled": {
                    color: "rgba(0, 0, 0, 0.87)",
                },
            },
        }

        return (
            <React.Fragment>
                <Typography sx={titlesx}>{String(reduced.qtitle + (reduced.qreq ? "*" : ""))}</Typography>
                <TextField
                    hiddenLabel
                    value={value}
                    variant="standard"
                    onChange={setValue}
                    placeholder={reduced.qdesc === '' ? "Text" : reduced.qdesc}
                    sx={valsx}
                    error={inpError}
                    helperText={inpError}
                />
            </React.Fragment>
        )
    }

    return (
        <Box sx={contsx}>
            {inner()}
        </Box>
    )
}

export default Text;