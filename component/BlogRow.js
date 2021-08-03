// import Link from 'next/link'
import React, {useState} from 'react';
import blogListStyle from '../styles/BlogList.module.scss'
import {Grid, Paper, Typography, ButtonBase, Link, IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Image from 'next/image'
const BlogRow = ({blogItem, isLogin, viewDetails}) => {
    // console.info('@@@@', blogItem)
    const noImage = 'https://via.placeholder.com/600x600.png?text=No%20Image'
    return (
        <div className={blogListStyle.blog_list}>

            <Paper className={blogListStyle.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={blogListStyle.image}>
                            <Image className={blogListStyle.img} alt="complex"  layout="fill" src={blogItem.gallery[0] && blogItem.gallery[0].photos[0] ? blogItem.gallery[0].photos[0].thumbnailUrl : noImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                <Link href={`blog/${blogItem.id}`}>
                                    {blogItem.title}
                                </Link>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {blogItem.body}
                            </Typography>
                            {/* <Typography variant="body2" color="textSecondary">
                                ID: 1030114
                            </Typography> */}
                            </Grid>
                            {/* <Grid item>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                Remove
                            </Typography>
                            </Grid> */}
                        </Grid>
                        <Grid item>
                            {/* <Typography variant="subtitle1">$19.00</Typography>
                             */}
                             {isLogin &&  <IconButton aria-label="edit" onClick={() => {viewDetails(blogItem)}}> <EditIcon /> </IconButton> }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    )
}

export default BlogRow
