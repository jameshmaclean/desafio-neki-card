import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${(props) => props.theme['gray-900']};
    width: 100%;
`
export const NavBar = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  width: 100%;
  color: ${(props) => props.theme["green-500"]};
  font-weight: 900;
`
export const NavText = styled.Text`
  color: ${(props) => props.theme["green-500"]};
  font-size: 24px;
`

export const ContentContainer = styled.ScrollView`
  background-color: ${(props) => props.theme["gray-900"]};

  width: 100%;
  padding: 10px;
`