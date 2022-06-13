import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Typography,
} from "@mui/material";

function textMeasure() {
    const el = document.createElement("span");
    el.style.position = "absolute";
    el.style.top = "-9999px";
    el.style.left = "-9999px";
    el.style.fontSize = "inherit";
    el.style.fontFamily = "inherit";
    el.style.fontWeight = "inherit";
    el.style.letterSpacing = "inherit";
    el.style.whiteSpace = "nowrap";
    document.body.appendChild(el);

    return (text, { fontFamily, fontSize, fontWeight, letterSpacing }) => {
        el.style.fontFamily = fontFamily || "Roboto";
        el.style.fontSize = fontSize || "inherit";
        el.style.fontWeight = fontWeight || "inherit";
        el.style.letterSpacing = letterSpacing || "inherit";
        el.innerHTML = text + "."
        return el.offsetWidth;
    }
}

const totalWidth = textMeasure();

function Editable({ initialText, textProps, onChange }) {
    const [editing, setEditing] = useState(false);
    const [value, _setValue] = useState(initialText ?? "");
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [el, setEl] = useState(null);
    const tmRef = useRef(null);
    const valRef = useRef(value);

    const setValue = (_value) => {
        _value = _value || ""
        _setValue(_value);
        setWidth(totalWidth(_value, textProps.sx));

        valRef.current = _value;
    }

    const unedit = () => {
        console.log(valRef.current)
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
        ...textProps?.sx ?? {},
        border: "none",
        outline: "none",
        width: `${width}px`,
        resize: "none",
        textDecoration: "underline",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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

    return (
        <Box sx={containersx}>
            <Box id="_editable" onClick={editableClick}>
                {editing ? (
                    <input
                        ref={setEl}
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
                ) : <Typography ref={(ref) => {
                    if (ref) {
                        setWidth(ref.offsetWidth ?? 0)
                        setHeight(ref.offsetHeight ?? 0)
                    };
                }} id="_editable" {...textProps}>{value}</Typography>}
            </Box>
        </Box>
    )
}

export default Editable;