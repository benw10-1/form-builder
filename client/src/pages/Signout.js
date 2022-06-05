//if logged out, navbar has just login and about section
//on dashboard it has home and full menu : see forms, see responses, create new form
//on home it has dashboard and log out 

//maybe new form and edit form are separate pages
// but they will look very similar
import React from "react";
import { Link } from "@mui/material"
import Auth from "../utils/auth"

function Signout(){
    const sx = {
        position: "absolute",
        right: "54px",
        top: "24px",
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: "12px",
        "&:hover": {
            cursor: "pointer"
        }
    }

    return (
        <Link underline="always" hover={false} width={48} height={20} sx={sx} onClick={Auth.logout}>Sign Out</Link>
    );
}

export default Signout;