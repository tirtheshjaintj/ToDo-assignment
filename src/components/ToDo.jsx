import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleStatus, updateTodo } from '../features/todo/todoSlice';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

Modal.setAppElement('#root');

function Todos() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const openModal = (todo) => {
        setCurrentTodo(todo);
        setEditText(todo.title);
        setEditDescription(todo.description);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentTodo(null);
        setEditText('');
        setEditDescription('');
    };

    const handleEditSave = () => {
        dispatch(updateTodo({
            id: currentTodo.id,
            title: editText,
            description: editDescription
        }));
        closeModal();
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeTodo(id));
               toast.success("Task Deleted Successfully");
            }
        });
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {todos.length > 0 && (
                <div className='font-bold m-2 text-3xl pt-3 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-5 space-x-2'>
                    Your Todos
                </div>
            )}
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full md:w-5/6 p-2 bg-gray-900">
                {todos.length > 0 && todos.slice(0).reverse().map((todo) => (
                    <motion.div
                        key={todo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.2 }}
                        className={`px-6 py-4 rounded-lg shadow-lg hover:shadow-xl  bg-gray-800`}
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                                <div
                                    className={`text-white pb-5 space-x-2 text-2xl font-semibold cursor-pointer break-all ${todo.status === 'completed' ? 'line-through font-normal' : ''}`}
                                    onClick={() => dispatch(toggleStatus(todo.id))}
                                >
                                    {todo.title}
                                </div>
                                <div className="text-white mt-2 mb-2 break-all">
                                    {todo.createdAt && !todo.updatedAt && (
                                        <p className="text-sm text-slate-300">Created: {new Date(todo.createdAt).toLocaleString()}</p>
                                    )}
                                    {todo.updatedAt && (
                                        <p className="text-sm text-slate-300">Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
                                    )}
                                    <p className='text-lg text-slate-200 mt-5 mb-5'>{todo.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-auto space-x-2">
                                <div className={`text-sm px-2 py-1 rounded ${todo.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                    {todo.status === 'completed' ? 'Completed' : 'Pending'}
                                </div>
                                <button
                                    onClick={() => dispatch(toggleStatus(todo.id))}
                                    className={`text-white border-0 py-1 px-4 focus:outline-none rounded-md transition-colors ${todo.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                                >
                                    {todo.status === 'completed' ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
                                    ) : (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => openModal(todo)}
                                    className="ml-2 text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded-md"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="ml-2 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded-md"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Todo"
                className="flex items-center justify-center h-full w-[600px]"
                overlayClassName="bg-black bg-opacity-75 fixed inset-0 flex items-center justify-center outline-none" 
            >
                <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-full text-white">
                    <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border border-gray-700 p-3 rounded mb-4 bg-gray-800 text-white"
                        placeholder="Edit task title..."
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full h-24 border border-gray-700 p-3 rounded mb-4 bg-gray-800 text-white resize-none"
                        placeholder="Edit task description..."
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={closeModal}
                            className=" bg-gray-700 border-0 py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEditSave}
                            className="text-white bg-blue-500 border-0 py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
                        >
                           <div className="flex items-center"> Save <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg></div>

                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Todos;
