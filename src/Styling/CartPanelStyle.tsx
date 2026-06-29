import styled from 'styled-components'

export const CartPanelStyle = styled.div`

.cart-panel {
  height: 100%; 
  width: 0; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  right: 0;
  background-color: #1F363D; 
  overflow-x: hidden; 
  padding-top: 60px;
  transition: 0.5s; 
  color: white;
  border-left: 2px solid black;
}
.cart-panel .closebtn {
  position: absolute;
  top: 0;
  right: 10px;
  margin-top: 20px;
  margin-right: 10px;
}
.cart-panel.open{
  width : 350px
}
.cart-panel.close{
  width: 0px
}  
.row{
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  bottom: 100px;
  
}
`