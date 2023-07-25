import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { IUser } from "../interfaces/user";
import { INotification } from "../interfaces/notification";
import { ErrorResponse } from "../interfaces/login";
import axios, { AxiosError } from "axios";

interface ILoginProps {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setNotification: React.Dispatch<React.SetStateAction<INotification>>,
}

const LoginForm = ({ setUser, setNotification }: ILoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      setUser(user)
      setUsername('')
      setPassword('')
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
  }
  
  return (
    <form onSubmit={(e) => { void handleLogin(e) }}>
      <div>
        <label htmlFor="username" >Username</label>
          <input
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" >Password</label>
          <input
          type="password"
          id="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
};


export default LoginForm;