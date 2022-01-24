import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type ThemeType = typeof theme //cria um tipo chamado ThemeType (poderia ser qualquer nome), com o tipo do nosso theme
    
    export interface DefaultTheme extends ThemeType {} //faz com que o DefaultTheme extenda o nosso ThemeType
}

