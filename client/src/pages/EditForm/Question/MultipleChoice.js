import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormGroup,
    FormHelperText
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Editable from "../Editable";

function EditableChoice({ removeThis, initalValue, setValue }) {
    const [value, _setValue] = useState(initalValue);
    const [anchorEl, _setAnchorEl] = useState(null);
    const [height, _setHeight] = useState(0);

    const setAnchorEl = (ref) => {
        if (ref) {
            _setAnchorEl(ref);
            _setHeight(ref.offsetTop);
        }
    }

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
        top: `${height}px`,
        display: anchorEl ? "block" : "none",
        right: "0",
        width: "24px",
        height: "24px",
        padding: "0",
        margin: "0",
        border: "0",
        background: "transparent",
        cursor: "pointer",
        zIndex: "2",
    }

    return (
        <Box sx={radiolabelcontsx} ref={(_ref) => { if (_ref) setAnchorEl(_ref) }}>
            <Editable textProps={{ variant: "body2", sx: radiolabelsx }} initialText={value} onChange={(text) => { _setValue(text); setValue(text) }} maxLength={75} />
            <Box sx={closesx}>
                <CloseIcon sx={iconsx} onClick={removeThis} />
            </Box>
        </Box>
    )
}

function MultipleChoice({ reduced, editing, editProp, error, setResponse, multiple }) {
    const [title, _setTitle] = useState(reduced.qtitle ?? "");
    const [desc, _setDesc] = useState(reduced.qlabel ?? "");
    const [value, _setValue] = useState("");
    const [titleError, _setTitleError] = useState(false);
    const [inpError, _setInpError] = useState(false);
    const [options, _setOptions] = useState(reduced.qoptions ?? []);
    const [checkedArray, _setCheckedArray] = useState(reduced.qoptions.map(() => false));

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
        const resolved = event?.target?.value ?? event
        _setValue(resolved)
        validate(resolved)
        if (setResponse) setResponse(resolved)
    }

    const setInpError = (error) => {
        _setInpError(error)
    }

    const validate = (val) => {
        console.log(val)
        if (reduced.qreq && (!val || val === "")) {
            setInpError("Required")
            return false
        }
        setInpError(false)
        return true
    }

    const setChecked = (index, state) => {
        const newCheckedArray = [...checkedArray]
        newCheckedArray[index] = state
        _setCheckedArray(newCheckedArray)
        const joined = newCheckedArray.reduce((acc, val, i) => {
            if (val) {
                if (acc) {
                    return acc + "__sep__" + options[i]
                }
                else {
                    return options[i]
                }
            }
            return acc
        }, undefined)
        setValue(joined)
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

    const optionsjsx = (
        <React.Fragment>
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
                        control={multiple ? <Checkbox disabled={editing} checked={checkedArray[index]} onChange={(event) => {setChecked(index, event.target.checked)}} /> : <Radio disabled={editing} />}
                        label={label}
                    />
                )
            })}
            {editing ? (
                <FormControlLabel
                    value={"__new__"}
                    control={multiple ? <Checkbox disabled={true} /> : <Radio disabled={true} />}
                    label={<Typography sx={addsx} onClick={() => { addOption("Option " + (options.length + 1)) }}>Add option</Typography>}
                />
            ) : null}
        </React.Fragment>
    )

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
            ) : <Typography sx={titlesx}>{String(reduced.qtitle + (reduced.qreq ? " *" : ""))}</Typography>}

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <FormControl
                    error={inpError ? true : false}
                    sx={{
                        position: "static",
                        "& .MuiFormHelperText-root": {
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            margin: "5px 0 0",
                            transform: "translateY(100%)",
                        }
                    }}
                >
                    {(editing || !reduced.qlabel || reduced.qlabel === "") ? null : <FormLabel>{reduced.qlabel}</FormLabel>}
                    {multiple ? (
                        <FormGroup>{optionsjsx}</FormGroup>
                    ) : (
                        <RadioGroup
                            value={value}
                            onChange={setValue}
                            aria-labelledby="multiple-choice"
                            name="multiple-choice-question"
                        >
                            {optionsjsx}
                        </RadioGroup>
                    )}
                    {inpError ? <FormHelperText>{inpError}</FormHelperText> : null}
                </FormControl>
            </Box>
        </Box >
    )
}

export default MultipleChoice;