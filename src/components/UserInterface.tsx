import React from 'react'
import { IBlog } from '../interfaces/blog'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { IUser } from '../interfaces/user'
import { INotification } from '../interfaces/notification'

interface UIProps {
    blogs: IBlog[],
    setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>,
    user: IUser,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const UserInterface = ({blogs, setBlogs, user, setUser, setNotification}: UIProps) => {
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={logout}>Logout</button>
    </div>
  )
}


export default UserInterface