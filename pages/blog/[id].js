export const getServerSideProps = async (context) => {
    const res = await fetch(`https://fake-blog-server.herokuapp.com/blog/${context.params.id}`);
    const details = await res.json();

    return {
        props: {
            details,
            fallback: false
        }
    }
}

const BlogDetails = ({details}) => {
    // console.info(details)
    return (
        <div>
            <h1>singl page</h1>
        </div>
    )
}

export default BlogDetails
