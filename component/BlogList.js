import { useState, useEffect } from 'react';
import blogListStyle from '../styles/BlogList.module.scss'
import BlogRow from './BlogRow'
import {Grid, Paper, Typography, ButtonBase} from '@material-ui/core';

const BlogList = ({blog, isLogin}) => {
    // const [isLogin, setIsLogin] = useState(null);
    // // console.info(blog)
    // useEffect(() => {
    
    //     validateLogin();

    //     // doRegister();
       
    //    }, [])

    // const validateLogin = async () => {
    //     // ReactGA.init()
    //     const res = await fetch("../api/validate")
    //     const validate = await res.json()
    //     // console.info('valid', validate)
    //     if (validate.user) {
    //         // console.info("is",validate.user.isLoggedIn)
    //         setIsLogin(validate.user.isLoggedIn)
    //     }
    //     // setLoading(false);
    // }
    return (
        <div>
            {blog.map((i) => (<BlogRow isLogin={isLogin} key={i.id} blogItem={i} />))}
        </div>  
    )
}

export default BlogList
