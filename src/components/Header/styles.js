import styled from 'styled-components';
import logo from "../../assets/cubo.png";

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 5px 15px;
  border-bottom: 1px solid #ddd;
  background-color: #0e1e24;
  height: 200px;
  color: #fff;
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
    width: 64px;
    height: 64px;
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
    width: 50px;
    height: 50px;
    cursor: pointer;

    :hover {
      border-color: #8ec9ff;
    }
  }
`
