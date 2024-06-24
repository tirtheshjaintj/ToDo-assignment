import { createSlice, nanoid } from "@reduxjs/toolkit";

// Function to load todos from localStorage or return an empty array
const loadState = () => {
        const serializedState = localStorage.getItem('todos');
        if (serializedState) {
            return JSON.parse(serializedState);
        } else {
            return [];
        }
    
};

// Function to save todos to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState); // Save todos to localStorage
    } catch (err) {
        console.error("Could not save state", err);
    }
};

// Initialize state with todos loaded from localStorage
const initialState = {
    todos: loadState()
};

// Create todoSlice using Redux Toolkit's createSlice
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Action to add a new todo
        addTodo: (state, action) => {
            // Create a new todo object
            const todo = {
                id: nanoid(), // Generate a unique id
                title: action.payload.title,
                description: action.payload.description,
                status: 'pending',
                createdAt: new Date().toISOString(), // Record creation timestamp
                updatedAt: null // Initialize updatedAt as null
            };
            state.todos.push(todo); // Add the new todo to the todos array
            saveState(state.todos); 
        },

        // Action to remove a todo
        removeTodo: (state, action) => {
            // Filter out the todo with matching id
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveState(state.todos); 
        },

        // Action to update an existing todo
        updateTodo: (state, action) => {
            // Find the todo by id and update its title, description, and updatedAt timestamp
            state.todos.forEach((todo) => {
                if (todo.id === action.payload.id) {
                    todo.title = action.payload.title;
                    todo.description = action.payload.description;
                    todo.updatedAt = new Date().toISOString(); // Update timestamp
                }
            });
            saveState(state.todos); 
        },

        // Action to toggle the status of a todo (pending/completed)
        toggleStatus: (state, action) => {
            // Find the todo by id and toggle its status between pending and completed
            state.todos.forEach((todo) => {
                if (todo.id === action.payload) {
                    todo.status = todo.status === 'pending' ? 'completed' : 'pending';
                    todo.updatedAt = new Date().toISOString(); // Update timestamp
                }
            });
            saveState(state.todos); 
        }
    }
});

// Export individual action creators for ease of use
export const { addTodo, removeTodo, updateTodo, toggleStatus } = todoSlice.actions;

// Default export the reducer function created by createSlice
export default todoSlice.reducer;
