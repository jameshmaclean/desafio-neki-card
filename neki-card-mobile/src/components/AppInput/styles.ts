import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const InputContainer = styled.View`
  position: relative;
  width: 100%;
`;

export const NativeInput = styled.TextInput`
  background: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['white']};
  width: 100%;
  height: 40px;
  padding: 0 6px;
  padding-top: 10px;
  border-radius: 4px;
  font-size: 16px;
`;

export const Label = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme['white']};
  position: absolute;
  top: -5px;
  left: 5px;
  background-color: ${(props) => props.theme['gray-700']};
  padding: 0 5px;
`;

export const ErrorMessage = styled.Text`
  font-size: 10px;
  color: red;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
`;