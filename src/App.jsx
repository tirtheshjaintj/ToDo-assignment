import './App.css'
import Todos from './components/ToDo'
import AddTodo from './components/AddToDo'

function App() {
  return (
    <>
    <div>
      <h1 className='pt-10 text-5xl w-full text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-5 space-x-2'>TJ ToDo App</h1>
      <AddTodo/>
      <Todos/>
      </div>
    </>
  )
}

export default App
