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

const handleSockets = (socket: Socket) => {
  createTable();
  const req = socket.request as Request;

  socket.on("disconnect", (user) => {
    //   logToFile("disconnect");
  });

  socket.on("check-status", () => {
    socket.emit("status", {
      user_id: req.session.user_id,
      user: req.session.user,
      admin: req.session.isAdmin,
    });
  });

  socket.on("get-cashin", async () => {
    try {
      const data = await db.getAll("cashin");
      socket.emit("set-cashin", { data });
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("get-cashout", async () => {
    try {
      const data = await db.getAll("cashout");
      socket.emit("set-cashout", { data });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
  });
  socket.on("get-people", async () => {
    try {
      const data = await db.getAll("people");
      socket.emit("set-people", { data });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
  });
  socket.on("get-person", async (id) => {
    try {
      const data = await db.queryString(
        "SELECT * FROM people WHERE user_id = ?",
        [id]
      );
      socket.emit("set-person", { data });
    } catch (error) {
      // logToFile(error);
    }
  });
  // route to get individual tasks
  socket.on("get-task", async (id) => {
    try {
      const data = await db.queryString("SELECT * FROM tasks WHERE id = ?", [
        id,
      ]);
      socket.emit("set-task", { data });
    } catch (error) {
      // logToFile(error);
    }
  });
  socket.on("get-tasks", async () => {
    try {
      const data = await db.getAll("tasks");
      socket.emit("set-tasks", { data });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
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
    try {
      const totalCashin = await db.query(
        `SELECT SUM(amount) AS cashin, category FROM cashin GROUP BY category`
      );
      const totalCashout = await db.query(
        "SELECT SUM(amount) AS cashout, category FROM cashout GROUP BY category"
      );
      let revenue = await db.queryString(
        "SELECT SUM(amount) AS totalRevenue FROM cashin WHERE category = ?",
        ["revenue"]
      );
      let debt = await db.queryString(
        "SELECT SUM(amount) AS totalDebt FROM cashin WHERE category = ?",
        ["debt"]
      );
      let othersArr = await db.query(
        "SELECT SUM(amount) AS amount, category FROM others GROUP BY category"
      );
      let totalRevenue = revenue[0]?.totalRevenue;
      let totalDebt = debt[0]?.totalDebt;
      socket.emit("set-summary", {
        cashin: totalCashin,
        cashout: totalCashout,
        totalRevenue,
        totalDebt,
        other: totalDebt / totalRevenue,
        others2: othersArr,
      });
    } catch (error) {
      // logToFile(error);
      console.log(error);
    }
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
  socket.on("add-person", async ({ name, role, email }, then) => {
    try {
      await db.insert("people", {
        name: name.trim().toLowerCase(),
        role: JSON.stringify(role),
        email: email.trim(),
        password: "123456",
        user_id: generateUserId(),
      });
      then(returnSuccessSocket());
      broadcastToAll(socket, await db.getAll("people"), "set-people");
    } catch (error) {
      then(returnErrorSocket());
      console.log(error);
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

        then(returnSuccessSocket());
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
          "testing"
        );
        console.log(mailResponse);
        socket.emit("mail-response", {
          status: mailResponse,
          message: mailResponse.message?.response?.slice(0, 13),
          to: mailResponse.message?.envelope?.to,
        });
        console.log("done");
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
  socket.on(
    "update-task",
    async (
      { id, task, assignTo, deadline, status, progress, priority },
      then
    ) => {
      try {
        if (id) {
          await db.queryString(
            `UPDATE tasks SET task = ?, assignTo = ?, deadline = ?, status = ?, progress = ?, priority = ? WHERE id = ?`,
            [
              task,
              JSON.stringify(assignTo),
              deadline,
              status,
              progress,
              priority,
              id,
            ]
          );
          then(returnSuccessSocket());
          broadcastToAll(socket, await db.getAll("tasks"), "set-tasks");
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
  socket.on("delete-person", async ({ id }, then) => {
    try {
      if (id) {
        await db.queryString("DELETE FROM people WHERE id = ?", [id]);
        then(returnSuccessSocket());
        broadcastToAll(socket, await db.getAll("people"), "set-people");
      }
    } catch (error) {
      console.log(error);
      then(returnErrorSocket({ message: error }));
    }
  });
  socket.on("delete-task", async ({ id }, then) => {
    try {
      if (id) {
        await db.queryString("DELETE FROM tasks WHERE id = ?", [id]);
        then(returnSuccessSocket());
        broadcastToAll(socket, await db.getAll("tasks"), "set-tasks");
      }
    } catch (error) {
      console.log(error);
      then(returnErrorSocket({ message: error }));
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