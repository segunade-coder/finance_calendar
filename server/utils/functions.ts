import dotenv from "dotenv";
import mysql from "mysql";
import validator from "validator";
dotenv.config({ path: "../.env" });

import { Response } from "express";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import { Socket } from "socket.io";
import { cash, people, settings, tasks } from "../types";

export const generateRandomId = function (): string {
  let randomValues: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return randomValues
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (
  from: string = "Ush Engineering Team",
  subject: string,
  to: string | string[],
  html: any
) => {
  const mailOptions: MailOptions = {
    from: from + " <ushengineering@gmail.com>",
    to,
    subject,
    html,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      status: true,
      message: result,
    };
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const returnJSONSuccess = (
  responseObject: Response,
  rest?: object | undefined,
  status = 200
) => {
  responseObject.status(status);
  return responseObject.json({
    status: true,
    message: "Successful",
    ...rest,
  });
};
export const returnJSONError = (
  responseObject: Response,
  rest?: object | undefined,
  status = 400
) => {
  responseObject.status(status);
  responseObject.json({
    status: false,
    message: "Error: An error occurred",
    ...rest,
  });
};
export const returnSuccessSocket = (rest = {}) => ({
  status: true,
  message: "Successful",
  ...rest,
});
export const returnErrorSocket = (rest = {}) => ({
  status: false,
  message: "Error",
  ...rest,
});
export const escape = (value: any) => mysql.escape(value);
export const generateUserId = (repeatNumber: number = 4) =>
  Math.floor(Math.random() * parseInt("9".repeat(repeatNumber)));
export const validateAPi = (key: string) => {
  if (key === null || key === undefined) {
    return false;
  } else {
    if (
      validator.isEmpty(key) ||
      !validator.equals(key, process.env.API_KEY as string)
    ) {
      return false;
    }
  }
  return true;
};

export const checkIfEmpty = (values: object[]): string[] => {
  let errors: string[] = [];
  values.forEach((value) => {
    let objValues = Object.values(value)[0] || null;
    if (objValues === "" || objValues === null || objValues === undefined) {
      let objKey = Object.keys(value);
      errors.push(`${objKey[0]} is required`);
    }
  });
  return errors;
};
export const broadcastToAll = (
  socket: Socket,
  data: Array<cash | people | tasks | settings>,
  event_name: string
) => {
  socket.emit(event_name, { data });
  socket.broadcast.emit(event_name, { data });
};
