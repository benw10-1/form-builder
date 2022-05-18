import React, { useState, useEffect } from "react";
import { queries, mutations, Auth } from "../../utils"
import {
    Container,
    CssBaseline,
    Paper,
    Typography,
    Box,
    Card,
    Avatar
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import Signout from "../Signout";
import "./Dashboard.css"

function AllForms({ forms=[] }) {
    // main render logic
    const render = () => {
        let renderedForms = []

        const cardsx = {
            width: "280px",
            height: "136px",
            "&:hover": { boxShadow: 15, cursor: "pointer" },
            position: "relative",
            marginTop: "26px"
        }
        const centered = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
        const plussx = {
            width: "14px"
        }

        // maybe add form pages if forms exceed certain count
        forms.forEach(x => {
            const { _id, title } = x
            const onclick = (event) => {
                window.location.assign(window.location.origin + "/editForm/" + _id)
            }
            renderedForms.push((
                <Paper sx={{ ...cardsx, background: "#FFFFFF" }}>
                    <Box>
                    {title}
                    </Box>
                </Paper>
            ))
        })

        const addForm = async () => {
            // for now default values, but can pass stuff from in
            let newForm = (await mutations.createForm("Form example", "Some description")).result
            if (!newForm) {
                console.log("Something went wrong")
                return
            }
            window.location.assign(window.location.origin + "/editForm/" + newForm._id)
        }
        
        renderedForms.push((
            <Paper sx={{ ...cardsx, background: "#0000000A", ...centered }} onClick={addForm}>
                <Avatar variant={"circular"} size={"40px"} sx={{ padding: "13px" }}>
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
    let [loading, setLoading] = useState(true)
    let [forms, setForms] = useState([])

    // only run once
    // second argument is the array in which each element is checked. If there are changes to the array, it runs the effect
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login")
                return
            }
            let myForms = (await queries.getMyForms())?.result ?? []
            setForms(myForms)
            setLoading(false)
        }
        req()
    }, [])

    // main render logic
    const pageRender = () => {
        if (loading) return <div>Loading...</div>

        const fontsx = { fontFamily: "Roboto", fontStyle: "normal" }
        const papersx = {
            width: "100%",
            minHeight: "100%",
            overflow: "auto"
        }
        const boxsx = {
            padding: "118px 0 0 4%",
            maxWidth: "382px",
            height: "100%",
            display: "block",
            margin: "0 4% 0 0"
        }

        const body = (
            <React.Fragment>
                <CssBaseline />
                <Signout />
                <Container maxWidth={false} disableGutters={true} >
                    <div className="dash-positioning">
                        <div style={boxsx}>
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
                        </div>
                        <Paper sx={papersx}>
                            <Box p={"128px 64px 0 64px"}>
                                <Typography variant="body1" height={20} sx={{ ...fontsx, fontSize: "12px" }}>
                                    {(forms && forms.length > 0) ? 'Click on a form to edit or view responses.' : "No forms available, click on the + button below."}
                                </Typography>
                                <AllForms forms={forms} />
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
