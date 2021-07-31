// import Link from 'next/link'
import blogListStyle from '../styles/BlogList.module.scss'
import {Grid, Paper, Typography, ButtonBase, Link} from '@material-ui/core';
const BlogRow = ({blogItem}) => {
    console.info('@@@@', blogItem)
    return (
        <div className={blogListStyle.blog_list}>
            {/* <Link href="/blog/[id]" as ={`blog/${blogItem.id}`}>
                <a >
                    <h3>{blogItem.title}</h3>
                </a>
            </Link> */}
            {/* <Link href={`blog/${blogItem.id}`}>

                    <h3>{blogItem.title}</h3>
            </Link> */}

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
                        {/* <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Paper>

        </div>
    )
}

export default BlogRow
