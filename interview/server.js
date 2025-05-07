const express = require("express");
const db = {
  instituteTypeList: [
    {
      id: 1,
      name: "Playhouse",
    },
    { id: 2, name: "School" },
    { id: 3, name: "college" },
    { id: 4, name: "competitive exam center" },
  ],

  boards: [
    {
      id: 1,
      name: "GSAB",
      mediums: ["english", "hindi"],
    },
    {
      id: 2,
      name: "CBSE",
      mediums: ["english", "hindi"],
    },
  ],

  univercities: [
    {
      id: 1,
      name: "Gujarat",
      mediums: ["english", "hindi"],
      courses: ["Bsc, Msc"],
    },
    {
      id: 2,
      name: "Saurashtra",
      mediums: ["english", "hindi"],
      courses: ["Doctor", "B.Pharm"],
    },
  ],

  classes: [
    {
      id: 1,
      name: "Pre Primary",
      type: "School",
      standardOptions: [
        { id: 1, name: "LKG", subjects: ["Drawing", "Running", "Dance"] },
        { id: 2, name: "HKG", subjects: ["Drawing", "Running", "Basic Maths"] },
      ],
    },
    {
      id: 2,
      name: "High Secondary",
      type: "School",
      standardOptions: [
        { id: 1, name: "8", subjects: ["Science", "Maths", "English"] },
        { id: 1, name: "9", subjects: ["Science", "Maths", "English"] },
        { id: 1, name: "10", subjects: ["Science", "Maths", "English"] },
      ],
    },
    {
      id: 2,
      name: "First Year",
      type: "College",
      standardOptions: [
        {
          id: 1,
          name: "FY",
          subjects: ["Organic Chemistry", "Physical Chemistry"],
        },
      ],
    },
  ],
};

const listType = (request, response) => {
  const list = db.instituteTypeList.map((it) => it.name);
  return response.status(200).json({
    data: list,
  });
};

const listBoard = (request, response) => {
  const boardList = db.boards.map((it) => it.name);
  return response.status(200).json({
    data: boardList,
  });
};

const addBoard = (request, response) => {
  const { name, mediums } = request.body;

  // save into the DB
  // NOTE: static id but in production we generate by uuid module
  db.boards.push({ id: "10", name, mediums });

  const boardList = db.boards.map((it) => it.name);
  return response.status(200).json({
    data: boardList,
  });
};

const updateBoard = (request, response) => {
  const { boardId } = request.params;
  // Based on boardid update record in DB
};

const deleteBoard = (request, response) => {
  const { boardId } = request.params;

  // Based on boardid delete record from DB
};

const checkAdmin = (request, response, next) => {
  const token = request.headers.authorization;

  // Validate the token using JWT and check the access

  if (token) {
    next();
  } else {
    return response.status(400).json({
      message: "Unauthorize",
    });
  }
};

const listCategory = (request, response) => {
  const { name } = request.params;

  const cate = db.classes.find((it) => it.type === name);
  return response.status(200).json({
    data: cate,
  });
};

const listUnivercity = (request, response) => {
  const univercities = db.univercities;
  return response.status(200).json({
    data: univercities,
  });
};

// TODO: Add admin manage board

const server = () => {
  const app = express();

  app.use(express.json());

  // This is for list institute
  app.get("/list-institute", listType);

  app.get("/list-board", listBoard);

  app.post("/board", checkAdmin, addBoard);

  app.put("/board", checkAdmin, updateBoard);

  app.delete("/board", checkAdmin, deleteBoard);

  app.get("/category/:name", listCategory);

  app.get("/univercity", listUnivercity);

  app.listen(3000, () => {
    console.log("Running on 3000");
  });
};
server();
