import React from 'react'
import './landing.css';

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from '@mui/material/AppBar';
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AddCircleIcon from '@mui/icons-material/AddCircle';

const isSmall = window.innerWidth <= 350;

const fontsx = {
  fontFamily: "Montserrat Alternates"
}
const blue = {
  color: "#303492"
}
const linksx = {
  textDecoration: "none",
  color: "#FFF",
  "&:hover": {
    color: "#D9D9D9",
    cursor: "pointer",
  }
}

const flexsx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const headersx = {
  display: "flex", 
  background: "linear-gradient(to bottom, #553092, #878BE1)",
  minWidth: "100%",
  height: "600px",
  margin: "auto",
  padding: "0 auto",
  fontFamily: ""
}

const headlinesx ={
  backgroundColor: "#FFF",
  height: "442px",
  minWidth: "100%",
  zIndex: 3,
}

const paymentsx = {
  backgroundColor: "#DDDEEC",
  minWidth: "100%",
  height: "622px",
}
const plansx = {
  height: "317px",
  width: "314px",
  margin: "18px 19px",
  padding: "30px",
}

const footersx = {
  backgroundColor: "#262626",
  height: "482px",
  minWidth: "100%",
}

const mocksx = {
  position: "absolute",  
  maxHeight: "534.71px",
  maxWidth: "466.28px",
}

const barsx = {
  background: "linear-gradient(180deg, #553092, #553DB5)",
  position: "relative",
  padding: "27px 54px",
  width: "1028px",
  height: "80px",
  color: "#FFF",
  top: "90px",
  borderRadius: "6px",
  zIndex: 3,
}

const footercontsx = {
  color: "#FFF",
  margin: "0 42.5px"
}

const copyrightsx = {
  color: "#FFF",
  display: "flex",
  justifyContent: "center",
}

