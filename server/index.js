const express = require("express");
const app = express();
const server = require("http").createServer(app);
const origin = ["http://localhost:5173"];
const cors = require("cors");
const dbQueries = require("./mysqlApi");
const connection = require("./db");
const { createTable } = require("./createTables");
const db = new dbQueries(connection);
const path = require("path");
const logToFile = require("./logToFile");
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(server, {
  cors: {
    origin: origin,
  },
});
app.set("trust proxy", 1);
app.use(express.static(path.resolve(__dirname, "./dist")));
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(express.json());

io.on("connection", (socket) => {
  createTable();

  socket.on("disconnect", (user) => {
    logToFile("disconnect");
  });

  socket.on("get-cashin", () => {
    try {
      db.getAll("cashin")
        .then((data) => {
          socket.emit("set-cashin", { data });
        })
        .catch((err) => {
          logToFile(err);
        });
      // logToFile(data);
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("get-cashout", () => {
    try {
      db.getAll("cashout")
        .then((data) => {
          socket.emit("set-cashout", { data });
        })
        .catch((err) => {
          logToFile(err);
        });
      // logToFile(data);
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("get-people", () => {
    try {
      db.getAll("people")
        .then((data) => {
          socket.emit("set-people", { data });
        })
        .catch((err) => {
          logToFile(err);
        });
      // logToFile(data);
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("get-tasks", () => {
    try {
      db.getAll("tasks")
        .then((data) => {
          socket.emit("set-tasks", { data });
        })
        .catch((err) => {
          logToFile(err);
        });
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("get-others", () => {
    try {
      db.getAll("others")
        .then((data) => {
          socket.emit("set-others", { data });
        })
        .catch((err) => {
          logToFile(err);
        });
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("get-summary", () => {
    db.query(`SELECT SUM(amount) AS cashin, category FROM cashin GROUP BY category`)
      .then((data) => {
        db.query("SELECT SUM(amount) AS cashout, category FROM cashout GROUP BY category")
          .then(async (data2) => {
            try {
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
                cashin:data,
                cashout:data2,
                totalRevenue,
                totalDebt,
                other: totalDebt / totalRevenue,
                others2: othersArr,
              });
            } catch (error) {
              logToFile(error);
            }
          })
          .catch((error) => logToFile(error));
      })
      .catch((err) => logToFile(err));
  });
  socket.on("get-others-category", () => {
    try {
      db.query("SELECT others_category FROM settings")
        .then((data) => {
          socket.emit("set-others-category", { data: data[0] });
        })
        .catch((err) => {
          logToFile(err);
        });
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on("add-cashin", ({ amount, desc, category }) => {
    db.insert("cashin", {
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
              logToFile(err);
            });
          // logToFile(data);
        } catch (error) {
          logToFile(error);
        }
      })
      .catch((err) => logToFile(err));
  });
  socket.on("add-cashout", ({ amount, desc, category }) => {
    db.insert("cashout", {
      amount,
      category: category.toLowerCase().trim(),
      description: desc.toLowerCase().trim(),
    })
      .then((data) => {
        try {
          db.getAll("cashout")
            .then((data) => {
              socket.emit("set-cashout", { data });
              socket.broadcast.emit("set-cashout", { data });
            })
            .catch((err) => {
              logToFile(err);
            });
          // logToFile(data);
        } catch (error) {
          logToFile(error);
        }
      })
      .catch((err) => logToFile(err));
  });
  socket.on("add-others", ({ desc, amount, category }) => {
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
              logToFile(err);
            });
        })
        .catch((err) => {
          logToFile(err);
        });
    }
  });
  socket.on("add-person", ({ name, role }) => {
    db.insert("people", {
      name: name.trim().toLowerCase(),
      role: JSON.stringify(role),
    })
      .then((data) => {
        try {
          db.getAll("people")
            .then((data) => {
              socket.emit("set-people", { data });
              socket.broadcast.emit("set-people", { data });
            })
            .catch((err) => {
              logToFile(err);
            });
        } catch (error) {
          logToFile(error);
        }
      })
      .catch((err) => logToFile(err));
  });
  socket.on("add-others-category", ({ category }) => {
    try {
      db.queryString(
        `INSERT INTO settings (id, others_category) VALUES(1, '${JSON.stringify(
          category
        )}') ON DUPLICATE KEY UPDATE others_category = ?`,
        [JSON.stringify(category)]
      )
        .then((data) => {
          db.query("SELECT others_category FROM settings")
            .then((data) => {
              socket.emit("set-others-category", { data: data[0] });
              socket.broadcast.emit("set-others-category", { data: data[0] });
            })
            .catch((err) => {
              logToFile(err);
            });
        })
        .catch((err) => {
          logToFile(err);
        });
    } catch (error) {
      logToFile(error);
    }
  });
  socket.on(
    "add-task",
    ({ task, assignTo, priority, status, deadline, progress }) => {
      db.insert("tasks", {
        task: task.toLowerCase().trim(),
        assignTo: JSON.stringify(assignTo),
        priority,
        status,
        deadline: deadline[1],
        progress,
      })
        .then((data) => {
          try {
            db.getAll("tasks")
              .then((data) => {
                socket.emit("set-tasks", { data });
                socket.broadcast.emit("set-tasks", { data });
              })
              .catch((err) => {
                logToFile(err);
              });
          } catch (error) {
            logToFile(error);
          }
        })
        .catch((err) => logToFile(err));
    }
  );
  socket.on("update-person", ({ id, value }) => {
    db.queryString("UPDATE people SET role = ? WHERE id = ?", [
      JSON.stringify(value),
      id,
    ])
      .then((data) => {
        try {
          db.getAll("people")
            .then((data) => {
              socket.emit("set-people", { data });
              socket.broadcast.emit("set-people", { data });
            })
            .catch((err) => {
              logToFile(err);
            });
        } catch (error) {
          logToFile(error);
        }
      })
      .catch((err) => logToFile(err));
  });

  socket.on(
    "update-task",
    ({ id, assignTo, deadline, status, progress, priority }) => {
      if (id) {
        db.queryString(
          `UPDATE tasks SET assignTo = ?, deadline = ?, status = ?, progress = ?, priority = ? WHERE id = ?`,
          [JSON.stringify(assignTo), deadline, status, progress, priority, id]
        )
          .then((data) => {
            try {
              db.getAll("tasks")
                .then((data) => {
                  socket.emit("set-tasks", { data });
                  socket.broadcast.emit("set-tasks", { data });
                })
                .catch((err) => {
                  logToFile(err);
                });
            } catch (error) {
              logToFile(error);
            }
          })
          .catch((err) => logToFile(err));
      }
    }
  );
  socket.on("delete-person", ({ id }) => {
    if (id) {
      db.queryString("DELETE FROM people WHERE id = ?", [id])
        .then((data) => {
          try {
            db.getAll("people")
              .then((data) => {
                socket.emit("set-people", { data });
                socket.broadcast.emit("set-people", { data });
              })
              .catch((err) => {
                logToFile(err);
              });
          } catch (error) {
            logToFile(error);
          }
        })
        .catch((err) => logToFile(err));
    }
  });
  socket.on("delete-task", ({ id }) => {
    if (id) {
      db.queryString("DELETE FROM tasks WHERE id = ?", [id])
        .then((data) => {
          try {
            db.getAll("tasks")
              .then((data) => {
                socket.emit("set-tasks", { data });
                socket.broadcast.emit("set-tasks", { data });
              })
              .catch((err) => {
                logToFile(err);
              });
          } catch (error) {
            logToFile(error);
          }
        })
        .catch((err) => logToFile(err));
    }
  });
  socket.on("delete-others", ({ id }) => {
    if (id) {
      db.queryString("DELETE FROM others WHERE id = ?", [id])
        .then((data) => {
          try {
            db.getAll("others")
              .then((data) => {
                socket.emit("set-others", { data });
                socket.broadcast.emit("set-others", { data });
              })
              .catch((err) => {
                logToFile(err);
              });
          } catch (error) {
            logToFile(error);
          }
        })
        .catch((err) => logToFile(err));
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
});
server.listen(PORT, (err) => {
  if (err) {
    logToFile(err);
    throw err;
  }
  console.clear();
  logToFile(`compiled succesfully!`);
  logToFile("");
  logToFile(`You can view app in the browser.`);
  logToFile("");
});
