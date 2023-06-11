import React from 'react'

const CompTodoList = ({compTodos,moveToUncompTodoList,removeFromCompTodoList}) => {

    const compTodoList =  compTodos.map((todo)=>(
        
        <div key={todo.id}>
            <input  type='checkbox'
            checked={todo.completed} 
            onChange={() => moveToUncompTodoList(todo.id)}/>
                {todo.name}
                <button onClick={() => removeFromCompTodoList(todo.id)}>削除</button>

        </div> 
      ));
  return (
    <div>完了済み
    {compTodoList}
    </div>
  )
}

export default CompTodoList