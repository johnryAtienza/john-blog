import { useState, useEffect } from 'react';
import blogListStyle from '../styles/BlogList.module.scss'
import BlogRow from './BlogRow'
import {Accordion, AccordionSummary, Typography, AccordionActions, AccordionDetails, Backdrop, CircularProgress, Modal, Fade, TextField, Button, Snackbar, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Router from 'next/router';

const BlogList = ({blog, isLogin, refreshData}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({gallery:[]});
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState("Invalid Username or password");
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        console.info('Updated: ',blog)
       
       }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const saveGallery = async (event) => {
        setLoading(true);
        event.preventDefault();
        const p = {id: null, userId: details.userId, blogId: details.blogId, title: event.target.galleryName.value};
        const res = await fetch("../api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();
          console.info(result)
        if(result.added) {
            setOpen(false);
            // TODO: update list
            refreshData();

        }
        setLoading(false);
    }

    // const removeGallery = async (event) => {
    //     const p = {remove: true, id: 11};
    //     const res = await fetch("../api/gallery", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({data:p}),
    //       })

    //     let result =  await res.json();
    // }

    const showEditModal = () => {
        setShowEdit(true)
    }
    const hideEditModal = () => {
        setShowEdit(false)
    }
    const doSaveBlog = async event => {
        setLoading(true);
        event.preventDefault();
        const p = {id: details.id, userId: details.userId, title: event.target.title.value, body: event.target.body.value };
        const res = await fetch("../api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();

        if (result.isUpdated) {
            // TODO: update list
            refreshData();

            hideEditModal();
            setDetails({});
            setMsg(result.message);
            setOpenSnack(true)
        }
        setLoading(false);
    }
    const viewDetails = (d) => {
        console.info(d);
        setDetails(d)
        showEditModal();
    }
    return (
        <div>
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
            ></Snackbar>
            {blog.map((i) => (<BlogRow viewDetails={viewDetails} isLogin={isLogin} key={i.id} blogItem={i} />))}
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
                                label="Titlte"
                                variant="outlined"
                                defaultValue={details.title}
                                name="title"
                                fullWidth
                                />
                        </div>
                        <div className={blogListStyle.login_field}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Content"
                                defaultValue={details.body}
                                variant="outlined"
                                name="body"
                                fullWidth
                                multiline
                                maxRows={10}
                                />
                        </div>
                        <Divider variant="middle" />
                        {!details.gallery.length && <Button variant="outlined" color="primary" onClick={handleClickOpen} className={blogListStyle.gallery_button}>Add Gallery</Button>}
                        <br/>
                        {details.gallery.map( (gallery) => (
                            <Accordion key={gallery.id} expanded={expanded === gallery.id} onChange={handleChange(gallery.id)}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                >
                                <Typography >{gallery.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
                                </Typography>
                                </AccordionDetails>
                                <Divider />
                                {/* <AccordionActions>
                                    <Button size="small" onClick={removeGallery}><DeleteIcon/></Button>
                            
                                </AccordionActions> */}
                            </Accordion>
                        ))}
                        {/* <div className={blogListStyle.login_field}>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                name="password"
                                fullWidth
                                />
                        </div> */}
                        <br/>
                        <div>
                            <Button type="submit" disabled={loading} variant="contained" color="primary" className={blogListStyle.submit_button} disableElevation>
                                {loading ? <CircularProgress size={24}/> : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
                </Fade>
            </Modal>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form noValidate autoComplete="off" onSubmit={saveGallery}>
                    <DialogTitle id="form-dialog-title">Gallery</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please input gallery name below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="galleryName"
                        label="Gallery Name"
                        name="galleryName"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} disabled={loading} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} color="primary">
                        {loading ? <CircularProgress size={24}/> : 'Save'}
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>  
    )
}

export default BlogList
