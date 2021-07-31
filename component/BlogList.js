import blogListStyle from '../styles/BlogList.module.scss'
import BlogRow from './BlogRow'
import {Grid, Paper, Typography, ButtonBase} from '@material-ui/core';

const BlogList = ({blog}) => {
    console.info(blogListStyle);
    return (
        <div>
            {blog.map((i) => (<BlogRow key={i.id} blogItem={i} />))}
        </div>  
    )
}

export default BlogList
