import React, { useState, useEffect } from "react";
import { mutations, Auth } from "../../utils"
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./Login.css"

// destructure props
function Login({ handlers: { login: [loginVal, handleLoginChange], pass: [passVal, handlePassChange], handleSubmit, other }, errors = {} }) {
    return (
        <React.Fragment>
            <Box m={"0 0 30px 0"}>
                <TextField id="input-user" label="Username or email" variant="standard" onChange={handleLoginChange} value={loginVal} fullWidth={true} error={errors.user} helperText={errors.user} />
            </Box>
            <Box m={"0 0 42.5px 0"}>
                <TextField id="input-pass" label="Password" variant="standard" type="password" onChange={handlePassChange} value={passVal} fullWidth={true} error={errors.pass} helperText={errors.pass} />
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
function Signup({ handlers: { login: [loginVal, handleLoginChange], email: [emailVal, handleEmailChange], pass: [passVal, handlePassChange], handleSubmit, other }, errors = {} }) {
    return (
        <React.Fragment>
            <Box m={"10px 0 20px 0"}>
                <TextField id="input-user" label="Username" variant="standard" onChange={handleLoginChange} value={loginVal} fullWidth={true} error={errors.user} helperText={errors.user} />
            </Box>
            <Box m={"0 0 20px 0"}>
                <TextField id="input-email" label="Email" variant="standard" onChange={handleEmailChange} value={emailVal} fullWidth={true} error={errors.email} helperText={errors.email} />
            </Box>
            <Box m={"0 0 40px 0"}>
                <TextField id="input-pass" label="Password" variant="standard" type="password" onChange={handlePassChange} value={passVal} fullWidth={true} error={errors.pass} helperText={errors.pass} />
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

function VerifyEmail({ handlers: { verification: [verificationVal, setVerificationVal], handleSubmit, verifySwitch }, errors = {} }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Verify your email by entering the code we sent to your email
            </Typography>
            <Box m={"0 0 20px 0"}>
                <TextField id="input-verification" label="Verification code" variant="standard" onChange={(event) => {setVerificationVal(event.target.value)}} value={verificationVal} fullWidth={true} error={errors.verification} helperText={errors.verification} />
            </Box>
            <div className="button-block">
                <div className="button-cont">
                    <Button onClick={() => { verifySwitch(false) }} variant="contained" width={105} height={42} color="error">Back</Button>
                    <Button onClick={handleSubmit} variant="contained" width={105} height={42}>Verify</Button>
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
    const [errors, setErrors] = useState({})
    // states that set the values for the inputs
    let [loginVal, setLoginVal] = useState("")
    let [emailVal, setEmailVal] = useState("")
    let [passVal, setPassVal] = useState("")
    let [rerender, setRerender] = useState(false)
    let [verify, setVerify] = useState(false)
    const [verificationVal, setVerificationVal] = useState("")

    // fake loading sequence
    const other = () => {
        setLoading(true)
        // reset password but keep username
        setPassVal("")
        setErrors({})
        const new_path = _switch ? "login" : "signup"
        // set url without reloading
        window.history.pushState('data', new_path, "/" + new_path);
        setTimeout(() => {
            setSwitch(!_switch)
            setLoading(false)
        }, 1000)
    }

    const verifySwitch = (state) => {
        setLoading(true)
        setErrors({})
        setTimeout(() => {
            setLoading(false)
            setVerify(state)
        }, 400)
    }
    // same logic as Dashboard.js
    useEffect(() => {
        const req = async () => {
            let loggedIn = Auth.loggedIn()
            if (loggedIn) window.location.replace(window.location.origin + "/dashboard")
            else setLoading(false)
        }
        window.addEventListener("resize", () => {
            setRerender(Math.random() * 10) // force rerender
        })
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
        if (verify) {
            result = await mutations.verify(verificationVal)
        }
        else {
            if (_switch) result = await mutations.signup(loginVal, emailVal, passVal)
            else result = await mutations.login(loginVal, passVal)
        }

        if (result.__status__ === "error") {
            setErrors(result.errors ?? {})
        }
        else {
            result = result.result
            if (result?.user && result.user.verified) {
                window.location.assign(window.location.origin + "/dashboard")
            }
            else if (typeof result === "string") {
                Auth.login(result)
                window.location.assign(window.location.origin + "/dashboard")
            }
            else {
                verifySwitch(true)
                const mail = await mutations.verifyUserEmail()
            }
        }
    }

    const keyHandle = (event) => {
        if (event.key === "Enter") handleSubmit(event)
    }

    // main render logic
    const pageRender = () => {
        const sxcont = {
            height: "370px",
            width: "405px",
            padding: {
                xs: "15px 30px",
            },
            position: "relative"
        }
        if (window.innerWidth < 415) sxcont.width = "100%"
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
                <Container maxWidth={true} minWidth={320} disableGutters >
                    <div className="login-positioning">
                        {(() => {
                            if (loading) return (
                                <React.Fragment>
                                    <div className="login-text">
                                        <Skeleton variant="rectangular" width={_switch ? 172 : 252} height={42} animation="wave" />
                                        <Skeleton variant="rectangular" width={371} height={28} animation="wave" />
                                    </div>
                                    <Skeleton variant="rectangular" sx={{ ...sxcont, borderRadius: "5px" }} animation="wave" />
                                </React.Fragment>
                            )
                            return (
                                <React.Fragment>
                                    <div className="login-text">
                                        <Typography color="primary" variant="h4" width={_switch ? 172 : 252} height={42} sx={{ fontFamily: "Roboto", fontStyle: "normal", marginRight: { md: "70px" } }}>
                                            {_switch ? "Get started" : "Build your forms"}
                                            <br />
                                        </Typography>
                                        <Typography variant="subtitle1" width={371} height={28} sx={{ fontFamily: "Roboto", fontStyle: "normal", marginLeft: "0px", wordWarp: { xs: "normal" } }}>
                                            {'Fast & easily customizable forms for any situation'}
                                        </Typography>
                                    </div>
                                    <Card sx={{ ...sxcont, padding: { xs: "15px 40px", md: "15px 60px" } }} component="form" autoComplete="off" onKeyDown={keyHandle}>
                                        <CardContent sx={sxcontent}>
                                            {
                                                verify ?
                                                    <VerifyEmail
                                                        handlers={{
                                                            verification: [verificationVal, setVerificationVal],
                                                            handleSubmit,
                                                            verifySwitch
                                                        }}
                                                        errors={errors}
                                                    />
                                                    :
                                                    (
                                                        _switch ?
                                                            <Signup
                                                                handlers={{
                                                                    login: [loginVal, handleLoginChange],
                                                                    email: [emailVal, handleEmailChange],
                                                                    pass: [passVal, handlePassChange],
                                                                    handleSubmit,
                                                                    other,
                                                                }}
                                                                errors={errors}
                                                            /> :
                                                            <Login
                                                                handlers={{
                                                                    login: [loginVal, handleLoginChange],
                                                                    pass: [passVal, handlePassChange],
                                                                    handleSubmit,
                                                                    other,
                                                                }}
                                                                errors={errors}
                                                            />
                                                    )
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
