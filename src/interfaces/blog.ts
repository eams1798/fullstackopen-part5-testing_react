import { IUser } from "./user";

export interface IBlog {
  title:  string;
  author?: string;
  url:    string;
  likes?:  number;
  user?:   IUser;
  id?:     string;
}