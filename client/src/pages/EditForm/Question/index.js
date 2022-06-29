import React, { useState, useRef, useEffect } from "react";
import Text from "./Text";
import MultipleChoice from "./MultipleChoice";
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

function Question({ reduced, editing, editProp, setResponse, error }) {
    const [type, setType] = useState(reduced.qtype);

    let rendered
    const props = editing ? { reduced, editing, editProp, error } : { reduced, setResponse, error }

    if (type === "text") {
        rendered = <Text {...props} />
    }
    else if (type === "multilinetext") {
        rendered = <Text {...props} multiline />
    }
    else if (type === "multiplechoice") {
        rendered = <MultipleChoice {...props} />
    }
    else if (type === "multipleselect") {
        rendered = <MultipleChoice {...props} multiple />
    }

    const contsx = {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }

    if (!editing) return rendered

    return (
        <Box sx={contsx}>
            <Box sx={{ width: "65%" }}>
                {rendered}
            </Box>
            <Box sx={{ width: "30%", padding: "0", display: "flex", justifyContent: "center" }}>
                <FormControl fullWidth>
                    <InputLabel>Question Type</InputLabel>
                    <Select
                        value={type}
                        onChange={(event) => {
                            editProp("qtype", event.target.value)
                            setType(event.target.value)
                        }}
                        label="Question Type"
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="multiplechoice">Multiple Choice</MenuItem>
                        <MenuItem value="multipleselect">Multiple Select</MenuItem>
                        <MenuItem value="multilinetext">Multiline Text</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Question;