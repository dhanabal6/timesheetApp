const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Please enter a project name!"
    },
    slug: String,
    description: {
      type: String,
      trim: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

projectSchema.pre("save", function(next) {
  if (!this.isModified("title")) {
    next();
    return;
  }
  this.slug = slug(this.title);
  next();
});

projectSchema.statics.getProjects = function() {
  return this.aggregate([
    {
      $lookup: {
        from: "stories",
        localField: "_id",
        foreignField: "projectId",
        as: "stories"
      }
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "projectId",
        as: "tasks"
      }
    },
    {
      $project: {
        title: "$$ROOT.title",
        slug: "$$ROOT.slug",
        stories: "$stories",
        tasks: "$tasks"
      }
    }
    // { $unwind: '$stories' },
    // { $unwind: '$tasks' },
  ]);
};

projectSchema.virtual("stories", {
  ref: "Story",
  localField: "_id",
  foreignField: "projectId"
});

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "projectId"
});

function autopopulate(next) {
  this.populate("stories");
  next();
}

projectSchema.pre("find", autopopulate);
projectSchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Project", projectSchema);
