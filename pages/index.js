import Meta from '../component/Meta'
import BlogList from '../component/BlogList'
import Image from 'next/image'

export default function Home({blog}) {
  console.log(blog);
  return (
    <div>
      <Meta />
      <h1>hello world!</h1>
      
      <BlogList blog={blog}/>

    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://fake-blog-server.herokuapp.com/blog');
  const blog = await res.json();
  return {
    props: {
      blog
    }
  }
}