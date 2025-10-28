import { useEffect, useState, } from "react"


interface Todo {
  _id: string
  title: string
  created_at?: string
  __v: number
}

export const Main = () => {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])


  useEffect(() => { 
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://localhost:3000/todos')
        const data: Todo[]= await res.json()
        
        setTodos(data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    fetchTodos()
  }, [])




  const handleAdd = async () => {
  if (todo.trim() === '') {  
    alert('Please add your todo');
    return;
  }
  
  try {
    const res = await fetch('http://localhost:3000/todos/add', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: todo })
    });
    
    if (!res.ok) {
      throw new Error('Failed to add todo');
    }
    
    const data: Todo = await res.json();
    setTodos([...todos, data]);
    setTodo('');
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}




const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTodo(e.target.value)
}
      

  

const handleDelete = (index: number) => { 
  
  const todoToDelete = todos[index];
    setTodos(todos.filter((_, i) => i !== index))
    
    const deleteTodo = async () => {
      try {
        const todoToDelete = todos[index];
        const res = await fetch(`http://localhost:3000/todos/delete/${todoToDelete._id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('Failed to delete todo');
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
    deleteTodo()
  }


  const handleEdit = (index:number) =>{
    
    const todoToEdit = todos[index];
    const newTodo = prompt('Edit Todo', todos[index].title)
    if (newTodo !== null && newTodo.trim() !== '') {
      const updatedTodos = todos.map((item, i) => i === index ? { ...item, title: newTodo }: item)
      setTodos(updatedTodos)
    }

    const editTodo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/todos/update/${todoToEdit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTodo })
        });
        if (!res.ok) {
          throw new Error('Failed to edit todo');
        } 
      } catch (error) {
        console.error('Error editing todo:', error);
      }
    }
    editTodo()
    
  }



 return (
  <>
    <div className="container max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded-2xl justify-around flex">
      <input className="border rounded-lg px-4 h-10 " placeholder="Enter your todos" onChange={handleTodo} value={todo} />
      <button className="bg-blue-400 rounded-xl text-white h-10 px-6 cursor-pointer" onClick={handleAdd}>Add</button>
    </div>

    {todos.length > 0 && (
      <div className="todos container max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded-2xl">
        {todos.map((todo, index) => (
          <li key={todo._id} className="mb-2 flex justify-between items-center">
            <span>{todo.title}</span>
            <div className="btn gap-10 flex">
              <button className="bg-yellow-500 rounded-xl text-white h-8 px-4 cursor-pointer" onClick={()=> handleEdit(index)}>Edit</button>
              <button className="bg-red-500 rounded-xl text-white h-8 px-4 cursor-pointer" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </div>
    )}
  </>
)}