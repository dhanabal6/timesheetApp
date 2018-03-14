const mongoose = require("mongoose");
const Task = mongoose.model("Task");

exports.createTask = async (req, res) => {
  req.body.storyId = req.params.storyId;
  req.body.projectId = req.params.projectId;
  const newTask = new Task(req.body);
  await newTask.save();
  req.flash("success", "Tasks Saved!");
  res.redirect('back');
};

exports.editTask = async (req, res) => {
	console.log(req.params.taskId);
	const task = await Task.findOne({ _id: req.params.taskId });
	console.log(task);
	res.render("editTask", { title: "Edit your Project", task });
};

exports.updateTask = async (req,res) => {
	const task =  await Task.findOneAndUpdate({_id: req.params.taskId}, req.body,
    {upsert:true,new: true,runValidators: true}).exec();
	req.flash('success', 'Successfully updated');
  res.redirect(`/${task.projectId}/${task.storyId}/tasks`);
};

exports.deleteTask = async (req,res) => {
   const task = await Task.findOne({_id: req.params.taskId}).remove().exec();
   res.redirect('back');
};
