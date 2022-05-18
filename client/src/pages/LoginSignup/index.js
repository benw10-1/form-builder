import React, { useState, useEffect } from "react";
import { mutations, Auth } from "../../utils"
import {
    Container,
    CssBaseline,
    TextField,
    Card,
    Typography,
    CardContent,
    Skeleton,
    Button,
    Box
} from "@mui/material"
import "./Login.css"

// destructure props
function Login({ handlers: { login: [loginVal, handleLoginChange], pass: [passVal, handlePassChange], handleSubmit, other } }) {
    return (
        <React.Fragment>
            <Box m={"0 0 30px 0"}>
                <TextField id="input-user" label="Username or email" variant="standard" onChange={handleLoginChange} value={loginVal} fullWidth={true} />
            </Box>
            <Box m={"0 0 42.5px 0"}>
                <TextField id="input-pass" label="Password" variant="standard" type="password" onChange={handlePassChange} value={passVal} fullWidth={true} />
            </Box>
            <div className="button-block">
                <div className="button-cont">
                    <Button onClick={other} variant="outlined" width={105} height={32}>Signup</Button>
                    <Button onClick={handleSubmit} variant="contained" width={89} height={32}>Login</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

// destructure props
function Signup({ handlers: { login: [loginVal, handleLoginChange], email: [emailVal, handleEmailChange], pass: [passVal, handlePassChange], handleSubmit, other } }) {
    return (
        <React.Fragment>
            <Box m={"10px 0 20px 0"}>
                <TextField id="input-user" label="Username" variant="standard" onChange={handleLoginChange} value={loginVal} fullWidth={true} />
            </Box>
            <Box m={"0 0 20px 0"}>
                <TextField id="input-email" label="Email" variant="standard" onChange={handleEmailChange} value={emailVal} fullWidth={true} />
            </Box>
            <Box m={"0 0 40px 0"}>
                <TextField id="input-pass" label="Password" variant="standard" type="password" onChange={handlePassChange} value={passVal} fullWidth={true} />
            </Box>
            <div className="button-block">
                <div className="button-cont">
                    <Button onClick={other} variant="outlined" width={89} height={42}>Login</Button>
                    <Button onClick={handleSubmit} variant="contained" width={105} height={42}>Signup</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

function LoginSignup({ switchState }) {
    // regex matching the correct password
    const allowed = {
        login: /[\w\d!@#$%&.-]+/,
        password: /[^\s[\]'"\\./()`~<>;:-]+/
    }

    let [loading, setLoading] = useState(true)
    // false is login, true is signup
    let [_switch, setSwitch] = useState(switchState)
    // states that set the values for the inputs
    let [loginVal, setLoginVal] = useState("")
    let [emailVal, setEmailVal] = useState("")
    let [passVal, setPassVal] = useState("")

    // fake loading sequence
    const other = () => {
        setLoading(true)
        // reset password but keep username
        setPassVal("")
        const new_path = _switch ? "login" : "signup"
        // set url withoput reloading
        window.history.pushState('data', new_path, "/" + new_path);
        setTimeout(() => {
            setSwitch(!_switch)
            setLoading(false)
        }, 1000)
    }

    // same logic as Dashboard.js
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (loggedIn) window.location.replace(window.location.origin + "/dashboard")
            else setLoading(false)
        }
        req()
    }, [])

    // on login edit
    const handleLoginChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.login)
        // if no match, returns null
        // set login value state causing rerender
        setLoginVal(match ? match[0] : "")
    }

    const handleEmailChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.login)
        // if no match, returns null
        // set login value state causing rerender
        setEmailVal(match ? match[0] : "")
    }

    // on password edit
    const handlePassChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.password)
        // if no match, returns null
        // set password value state causing rerender
        setPassVal(match ? match[0] : "")
    }

    // ran on form submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        let result
        if (_switch) result = await mutations.signup(loginVal, emailVal, passVal)
        else result = await mutations.login(loginVal, passVal)
        // checks for error status (see client/src/gqlJS and server/schemas/resolvers)
        // TODO: Change alert
        if (result.__status__ === "error") alert(_switch ? "Bad signup" : "Bad login")
        else window.location.assign(window.location.origin + "/dashboard")
    }

    // main render logic
    const pageRender = () => {
        const sxcont = {
            width: "405px",
            height: "370px",
            padding: "15px 60px",
            position: "relative"
        }
        const sxcontent = {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
        // react fragment allows us to have multiple children in a JSX element, without adding a parent
        const body = (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={false}>
                    <div className="login-positioning">
                        {(() => {
                            if (loading) return (
                                <React.Fragment>
                                    <div className="login-text">
                                        <Skeleton variant="rectangular" width={_switch ? 172 : 252} height={42} animation="wave" />
                                        <Skeleton variant="rectangular" width={371} height={28} animation="wave" />
                                    </div>
                                    <Skeleton variant="rectangular" sx={sxcont} animation="wave" />
                                </React.Fragment>
                            )
                            return (
                                <React.Fragment>
                                    <div className="login-text">
                                        <Typography variant="h4" width={_switch ? 172 : 252} height={42} sx={{ fontFamily: "Roboto", fontStyle: "normal" }}>
                                            {_switch ? "Get started" : "Build your forms"}
                                            <br />
                                        </Typography>
                                        <Typography variant="subtitle1" width={371} height={28} sx={{ fontFamily: "Roboto", fontStyle: "normal" }}>
                                            {'Fast & easily customizable forms for any situation'}
                                        </Typography>
                                    </div>
                                    <Card sx={sxcont} component="form" autoComplete="off">
                                        <CardContent sx={sxcontent}>
                                            {_switch ?
                                                <Signup
                                                    handlers={{
                                                        login: [loginVal, handleLoginChange],
                                                        email: [emailVal, handleEmailChange],
                                                        pass: [passVal, handlePassChange],
                                                        handleSubmit,
                                                        other
                                                    }} /> :
                                                <Login
                                                    handlers={{
                                                        login: [loginVal, handleLoginChange],
                                                        pass: [passVal, handlePassChange],
                                                        handleSubmit,
                                                        other
                                                    }} />
                                            }
                                        </CardContent>
                                    </Card>
                                </React.Fragment>
                            )
                        })()}
                    </div>
                </Container>
            </React.Fragment>
        )

        return body
    }

    return (
        <main className="login-page">
            {pageRender()}
        </main>
    );
}

export default LoginSignup;
