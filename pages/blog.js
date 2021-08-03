import loadable from '@loadable/component'
import { useRouter } from 'next/router';
import Meta from '../component/Meta'
import {CircularProgress } from '@material-ui/core';
// import BlogList from '../component/BlogList'

const BlogList = loadable(() => import('../component/BlogList'))

export default function Blog({blog, isLogin, uDetails}) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }


  return (
    <div>
      <Meta />
      <h1>Blog List</h1>

      <BlogList uDetails={uDetails} refreshData={refreshData} isLogin={isLogin} blog={blog} fallback={<CircularProgress />}/>
    </div>
  )
}

export const getStaticProps = async () => {
  const blogList = await fetch('https://fake-blog-server.herokuapp.com/blog');
  let blog = await blogList.json();

  const galleryList = await fetch('https://fake-blog-server.herokuapp.com/gallery');
  const gallery = await galleryList.json();

  const photoList = await fetch('https://fake-blog-server.herokuapp.com/photos');
  const photos = await photoList.json();
    // TODO: construct blog
    blog.map((row) => {
        let g = gallery.filter(r => row.id === r.blogId);
        // console.info('Gallery', g)
        row.galleryDetails = JSON.parse(JSON.stringify(g[0] || {}));
        g.map(i => {let p = photos.filter(r => i.id === r.galleryId); i.photos = p});
        row.gallery = g;
    });
    console.info("Loaded data: ", blog.length)
  return {
    props: {
      blog
    }
  }
}