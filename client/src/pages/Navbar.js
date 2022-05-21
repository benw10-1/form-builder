//if logged out, navbar has just login and about section

import { Auth } from "../utils"
import {Link} from "react-router-dom";

function Navbar (){
    return (

    Auth.loggedIn() ? (
        <>
            {/*<Link to={`/newform/${u.data.user._id}`} >Create a new form</Link>*/}
            {/*<Link to={`/allforms/${u.data.user._id}`} >All your forms</Link>*/}
            {/*<Link onClick={Auth.logout}>Logout</Link>*/}
            <h3>you is logged in bro</h3>
            <Link to="/" >Home</Link>
            <Link to="/dashboard" >Dashboard</Link>
            <Link to="/" onClick={()=>{Auth.logout()} }>Logout</Link>
        </>
    ) : (
        <>
            <Link to="/login" >Log in</Link>
            <Link to="/signup" >Sign up</Link>
        
        </>
    )
    )

}

export default Navbar;