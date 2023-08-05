import axios from "axios";
import { IBlog, UpdatableBlogParameters } from "../interfaces/blog";
const baseUrl = "/api/blogs";


let token = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};


const getAll = async (): Promise<IBlog[]> => {
  console.log(`connecting to ${baseUrl}`);
  try {
    const response = await axios.get<IBlog[]>(baseUrl);
    return response.data.reverse();
  } catch {
    console.error;
    return [];
  }
};

const create = async (newBlog: IBlog): Promise<IBlog> => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const { data }: { data: IBlog } = await axios.post(baseUrl, newBlog, config);
  //data.user is returned as a string, but we need the user object
  /* const blogUser = await userService.get(data.user || "");
  if (blogUser) {
    data.user = blogUser;
  } */

  return data;
};

const update = async (blogId: string, parameters: UpdatableBlogParameters): Promise<IBlog> => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const { data }: { data: IBlog } = await axios.put(`${baseUrl}/${blogId}`, parameters, config);
  //data.user is returned as a string, but we need the user object
  /* const blogUser = await userService.get(data.user || "");
  if (blogUser) {
    data.user = blogUser;
  } */

  return data;
};
const remove = async (blogId: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};
export default { getAll, create, update, remove, setToken };