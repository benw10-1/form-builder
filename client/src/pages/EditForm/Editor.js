import React, { useState, useRef, useEffect } from "react";
import { genProp, packProps, reduceProps } from "../../utils";
import Piece from "./Piece";
import {
    Button,
    Box,
    Paper,
    Typography,
    Skeleton,
} from "@mui/material";
import Add from "@mui/icons-material/Add"

function SideBar({ attachEl, isMob }) {
    if (!attachEl) return null
    if (attachEl.current) attachEl = attachEl.current
    const { height } = attachEl.getBoundingClientRect()
    const top = attachEl.offsetTop

    const sidebarsx = {
        position: "absolute",
        top: `${top - 10}px`,
        left: isMob ? "-5px" : "0",
        width: "5px",
        height: `${height - 10}px`,
        backgroundColor: "rgb(25, 118, 210)",
        zIndex: "1",
        transition: "all .25s ease-in",
    }

    console.log(height, top)

    return (
        <Box sx={sidebarsx} />
    )
}

function Toolbox({ addPiece, editing }) {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(false)
        const tm = setTimeout(() => {
            setExpanded(true)
        }, 100)

        return () => clearTimeout(tm)
    }, [editing])

    const toolboxsx = {
        display: "flex",
        minWidth: "250px",
        padding: "0 10px",
        height: expanded ? "40px" : "0",
        justifyContent: "center",
    }
    const buttonsx = {
        padding: "8px",
        margin: "0 8px",
    }

    const containersx = {
        height: expanded ? "62px" : "0",
        background: "#C4C4C433",
        transition: "height 0.3s ease-in",
        width: "100%",
        overflow: "hidden",
    }

    return (
        <Box sx={containersx}>
            <Box sx={{
                        fontSize: "12px",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        padding: "6px 0",
                    }}>
                <Paper sx={toolboxsx}>
                    <Button sx={buttonsx} startIcon={<Add />} variant="text" onClick={() => { addPiece(editing + 1, "question") }}>Add Question</Button>
                </Paper>
            </Box>
        </Box>
    )
}

function Editor({ pieces, form, handlers: { setPieces, setEditingEl } }) {
    const [editing, setEditing] = useState(null)
    const editingRef = useRef(editing)

    const removePiece = (index) => {
        if (index < 0 || index >= pieces.length) return
        const newPieces = [...pieces]
        newPieces.splice(index, 1)
        editPiece(null)
        setPieces(newPieces)
    }

    const addPiece = (index, type) => {
        const newPieces = [...pieces]
        index = (!index && index !== 0) ? pieces.length - 1 : index
        newPieces.splice(index, 0, {
            _type: type ?? "question",
            form_ref: form._id,
            props: [
                ...(type === "question" ? [genProp("qtype", "text")] : []),
            ]
        })
        editPiece(index)
        setPieces(newPieces)
    }

    const copyPiece = (index) => {
        const newPieces = [...pieces]
        newPieces.splice(index, 0, {
            ...pieces[index],
            _id: null,
        })
        editPiece(index + 1)
        setPieces(newPieces)
    }

    const changePiece = (index, props) => {
        const newPieces = pieces.map((piece, i) => {
            if (i !== index) return piece
            return {
                ...piece,
                props,
            }
        })
        setPieces(newPieces)
    }

    const editPiece = (index) => {
        if (index < 0 || index === null || index === undefined) {
            setEditingEl(null)
            editingRef.current = null
            setEditing(null)
            return
        }
        editingRef.current = index
        setEditing(index)
    }

    const editorsx = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }

    const toolBox = <Toolbox addPiece={addPiece} editing={editingRef.current} />

    return (
        <Box sx={editorsx} >
            {pieces.map((p, i) => {
                const _piece = (
                    <Piece
                        {...p}
                        setProps={(props) => { changePiece(i, props) }}
                        editThis={() => { if (i !== editing) editPiece(i); else editPiece(null) }}
                        removeThis={() => { removePiece(i) }}
                        copyThis={() => { copyPiece(i) }}
                        editingThis={i === editing}
                        index={i}
                        key={p._id ?? i}
                        setEditRef={(ref) => {
                            if (ref.current) ref = ref.current
                            setEditingEl(ref)
                        }}
                    />
                )

                return (
                    <React.Fragment >
                        {_piece}
                        {editing === i ? toolBox : null}
                    </React.Fragment>
                )
            })}
            {((!editing && editing !== 0) || editing >= pieces.length) ? toolBox : null}
        </Box>
    )
}

export { Editor, Toolbox, SideBar }

export default Editor;