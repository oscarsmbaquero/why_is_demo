export interface IUser {
  id: string;
  user: string;
  theme: string;
  language: string;
  token: string;
  rol: string;
  image: string;
  mail: string;
  cp: string;
}

export interface ILoginResponse {
  status: number;
  message: string;
  data: IUser;
}

