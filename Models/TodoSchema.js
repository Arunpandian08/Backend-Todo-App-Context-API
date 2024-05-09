import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

// Method to fetch todos based on status
todoSchema.statics.findByStatus = async function(status) {
  // Use the find method to query todos based on status
  const todos = await this.find({ status });
  return todos;
};


const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
