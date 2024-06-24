import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (title.trim().length > 3) {
      dispatch(addTodo({
        title,
        description,
      }));
      setTitle('');
      setDescription('');
      toast.success('Todo added successfully!');
    } else {
      toast.error('Todo title must be more than 3 characters');
    }
  };

  return (
    <>
    <div className="flex flex-col w-full items-center">
      <form onSubmit={addTodoHandler} className="w-full md:w-3/4 bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 flex flex-col justify-center ">
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out w-full"
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          className="bg-gray-700 w-full rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-6 transition-colors duration-200 ease-in-out resize-none h-32"
          placeholder="Todo Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
          <motion.button
            type="submit"
            className="text-white text-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-full text-lg"
            whileTap={{ scale: 0.95 }}
          >
            {/* <PlusIcon className="h-6 w-6 mr-1" /> */}
          <span className='flex items-center justify-center font-bold'>  Add Todo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</span>
          </motion.button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default AddTodo;
