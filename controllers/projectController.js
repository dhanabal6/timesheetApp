const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const Story = mongoose.model("Story");
const TimeSheet = mongoose.model("TimeSheet");

exports.homePage = (req, res) => {
	res.render("index", { title: "gotowisdom" });
};

exports.projectList = async (req, res) => {
	const projects = await Project.find();
	res.render("projects", { title: "projectList", projects });
};

exports.createProject = async (req, res) => {
	const project = new Project(req.body);
	await project.save();
	req.flash("success", `create your project ${project.title} sucessfully`);
	res.redirect("back");
};

exports.editProject = async (req, res) => {
	const project = await Project.findOne({ _id: req.params.projectId });
	res.render("editProject", { title: "Edit your Project", project });
};

exports.updateProject = async (req,res) => {
	const project =  await Project.findOneAndUpdate({_id: req.params.projectId}, req.body,
    {upsert:true,new: true,runValidators: true}).exec();
	req.flash('success', 'Successfully updated');
  res.redirect('/projects');
};

exports.deleteProject = async (req,res) => {
   const project = await Project.findOne({_id: req.params.projectId}).remove().exec();
   res.redirect('/projects');
};

exports.storyList = async (req, res) => {
	const storyList = await Project.findOne({ _id: req.params.projectId }).populate('stories');
	res.render("stories", { title: "storyList", storyList });
};

/*exports.timeSheets = async (req,res) => {
	const projects = await Project.getProjects();
	console.log(projects);
   res.render("timeSheet", {title: "TimeSheet", projects})
};*/