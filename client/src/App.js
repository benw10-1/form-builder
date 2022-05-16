import React from 'react';
import ReactDOM from 'react-dom/client';

import { AllForms, Dashboard, FourOFour, Home, Login, NewForm, Respond, Responses, Signup, SingleForm, SingleResponse } from "./pages"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {return (

    //so this works without an Appollo client ?..
    <BrowserRouter>
    <Routes>

        {/*routes that do not require user to be logged in (content in Home will be different if logged in)*/}
        <Route exact path="/"> 
            <Home/>
        </Route>
        <Route exact path="/login"> 
            <Login/> 
        </Route>
        <Route exact path="/signup"> 
            <Signup/> 
        </Route>
        <Route exact path="/respond/:formID"> 
            <Respond/> 
        </Route>

        {/*routes that require user to be logged in*/}
        <Route exact path="/dashboard/:userID"> 
            <Dashboard/> 
        </Route>
        <Route exact path="/allforms/:userID"> 
            <AllForms/> 
        </Route>
        <Route exact path="/newform/:userID"> 
            <NewForm/> 
        </Route>
        <Route exact path="/singleform/:formID"> 
            <SingleForm/> 
        </Route>
        <Route exact path="/responses/:formID"> 
            <Responses/> 
        </Route>
        <Route exact path="/singleresponse/:formID/:responseNum"> 
            <SingleResponse/> 
        </Route>

        {/*wrong route route*/}
        <Route path="*"> 
            <FourOFour/>
        </Route>

    </Routes>
    </BrowserRouter>

);}


export default App;