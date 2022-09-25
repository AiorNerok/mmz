import React from "react";

export interface ILayout {
  children: React.ReactNode | React.ReactNode;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

type IAlertType = "succuse" | "error";

export interface IAlert {
  msg: string;
  type: IAlertType;
}

export interface IPost {
  id: number;
  title: string;
  description: string;
  created_at: string;
  user_id: number;
}

export interface IPostEditable extends IPost {
  editable: boolean;
}

export type TEditPost = Pick<IPost, "title" | "description" | "id">;
export type TDeletePost = Pick<IPost, "id">;

export interface IAuthors {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface ILogs {
  id: string;
  user_id: string;
  methods: string;
  username: string;
  description: string;
  time: string;
}
