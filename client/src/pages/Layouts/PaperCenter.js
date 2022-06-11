import {
    Divider,
    Container,
    Box,
    Paper,
    Popover,
    CssBaseline,
} from "@mui/material";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import React, { useState, useEffect, useRef } from "react";
import Signout from "../Signout";

function MobileMenu({ buttons }) {
    const [menuOpen, setMenuOpen] = useState(false)

    const close = () => {
        setMenuOpen(false)
    }
    const open = () => {
        setMenuOpen(true)
    }

    const anchorRef = useRef(null);

    const dotssx = {
        display: "grid",
        placeItems: "center",
        // padding: "10px",
        width: "25px",
        height: "25px",
        position: "absolute",
        top: "24px",
        right: "24px",
        cursor: "pointer",
        color: "rgba(0, 0, 0, 0.54)",
        "&:hover": {
            color: "#1976D2"
        }
    }
    const menusx = {
        width: "208px",
        borderRadius: "4px",
        background: "#FFFFFF",
        boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    return (
        <React.Fragment>
            <Box sx={dotssx} ref={anchorRef} onClick={open}>
                <MoreHoriz />
            </Box>
            <Box sx={{ position: "absolute", width: "fit-content", height: "fit-content" }} >
                <Popover
                    open={menuOpen}
                    onClose={close}
                    anchorEl={anchorRef.current}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box sx={menusx}>
                        {buttons}
                    </Box>
                </Popover>
            </Box>
        </React.Fragment>
    )
}

function PaperCenter({ paper, buttons, children, left, sx, hasSignOut=true }) {
    const [rerender, setRerender] = useState(false)

    const resizer = (event) => {
        setRerender(Math.random() * 100)
    }

    useEffect(() => {
        window.addEventListener("resize", resizer)
        return () => window.removeEventListener("resize", resizer)
    }, [])

    const leftRef = useRef()

    const isMob = window.innerWidth < 900

    const sidesx = {
        width: {
            xs: "100%",
            md: "350px",
        },
        padding: {
            xs: "16px",
            md: "32px"
        },
        flexShrink: 2,
    }
    const sidebutssx = {
        width: "212px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        padding: {
            xs: "0px",
            md: "100px 32px 0 24px"
        },
    }
    const contsx = {
        width: "100%",
        maxWidth: {
            xs: "unset",
            md: "800px"
        },
        minHeight: {
            xs: window.innerHeight - (leftRef.current ? leftRef.current.getBoundingClientRect().height : 200),
            md: window.innerHeight - 80
        },
        display: "block",
        borderRadius: {
            xs: "0px",
            md: "4px 4px 0 0"
        },
        padding: {
            xs: "30px",
            md: "60px"
        },
        flexShrink: 1,
        position: "relative"
    }
    const containersx = {
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        paddingTop: {
            xs: 0,
            md: "80px"
        },
        flexDirection: {
            xs: "column",
            md: "row"
        },
        height: "fit-content",
        ...(sx || {})
    }
    const boxsx = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: {
            xs: "column",
            md: "row"
        },
    }

    return (
        <React.Fragment>
            {hasSignOut ? <Signout sx={isMob ? { right: "unset", left: "24px", top: "unset", bottom: "24px" } : {}} /> : null}
            <CssBaseline />
            <Container disableGutters={true} maxWidth={true} sx={containersx}>
                {left ?
                    <Box sx={sidesx} ref={leftRef}>
                        {left}
                    </Box> : null}
                <Box sx={boxsx}>
                    <Paper sx={contsx}>
                        {(buttons && isMob) ? <MobileMenu buttons={buttons} /> : null}
                        {paper.map((row, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {row}
                                    {i < paper.length - 1 ? <Divider flexItem={true} /> : null}
                                </React.Fragment>
                            )
                        })}
                        {children}
                    </Paper>
                    {isMob ?
                        null :
                        (buttons ?
                            <Box sx={sidebutssx}>
                                {buttons}
                            </Box>
                            : null
                        )}
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default PaperCenter;