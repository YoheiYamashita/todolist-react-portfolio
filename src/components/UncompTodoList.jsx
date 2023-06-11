import React from 'react'

const UncompTodoList = ({todos,moveToTodoCompList}) => {


    const todoList =  todos.map((todo)=>(
        
        <div key={todo.id}>
            <input  type='checkbox'checked={todos.completed}readOnly  onChange={() => moveToTodoCompList(todo.id)}/>
                {todo.name}
        </div> 
      ));

      console.log(todoList.map(item => item.key));

  return (
    <div>
        
        

        {todoList}


    </div>

  )
}

export default UncompTodoList