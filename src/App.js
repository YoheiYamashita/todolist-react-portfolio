import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import UncompTodoList from "./components/UncompTodoList";
import CompTodoList from "./components/CompTodoList";
import Title from "./components/Title";

const inputParent = css`
  text-align: center;
  margin: 2rem;
`;

const input = css`
  height: 30px;
  width: 50%;
  font-size: 1.5rem;
`;

function App() {
  const [uncompTodos, setUncompTodos] = useState([]); //[]を初期値にすることで、配列が用意される。

  const todoNameRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    const name = todoNameRef.current.value;

    if (name === "") return;
    setUncompTodos((prevTodos) => {
      return [...prevTodos, { name: name, completed: false, id: uuidv4() }];
    }); //
    todoNameRef.current.value = "";
  };

  //ここから、完了リストへの移動
  //
  const [compTodos, setCompTodos] = useState([]);

  const moveToTodoCompList = (id) => {
    //未完了タスクを完了にした時、そのタスクを完了リストに移動する関数
    setUncompTodos((prevUncompTodos) => {
      //それまでの未完了タスクの中身全体をprevTodosとする。
      const updatedTodos = prevUncompTodos.map((todo) => {
        //prevTodosの一つ一つをtodoとする
        if (todo.id === id) {
          //todo.idは、クリックしたタスクのidのこと。それが引数のidと一致したら、以下を実行。
          return { ...todo, completed: true }; //そのタスクのcompletedをtrueにする。それ以外はtodoにする、つまりそのまんま。
        }
        return todo; //updatedTodosに、map処理の結果（todo)の配列を代入する。つまりは、押したタスクをcompletedにした状態のuncomptodos。
        //次以降の処理に使用。setUncompTodosにかかっているreturn。
      });

      const movedTodo = updatedTodos.find((todo) => todo.id === id); //上記のupdatesTodosのうち、idが一致する、つまり押したタスクをmovedTodoとする。
      setCompTodos((prevCompTodos) => [...prevCompTodos, movedTodo]); //現状の完了したタスクを全て展開し、そのうえで今回新しく完了したタスク（moveTodo)をcompTodosに追加する。コールバック関数。

      return updatedTodos.filter((todo) => !todo.completed); //新しいTodos（updatedTodos、クリックして完了したタスクを含む)のうち、未完了のタスクだけを一つ探して、Todosにする。つまりは今回押して完了したタスクをTodosから外す。setTodosにかかっているreturn。
    });
  };

  const moveToUncompTodoList = (id) => {
    //完了したタスクのチェックを押すと、チェックが外れて未完了リストに戻る関数
    setCompTodos((prevCompTodos) => {
      const updatedCompTodos = prevCompTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });

      const movedTodo = updatedCompTodos.find((todo) => todo.id === id);
      setUncompTodos((prevUncompTodos) => [...prevUncompTodos, movedTodo]);

      return updatedCompTodos.filter((todo) => todo.completed);
    });
  };

  //未完了リストから削除するボタン。
  const removeFromUncompTodoList = (id) => {
    setUncompTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const removeFromCompTodoList = (id) => {
    setCompTodos((prevCompTodos) =>
      prevCompTodos.filter((todo) => todo.id !== id)
    );
  };

  return (
    <div>
      <Title />

      <div css={inputParent}>
        <form action="" onSubmit={handleAddTodo}>
          <input
            type="text"
            ref={todoNameRef}
            placeholder="タスクの追加"
            css={input}
          />
        </form>
      </div>

      <UncompTodoList
        uncompTodos={uncompTodos}
        moveToTodoCompList={moveToTodoCompList}
        removeFromUncompTodoList={removeFromUncompTodoList}
      />

      <CompTodoList
        compTodos={compTodos}
        moveToUncompTodoList={moveToUncompTodoList}
        removeFromCompTodoList={removeFromCompTodoList}
      />
    </div>
  );
}

export default App;
