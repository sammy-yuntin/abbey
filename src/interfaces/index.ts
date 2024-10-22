import * as Sequelize from "sequelize";

export interface ResponseInterface {
  code?: number;
  data?: object;
  status: string;
  message?: string;
}

export interface UserPayload {
  id?: number;
  email: string;
  username: string;
  password: string;
  image: string;
  creditBalance: number;
}

export interface UserModel extends Sequelize.Model<UserModel, UserPayload> {
  id: number;
  username: string;
  email: string;
  password: string;
  creditBalance: number;
  createdAt: string;
  updatedAt: string;
}

export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  ALREADY_EXISTS = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}
