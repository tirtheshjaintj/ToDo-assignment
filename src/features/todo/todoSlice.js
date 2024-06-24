import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState) {
            return JSON.parse(serializedState);
        } else {
            return [];
        }
    } catch (err) {
        console.error("Could not load state", err);
        return [];
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const initialState = {
    todos: loadState()
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                status: 'pending',
                createdAt: new Date().toISOString(), // Save current date and time
                updatedAt: null  // Initialize updatedAt as null
            };
            state.todos.push(todo);
            saveState(state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveState(state.todos);
        },
        updateTodo: (state, action) => {
            state.todos.forEach((todo) => {
                if (todo.id === action.payload.id) {
                    todo.title = action.payload.title;
                    todo.description = action.payload.description;
                    todo.updatedAt = new Date().toISOString(); // Update updatedAt date and time
                }
            });
            saveState(state.todos);
        },
        toggleStatus: (state, action) => {
            state.todos.forEach((todo) => {
                if (todo.id === action.payload) {
                    todo.status = todo.status === 'pending' ? 'completed' : 'pending';
                    todo.updatedAt = new Date().toISOString(); // Update updatedAt date and time
                }
            });
            saveState(state.todos);
        }
    }
});

export const { addTodo, removeTodo, updateTodo, toggleStatus } = todoSlice.actions;
export default todoSlice.reducer;
