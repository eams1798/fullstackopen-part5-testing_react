import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { IBlog } from './interfaces/blog'
import { IUser } from './interfaces/user'
import { loginResponse } from './interfaces/login'
import LoginForm from './components/LoginForm'
import UserInterface from './components/UserInterface'
import Notification from './components/Notification'
import { INotification } from './interfaces/notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [notification, setNotification] = useState<INotification>({
    type: null,
    message: ""
  })

  useEffect(() => {
    const getAllBlogs = async() => {
      try {
        const blogs = await blogService.getAll()
        setBlogs( blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0)) );
      } catch {
        console.error;
      }
    };
    void getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser') || "";
    if (loggedUserJSON) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: loginResponse = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification
        objNotification={notification}
        setNotification={setNotification} />
      {!user?
      <Togglable openButtonLabel="Login">
        <></>
        <LoginForm
          setUser={setUser}
          setNotification={setNotification} />
      </Togglable>
        :
          <></>
        }
      <UserInterface
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setUser={setUser}
        setNotification={setNotification} />
    </div>
  );
}

export default App