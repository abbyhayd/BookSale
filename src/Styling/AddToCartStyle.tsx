import styled from 'styled-components'

export const AddToCartStyle = styled.form`
fieldset{
    width: 130px;
}
.form-fields{
    display:flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 110px;
}

input[type="number"]{
  flex-grow: 1 ;
  display: inline-block;
  height: 2em;
  width: 40px;
}

button{
  flex-grow: 1;
  height: 2em;
  padding: 2px 8px;
  width: 3rem;

}
`