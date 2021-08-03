import React, {useState, useEffect, cloneElement} from 'react';
import loadable from '@loadable/component'
import Header from './Header'
// import Nav from './Nav'
import {Container, LinearProgress} from '@material-ui/core';

const Nav = loadable(() => import('./Nav'))

const Layout = ({children}) => {
    const [isLogin, setLogin] = useState(false);
    const [uDetails, setUDetails] = useState({});

    useEffect(() => {
        console.info('isLogin',isLogin);
        if (!isLogin) {
            validateLogin();
        }

       
       }, [])

    // TODO: add props
    var componentChildren = cloneElement(
        children, 
        { isLogin: isLogin, uDetails: uDetails }
    );

    const validateLogin = async () => {
        // ReactGA.init()
        const res = await fetch("../api/validate")
        const validate = await res.json()
        console.info('valid', validate)
        if (validate.user) {
            // console.info("is",validate.user.isLoggedIn)
            setLogin(validate.user.isLoggedIn)
            if (validate.user.user) {
                const u = validate.user.user[0];
                setUDetails(u);
                // const userId = validate.user.user[0].id;
                // return children.props.test = isLogin
                // children.props.blog = children.props.blog.filter(r => (r.userId === userId))
                // console.info('current logged: ',children.props.blog);
            }
        }
        console.info(children);
    }
    return (
        <>
            <Nav validationChecker={validateLogin} isLogin={isLogin} fallback={<LinearProgress />}/>
            <Container maxWidth="lg">
                <main>
                    <Header />
                    {componentChildren}
                </main>
            </Container>
        </>
    )
}

export default Layout
