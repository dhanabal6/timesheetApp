const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const Story = mongoose.model("Story");

exports.createStory = async (req, res) => {
	req.body.projectId = req.params.projectId;
	const newStory = new Story(req.body);
	await newStory.save();
	req.flash("success", "Story Saved!");
	res.redirect('back');
};

exports.editStory = async (req, res) => {
	const story = await Story.findOne({ _id: req.params.storyId });
	res.render("editStory", { title: "Edit your Project", story });
};

exports.updateStory = async (req,res) => {
	const story =  await Story.findOneAndUpdate({_id: req.params.storyId}, req.body,
    {upsert:true,new: true,runValidators: true}).exec();
	req.flash('success', 'Successfully updated');
  res.redirect(`/${story.projectId}/stories`);
};

exports.deleteStory = async (req,res) => {
	console.log(req.params.storyId);
	console.log(req.params.projectId);
   const story = await Story.findOne({_id: req.params.storyId}).remove().exec();
   res.redirect('back');
};

exports.taskList = async (req, res) => {
	const taskList = await Story.findOne({_id: req.params.storyId }).populate('tasks');
	res.render("tasks", { title: "TaskList", taskList });
};
