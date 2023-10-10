import styled from "styled-components/native"


export const Container = styled.View`
background-color: ${(props) => props.theme["gray-900"]};
  margin: 0 auto;
  padding: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  flex: 1;
`

export const InputContainer = styled.View`

  justify-content: center;
  align-items: center;

`
export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`


