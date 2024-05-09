import Todo from "../Models/TodoSchema.js";
import dotenv from "dotenv";
import { format } from "date-fns";

dotenv.config();

// Add Todo's to db
export const addingTodo = async (request, response) => {
  const { title, date, description } = request.body;
  // Parse the date string into a Date object
  const parsedDate = new Date(date);
  const formattedDate = format(parsedDate, "MM-dd-yyyy");
  // console.log(formattedDate)
  try {
    // Create a new todo instance
    const newTodo = new Todo({
      title,
      date: formattedDate,
      description,
      status:"pending"
    });
    // Save the new todo to the database
    const savedTodo = await newTodo.save();
    // Format the date to "dd-mm-yyyy"
    // Send the formatted date along with the response
    response
      .status(201)
      .json({
        message: "Todo added successfully",
        data: { ...savedTodo, date: formattedDate },
      });
  } catch (error) {
    console.error("Failed to add todo:", error);
    response.status(500).json({ message: "Failed to add todo", error });
  }
};

//Get call to get all todo's are saved in db
export const fetchingTodos = async (request, response) => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return response.status(200).json({ message: "Todo List is Empty..!!" });
    }
    response.status(200).json({ message: "Fetched Successful", data: todos });
  } catch (error) {
    response
      .status(404)
      .json({ message: "Data Not Found or List is empty", error });
  }
};

//fetchingTodosByStatus
export const fetchingTodosByStatus = async (request,response)=>{
  //receiving status form url 
  const {status} = request.params
  try {
    // to find todos based on their status
    const todos = await Todo.findByStatus(status);
    response.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a Todo Status
export const updatingStatus = async (request, response) => {
  const id = request.params._id;
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return response.status(404).json({ message: "Todo not found" });
    }

    if (todo.status === "completed") {
      return response
        .status(400)
        .json({ message: "Todo is already completed" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { status: request.body.status },
      { new: true }
    );
    return response
      .status(200)
      .json({ message: "Updated Successful", data: updatedTodo });
  } catch (error) {
    console.error("Cannot Update Status", error);
    return response
      .status(500)
      .json({ message: "Failed to Update Status", error });
  }
};

//Delete Todo

export const deleteTodo = async (request, response) => {
  try {
    await Todo.findByIdAndDelete(request.params.id);
    response.status(200).json({ message: "Deleted Successful" });
  } catch (error) {
    console.error("Error to Delete Todo", error);
    response.status(500).json({ message: "Cannot Delete Todo", error });
  }
};
