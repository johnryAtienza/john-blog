import React from 'react';
import navStyles from '../styles/Nav.module.scss'
import { Link, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const Nav = () => {

    const [anchorEl, setAnchorEl] = React.useState(false);

    const handleClick = (event) => {
        // this.setState()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(false);
    };
    return (

        <div className={navStyles.nav}>
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav
