import React from 'react';

import {
    Dashboard,
    FourOFour,
    LoginSignup,
    Form,
    ALTEditForm,
    ALTEditFormMob,
    EditForm,
    Responses,
    Respond,
    Preview
} from "./pages"

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Auth } from "./utils"
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*routes that do not require user to be logged in (content in Home will be different if logged in)*/}
                <Route path="/" element={Auth.loggedIn() ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />} />
                <Route path="/login" element={<LoginSignup switchState={false}/>} />
                <Route path="/signup" element={<LoginSignup switchState={true}/>} />
                <Route path="/form/:endpoint" element={<Form/>} />
                <Route path="/responses/:id" element={<Responses/>} />
                <Route path="/respond/:ep" element={<Preview responding={true} />} />
                <Route path="/preview/:id" element={<Preview/>} />

                {/* routes that require user to be logged in */}
                <Route path="/dashboard" element={<Dashboard/>} />
                {/* View responses and edit form in one page */}
                <Route path="/editform/:id" element={<EditForm/>} />

                {/*testing route*/}
                <Route path="/alteditform/:id" element={<ALTEditForm/>} />
                <Route path="/alteditformmob/:id" element={<ALTEditFormMob/>} />

                {/* wrong route route */}
                <Route path="*" element={<FourOFour />}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;