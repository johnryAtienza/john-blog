import React, {useEffect} from 'react';
import { withIronSession } from "next-iron-session";
import navStyles from '../styles/Nav.module.scss'
import { Link, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Modal, Backdrop, Fade, TextField, Snackbar, CircularProgress, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Nav = () => {

    const [open, setOpen] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingLinear, setLoadingLinear] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(null);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [msg, setMsg] = React.useState("Invalid Username or password");
    
    const handleClick = (event) => {
        // this.setState()
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
    
        validateLogin();

        // doRegister();
       
       }, [])

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleOpenModal = () => {
        setOpen(true);
      };
    
    const handleCloseModal = () => {
        setOpen(false);
        setLoading(false);
    };

    const handleOpenModalRegister = () => {
        setOpenRegister(true);
      };
    
    const handleCloseModalRegister = () => {
        setOpenRegister(false);
        setLoading(false);
    };

    const validateLogin = async () => {
        // ReactGA.init()
        const res = await fetch("../api/validate")
        const validate = await res.json()
        console.info('valid', validate)
        if (validate.user) {
            console.info("is",validate.user.isLoggedIn)
            setIsLogin(validate.user.isLoggedIn)
        }
        // setLoading(false);
    }
    const loginUser = async event => {
        setLoading(true);
        event.preventDefault()
        const credential = {email: event.target.username.value, password: event.target.password.value };
        if (!credential.password || !credential.email) {
            setMsg("Please input username and password.")
            setOpenSnack(true)
            setLoading(false);
            return;
        }
        const res = await fetch("../api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({credential:credential}),
          })

        let result =  await res.json();
        //   console.info("login", result);
        if (result.login) {
            setMsg(result.message);
            validateLogin()
            handleCloseModal();
        } else if (result.error){
            setMsg(result.error);
        }
            setOpenSnack(true)
            setLoading(false);

      }

      const doLogout = async event => {
        setLoadingLinear(true)
        event.preventDefault()

        const res = await fetch("../api/logout")
        const isLogout = await res.json()
        console.info(isLogout.logout)

        setMsg('Successfully logged out.');
        setOpenSnack(true)
        setIsLogin(false)
        setLoadingLinear(false)
      }

      const doRegister = async event => {
        setLoading(true);
        // setLoadingLinear(true)
        // event.preventDefault()
        event.preventDefault()
        const data = {id: null, fullname: event.target.fname.value, email: event.target.email.value, password: event.target.password.value };

        if (!data.fullname || !data.email || !data.password) {
            setMsg("Please fillout all the fields.");
            setOpenSnack(true);
            setLoading(false);
            return;
        }

        const res = await fetch("../api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:data}),
          })
        const isRegistered = await res.json()
        console.info(isRegistered)
        if (isRegistered.registered) {
            setMsg(isRegistered.message)
        }
        setOpenSnack(true)
        setLoading(false)
        handleCloseModalRegister(false)
      }

    return (

        <div className={navStyles.nav}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={() => setOpenSnack(false)}
                message={msg}
                key='Top Center'
            >
                
            </Snackbar>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={navStyles.menuButton} aria-controls="simple-menu" color="inherit" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><Link href="/blog">Blog List</Link></MenuItem>
                    </Menu>
                    <Typography variant="h6" className={navStyles.title}>
                    Blog
                    </Typography>
                    {isLogin ? <Button color="inherit" onClick={doLogout}>Logout</Button> : <><Button color="inherit" onClick={handleOpenModalRegister}>Register</Button><Button color="inherit" onClick={handleOpenModal}>Login</Button></> }
                </Toolbar>
            </AppBar>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={navStyles.modal}
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={navStyles.paper}>
                    <h3>Login</h3>
                    <form noValidate autoComplete="off" onSubmit={loginUser}>
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                variant="outlined"
                                name="username"
                                />
                        </div>
                        
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                name="password"
                                />
                        </div>
                        <div>
                            <Button type="submit" disabled={loading} variant="contained" color="primary" className={navStyles.submit_button} disableElevation>
                                {loading ? <CircularProgress size={24}/> : 'Login'}
                            </Button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={navStyles.modal}
                open={openRegister}
                onClose={handleCloseModalRegister}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openRegister}>
                <div className={navStyles.paper}>
                    <h3>Register</h3>
                    <form noValidate autoComplete="off" onSubmit={doRegister}>
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-fullname-required"
                                label="Full Name"
                                variant="outlined"
                                name="fname"
                                />
                        </div>
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                variant="outlined"
                                name="email"
                                />
                        </div>
                        
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                name="password"
                                />
                        </div>
                        <div>
                            <Button type="submit" disabled={loading} variant="contained" color="primary" className={navStyles.submit_button} disableElevation>
                                {loading ? <CircularProgress size={24}/> : 'Register'}
                            </Button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>
            {loadingLinear && <LinearProgress />}
        </div>
    )
}

export default Nav

// export const getServerSideProps = async (ctx) => {
//     console.info('getServerSideProps')
//     const res = await fetch("../api/validate")
//     const validate = await res.json()
//     return { props: validate }
//   }