import axios from 'axios'
import { IUser } from '../interfaces/user'
const baseUrl = '/api/users'

/* let token = ""

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}
 */

const getAll = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>(baseUrl);
    return response.data.reverse();
  } catch {
    console.error;
    return []
  }
}

const get = async (userId: string): Promise<IUser | null> => {
  try {
    const response = await axios.get<IUser>(`${baseUrl}/${userId}`);
    return response.data;
  } catch {
    console.error;
    return null;
  }
}

/* modify to create, update or delete user, not blog
const create = async (newBlog: IUser): Promise<IUser> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data }: { data: IUser } = await axios.post(baseUrl, newBlog, config);
  
  return data;
}

const update = async (blogId: string, parameters: UpdatableBlogParameters): Promise<IUser> => {
  // debugger;
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data }: { data: IUser } = await axios.put(`${baseUrl}/${blogId}`, parameters, config);
  
  return data;
}
const remove = async (blogId: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config);
} */
export default { getAll, get }