function Landing() {
  return (
    <React.Fragment>
      <CssBaseline />

            {/* ---------------------------------------- Footer Contents ---------------------------------------- */}

      <Container sx={headersx}>
          <AppBar elevation={0} position="static" style={{ backgroundColor: "transparent", width: "100%" }}>
            <Toolbar style={{ width: "100%" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  ...fontsx,
              }}>
                <Link href="#yourforms"
                sx={{
                  ...linksx
                }}>
                  <span style={{ fontWeight: 400 }}>your</span>
                  <span style={{ fontWeight: 500 }}>Forms</span>
                </Link>
              </Typography>
              <Button color="inherit" sx={{ margin: "0 16px" }}>home</Button>
              <Button color="inherit" sx={{ margin: "0 16px" }}>pricing</Button>
              <Button color="inherit" sx={{ margin: "0 16px" }}>dashboard</Button>
              <Button color="inherit" sx={{ margin: "0 16px" }}>login/signup</Button>
            </Toolbar>
          </AppBar>

          {/* Build your forms card */}
        <Card
        elevation={1}
        sx={{
          position: "absolute",
          backgroundColor: "#313492",
          width: "500px",
          height: "auto",
          top: "164px",
          right:"260px",
          padding: "62px 67px",
          zIndex: 2,
        }}>
          <Typography color="#FFF" variant="h4">Build your forms</Typography>
          <Typography color="#FFF" variant="p">Fast & easy customizable forms for any situation</Typography>
          <Button variant="contained" sx={{marginTop: "32px"}}>Get Started</Button>
        </Card>

        {/* Mock Cards */}
        <Card
        sx={{
          ...mocksx,
          top: "152px",
          left: "280px",
          zIndex: 1,
        }}
        elevation={1}
        >
          <img
          src="./images/form-view.jpg"
          style={{
            height: "100%",
            width: "100%"
          }}
          />
        </Card>
        <Card
        sx={{
          ...mocksx,
          top: "200px",
          left: "200px",
        }}
        elevation={1}
        >
          <img
          src="./images/form-view.jpg"
          style={{
            height: "100%",
            width: "100%"
          }}
          />
        </Card>
      </Container>

      {/* ---------------------------------------- Headlines ---------------------------------------- */}

      <Container sx={{ ...headlinesx, display: "flex", justifyContent: "center", }}>
        <Box
        sx={{
          minHeight: "100%",
          minWidth: "100%",
          display: "flex",
          zIndex: 2
        }}>
          <Card
          sx={{
            backgroundColor: "#FFF",
            height: "100%",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "60px",
            }}>
            <Typography variant="h5" sx={{ color: "#903092" }}>An Awesome Headline</Typography>
              <Typography variant="p" sx={{wordWrap: "break-word", marginTop: "25px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
          </Card>

          <Card
          sx={{
            backgroundColor: "#FFF",
            height: "100%",
            width: "50%",
            ...flexsx,
            margin: "auto 0",
          }}>
            <Box
            sx={{
              height: "196px",
              width: "401px",
              background: "linear-gradient(-90deg, #DDDEEC, #FFF)",
              ...flexsx,
            }}>
              <AddCircleIcon sx={{ fontSize: "50px" }} />

            </Box>
          </Card>
        </Box>
      </Container>
      <Container sx={{ ...paymentsx, ...flexsx, flexDirection: "column",  }}>
        <Typography variant="h4" sx={{ ...blue }}>Pick your plan:</Typography>
        <Typography variant="p" sx={{ marginTop: "23px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exeruat.
        </Typography>

      {/* ---------------------------------------- Payment Cards ---------------------------------------- */}

      <Box sx={{ display: "flex" }}>
          <Card sx={{ ...plansx }}>
            <Box sx={{ height: "auto", width: "auto", display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <Typography variant="h5" sx={{ ...blue }}>
                Freemium
              </Typography>
              <Typography variant="h6" sx={{ color: "#262626" }}>
                $0/month
              </Typography>
            </Box>
            <Typography variant="p" sx={{ marginTop: "25px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button
            variant="outlined"
            sx={{
              width:"251px",
              marginTop: "43px",
            }}>
              Get Started
            </Button>
          </Card>

          <Card sx={{ ...plansx }}>
            <Box sx={{ height: "auto", width: "auto", display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <Typography variant="h5" sx={{ ...blue }}>
                Premium
              </Typography>
              <Typography variant="h6" sx={{ color: "#262626" }}>
                $10/month
              </Typography>
            </Box>
            <Typography variant="p" sx={{ marginTop: "25px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button
            variant="outlined"
            sx={{
              width:"251px",
              marginTop: "43px",
            }}>
              Get Started
            </Button>
          </Card>

          <Card sx={{ ...plansx }}>
            <Box sx={{ height: "auto", width: "auto", display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
              <Typography variant="h5" sx={{ ...blue }}>
                Enterprise
              </Typography>
              <Typography variant="h6" sx={{ color: "#262626" }}>
                $20/month
              </Typography>
            </Box>
            <Typography variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button
            variant="outlined"
            sx={{
              width: "251px",
              marginTop: "43px",
            }}>
              Get Started
            </Button>
          </Card>
          
        </Box>
        <Box sx={{ ...barsx, ...flexsx, justifyContent: "space-between" }}>
          <Typography variant="p">Ready to build your own forms?</Typography>
          <Button variant="outlined" sx={{ border: "1px solid #FFF", color: "#FFF" }} >Get Started</Button>
        </Box>
      </Container>
      
      {/* ---------------------------------------- Footer Contents ---------------------------------------- */}

      <Container sx={footersx}>
        <div style={{...flexsx, paddingTop: "115px" }}>
          <Box
          sx={{
            ...flexsx,
            ...footercontsx,
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "50px"
          }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                ...fontsx,
                flexGrow: 1,
                margin: "24px 0"
              }}>
              <Link href="#yourforms"
              sx={{
                ...linksx
              }}>
                <span style={{ fontWeight: 400 }}>your</span>
                <span style={{ fontWeight: 500 }}>Forms</span>
              </Link>
            </Typography>

            <div style={{ height: "235px", width: "250px" }}>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </Typography>
            </div>
          </Box>

          <Box sx={{ ...footercontsx, ...flexsx, flexDirection: "column", alignItems: "flex-start", }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                ...fontsx,
                flexGrow: 1,
                margin: "12px 0"
              }}>
                Product
            </Typography>

            <div style={{ height: "235px", width: "148px", display: "flex", flexDirection: "column" }}>
                <Link sx={linksx}>Forms</Link>
                <Link sx={linksx}>Pieces</Link>
                <Link sx={linksx}>Templates</Link>
                <Link sx={linksx}>Questions</Link>
            </div>
          </Box>

          <Box sx={{ ...footercontsx, ...flexsx, flexDirection: "column", alignItems: "flex-start", }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                ...fontsx,
                flexGrow: 1,
                margin: "12px 0"
              }}>
              Resources
            </Typography>

            <div style={{ height: "235px", width: "148px", display: "flex", flexDirection: "column" }}>
                <Link sx={linksx}>Github</Link>
                <Link sx={linksx}>LinkedIn</Link>
                <Link sx={linksx}>Twitter</Link>
                <Link sx={linksx}>Facebook</Link>
            </div>
          </Box>

          <Box sx={{ ...footercontsx, ...flexsx, flexDirection: "column", alignItems: "flex-start", }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                ...fontsx,
                flexGrow: 1,
                margin: "12px 0"
              }}>
              Team
            </Typography>

            <div style={{ height: "235px", width: "148px", display: "flex", flexDirection: "column" }}>
                <Link sx={linksx}>Ben Wirth</Link>
                <Link sx={linksx}>Nicholas Voloshanovich</Link>
                <Link sx={linksx}>Jeoffrey Batangan</Link>
                <Link sx={linksx}>Rachel Marron</Link>
                <Link sx={linksx}>Gordon Do</Link>
            </div>
          </Box>

          <Box sx={{ ...footercontsx, ...flexsx, flexDirection: "column", alignItems: "flex-start", }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                ...fontsx,
                flexGrow: 1,
                margin: "12px 0"
              }}>
              Subscriptions
            </Typography>

            <div style={{ height: "235px", width: "148px", display: "flex", flexDirection: "column" }}>
                <Link sx={linksx}>Upgrade Plan</Link>
                <Link sx={linksx}>Freemium</Link>
                <Link sx={linksx}>Premium</Link>
                <Link sx={linksx}>Enterprise</Link>
            </div>
          </Box>
        </div>
        <small style={copyrightsx}>2022 (C) project3 • Terms of use • Privacy Policy</small>
      </Container>
    </React.Fragment>
  )
}

export default Landing;
