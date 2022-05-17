import React, { useState, useEffect } from "react";
import { queries, mutations, Auth } from "../utils"

function Login() {
    // regex matching the correct password
    const allowed = {
        login: /[\w\d!@#$%&.\-]+/,
        password: /[^\s\[\]'"\\./()`~<>;:\-]+/
    }

    let [loading, setLoading] = useState(true)
    // states that set the values for the inputs
    let [loginVal, setLoginVal] = useState("")
    let [passVal, setPassVal] = useState("")

    // same logic as Dashboard.js
    useEffect(async () => {
        let loggedIn = Auth.loggedIn()
        if (loggedIn) window.location.replace(window.location.origin + "/dashboard")
        else setLoading(false)
    }, [1])

    // on login edit
    const handleLoginChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.login)
        // if no match, returns null
        // set login value state causing rerender
        setLoginVal(match ? match[0] : "")
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
        // mutations 
        let result = await mutations.login(loginVal, passVal)
        // checks for error status (see client/src/gqlJS and server/schemas/resolvers)
        // TODO: Change alert
        if (result.__status__ === "error") alert("Bad login")
        else window.location.replace(window.location.origin + "/dashboard")
    }

    // main render logic
    const pageRender = () => {
        const body = (
            <form className="login-areas" onSubmit={handleSubmit}>
                <input className="login-inp" type="text" value={loginVal} onChange={handleLoginChange} placeholder="Username"></input>
                <input className="login-inp" type="text" value={passVal} onChange={handlePassChange} placeholder="Password"></input>
                <input type="submit" value="Login"></input>
            </form>
        );

        if (loading) return <div>Loading...</div>
        return body
    }

    return (
        <main className="login-page">
            {pageRender()}
        </main>
    );
}

export default Login;
