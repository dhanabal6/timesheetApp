const mongoose = require("mongoose");
const TimeSheet = mongoose.model("TimeSheet");
const Project = mongoose.model("Project");

exports.timeSheet = async (req, res) => {
	const projects = await Project.getProjects();
	// console.log(projects);
	res.render("timeSheet", { title: "TimeSheet", projects });
};

exports.timeSheetSearch = async (req, res) => {
	const date = req.query.date;
	const timesheets = await TimeSheet.find({
		created: {
			$eq: date
		}
	});
	res.json(timesheets);
};

exports.createTimeSheet = async (req, res) => {
	const timesheets = new TimeSheet(req.body);
	await timesheets.save();
	res.redirect("back");
};
