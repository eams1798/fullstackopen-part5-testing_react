export interface loginCredentials {
  username: string,
  password: string
}

export interface signUpCredentials {
  name: string,
  username: string,
  password: string
}

export interface loginResponse {
  token: string,
  username: string,
  name: string,
  id?: string
}

export interface ErrorResponse {
  error: string;
}