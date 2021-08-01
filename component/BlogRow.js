// import Link from 'next/link'
import React, {useState} from 'react';
import blogListStyle from '../styles/BlogList.module.scss'
import {Grid, Paper, Typography, ButtonBase, Link, IconButton, Backdrop, CircularProgress, Modal, Fade, TextField, Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
const BlogRow = ({blogItem, isLogin}) => {
    // console.info('@@@@', blogItem)
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const showEditModal = () => {
        setShowEdit(true)
    }
    const hideEditModal = () => {
        setShowEdit(false)
    }
    const doSaveBlog = event => {
        event.preventDefault();
    }
    return (
        <div className={blogListStyle.blog_list}>

            <Paper className={blogListStyle.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={blogListStyle.image}>
                            <img className={blogListStyle.img} alt="complex" src="https://lokeshdhakar.com/projects/lightbox2/images/image-4.jpg" />
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
                             {isLogin &&  <IconButton aria-label="edit" onClick={showEditModal}> <EditIcon /> </IconButton> }
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={blogListStyle.modal}
                open={showEdit}
                onClose={hideEditModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={showEdit}>
                <div className={blogListStyle.paper}>
                    <h3>Blog</h3>
                    <form noValidate autoComplete="off" onSubmit={doSaveBlog}>
                        <div className={blogListStyle.login_field}>
                            <TextField
                                required
                                id="outlined-fullname-required"
                                label="Full Name"
                                variant="outlined"
                                name="fname"
                                />
                        </div>
                        <div className={blogListStyle.login_field}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                variant="outlined"
                                name="email"
                                />
                        </div>
                        
                        <div className={blogListStyle.login_field}>
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
                            <Button type="submit" disabled={loading} variant="contained" color="primary" className={blogListStyle.submit_button} disableElevation>
                                {loading ? <CircularProgress size={24}/> : 'Register'}
                            </Button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default BlogRow
