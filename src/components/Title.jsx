import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const h1=css`
    font-size:2rem;
    background-color:#709dea;
    text-align:center;
    
    
  `


const Title = () => {

  

  return (
    <div>
        <h1 css={h1}>
        Todoリスト
        </h1>
        </div>
  )
}

export default Title