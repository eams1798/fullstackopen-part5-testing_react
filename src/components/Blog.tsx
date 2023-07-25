import { IBlog } from "../interfaces/blog"

const Blog = ({blog}: {blog: IBlog}) => (
  <ul><h3>{blog.title}</h3>
    <li>Author: {blog.author}</li>
    <li>URL: {blog.url}</li>
    <li>Author: {blog.likes}</li>
  </ul>
)

export default Blog;