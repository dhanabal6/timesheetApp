require("dotenv").config({ path: __dirname + "/../variables.env" });
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const Project = require("../models/Project");
const Story = require("../models/Story");
const Task = require("../models/Task");
const TimeSheet = require("../models/TimeSheet");

const projects = JSON.parse(
  fs.readFileSync(__dirname + "/projects.json", "utf-8")
);
const stories = JSON.parse(
  fs.readFileSync(__dirname + "/stories.json", "utf-8")
);
const tasks = JSON.parse(fs.readFileSync(__dirname + "/tasks.json", "utf-8"));
const timesheets = JSON.parse(fs.readFileSync(__dirname + "/timesheets.json", "utf-8"));

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Project.remove();
  await Story.remove();
  await Task.remove();
  await TimeSheet.remove();
  console.log(
    "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
  );
  process.exit();
}

async function loadData() {
  try {
    await Project.insertMany(projects);
    await Story.insertMany(stories);
    await Task.insertMany(tasks);
    await TimeSheet.insertMany(timesheets);
    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
