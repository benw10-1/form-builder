import React, { useState, useEffect, useRef } from "react";
import { PaperCenter } from '../Layouts';
import { useParams } from "react-router-dom";
import { mutations, queries, Auth, dayTime } from "../../utils";
import Editor, { SideBar } from "./editor";
import {
    Button,
    Box,
    Popover,
    Paper,
    Typography,
    Skeleton,
    Divider,
} from "@mui/material";

function Confirm({ onResponse = () => { }, message, anchorEl, _open }) {
    const [open, setOpen] = useState(false);

    const close = () => {
        onResponse(false);
        setOpen(false);
    };

    useEffect(() => {
        if (_open !== open) setOpen(_open) 
    }, [_open])

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <Paper sx={{ width: "200px", padding: "10px .5rem 0" }}>
                <Typography variant="body1" sx={{ marginBottom: "6px" }}>{message}</Typography>
                <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
                    <Button onClick={() => {
                        setOpen(false);
                        onResponse(true);
                    }} color="success" >Confirm</Button>
                    <Button onClick={close} color="error">Cancel</Button>
                </Box>
            </Paper>
        </Popover>
    )
}

function checkSaved(pieces, old) {
    if (pieces.length !== old.length) return false
    for (let i = 0; i < pieces.length; i++) {
        const [piece, oldPiece] = [pieces[i], old[i]]
        if (piece._type !== oldPiece._type) return false
        if (piece.props.every((prop, i) => prop.key === "response" || (prop?.key === oldPiece?.props?.[i]?.key && prop?.value === oldPiece?.props?.[i]?.value))) continue
        return false
    }
    return true
}

function EditForm() {
    const { id } = useParams();
    const isMob = window.innerWidth < 900
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [pieces, _setPieces] = useState([]);
    const [confirmProps, setConfirmProps] = useState({});
    const [saved, setSaved] = useState(true);
    const [rerender, setRerender] = useState(false)
    const [editingEl, setEditingEl] = useState(null);

    const pieceRef = useRef(pieces);

    const resizer = (event) => {
        setRerender(Math.random() * 100)
    }

    const setPieces = (pieces) => {
        setSaved(checkSaved(pieces, pieceRef.current))
        pieceRef.current = pieces;
        _setPieces(pieces);
    };

    const savePieces = async () => {
        const pruned = pieces.map(piece => {
            return {
                ...piece,
                props: piece.props.filter(prop => !prop.value.match("response"))
            }
        })
        const res = await mutations.updateFormPieces(id, pruned);
        if (!res || res.errors) return

        const mapped = pieces.map((p, i) => {
            return {
                ...p,
                _id: res.result[i]
            }
        })
        setPieces(mapped);
        setSaved(true);
    };

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
        queries.getFormByID(id).then(async form => {
            if (form?.result && form.result.published) {
                window.location.replace(window.location.origin + "/respond/" + id);
                return;
            }
            setForm(form?.result ?? {});
            setPieces((await queries.getPiecesByID(id))?.result ?? []);
            setLoading(false);
            setSaved(true);
        });
    }, []);

    const fontsx = {
        fontFamily: 'Roboto',
        fontStyle: "normal",
    }

    const left = (
        <React.Fragment>
            <Typography variant="h6" height={55} sx={fontsx}>
                {(() => { return dayTime() + " " + Auth.getProfile()?.name ?? "User" })()}
            </Typography>
            <Typography variant="h5" height={24} sx={{ ...fontsx, marginTop: { md: "28px", xs: "14px" }, marginBottom: "16px", fontSize: "16px", fontWeight: "500" }} >
                {form.title}
            </Typography>
            <Typography variant="body1" height={48} sx={fontsx}>
                {'Edit your form by clicking on the toolbar icons.'}
            </Typography>
        </React.Fragment>
    )

    const titlesx = {
        width: "100%",
        paddingBottom: "24px",
    }

    const paperheader = (
        <Box sx={titlesx}>
            <Typography variant="h4" marginBottom={"6px"} >
                {form.title ?? "Form"}
            </Typography>
            {true ? <Typography variant="body1" >{form.description ?? "Some description"}</Typography> : null}
        </Box>
    )

    const paperbody = loading ? (<Skeleton />) : <Editor pieces={pieces} form={form} handlers={{ setPieces, setEditingEl }} />

    const butcontsx = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    }
    const buttonsx = {
        width: "100%",
        minHeight: "42px",
        padding: ".35rem",
        marginBottom: "16px",
    }

    const buttonObj = {
        publish: (<Button variant="outlined" sx={buttonsx} onClick={async () => {
            const save = await savePieces();
            const res = await mutations.setPublished(id, true);
            if (!res || res.errors) {
                return
            }
            else {
                window.location.assign(window.location.origin + "/dashboard");
            }
        }}>publish</Button>),
        clearForm: (<Button variant="contained" sx={buttonsx} onClick={async (event) => {
            const onResponse = (response) => {
                if (response) {
                    setPieces([]);
                }
                setConfirmProps({
                    message: "Are you sure you want to clear the form?",
                    anchorEl: event.currentTarget,
                    _open: false,
                })
            }

            setConfirmProps({
                message: "Are you sure you want to clear this form?",
                onResponse,
                anchorEl: event.currentTarget,
                _open: true,
            })
        }}>clear form</Button>),
        saveForm: (<Button variant="contained" disabled={saved} sx={buttonsx} onClick={async () => {
            await savePieces();
        }}>save form</Button>),
        deleteForm: (<Button color="warning" variant="text" sx={{ ...buttonsx, marginBottom: 0 }} onClick={async (event) => {
            const onResponse = async (response) => {
                if (response) {
                    const { __status__ } = await mutations.deleteForm(id);
                    if (__status__ !== "error") {
                        window.location.assign(window.location.origin + "/dashboard");
                        return
                    }
                }
                setConfirmProps({
                    message: "Are you sure you want to delete this form?",
                    onResponse,
                    anchorEl: event.currentTarget,
                    _open: false,
                })
            }

            setConfirmProps({
                message: "Are you sure you want to delete this form?",
                onResponse,
                anchorEl: event.currentTarget,
                _open: true,
            })
        }} >delete form</Button>),
        preview: (<Button color="secondary" variant="outlined" sx={buttonsx} onClick={() => {
            window.location.assign(window.location.origin + "/preview/" + id);
        }}>preview</Button>),
        dashboard: (<Button color="secondary" variant="outlined" sx={buttonsx} onClick={() => {
            window.location.assign(window.location.origin + "/dashboard");
        }}>dashboard</Button>),
        viewResponses: (<Button color="secondary" variant="outlined" sx={buttonsx} onClick={() => {
            window.location.assign(window.location.origin + "/responses/" + id);
        }}>view responses</Button>),
    }

    const buttons = (
        <Box sx={butcontsx}>
            <Box sx={{ marginBottom: isMob ? "50px" : 0 }}>
                {buttonObj.saveForm}
                {buttonObj.publish}
                {buttonObj.clearForm}
            </Box>
            {isMob ? null : <Divider flexItem={true} sx={{ margin: "9px 0", width: "100%" }} />}
            <Box sx={{ marginTop: isMob ? 0 : "16px" }}>
                {buttonObj.dashboard}
                {buttonObj.preview}
                {buttonObj.viewResponses}
                {buttonObj.deleteForm}
            </Box>
            <Confirm {...confirmProps} />
        </Box>
    )

    return (
        <PaperCenter left={left} paper={[paperheader, paperbody]} buttons={buttons} >
            <SideBar attachEl={editingEl} />
        </PaperCenter>
    )
}

export default EditForm;