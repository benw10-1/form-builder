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
    if (type === "text") {
        if (editing) rendered = <Text reduced={reduced} editing={editing} editProp={editProp} error={error} />
        else rendered = <Text reduced={reduced} setResponse={setResponse} error={error} />
    }
    else if (type === "multiplechoice") {
        if (editing) rendered = <MultipleChoice reduced={reduced} editing={editing} editProp={editProp} error={error} />
        else rendered = <MultipleChoice reduced={reduced} setResponse={setResponse} error={error} />
    }
    else if (type === "multipleselect") {
        if (editing) rendered = <MultipleChoice reduced={reduced} editing={editing} editProp={editProp} error={error} multiple={true} />
        else rendered = <MultipleChoice reduced={reduced} setResponse={setResponse} error={error} multiple={true} />
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
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Question;