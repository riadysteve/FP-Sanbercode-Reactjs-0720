import React from "react";
import styled from "styled-components";

const Loader = () => {
  const Load = styled.div`
    border: 16px solid #f9f9f9;
    border-radius: 50%;
    border-top: 16px solid #333;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  const LoadContainer = styled.div`
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <LoadContainer>
      <Load />
    </LoadContainer>
  );
};

export default Loader;
