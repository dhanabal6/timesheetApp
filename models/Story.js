const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: "You must supply a store!"
    },
    storytitle: {
      type: String,
      trim: true
    },
    slug: String,
    storydescription: {
      type: String,
      trim: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

storySchema.pre("save", function(next) {
  if (!this.isModified("storytitle")) {
    next();
    return;
  }
  this.slug = slug(this.storytitle);
  next();
});

storySchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "storyId"
});

function autopopulate(next) {
  this.populate("tasks");
  next();
}

storySchema.pre("find", autopopulate);
storySchema.pre("findOne", autopopulate);

module.exports = mongoose.model("Story", storySchema);
