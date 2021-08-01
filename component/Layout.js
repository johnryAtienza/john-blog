import React, {useState, useEffect, cloneElement} from 'react';
import styles from '../styles/Layout.module.css'
import Header from './Header'
import Nav from './Nav'
import {Container} from '@material-ui/core';

const Layout = ({children}) => {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        console.info('isLogin',isLogin);
        if (!isLogin) {
            validateLogin();
        }

       
       }, [])

    // TODO: add props
    var componentChildren = cloneElement(
        children, 
        { isLogin: isLogin }
    );

    const validateLogin = async () => {
        // ReactGA.init()
        const res = await fetch("../api/validate")
        const validate = await res.json()
        console.info('valid', validate)
        if (validate.user) {
            // console.info("is",validate.user.isLoggedIn)
            setLogin(validate.user.isLoggedIn)
            // return children.props.test = isLogin
        }
        // setLoading(false);
    }
    return (
        <>
            <Nav validationChecker={validateLogin} isLogin={isLogin}/>
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
