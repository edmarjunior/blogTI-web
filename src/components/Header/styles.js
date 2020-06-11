import styled from 'styled-components';
import logo from "../../assets/logo.png";

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 5px 15px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  height: 200px;
`;

export const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-child {
    margin-left: 65px;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

export const Navigation = styled.div`
  a {
    background-image: url(${logo});
    width: 200px;
    height: 54px;
    margin-right: 20px;
  }

  span {
    border-left: 1px solid #ddd;
    margin-left: 15px;
    padding-left: 15px;
  }
`;
  
export const Profile = styled.div`
  div {
    text-align: right;

    span {
      display: block;
      opacity: 0.5;
      font-size: 12px;
    }
  }

  img {
    margin-left: 10px;
    border: 2px solid #ddd;
    border-radius: 50%;
    cursor: pointer;

    :hover {
      border-color: #8ec9ff;
    }
  }
`
