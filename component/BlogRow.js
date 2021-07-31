// import Link from 'next/link'
import { Link } from '@material-ui/core';
const BlogRow = ({blogItem}) => {
    console.info('@@@@', blogItem)
    return (
        <div>
            {/* <Link href="/blog/[id]" as ={`blog/${blogItem.id}`}>
                <a >
                    <h3>{blogItem.title}</h3>
                </a>
            </Link> */}
            <Link href={`blog/${blogItem.id}`}>

                    <h3>{blogItem.title}</h3>
            </Link>
        </div>
    )
}

export default BlogRow
