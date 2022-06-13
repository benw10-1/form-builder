import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Editable from "../Editable";

function EditableChoice({ removeThis, initalValue, setValue }) {
    const [value, _setValue] = useState(initalValue);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        _setValue(initalValue);
    }, [initalValue])

    const radiolabelcontsx = {
        display: "flex",
        alignItems: "center",
    }

    const radiolabelsx = {
        fontSize: "16px",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "400",
        color: "rgba(0, 0, 0, 0.87)",
        lineHeight: "24px",
        letterSpacing: "0.15px",
        display: "flex",
        alignItems: "center",
    }

    const iconsx = {
        width: "100%",
        height: "100%",
        "&:hover": {
            color: "rgb(21, 101, 192)",
        },
        opacity: .75,
        transition: "all 0.2s ease-in",
        padding: "0",
        margin: "0",
        boxShadow: 0,
        border: 0,
        background: "transparent",
    }
    const closesx = {
        position: "absolute",
        top: anchorEl ? `${anchorEl.offsetTop}px` : "0",
        display: anchorEl ? "block" : "none",
        right: "0",
        width: "24px",
        height: "24px",
        padding: "0",
        margin: "0",
        border: "0",
        background: "transparent",
        cursor: "pointer",
    }

    return (
        <Box sx={radiolabelcontsx} ref={(_ref) => { setAnchorEl(_ref) }}>
            <Editable textProps={{ variant: "body2", sx: radiolabelsx }} initialText={value} onChange={(text) => {_setValue(text); setValue(text)}} />
            <Box sx={closesx}>
                <CloseIcon sx={iconsx} onClick={removeThis} />
            </Box>
        </Box>
    )
}

function MultipleChoice({ reduced, editing, editProp, error, setResponse }) {
    const [title, _setTitle] = useState(reduced.qtitle ?? "");
    const [desc, _setDesc] = useState(reduced.qlabel ?? "");
    const [value, _setValue] = useState("");
    const [titleError, _setTitleError] = useState(false);
    const [inpError, _setInpError] = useState(false);
    const [options, _setOptions] = useState(reduced.qoptions ?? []);

    useEffect(() => {
        setInpError(error)
    }, [error])

    useEffect(() => {
        if (!reduced.qoptions.length) {
            addOption("Option 1")
        }
    }, [reduced.qoptions.length])

    useEffect(() => {
        if (editing) {
            _setTitle(reduced.qtitle)
            _setDesc(reduced.qlabel)
            _setOptions(reduced.qoptions)
        }
    }, [editing])

    const addOption = (option) => {
        const newOptions = [...options, option];
        editProp("qoptions", newOptions)
        _setOptions(newOptions)
    }

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        editProp("qoptions", newOptions)
        _setOptions(newOptions)
    }

    const changeOption = (index, option) => {
        const newOptions = [...reduced.qoptions]
        newOptions[index] = option
        console.log(newOptions)
        editProp("qoptions", newOptions)
        _setOptions(newOptions)
    }

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
        editProp("qlabel", event.target.value)
        _setDesc(event.target.value)
    }

    const setValue = (event) => {
        _setValue(event.target.value)
        validate(event.target.value)
        if (setResponse) setResponse(event.target.value)
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
        maxWidth: "430px",
    }
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

    const addsx = {
        fontSize: "16px",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "400",
        color: "rgba(0, 0, 0, 0.87)",
        lineHeight: "24px",
        letterSpacing: "0.15px",
        display: "flex",
        alignItems: "center",
        opacity: .3,
        cursor: "pointer",
        "&:hover": {
            opacity: .5,
            textDecoration: "underline",
        }
    }

    return (
        <Box sx={contsx}>
            {editing ? (
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
                        placeholder="Question Label"
                        sx={fieldsx}
                    />
                </React.Fragment>
            ) : <Typography sx={titlesx}>{String(reduced.qtitle + (reduced.qreq ? "*" : ""))}</Typography>}

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <FormControl
                    error={inpError}
                    helperText={inpError}
                >
                    {(editing || !reduced.qlabel || reduced.qlabel === "") ? null : <FormLabel>{reduced.qlabel}</FormLabel>}
                    <RadioGroup
                        value={value}
                        onChange={setValue}
                        aria-labelledby="multiple-choice"
                        name="multiple-choice-question"
                    >
                        {options.map((option, index) => {
                            const label = editing ? (
                                <EditableChoice
                                    initalValue={option}
                                    key={option + index}
                                    removeThis={() => { removeOption(index) }}
                                    setValue={(value) => { changeOption(index, value) }}
                                />
                            ) : option

                            return (
                                <FormControlLabel
                                    key={option + index}
                                    value={option}
                                    control={<Radio disabled={editing} />}
                                    label={label}
                                />
                            )
                        })}
                        {editing ? (
                            <FormControlLabel
                                value={"__new__"}
                                control={<Radio disabled={true} />}
                                label={<Typography sx={addsx} onClick={() => { addOption("Option " + (options.length + 1)) }}>Add option</Typography>}
                            />
                        ) : null}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

export default MultipleChoice;