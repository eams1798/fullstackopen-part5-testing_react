import React, { useState } from "react";
import { IBlog } from "../interfaces/blog";
import blogService from "../services/blogs";
import { INotification } from "../interfaces/notification";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/login";

interface IBlogFormProps {
  setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const BlogForm = ({ setBlogs, setNotification }: IBlogFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);

  const addBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogObject = { title, url, author, likes };

    try {
      const returnedBlog = await blogService.create(blogObject);
      setNotification({
        type: "ok",
        message: `A new blog ${title} by ${author} added`
      });
      setBlogs((blogs) => [returnedBlog, ...blogs]);
      setTitle("");
      setAuthor("");
      setURL("");
      setLikes(0);
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

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "url") setURL(e.target.value);
    if (field === "author") setAuthor(e.target.value);
    if (field === "likes") setLikes(parseInt(e.target.value));
  };

  return (
    <form id="form-addBlog" onSubmit={(e) => { void addBlog(e); }}>
      <div className="form-field">
        <label htmlFor="title" >Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => handleFieldChange(e, "title")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="author" >Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => handleFieldChange(e, "author")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="url" >Url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => handleFieldChange(e, "url")}
        />
      </div>
      <div className="form-field">
        <label htmlFor="likes" >Likes</label>
        <input
          type="number"
          id="likes"
          name="likes"
          value={likes}
          onChange={(e) => handleFieldChange(e, "likes")}
        />
      </div>
      <button className="btn-add" type="submit">Add blog</button>
    </form>
  );};

export default BlogForm;