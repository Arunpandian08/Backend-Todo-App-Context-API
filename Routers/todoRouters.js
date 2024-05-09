import express from 'express';
import { addingTodo, deleteTodo, fetchingTodos, fetchingTodosByStatus, updatingStatus } from '../Controllers/TodoControllers.js';


const router = express.Router()

router.post('/add-todo',addingTodo)
router.get('/get-todo',fetchingTodos)
router.get('/get-todos/:status',fetchingTodosByStatus)
router.put('/status/:_id',updatingStatus)
router.delete('/delete-todo/:id',deleteTodo)


export default router;