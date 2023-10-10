import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding: 10px;
  flex-direction: column;
  width: 100%;
  background-color: ${(props) => props.theme["gray-900"]};
  border-radius: 5px;
`


export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  color: ${(props) => props.theme['green-500']};
  margin-bottom: 20px;
`