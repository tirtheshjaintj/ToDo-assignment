import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  // Function to handle form submission when adding a new todo
  const addTodoHandler = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Validate if the todo title is longer than 3 characters
    if (title.trim().length > 3) {
      // Dispatch the addTodo action with title and description
      dispatch(addTodo({
        title,
        description,
      }));
      // Clear input fields after successfully adding the todo
      setTitle('');
      setDescription('');
      // Show success toast notification
      toast.success('Todo added successfully!');
    } else {
      // Show error toast if todo title is too short
      toast.error('Todo title must be more than 3 characters');
    }
  };

  return (
    <>
      {/* Form to add a new todo */}
      <div className="flex flex-col w-full items-center">
        <form onSubmit={addTodoHandler} className="w-full md:w-3/4 bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 flex flex-col justify-center ">
          {/* Input field for todo title */}
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out w-full"
              placeholder="Todo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Textarea for todo description */}
          <textarea
            className="bg-gray-700 w-full rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-6 transition-colors duration-200 ease-in-out resize-none h-32"
            placeholder="Todo Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Button to submit the form */}
          <motion.button
            type="submit"
            className="text-white text-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full text-lg"
            whileTap={{ scale: 0.95 }} // Scale animation on tap
          >
            {/* Button text with icon */}
            <span className='flex items-center justify-center font-bold'>  
              Add Todo
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> {/* SVG icon */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> {/* Icon path */}
              </svg>
            </span>
          </motion.button>
        </form>
        {/* Toast notifications for success and error messages */}
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default AddTodo;
