import React from 'react';

import {
    Dashboard,
    FourOFour,
    Home,
    LoginSignup,
    Form,
    EditForm
} from "./pages"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*routes that do not require user to be logged in (content in Home will be different if logged in)*/}
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginSignup switchState={false}/>} />
                <Route path="/signup" element={<LoginSignup switchState={true}/>} />
                <Route path="/form/:endpoint" element={<Form/>} />

                {/* routes that require user to be logged in */}
                <Route path="/dashboard" element={<Dashboard/>} />
                {/* View responses and edit form in one page */}
                <Route path="/editform/:id" element={<EditForm />} />    

                {/* wrong route route */}
                <Route path="*" element={<FourOFour />}/>

            </Routes>
        </BrowserRouter>
    );
}


export default App;