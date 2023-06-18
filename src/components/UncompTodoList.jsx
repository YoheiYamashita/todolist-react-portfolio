import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const todoListParent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const todoStyle = css`
  width: 50%;
  margin: 5pt 0;
  display: flex;
  border: 1pt solid #aaa;
  border-radius: 10pt;
  padding: 0.5rem;
`;
const todoName = css``;

const remove = css`
  margin-left: auto;
`;

const UncompTodoList = ({
  uncompTodos,
  moveToTodoCompList,
  removeFromUncompTodoList,
}) => {
  const todoList = uncompTodos.map((todo) => (
    <div key={todo.id} css={todoStyle}>
      <input
        type="checkbox"
        checked={uncompTodos.completed}
        readOnly
        onChange={() => moveToTodoCompList(todo.id)}
      />
      <div css={todoName}>{todo.name}</div>

      <button onClick={() => removeFromUncompTodoList(todo.id)} css={remove}>
        削除
      </button>
    </div>
  ));

  console.log(todoList.map((item) => item.key));

  return <div css={todoListParent}>{todoList}</div>;
};

export default UncompTodoList;
