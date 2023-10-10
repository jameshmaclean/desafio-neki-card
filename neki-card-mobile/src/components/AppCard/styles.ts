import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme["gray-800"]};
  margin-top: 10px;
    border-width: 1px;
  border-color: white;
`;


export const Header = styled.View`
  flex-direction: column;
  padding: 10px;
  align-items: center;


  background-color: ${(props) => props.theme['green-500']};
  background-image: url();
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 2px solid ${(props) => props.theme['green-300']};

`;

export const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const Title = styled.View`
  margin-top: 8px;
      padding: 20px;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const InfoItem = styled.View`
  margin-top: 8px;


`;

export const Detail = styled.Text`
  font-size: 14px;
    color: white;
`;
export const DetailContainer = styled.View`
width: 100%;
flex-direction: row;
gap: 10px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;

`;

export const SectorHeader = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme['white']};
`;

