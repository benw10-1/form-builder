import React, { useState, useEffect } from "react";
import { queries, mutations, Auth, dayTime } from "../../utils";
import {
    Container,
    CssBaseline,
    Paper,
    Typography,
    Box,
    Link,
    Avatar,
    Skeleton,
    Modal,
    TextField,
    Button,
    Divider,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Stack from '@mui/material/Stack';

import Signout from "../Signout";
import moment from "moment";
import "./Dashboard.css"

import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

function AllForms({ forms = [], modal }) {
    // main render logic
    const render = () => {
        let renderedForms = []

        const cardsx = {
            width: "280px",
            minHeight: "300px",
            height: "auto",
            "&:hover": { boxShadow: 15 },
            position: "relative",
            margin: "26px 51px 0 0"
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

        const copysx = {
            fontSize: "18px !important",
            margin: 0,
            textDecoration: "none",
            left: "110px",
            color: "#242424",
        }

        const poposx = {
            marginTop: "3px",
            left: {
                xs: "51px",
                md: "72px",
            },
            display: "flex", 
            alignItems: "center",
        }

        const buttonsx = {
            backgroundColor: "#FFF", 
            borderRadius: "0px",
            height: "30px",
            minWidth: "20px", 
            width: "30px", 
            padding: 0, 
            margin: 0, 
            display: "flex",
        }

        // maybe add form pages if forms exceed certain count
        forms.forEach(x => {
            const { _id, title, description, createdAt, published } = x
            const Rlink = `${window.location.origin}/respond/${_id}`
            const editclick = (event) => {
                window.location.assign(window.location.origin + "/alteditForm/" + _id)
            }
            const responsesclick = (event) => {
                window.location.assign(window.location.origin + "/responses/" + _id)
            }

            renderedForms.push((
                <Paper sx={{ ...cardsx, background: "#FFFFFF", padding: "16px 16px 0 16px" }}>

                    <Box h={"64px"} w={"248px"} sx={{ overflow: "hidden" }}>
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
                    <Box sx={{ width: "248px", height: "291px", display: "flex", justifyContent: "space-between", position: "absolute", top: "186px" }}>
                        <Typography className="created" variant="body1" sx={{ fontSize: "14px" }} h={"20px"} w={"100%"}>
                            {"Created " + moment(Number(createdAt)).format("LL")}
                        </Typography>
                        {published ? (
                            <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div className="popover-style">
                                        <Typography {...bindTrigger(popupState)} sx={{ ...hoversx, fontSize: "14px", color: "#4CAF50", textDecoration: "underline" }}>
                                            Published
                                        </Typography>
                                        <Popover className="pop" elevation={0} sx={poposx}
                                            anchorReference="anchorOrigin"
                                            anchorEl={ popupState }
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >                                            
                                            <Box 
                                                className="link-container" 
                                                sx={{ 
                                                    width: "270px", 
                                                    fontSize: "12px", 
                                                    backgroundColor: "transparent", 
                                                    display: "flex", 
                                                    alignItems: "center" 
                                                    }}
                                            >   
                                                <Button variant="contained" sx={{ ...hoversx, ...buttonsx}} onClick={() => {navigator.clipboard.writeText(Rlink)}}>
                                                    <ContentCopyIcon 
                                                        sx={copysx} 
                                                    />
                                                </Button>
                                                <input
                                                    style={{ backgroundColor: "#F0F0F0", padding: "5px", border: "none" }}
                                                    type="text"
                                                    value={Rlink}
                                                    disabled="true"
                                                />
                                                {/* <a 
                                                    className="copyLink" 
                                                    style={{ overflowWrap: 'break-word' }} 
                                                    href={Rlink}
                                                >
                                                    <Typography className="rLink">
                                                        {Rlink}
                                                    </Typography>
                                                </a> */}
                                            </Box>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>

                        ) : (
                            <Typography disabled sx={{ fontSize: "12px", color: "#949494" }}>
                                Unpublished
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ width: "100%", position: "absolute", bottom: "52px", right: "0px" }}>
                        <Divider variant="left" />
                    </Box>

                    <Box sx={{ width: "240px", height: "37px", display: "flex", justifyContent: "space-between", position: "absolute", bottom: "8px", left: "20px" }}>


                        <Button variant="outlined" onClick={editclick} >EDIT</Button>
                        <Button variant="outlined" onClick={responsesclick} color="success">RESPONSES</Button>

                    </Box>

                </Paper>
            ))
        })

        renderedForms.push((
            <Paper sx={{ ...cardsx, background: "#0000000A", ...centered }}>
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
        window.location.assign(window.location.origin + "/alteditform/" + newForm._id)
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
            minHeight: "100%",
            maxHeight: "100vh",
            overflow: "auto",
            borderRadius: "0",
            paddingBottom: "300px",
        }
        const boxsx = {
            padding: {
                xs: "36px 0 36px 4%",
                md: "118px 0 0 4%",
            },
            maxWidth: {
                xs: "500px",
                md: "275px",
            },
            maxHeight: {
                xs: "40%",

            },
            width: {
                xs: "100%",
                sm: "275",
                md: "275px",
            },
            height: "100%",
            display: "block",
            position: "relative",
            margin: {
                xs: "0 0 0 0",
                sm: "0 4% 0 0",
            },
        }
        const boxsx2 = {
            padding: {
                xs: "28px 0 0 64px",
                md: "10px 0 0 64px",
            },
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
                <Signout />

                {/* Dashboard Sidebar */}
                <Container maxWidth={false} disableGutters={true} >
                    <div className="dash-positioning">
                        <Box sx={boxsx}>
                            <Typography variant="h6" height={55} sx={fontsx}>
                                {(() => { return dayTime() + " " + Auth.getProfile()?.name ?? "User" })()}
                                <br />
                            </Typography>
                            <Typography variant="h4" width={73} height={24} sx={{ ...fontsx, marginTop: "34px", marginBottom: "16px", fontSize: "16px", fontWeight: "500" }} >
                                {'My Forms'}
                                <br />
                            </Typography>
                            <Typography variant="body1" width={216} height={84} sx={fontsx}>
                                {'Create a new form by clicking the plus sign on the dashboard.'}
                            </Typography>
                        </Box>
                        <Paper sx={papersx}>
                            <Box sx={boxsx2}>
                                <Typography variant="body1" height={20} sx={{ ...fontsx, fontSize: "12px", color: "rgba(0, 0, 0, 0.6)" }}>
                                    {(forms && forms.length > 0) ? 'Click on a form to edit or view responses.' : "No forms available, click on the + button below."}
                                </Typography>
                                {(() => {
                                    if (loading) {
                                        let arr = []
                                        for (let i = 0; i < 4; i++) {
                                            arr.push(<Skeleton variant="rectangular" sx={{ borderRadius: "5px", width: "280px", height: "136px", margin: "26px 51px 0 0" }} animation="wave" />)
                                        }
                                        return arr
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
