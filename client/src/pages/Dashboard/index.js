import React, { useState, useEffect } from "react";
import { queries, mutations, Auth } from "../../utils"
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
    Button
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import Signout from "../Signout";
import moment from "moment";
import "./Dashboard.css"

function AllForms({ forms=[], modal }) {
    // main render logic
    const render = () => {
        let renderedForms = []
        
        const cardsx = {
            width: "280px",
            height: "136px",
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

        // maybe add form pages if forms exceed certain count
        forms.forEach(x => {
            const { _id, title, description, createdAt, published } = x
            const editclick = (event) => {
                window.location.assign(window.location.origin + "/editForm/" + _id)
            }
            const prevclick = (event) => {
                window.location.assign(window.location.origin + "/preview/" + _id)
            }
            renderedForms.push((
                <Paper sx={{ ...cardsx, background: "#FFFFFF", padding: "16px 16px 0 16px" }}>
                    {published ? (
                        <Typography sx={{ fontSize: "12px", color: "#4CAF50", position: "absolute", right: "16px", top: "17px" }}>
                            Published
                        </Typography>
                    ) : null}
                    <Box h={"64px"} w={"248px"} onClick={editclick} sx={{ ...hoversx, overflow: "hidden" }}>
                        <Typography variant="h4" sx={{ margin: "0 0 4px 0", fontSize: "24px" }}>
                            {title}
                        </Typography>
                        {(() => {
                            if (description) return (
                                <Typography variant="body1" sx={{ fontSize: "14px" }}>
                                    {description}
                                </Typography>
                            )
                        })()}
                    </Box>
                    <Box sx={{ width: "248px", display: "flex", justifyContent: "space-between", position: "absolute", bottom: "13px" }}>
                        <Typography variant="body1" sx={{ fontSize: "14px" }} h={"20px"} w={"100%"}>
                            {"Created " + moment(Number(createdAt)).format("LL")}
                        </Typography>
                        <Link onClick={prevclick} sx={hoversx}>Preview</Link>
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
        window.location.assign(window.location.origin + "/editForm/" + newForm._id)
    }

    // main render logic
    const pageRender = () => {

        const fontsx = { fontFamily: "Roboto", fontStyle: "normal" }
        const papersx = {
            width: "100%",
            minHeight: "100%",
            overflow: "auto",
            borderRadius: "0"
        }
        const boxsx = {
            padding: "118px 0 0 4%",
            maxWidth: "382px",
            height: "100%",
            display: "block",
            margin: "0 4% 0 0"
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
            "&:focus" : {
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
                        <Button width={"42px"} variant={"contained"} onClick={addForm} sx={{ margin: "25px 0 0 0"}} >Create Form</Button>
                    </Box>
                </Modal>
                <Signout />
                <Container maxWidth={false} disableGutters={true} >
                    <div className="dash-positioning">
                        <Box sx={boxsx}>
                            <Typography variant="h6" height={42} sx={fontsx}>
                                {(() => {return "Evening " + Auth.getProfile()?.name ?? "User"})()}
                                <br />
                            </Typography>
                            <Typography variant="h4" width={73} height={24} sx={{ ...fontsx, marginTop: "34px", marginBottom: "16px", fontSize: "16px", fontWeight: "500" }} >
                                {'My Forms'}
                                <br />
                            </Typography>
                            <Typography variant="body1" width={216} height={48} sx={fontsx}>
                                {'Create a new form by clicking the plus on the right side.'}
                            </Typography>
                        </Box>
                        <Paper sx={papersx}>
                            <Box p={"128px 0 0 64px"}>
                                <Typography variant="body1" height={20} sx={{ ...fontsx, fontSize: "12px", color: "rgba(0, 0, 0, 0.6)" }}>
                                    {(forms && forms.length > 0) ? 'Click on a form to edit or view responses.' : "No forms available, click on the + button below."}
                                </Typography>
                                {(() => {
                                    if (loading) {
                                        let arr = []
                                        for (let i=0; i < 4; i++) {
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
