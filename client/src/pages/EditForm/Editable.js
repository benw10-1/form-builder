import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

function textMeasure() {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.fontSize = "inherit";
    el.style.fontFamily = "inherit";
    el.style.fontWeight = "inherit";
    el.style.letterSpacing = "inherit";
    el.style.height = "fit-content";
    document.body.appendChild(el);

    return (text, { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight }, maxWidth) => {
        el.style.fontFamily = fontFamily || "Roboto";
        el.style.fontSize = fontSize || "inherit";
        el.style.fontWeight = fontWeight || "inherit";
        el.style.lineHeight = lineHeight || "inherit";
        el.style.letterSpacing = letterSpacing || "inherit";
        if (maxWidth) {
            el.style.maxWidth = maxWidth + "px";
        }
        el.style.whiteSpace = maxWidth ? "normal" : "nowrap";
        el.innerHTML = text[text.length - 1] === " " ? text + "." : text;
        const { width, height } = el.getBoundingClientRect();
        return [width, height];
    }
}

const textDimensions = textMeasure();

function Editable({ initialText, textProps, onChange, maxLength=50 }) {
    const [editing, setEditing] = useState(false);
    const [value, _setValue] = useState(initialText);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const [el, setEl] = useState(null);
    const tmRef = useRef(null);
    const valRef = useRef(value);

    const setValue = (_value) => {
        _value = _value || ""
        console.log("setValue", _value)
        if (maxLength && _value.length > maxLength) {
            _value = _value.substring(0, maxLength);
        }
        if (_value.match(/\s\s/)) {
            _value = _value.replace(/\s\s/g, " ");
        }

        _setValue(_value);
        const [width, height] = textDimensions(_value, textProps.sx, maxWidth)
        setWidth(width);
        setHeight(height);

        valRef.current = _value;
    }

    const unedit = () => {
        const sanitized = (!valRef.current || valRef.current.trim() === "") ? "Empty" : valRef.current.trim();

        onChange(sanitized);
        clearTimeout(tmRef.current);
        tmRef.current = setTimeout(() => {
            setEditing(false);
        }, 50)
    }

    const windowClick = (event) => {
        if (event.target.id === "_editable") return;
        unedit()
    }

    const editableClick = (event) => {
        setEditing(true);
    }

    const keyHandler = (event) => {
        if (event.key === "Enter" || event.key === "Escape" || event.key === "Tab") {
            event.preventDefault();
            unedit()
        }
    }

    useEffect(() => {
        setValue(initialText);
    }, [initialText])

    useEffect(() => {
        if (editing) {
            document.addEventListener("click", windowClick);
        }
        else {
            document.removeEventListener("click", windowClick);
        }
        return () => {
            document.removeEventListener("click", windowClick);
        }
    }, [editing]);

    const containersx = {
        width: "100%",
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "fit-content",
    }

    const inputstyle = {
        padding: "0",
        margin: "0",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
        // color: "black",
        letterSpacing: "inherit",
        backgroundColor: "inherit",
        overflow: "hidden",
        ...textProps?.sx ?? {},
        border: "none",
        outline: "none",
        width: `${Math.min(maxWidth, width)}px`,
        resize: "none",
        textDecoration: "underline",
        display: "flex",
        flexDirection: "row",
        // alignItems: "center",
        height: `${height}px`,
        cursor: "text",
        transition: "none"
    }

    if (textProps) textProps.sx = {
        ...(textProps?.sx ?? {}),
        cursor: "text",
        "&:hover": {
            textDecoration: "underline",
        },
    }

    const ghostelsx = {
        width: "100%",
        position: "absolute",
    }

    return (
        <Box sx={containersx}>
            <Box id="_editable" onClick={editableClick} sx={{ width: "fit-content" }}>
                {editing ? (
                    <textarea
                        ref={(ref) => {
                            if (ref) {
                                setEl(ref);
                                if (ref.setSelectionRange) { 
                                    ref.focus(); 
                                    ref.setSelectionRange(value.length, value.length);
                                } else if (ref.createTextRange) { 
                                    let range = ref.createTextRange();  
                                    range.moveStart('character', value.length);
                                    range.select(); 
                                }
                            }
                        }}
                        style={inputstyle}
                        value={value}
                        onInput={(event) => {
                            setValue(event.target.value);
                        }}
                        onBlur={unedit}
                        onKeyDown={keyHandler}
                        autoFocus
                        id="_editable"
                        spellCheck="false"
                    />
                ) : <Typography id="_editable" {...textProps}>{value}</Typography>}
            </Box>
            <Box sx={ghostelsx} ref={(ref) => {
                if (ref) {
                    let subtracted = 0
                    if (el && el.offsetParent) {
                        const style = window.getComputedStyle(el.offsetParent);
                        subtracted = (el.offsetLeft ?? 0) + parseInt(style.paddingRight);
                    }

                    setMaxWidth(ref.offsetWidth - subtracted)
                }
            }} />
        </Box>
    )
}

export default Editable;