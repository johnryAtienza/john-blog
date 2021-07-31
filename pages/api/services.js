export const getStaticProps = async () => {
    const res = await fetch('https://fake-blog-server.herokuapp.com/blog');
    const blog = await res.json();
    return {
      props: {
        blog
      }
    }
  }
