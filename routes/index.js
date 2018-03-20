const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const storyController = require("../controllers/storyController");
const taskController = require("../controllers/taskController");
const timeSheetController = require("../controllers/timeSheetController");

const { catchErrors } = require("../handlers/errorHandlers");

router.get("/projects", projectController.projectList);

router.post("/projects", projectController.createProject);

router.get("/:projectId/edit", projectController.editProject);

router.post("/:projectId",projectController.updateProject);

router.get("/:projectId/delete",projectController.deleteProject);

router.get("/:projectId/stories", projectController.storyList);

router.post("/:projectId/stories", storyController.createStory);

router.get("/:projectId/:storyId/edit", storyController.editStory);

router.post("/:projectId/:storyId", storyController.updateStory);

router.get("/:projectId/:storyId/delete",storyController.deleteStory);

router.get("/:projectId/:storyId/tasks", storyController.taskList);

router.post("/:projectId/:storyId/tasks", catchErrors(taskController.createTask));

router.get("/:projectId/:storyId/:taskId/edit", taskController.editTask);

router.post("/:projectId/:storyId/:taskId", taskController.updateTask);

router.get("/:projectId/:storyId/:taskId/delete",taskController.deleteTask);

router.get("/timesheets", timeSheetController.timeSheet);

router.post("/timesheets", timeSheetController.createTimeSheet);

/*api*/
router.get("/api/timesheets", timeSheetController.timeSheetSearch);




module.exports = router;
