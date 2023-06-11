import './App.css';
import React,{useState,useRef,useEffect}from 'react';
import { v4 as uuidv4 } from 'uuid';

import UncompTodoList from './components/UncompTodoList';
import CompTodoList from './components/CompTodoList';
import Title from './components/Title';


function App() {

  const [todos,setTodos]=useState([]);//[]を初期値にすることで、配列が用意される。

  const todoNameRef=useRef();

  const handleAddTodo=(event)=>{
    event.preventDefault();
    const name=todoNameRef.current.value;

    if(name==='')return
    setTodos((prevTodos)=>{
      return [...prevTodos,{name:name,completed:false,id:uuidv4()}]});//
      todoNameRef.current.value='';


      
  }


  //ここから、完了リストへの移動
  //
  const [compTodos,setCompTodos]=useState([]);
 

  // const moveToTodoCompList = (id) => {
  //   setTodos((prevTodos) => {
  //     const updatedTodos = prevTodos.map((todo) => {
  //       if (todo.id === id) {
  //         const updatedTodo = { ...todo, completed: true };
  //         setCompTodos((prevCompTodos) => [...prevCompTodos, updatedTodo]);
  //         return updatedTodo;
  //       }
  //       return todo;
        
  //     });

  //     return updatedTodos;
  //   });
 
  // };

  const moveToTodoCompList = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
  
      const movedTodo = updatedTodos.find((todo) => todo.id === id);
      setCompTodos((prevCompTodos) => [...prevCompTodos, movedTodo]);
  
      return updatedTodos.filter((todo) => !todo.completed);
    });
  };


  useEffect(() => {
    console.log(compTodos);
  }, [compTodos]);
  

  // const moveToUncompTodoList = (id) => {
  //   setCompTodos((prevCompTodos) => {
  //     const updatedCompTodos = prevCompTodos.map((todo) => {
  //       if (todo.id === id) {
  //         const updatedTodo = { ...todo, completed: false };
  //         setTodos((prevTodos) => [...prevTodos, updatedTodo]);
  //         return updatedTodo;
  //       }
  //       return todo;
  //     });

  //     return updatedCompTodos.filter((todo) => todo.completed);
  //   });
  // };

  const moveToUncompTodoList = (id) => {
    setCompTodos((prevCompTodos) => {
      const updatedCompTodos = prevCompTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });
  
      const movedTodo = updatedCompTodos.find((todo) => todo.id === id);
      setTodos((prevTodos) => [...prevTodos, movedTodo]);
  
      return updatedCompTodos.filter((todo) => todo.completed);
    });
  };


  const removeFromCompTodoList = (id) => {
    setCompTodos((prevCompTodos) => prevCompTodos.filter((todo) => todo.id !== id));
  };
  
  return (

    <div>

      <Title />

      <form action=""onSubmit={handleAddTodo}>
        <input type="text"  ref={todoNameRef}  placeholder="タスクの追加"/>
      </form>
      <div>
       
     </div>

    
      <UncompTodoList todos={todos} moveToTodoCompList={moveToTodoCompList}  />

      <CompTodoList compTodos={compTodos}　moveToUncompTodoList={moveToUncompTodoList}　removeFromCompTodoList={removeFromCompTodoList}/>
      
    </div>
  );
}

export default App;
