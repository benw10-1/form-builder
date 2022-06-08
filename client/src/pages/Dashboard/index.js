import React, { useState, useEffect, useRef } from "react";
import { queries, mutations, Auth, dayTime } from "../../utils";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Signout from "../Signout";
import moment from "moment";
import "./Dashboard.css"

import Popover from '@mui/material/Popover';

//send to small device touchscreen version if screen less than minW wide or they are using touchscreen
const minW = 900;
let touch = { a: false };
function touchDetect(t) { t.a = true; }
window.addEventListener('touchstart', () => { touchDetect(touch) });

function FormCard({ form: { _id, title, description, createdAt, published } }) {
    const [open, setOpen] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    const closeHandle = (event) => {
        console.log("close", openPop)
        setOpenPop(false);
    }
    const [publ, setPubl] = useState(published)
    const openRef = useRef(open);
    const copyRef = useRef(false);

    const cardsx = {
        width: "280px",
        // minHeight: "300px",
        height: open ? "240px" : "200px",
        display: "flex",
        "&:hover": { boxShadow: 15 },
        margin: {
            xs: "26px 25px 0",
            md: "26px 50px 0 0",
        },
        transition: "all 0.3s ease-in",
    }
    const hoversx = {
        "&:hover": { cursor: "pointer" }
    }

    const copysx = {
        fontSize: "18px !important",
        margin: 0,
        textDecoration: "none",
        left: "110px",
        color: "#242424",
        "&:hover": { color: "#0288D1" },
        transition: "color 0.15s ease-in"
    }

    const poposx = {
        display: "flex",
        alignItems: "center",
        transition: "height 0.3s ease-in",
        width: "100%",
        overflow: "hidden",
    }

    const buttonsx = {
        backgroundColor: "#FFF",
        borderRadius: "0px",
        height: "30px",
        minWidth: "20px",
        width: "30px",
        padding: 0,
        margin: 0,
        display: "grid",
        placeItems: "center",
    }

    const Rlink = `${window.location.origin}/respond/${_id}`
    const editclick = (event) => {
        if (window.innerWidth < minW || touch.a == true) {
            window.location.assign(window.location.origin + "/alteditformmob/" + _id)
        } else {
            window.location.assign(window.location.origin + "/alteditform/" + _id)
        }
    }
    const responsesclick = (event) => {
        window.location.assign(window.location.origin + "/responses/" + _id)
    }

    const collapse = () => {
        setOpen(!openRef.current);
        openRef.current = !openRef.current;
    }

    useEffect(() => {
        if (copyRef.current) {
            copyRef.current.addEventListener("click", () => {
                navigator?.clipboard.writeText(Rlink)
                setOpenPop(true);
            })
        }
    }, [copyRef.current])

    return (
        <Paper sx={{ ...cardsx, background: "#FFFFFF", padding: "16px 16px 0", display: "flex", flexDirection: "column" }}>
            <Box sx={{ overflow: "hidden", height: "84px", paddingBottom: "12px", width: "100%", textOverflow: "ellipsis" }}>
                <Typography variant="h4" sx={{ margin: "0 0 4px 0", fontSize: "24px" }}>
                    {title}
                </Typography>
                {(() => {
                    if (description) return (
                        <Typography className="description" variant="body1" sx={{ fontSize: "14px" }}>
                            {description}
                        </Typography>
                    )
                })()}
            </Box>
            <Box sx={{ width: "100%", minHeight: "38px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography className="created" variant="body1" sx={{ fontSize: "14px", whiteSpace: "nowrap" }} h={"20px"}>
                    {"Created " + moment(Number(createdAt)).format("LL")}
                </Typography>
                {publ ? (
                    <Typography onClick={collapse} sx={{ ...hoversx, fontSize: "14px", color: "#4CAF50", textDecoration: "underline", userSelect: "none" }}>
                        Published
                    </Typography>
                ) : (
                    <Typography disabled sx={{ fontSize: "12px", color: "#949494" }}>
                        Unpublished
                    </Typography>
                )}
            </Box>
            <Box sx={{ ...poposx, ...(open ? { height: "40px" } : { height: "0" }) }}>
                <Box
                    className="link-container"
                    sx={{
                        fontSize: "12px",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        padding: "6px 0",
                    }}
                >
                    <Box
                        sx={{ ...hoversx, ...buttonsx, background: "transparent", height: "100%", userSelect: "none" }}
                        ref={copyRef}
                    >
                        <ContentCopyIcon
                            sx={copysx}
                        />
                        <Popover
                            anchorEl={copyRef.current}
                            open={openPop}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            onClose={closeHandle}
                        >
                            <Box sx={{ width: "80px", display: "grid", placeItems: "center", height: "1.5rem", userSelect: "none" }} onClick={closeHandle}>
                                Copied!
                            </Box>
                        </Popover>
                    </Box>
                    <input
                        style={{ backgroundColor: "#F0F0F0", padding: "5px", border: "none", height: "100%" }}
                        type="text"
                        value={Rlink}
                        disabled="true"
                    />
                </Box>
            </Box>

            <Divider variant="center" />

            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Box sx={{ height: "62px", display: "grid", placeItems: "center" }}>
                    <Box sx={{ width: "240px", display: "flex", justifyContent: "space-between" }}>
                        {publ ? <Button variant="outlined" onClick={async () => {
                            let obj = await mutations.setPublished(_id, false); 
                            if (obj.__status__ !== "error") setPubl(false)
                        }}>UNPUBLISH</Button> : <Button variant="outlined" onClick={editclick}>EDIT</Button>}
                        <Button variant="outlined" onClick={responsesclick} color="success">RESPONSES</Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

function AllForms({ forms = [], modal }) {
    // main render logic
    const render = () => {
        let renderedForms = []

        const cardsx = {
            width: "280px",
            // minHeight: "300px",
            height: "auto",
            display: "flex",
            "&:hover": { boxShadow: 15 },
            margin: {
                xs: "26px 25px 0",
                md: "26px 50px 0 0",
            }
        }
        const centered = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
        const plussx = {
            width: "14px"
        }
        const hoversx = {
            "&:hover": { cursor: "pointer" }
        }

        // maybe add form pages if forms exceed certain count
        forms.forEach(x => {
            renderedForms.push(<FormCard form={x} />)
        })

        renderedForms.push((
            <Paper sx={{ ...cardsx, background: "#0000000A", ...centered, height: "200px" }}>
                <Avatar variant={"circular"} size={"40px"} sx={{ padding: "13px", ...hoversx }} onClick={modal}>
                    <AddIcon sx={plussx} fontSize={"medium"} />
                </Avatar>
            </Paper>
        ))

        return (
            <div className="forms-container">
                {renderedForms}
            </div>
        )
    }

    return render()
}

function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [forms, setForms] = useState([])

    const [formName, setFormName] = useState("")
    const [formDesc, setFormDesc] = useState("")
    const [reload, setReload] = useState(false)
    // const [inputValue, setInputValue] = useState("")

    const reloadPage = () => {
        setLoading(true)
        setReload(!reload)
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    // only run once
    // second argument is the array in which each element is checked. If there are changes to the array, it runs the effect
    useEffect(() => {
        const req = async () => {
            let loggedIn = Auth.loggedIn()
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login")
                return
            }
            let myForms = (await queries.getMyForms())?.result ?? []
            // fake loading to see effect
            setTimeout(() => {
                setForms(myForms)
                setLoading(false)
            }, 250)
        }
        req()
    }, [reload])

    const handleNameChange = (event) => {
        setFormName(event.target.value)
    }

    const handleDescChange = (event) => {
        setFormDesc(event.target.value)
    }

    const addForm = async () => {
        // for now default values, but can pass stuff from in
        let newForm = (await mutations.createForm(formName, formDesc))?.result
        if (!newForm) {
            console.log("Something went wrong")
            return
        }
        handleClose()
        reloadPage()
        if (window.innerWidth < minW || touch.a == true) {
            window.location.assign(window.location.origin + "/alteditformmob/" + newForm._id)
        } else {
            window.location.assign(window.location.origin + "/alteditform/" + newForm._id)
        }
    }

    // main render logic
    const pageRender = () => {

        const fontsx = {
            fontFamily: "Roboto",
            fontStyle: "normal",
            width: "100%"
        }
        const papersx = {
            width: "100%",
            height: "100%",
            overflow: "auto",
            borderRadius: "0",
            // paddingBottom: "300px",
        }
        const boxsx = {
            padding: {
                xs: "36px 0 36px 4%",
                md: "118px 0 0 4%",
            },
            maxWidth: "320px",

            height: "fit-content",
            width: {
                xs: "100%",
                sm: "275",
                md: "275px",
            },
            display: "block",
            position: "relative",
            margin: {
                xs: "0 0 0 0",
                sm: "0 4% 0 0",
            },
        }
        const boxsx2 = {
            padding: {
                xs: "0",
                md: "0 0 0 64px",
            },
            margin: { md: "128px 0 0 0", xs: "64px 0 0 0" },
            display: {
                xs: "flex",
            },
            width: {
                xs: "100%",
            },
            flexDirection: "column",
        }
        const modalsx = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#FFFFFF',
            boxShadow: 24,
            padding: "25px 20px",
            border: 0,
            "&:focus": {
                outline: "none"
            }
        }

        const body = (
            <React.Fragment>
                <CssBaseline />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="create-a-form"
                    aria-describedby="modal-for-creating-form"
                >
                    <Box sx={modalsx}>
                        <Typography variant="h6" component="h2">
                            Create a new form
                        </Typography>
                        <TextField onChange={handleNameChange} value={formName} label="Title" variant="standard" fullWidth={false} sx={{ margin: "5px 0 10px 0" }}></TextField>
                        <TextField onChange={handleDescChange} value={formDesc} label="Short description" variant="standard" fullWidth={true}></TextField>
                        <Button width={"42px"} variant={"contained"} onClick={addForm} sx={{ margin: "25px 0 0 0" }} >Create Form</Button>
                    </Box>
                </Modal>
                <Signout sx={{ right: { xs: "40px" } }} />

                {/* Dashboard Sidebar */}
                <Container maxWidth={false} disableGutters={true} >
                    <div className="dash-positioning">
                        <Box sx={boxsx}>
                            <Typography variant="h6" sx={fontsx}>
                                {(() => { return dayTime() + " " + Auth.getProfile()?.name ?? "User" })()}
                                <br />
                            </Typography>
                            <Typography variant="h4" width={73} height={24} sx={{ ...fontsx, marginTop: "34px", marginBottom: "16px", fontSize: "16px", fontWeight: "500" }} >
                                {'My Forms'}
                                <br />
                            </Typography>
                            <Typography variant="body1" width={216} sx={fontsx}>
                                {'Create a new form by clicking the plus sign on the dashboard.'}
                            </Typography>
                        </Box>
                        <Paper sx={papersx}>
                            <Box sx={boxsx2}>
                                <Typography variant="body1" height={20} sx={{ ...fontsx, fontSize: "12px", color: "rgba(0, 0, 0, 0.6)", display: { xs: "flex" }, justifyContent: { xs: "center", md: "start" } }}>
                                    {(forms && forms.length > 0) ? 'Click on a form to edit or view responses.' : "No forms available, click on the + button below."}
                                </Typography>
                                {(() => {
                                    if (loading) {
                                        let arr = []
                                        for (let i = 0; i < 4; i++) {
                                            arr.push(<Skeleton variant="rectangular" sx={{ borderRadius: "5px", width: "280px", height: "136px", margin: "26px 51px 0 0" }} animation="wave" />)
                                        }
                                        return <div className="forms-container">{arr}</div>
                                    }
                                    return <AllForms forms={forms} modal={handleOpen} />
                                })()}
                            </Box>
                        </Paper>
                    </div>
                </Container>
            </React.Fragment>
        )
        return body
    }

    return (
        <main className="dashboard">
            {pageRender()}
        </main>
    );
}

export default Dashboard;
