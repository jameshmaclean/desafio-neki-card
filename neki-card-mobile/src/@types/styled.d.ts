

// styled.d.ts
import 'styled-components/native';
import { DefaultTheme } from '../theme'; // Importe o seu tema personalizado aqui

declare module 'styled-components/native' {
  export interface DefaultTheme extends DefaultTheme { }
}
