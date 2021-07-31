import navStyles from '../styles/Nav.module.scss'
import { Link, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const Nav = () => {
    return (

        <div className={navStyles.nav}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={navStyles.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={navStyles.title}>
                    News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav
