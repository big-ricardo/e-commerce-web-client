import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all .25s ease-in-out;
    }
    html, body, #root {
        background: ${props => props.theme.colors.background};
        height: 100%;
        width: 100%;
        font-family: 'Poppins', sans-serif;
        
    }

    *::-webkit-scrollbar {
      width: 8px;
      &::hover {
        width: 12px;
      }
    }

    *::-webkit-scrollbar-track {
        background: none;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.primary};
        border-radius: 20px;
    }

    .ant-steps-icon-dot{
        background-color: ${props => props.theme.colors.primaryDark};
    }
`;

export default GlobalStyle;
