import blogListStyle from '../styles/BlogList.module.css'
import BlogRow from './BlogRow'

const BlogList = ({blog}) => {
    return (
        <div>
            {blog.map((i) => (<BlogRow key={i.id} blogItem={i} />))}
        </div>
    )
}

export default BlogList
