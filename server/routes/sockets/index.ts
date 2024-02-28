import { Socket } from "socket.io";
import createTable from "../../models/createTables";
import db from "../../utils/mysqlApi";
import { Request } from "express";
import {
  broadcastToAll,
  generateUserId,
  returnErrorSocket,
  returnSuccessSocket,
  sendEmail,
} from "../../utils/functions";
const emailStatus: any[] = [];
const handleSockets = (socket: Socket) => {
  createTable();
  const req = socket.request as Request;
  socket.on("disconnect", (user) => {
    //   logToFile("disconnect");
  });

  socket.on("check-status", () => {
    socket.emit("status", {
      user_id: req.session.user_email,
      user: req.session.user,
      admin: req.session.isAdmin,
    });
  });
  socket.on("get-mailStatus", () => {
    socket.emit("mail-response", {});
  });

  socket.on("get-others", async () => {
    try {
      const data = await db.getAll("others");
      socket.emit("set-others", { data });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
  });
  socket.on("get-summary", async () => {
    // .catch((err) => logToFile(err));
  });
  socket.on("get-others-category", async () => {
    try {
      const data = await db.query("SELECT others_category FROM settings");
      socket.emit("set-others-category", { data: data[0] });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
  });
  socket.on("add-cashin", async ({ amount, desc, category }) => {
    await db
      .insert("cashin", {
        amount,
        category: category.toLowerCase().trim(),
        description: desc.toLowerCase().trim(),
      })
      .then((data) => {
        try {
          db.getAll("cashin")
            .then((data) => {
              socket.emit("set-cashin", { data });
              socket.broadcast.emit("set-cashin", { data });
            })
            .catch((err) => {
              // logToFile(err);
            });
        } catch (error) {
          // logToFile(error);
        }
      });
    // .catch((err) => logToFile(err));
  });
  socket.on("add-cashout", async ({ amount, desc, category }) => {
    db.insert("cashout", {
      amount,
      category: category.toLowerCase().trim(),
      description: desc.toLowerCase().trim(),
    }).then((data) => {
      try {
        db.getAll("cashout")
          .then((data) => {
            socket.emit("set-cashout", { data });
            socket.broadcast.emit("set-cashout", { data });
          })
          .catch((err) => {
            // logToFile(err);
          });
      } catch (error) {
        // logToFile(error);
      }
    });
    // .catch((err) => logToFile(err));
  });
  socket.on("add-others", async ({ desc, amount, category }) => {
    if (desc !== "" && amount !== "" && category !== "") {
      db.insert("others", {
        description: desc.trim(),
        amount,
        category,
      })
        .then((data) => {
          db.getAll("others")
            .then((data) => {
              socket.emit("set-others", { data });
              socket.broadcast.emit("set-others", { data });
            })
            .catch((err) => {
              // logToFile(err);
            });
        })
        .catch((err) => {
          // logToFile(err);
        });
    }
  });

  socket.on("add-others-category", async ({ category }) => {
    try {
      await db.queryString(
        `INSERT INTO settings (id, others_category) VALUES(1, '${JSON.stringify(
          category
        )}') ON DUPLICATE KEY UPDATE others_category = ?`,
        [JSON.stringify(category)]
      );
      const data = await db.query("SELECT others_category FROM settings");
      broadcastToAll(socket, data[0], "set-others-category");
    } catch (error) {
      console.log(error);
    }
  });
  socket.on(
    "add-task",
    async ({ task, assignTo, priority, status, deadline, progress }, then) => {
      try {
        await db.insert("tasks", {
          task: task.toLowerCase().trim(),
          assignTo: JSON.stringify(assignTo),
          priority,
          status,
          deadline: deadline[1],
          progress,
        });

        broadcastToAll(socket, await db.getAll("tasks"), "set-tasks");
        const emails = await db.queryString(
          `SELECT email FROM people WHERE name IN (?)`,
          [assignTo]
        );
        const mailToSend = emails.map(
          (email: { email: string }) => email.email
        );
        const mailResponse = await sendEmail(
          "Ush Engineering Team",
          "Task Assigned To You",
          mailToSend,
          "A task has been assigned to you. Do well to check it out."
        );
        socket.emit("mail-response", {
          status: mailResponse.status,
          message: mailResponse.message?.response?.slice(0, 13),
          to: mailResponse.message?.envelope?.to,
        });
        then(returnSuccessSocket());
      } catch (error) {
        console.log(error);
        then(returnErrorSocket({ message: "Something went wrong. Try again" }));
      }
    }
  );
  socket.on("update-person", async ({ id, value }) => {
    try {
      await db.queryString("UPDATE people SET role = ? WHERE id = ?", [
        JSON.stringify(value),
        id,
      ]);
      broadcastToAll(socket, await db.getAll("people"), "set-people");
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("delete-others", async ({ id }, then) => {
    try {
      if (id) {
        await db.queryString("DELETE FROM others WHERE id = ?", [id]);
        then(returnSuccessSocket());
        broadcastToAll(socket, await db.getAll("others"), "set-others");
      }
    } catch (error) {
      console.log(error);
      then(returnErrorSocket({ message: error }));
    }
  });
};
export default handleSockets;
