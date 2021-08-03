import singleStyle from '../../styles/Single.module.scss'
import Image from 'next/image'
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader, IconButton, Link} from '@material-ui/core';
export const getServerSideProps = async (context) => {
    const res = await fetch(`https://fake-blog-server.herokuapp.com/blog/${context.params.id}`);
    const details = await res.json();

    const galleryList = await fetch(`https://fake-blog-server.herokuapp.com/gallery?blogId=${context.params.id}`);
    const gallery = await galleryList.json();
    let queryParam = '';
    gallery.map((row) => queryParam += queryParam.length ? '&galleryId=' + row.id : '?galleryId=' + row.id)

    const photoList = await fetch('https://fake-blog-server.herokuapp.com/photos' + queryParam);
    const photos = await photoList.json();
    gallery.map((row) => row.images = photos.filter(r => row.id === r.galleryId));
    return {
        props: {
            details,
            gallery,
            fallback: false
        }
    }
}

const BlogDetails = ({details, gallery}) => {
    // console.info(details)
    // console.info('gallery',gallery)
    // const itemData = [];
    
    return (
        <div className={singleStyle.blog_details}>
            {(gallery.length > 0 && gallery[0].images.length > 0 ) ? <Image className={singleStyle.single_image}  layout="fill" src={gallery[0].images[0].url} alt={gallery[0].images[0].title} /> : '' }
            <h1 className={singleStyle.title}>{details.title}</h1>
            <p className={singleStyle.body}>{details.body}</p>
            <br/>
            <h1>Gallery</h1>
            <div className={singleStyle.image_gallery}>
                {gallery.map(g => (
                <ImageList key={`img-${g.id}`} rowHeight={300} cols={4} className={singleStyle.image_list}>
                    <ImageListItem key="Subheader" cols={4} style={{ height: 'auto' }}>
                        <ListSubheader component="div" className={singleStyle.image_title}>{g.title}</ListSubheader>
                    </ImageListItem>
                    {g.images.map((item) => (
                    <ImageListItem key={item.id}>
                        <Image src={item.url} alt={item.title}  layout="fill"/>
                        <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: Johnry</span>}
                        // actionIcon={
                        //     <IconButton aria-label={`info about ${item.title}`} className={singleStyle.icon}>
                        //     <InfoIcon />
                        //     </IconButton>
                        // }
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
                ))}
            </div>
            <h3><Link href="/blog">Go Back</Link></h3>
        </div>
    )
}

export default BlogDetails
