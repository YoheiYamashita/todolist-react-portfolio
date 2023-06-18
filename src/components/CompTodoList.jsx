import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const compListParent = css`
  display: flex;
  /* flex-direction:column; */
  justify-content: center;
`;

const compListTitle = css`
  border-bottom: 1pt solid;
  width: 50%;
  font-size: 1.5rem;
  margin-top: 50px;
`;

const compTodoListParent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const compTodoListStyle = css`
  width: 50%;
  margin: 5pt 0;
  display: flex;
  border: 1pt solid #aaa;
  border-radius: 10pt;
  padding: 0.5rem;
`;

const compTodoName = css`
  width: 50%;
  text-decoration: line-through;
`;

const remove = css`
  margin-left: auto;
`;

const CompTodoList = ({
  compTodos,
  moveToUncompTodoList,
  removeFromCompTodoList,
}) => {
  const compTodoList = compTodos.map((todo) => (
    <div key={todo.id} css={compTodoListStyle}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => moveToUncompTodoList(todo.id)}
      />{" "}
      {/*アロー関数にすることで、処理を遅延させることで、引数を確実に渡す。直接関数にすると、そのタスクは消えるが、comptodolistに移動ができない*/}
      <div css={compTodoName}>{todo.name}</div>
      <button onClick={() => removeFromCompTodoList(todo.id)} css={remove}>
        削除
      </button>
    </div>
  ));
  return (
    <div>
      <div css={compListParent}>
        <h1 css={compListTitle}>完了済み</h1>
      </div>

      <div css={compTodoListParent}>{compTodoList}</div>
    </div>
  );
};

export default CompTodoList;
