import axios from 'axios'
import { IBlog } from '../interfaces/blog'
const baseUrl = '/api/blogs'

let token = ""

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

const getAll = async (): Promise<IBlog[]> => {
  console.log(`connecting to ${baseUrl}`)
  try {
    const response = await axios.get<IBlog[]>(baseUrl);
    return response.data.reverse()
  } catch {
    console.error;
    return []
  }
}

const create = async (newBlog: IBlog): Promise<IBlog> => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data }: { data: IBlog } = await axios.post(baseUrl, newBlog, config);

  return data;
}

export default { getAll, create, setToken }