import { useState, useEffect } from 'react';
import loadable from '@loadable/component'
import blogListStyle from '../styles/BlogList.module.scss'
// import BlogRow from './BlogRow'
import Image from 'next/image'
import {Accordion, AccordionSummary, Typography, AccordionActions, AccordionDetails, Backdrop, CircularProgress, Modal, Fade, TextField, Button, Snackbar, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageList, ImageListItem, ImageListItemBar, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const BlogRow = loadable(() => import('./BlogRow'))

const BlogList = ({blog, isLogin, refreshData, uDetails}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({gallery:[]});
    const [galleryDetails, setGalleryDetails] = useState({});
    const [openSnack, setOpenSnack] = useState(false);
    const [msg, setMsg] = useState("Invalid Username or password");
    const [open, setOpen] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [blogDetails, setBlogDetails] = useState(blog);
    const [userDetails, setUserDetails] = useState(uDetails);

    useEffect(() => {
        validate()

       }, [isLogin])

    useEffect(() => {
        // validate()
        if (userDetails.id) {
            const newblog = blog.filter(r => (r.userId === userDetails.id))
            setBlogDetails(newblog)
        }

       }, [blog])

       const validate = async () => {
        const res = await fetch("../api/validate")
        const validate = await res.json()
        // console.info('ss',isLogin)
        if (validate.user.user) {
            // TODO: filter show only his/her blog if the user is logged 
        const userId = validate.user.user[0].id;
        console.info('Updated: ',blog)
                       const newblog = blog.filter(r => (r.userId === userId))
                console.info('current logged: ',blog);
                setBlogDetails(newblog)
                setUserDetails(validate.user.user[0])
            console.info("User details: ", userDetails)
            } else {
                // TODO: list all if no user logged
                setBlogDetails(blog)
                setUserDetails({})
                
            }
            
       }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpenPhoto = (d) => {
        setGalleryDetails(d)
      setOpenPhoto(true);
    };
  
    const handleClosePhoto = () => {
      setOpenPhoto(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const saveGallery = async (event) => {
        setLoading(true);
        event.preventDefault();
        const p = {id: null, userId: userDetails.id, blogId: details.id, title: event.target.galleryName.value};
        const res = await fetch("../api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();
        //   console.info(result)
        if(result.added) {
            handleClose();

            const p = {get:true, blogId: details.id};
            const resp = await fetch("../api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data:p}),
              })
    
            let response =  await resp.json();

            let obj = JSON.parse(JSON.stringify(details || {}));
            let o = JSON.parse(JSON.stringify(response || {}));
            o[0].photos = []
            obj.gallery = o;
            obj.galleryDetails = response[0];
            setGalleryDetails(obj.galleryDetails)
            setDetails(obj);
            // TODO: update list
            refreshData();

        }
        setLoading(false);
    }

    const savePhoto = async event => {
        setLoading(true);
        event.preventDefault();
        const p = {id: null, galleryId: galleryDetails.id, title: event.target.title.value, url: event.target.url.value, thumbnailUrl: event.target.thumbnail.value};
        const res = await fetch("../api/photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();
          console.info(result)
        if(result.added) {
            handleClosePhoto();

            setMsg(result.message);
            setOpenSnack(true)

            const p = {get:true, galleryId: galleryDetails.id};
            const res = await fetch("../api/photo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({data:p}),
              })
    
            let response =  await res.json();

            let obj = JSON.parse(JSON.stringify(details || {}));
            obj.gallery[0].photos = response;

            setDetails(obj);
            //   console.info('List of photos:',response)
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

    const removePhoto = async (id) => {
        setLoading(true);
        const p = {id:id, remove: true}
        const res = await fetch("../api/photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();
        if(result.deleted) {
            let obj = JSON.parse(JSON.stringify(details || {}));
            let photoList = obj.gallery[0].photos;
            // console.info("BEFORE updateds: " + id,obj)
            obj.gallery[0].photos = photoList.filter(r => (r.id != id))
            // console.info("updateds: ",obj)

            setMsg(result.message);
            setOpenSnack(true)

            setDetails(obj);
            // TODO: update list
            refreshData();
        }

        setLoading(false);
    }

    const showEditModal = () => {
        setShowEdit(true)
    }
    const hideEditModal = () => {
        setShowEdit(false)
    }
    const doSaveBlog = async event => {
        setLoading(true);
        event.preventDefault();
        const p = {id: details.id, userId: userDetails.id, title: event.target.title.value, body: event.target.body.value };
        const res = await fetch("../api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:p}),
          })

        let result =  await res.json();

        if (result.isUpdated || result.isAdded) {
            // TODO: update list
            refreshData();

            hideEditModal();
            setDetails({gallery:[]});
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

    const showFormModal = () => {
        setDetails({gallery:[]})
        showEditModal()
    }
    return (
        <div>
            {/* {userDetails.fullname} */}
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
            {isLogin && (
                <div className={blogListStyle.header_button}>
                    <IconButton aria-label="add blog" onClick={showFormModal}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </div>
            )}
            {blogDetails.map((i) => (<BlogRow viewDetails={viewDetails} isLogin={isLogin} key={i.id} blogItem={i} />))}
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
                        {/* TODO: show only if edit */}
                        {details.id && (<>
                            <Divider variant="middle" />
                                        <h2>Gallery</h2>
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
                                    <AccordionDetails  style={{maxWidth: 500, maxHeight:230, overflowX:'scroll'}}>
                                    {/* <Typography>
                                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                        maximus est, id dignissim quam.
                                    </Typography> */}
                                    <ImageList  cols={2} >
                                        {gallery.photos.map((item) => (
                                        <ImageListItem key={item.id} style={{maxWidth: 300}}>
                                            <Image src={item.thumbnailUrl} alt={item.title} layout="fill"/>
                                            <ImageListItemBar
                                            title={item.title}
                                            
                                            actionIcon={
                                                <IconButton aria-label={`remove ${item.title}`} onClick={() => {removePhoto(item.id)}}>
                                                <DeleteIcon />
                                                </IconButton>
                                            }
                                            />
                                        </ImageListItem>
                                        ))}
                                    </ImageList>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions>
                                        <Button size="small" onClick={() => {handleClickOpenPhoto(details.galleryDetails)}}><AddCircleOutlineIcon/></Button>
                                
                                    </AccordionActions>
                                </Accordion>
                            ))}
                        </>)}
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
            <Dialog open={openPhoto} onClose={handleClosePhoto} aria-labelledby="form-dialog-title">
                <form noValidate autoComplete="off" onSubmit={savePhoto}>
                <DialogTitle id="form-dialog-title">Photo</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please input photo details below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        name="title"
                        fullWidth
                    />
                    <TextField
                        
                        margin="dense"
                        id="url"
                        label="URL"
                        name="url"
                        fullWidth
                    />
                    <TextField
                        
                        margin="dense"
                        id="thumbnail"
                        label="Thumbnail URL"
                        name="thumbnail"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClosePhoto} disabled={loading} color="primary">
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
