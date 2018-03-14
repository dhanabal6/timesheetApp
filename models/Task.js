const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: "You must supply a store!"
    },
    storyId: {
      type: mongoose.Schema.ObjectId,
      ref: "Story",
      required: "You must supply a store!"
    },
    tasktitle: {
      type: String,
      trim: true
    },
    slug: String,
    taskdescription: {
      type: String,
      trim: true
    },
    estimatetime: {
      type: Number
    },
    roll: {
      type: String,
      trim: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

taskSchema.pre("save", function(next) {
  if (!this.isModified("tasktitle")) {
    next();
    return;
  }
  this.slug = slug(this.tasktitle);
  next();
});

module.exports = mongoose.model("Task", taskSchema);
