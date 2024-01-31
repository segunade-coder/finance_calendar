import db from "../utils/mysqlApi";

const createTable = async () => {
  try {
    await db.createTable(
      "cashin",
      {
        columnName: "amount",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "100",
      },
      {
        columnName: "category",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      },
      {
        columnName: "description",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      }
    );

    await db.createTable(
      "cashout",
      {
        columnName: "amount",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "100",
      },
      {
        columnName: "category",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      },
      {
        columnName: "description",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      }
    );

    await db.createTable(
      "people",
      {
        columnName: "user_id",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "20",
      },
      {
        columnName: "name",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "100",
      },
      {
        columnName: "role",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(role))",
      },
      {
        columnName: "email",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      },
      {
        columnName: "password",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      },
      {
        columnName: "admin",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      }
    );

    await db.createTable(
      "tasks",
      {
        columnName: "task",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "150",
      },
      {
        columnName: "assignTo",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(assignTo))",
      },
      {
        columnName: "deadline",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "60",
      },
      {
        columnName: "status",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "50",
      },
      {
        columnName: "progress",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "50",
      },
      {
        columnName: "priority",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "50",
      }
    );

    await db.createTable(
      "others",
      {
        columnName: "amount",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "100",
      },
      {
        columnName: "category",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      },
      {
        columnName: "description",
        dataType: "varchar",
        condition: "NOT NULL",
        dataTypeLength: "255",
      }
    );

    await db.createTable(
      "settings",
      {
        columnName: "others_category",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(others_category))",
      },
      {
        columnName: "role_category",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(role_category))",
      },
      {
        columnName: "cashin_category",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(cashin_category))",
      },
      {
        columnName: "cashout_category",
        dataType: "JSON",
        condition: "CHECK (JSON_VALID(cashout_category))",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export default createTable;
