const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const timesheetSchema = new mongoose.Schema(
  {
    projecttitle: {
      type: String,
      trim: true
    },
    storytitle: {
      type: String,
      trim: true
    },
    tasktitle: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    time: {
      type: Number,
      trim: true
    },
    created: {
      type: String,
      trim: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

timesheetSchema.pre("save", function(next) {
  next();
});

timesheetSchema.index({
  created: 1
});

module.exports = mongoose.model("TimeSheet", timesheetSchema);
