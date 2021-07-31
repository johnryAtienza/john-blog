import React, {useEffect} from 'react';
import { withIronSession } from "next-iron-session";
import navStyles from '../styles/Nav.module.scss'
import { Link, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Modal, Backdrop, Fade, TextField, Snackbar, CircularProgress, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Nav = () => {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingLinear, setLoadingLinear] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(null);
    const [openSnack, setOpenSnack] = React.useState(false);
    
    const handleClick = (event) => {
        // this.setState()
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
    
        validateLogin();
       
       }, [])

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleOpenModal = () => {
        setOpen(true);
      };
    
    const handleCloseModal = () => {
        setOpen(false);
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

        const res = await fetch("../api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({credential:credential}),
          })

        let result =  await res.json();
        //   console.info("login", result);
        if (result.message) {
            validateLogin()
            handleCloseModal();
        } else if (result.error){
            setOpenSnack(true)
        }
            setLoading(false);

      }

      const doLogout = async event => {
        setLoadingLinear(true)
        event.preventDefault()

        const res = await fetch("../api/logout")
        const isLogout = await res.json()
        console.info(isLogout.logout)
        setIsLogin(false)
        setLoadingLinear(false)
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
                message="Invalid Username or password"
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
                    {isLogin ? <Button color="inherit" onClick={doLogout}>Logout</Button> : <Button color="inherit" onClick={handleOpenModal}>Login</Button> }
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
                
                    <form noValidate autoComplete="off" onSubmit={loginUser}>
                        <div className={navStyles.login_field}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Username"
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