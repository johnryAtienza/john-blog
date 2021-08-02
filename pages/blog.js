import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Meta from '../component/Meta'
import BlogList from '../component/BlogList'
import Image from 'next/image'

export default function Blog({blog, isLogin}) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
  return (
    <div>
      <Meta />
      <h1>Blog List</h1>
      <BlogList refreshData={refreshData} isLogin={isLogin} blog={blog}/>
    </div>
  )
}

export const getStaticProps = async () => {
  const blogList = await fetch('https://fake-blog-server.herokuapp.com/blog');
  let blog = await blogList.json();
  // console.info('>>>>',blog);

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
  return {
    props: {
      blog
    }
  }
}