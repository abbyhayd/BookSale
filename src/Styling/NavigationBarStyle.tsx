import styled from "styled-components"

export const NavigationBarStyle = styled.section`
.navbar {
  background-color: #1F363D;
  overflow: hidden;
  display : flex;
  align-items: center;
  top: 0;
  width: 100%;
  position: fixed;
  border-bottom: 2px solid black;
  z-index: 2;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}
.navbar a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.navbar a:hover {
  background-color: #ddd;
  color: black;
}
.navbar a.active {
  background-color: #04AA6D;
  color: white;
}`