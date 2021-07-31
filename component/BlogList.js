import blogListStyle from '../styles/BlogList.module.scss'
import BlogRow from './BlogRow'
import {Grid, Paper, Typography, ButtonBase} from '@material-ui/core';

const BlogList = ({blog}) => {
    console.info(blogListStyle);
    return (
        // <div>
        //     {blog.map((i) => (<BlogRow key={i.id} blogItem={i} />))}
        // </div>
        <div className={blogListStyle.blogList}>
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
                            Standard license
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Full resolution 1920x1080 • JPEG
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            ID: 1030114
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            Remove
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">$19.00</Typography>
                    </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default BlogList
