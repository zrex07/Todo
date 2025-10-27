import { useState, } from "react"

export const Main = () => {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  
  
  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo === '') {  
      alert('Please add your todo');
      return false
    }
    setTodos([...todos, todo])
    setTodo('')
  }

  const handleDelete = (index: number) => { 
    setTodos(todos.filter((_, i) => i !== index))
  }


  const handleEdit = (index:number) =>{
    const newTodo = prompt('Edit Todo', todos[index])
    if (newTodo !== null && newTodo.trim() !== '') {
      const updatedTodos = todos.map((item, i) => (i === index ? newTodo : item))
      setTodos(updatedTodos)
    }
    
  }



  return (
    <>
      <div className="container max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded-2xl justify-around flex">
        <input className="border rounded-lg px-4 h-10 " placeholder="Enter your todos" onChange={handleTodo} value={todo} />
        <button className="bg-blue-400 rounded-xl text-white h-10 px-6 cursor-pointer" onClick={handleAdd}>Add</button>
      </div>

      {todos.length > 0 && (
        <div className="todos container max-w-3xl mx-auto mt-6 p-4 bg-gray-100 rounded-2xl">
        {/* <ol className="list-decimal list-inside"> */}
          {
            todos.map((todo, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{todo}</span>
                <div className="btn gap-10 flex">
                <button className="bg-yellow-500 rounded-xl text-white h-8 px-4 cursor-pointer"onClick={()=> handleEdit(index)}>Edit</button>
                <button className="bg-red-500 rounded-xl text-white h-8 px-4 cursor-pointer" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))
          }
        {/* </ol> */}
      </div>
      )
        
      
      
      }
      
    </>
  )
}