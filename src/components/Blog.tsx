import { IBlog } from "../interfaces/blog"
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { IUser } from "../interfaces/user";
import { INotification } from "../interfaces/notification";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/login";

interface IBlogProps {
  blog: IBlog,
  setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>,
  user: IUser | null,
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Blog = ({blog, setBlogs, user, setNotification}: IBlogProps) => {
  const like = async () => {
    const updatedBlog = await blogService.update(blog.id || "", {
      likes: (blog.likes || 0) + 1
    });
    
    setBlogs(blogs => {
      const currentBlogIndex = blogs.findIndex(blog => blog.id === updatedBlog.id);
      const newBlogList = [...blogs];
      newBlogList.splice(currentBlogIndex, 1, updatedBlog);
      
      return (newBlogList);
    })
  }
  
  const remove = async () => {
    try {
      await blogService.remove(blog.id || "");
      setBlogs(blogs => {
        const currentBlogIndex = blogs.findIndex(currBlog => currBlog.id === blog.id);
        const newBlogList = [...blogs];
        newBlogList.splice(currentBlogIndex, 1);
  
        return (newBlogList);
      });
      setNotification({
        type: "ok",
        message: `Blog ${blog.title} by ${blog.author || ""} deleted succesfully`
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorResponse = axiosError.response?.data as ErrorResponse;
        setNotification({
          type: "error",
          message: errorResponse.error
        });
      } else {
        console.log(error);
      }
    }
  };
  return (
  <Togglable openButtonLabel="show" closeButtonLabel="hide">
    <h3>{blog.title}</h3>
    <>
      <ul><h3>{blog.title}</h3>
        <li>Author: {blog.author}</li>
        <li>URL: {blog.url}</li>
        <li>
          Likes: {blog.likes}
          {user?
          <button onClick={() => void like()}>Like</button>
          :<></>}
          {blog.user?.username === user?.username ?
          <button onClick={() => void remove()}>Delete</button>: <></>}
        </li>
      </ul>
    </>
    </Togglable>
  )}

export default Blog;