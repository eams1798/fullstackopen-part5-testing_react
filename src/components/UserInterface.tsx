import React from "react";
import { IBlog } from "../interfaces/blog";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import { IUser } from "../interfaces/user";
import { INotification } from "../interfaces/notification";
import Togglable from "./Togglable";

interface UIProps {
    blogs: IBlog[],
    setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>,
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const UserInterface = ({ blogs, setBlogs, user, setUser, setNotification }: UIProps) => {
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      {user?
        <>
          <p>{user.name} logged in</p>
          <button onClick={logout}>Logout</button>
          <Togglable openButtonLabel='New blog'>
            <></>
            <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
          </Togglable>
        </>
        :<></>}
      <div id="blog-list">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} setNotification={setNotification} />
        )}
      </div>
    </div>
  );
};


export default UserInterface;