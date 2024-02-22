import dotenv from "dotenv";
import mysql from "mysql";
import validator from "validator";
dotenv.config({ path: "../.env" });

import { Response } from "express";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import { Socket } from "socket.io";
import { SendMail, cash, people, settings, tasks } from "../types";
import { logToFile } from "../logToFile";
import db from "./mysqlApi";

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
export const convertToString = (date: Date) =>
  new Date(date).toJSON().slice(0, 10);
export const transformData = (array: tasks[]): SendMail[] =>
  array.map(
    (items): SendMail => ({
      id: items.id,
      sendTo: JSON.parse(items.assignTo),
      deadline: convertToString(new Date(items.deadline)),
      task: items.task,
    })
  );
export const formatTimeAgo = (date: Date) => {
  let formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });
  const DIVISION = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  let duration = (date.valueOf() - new Date().valueOf()) / 1000;
  for (let i = 0; i < DIVISION.length; i++) {
    const division = DIVISION[i];
    if (Math.abs(duration) < division.amount) {
      // @ts-ignore
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
export const sendExpirationEmails = async () => {
  try {
    const [twoWeeksData, oneWeeksData, twoDaysData] = await db.getDataForMail();
    let transformedTwoWeeks = transformData(twoWeeksData);
    let transformedOneWeeks = transformData(oneWeeksData);
    let transformedTwoDays = transformData(twoDaysData);
    const getEmails = [
      ...transformedTwoWeeks.map((data) => data.sendTo).flat(),
      ...transformedOneWeeks.map((data) => data.sendTo).flat(),
      ...transformedTwoDays.map((data) => data.sendTo).flat(),
    ];
    let namesToGetMail = Array.from(new Set(getEmails));
    if (namesToGetMail.length > 0) {
      const placeholders = namesToGetMail.map(() => "?").join(",");
      const mails = await db.queryString(
        `SELECT name, email FROM people WHERE name IN (${placeholders})`,
        namesToGetMail
      );
      await sendMailFnc(transformedTwoDays, mails, 3);
      await sendMailFnc(transformedOneWeeks, mails, 2);
      await sendMailFnc(transformedTwoWeeks, mails, 1);
    } else {
      console.log("no data to run");
      logToFile("no data to run");
    }
  } catch (error) {
    console.log(error);
  }
};
const sendMailFnc = async (
  tasksData: SendMail[],
  emailsToSendTo: any[],
  statusNumber: number
) => {
  try {
    tasksData.forEach(async (item, i) => {
      const findEmail = item.sendTo.map(
        (name) => emailsToSendTo.find((mail) => mail.name === name).email
      );

      const mailResponse = await sendEmail(
        "Ush Engineering Team",
        `Reminder of task '${item.task.slice(0, 5)}...'`,
        findEmail,
        `The Task with task name '${
          item.task
        }' which has been appointed to you still dose\'nt have a status of 'done', and this task will expire ${formatTimeAgo(
          new Date(item.deadline)
        )}. Do well to complete it. <p>Click <a href="${
          process.env.CLIENT_URL
        }/events/event/${
          item.id
        }">here</a> to go to task</p>. <p>Best Regards <br /> Ush Engineering Team.</p>`
      );

      if (mailResponse.status) {
        logToFile("Mail sent successfully with status number " + statusNumber);
        await db.changeMailStatus(item.id, statusNumber);
      } else {
        logToFile(
          "Failed to send mail with status number " +
            statusNumber +
            " Error is " +
            mailResponse.message
        );
      }
    });
  } catch (error) {
    logToFile(error as string);
  }
};
