import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Oswald', sans-serif;
        ::-webkit-scrollbar {
            width: 7px;               
        }

        ::-webkit-scrollbar-track {
            background: var(--gray3);
            border-radius: 20px;    
        }

        ::-webkit-scrollbar-thumb {
        background-color: var(--secondary-color);   
        border-radius: 20px;
        }
    }

    html, body, div, span, applet, object, iframe, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
        border: 0;
        font-size: 100%;
    }
    

    ol, ul {
    	list-style: none;
    }

    h1 {
        font-size: 26px;
        font-weight: bold;
        border: 0;
    }

    h2 {
        font-size: 22px;
        font-weight: bold;
        border: 0;
    }

    h3 {
        font-size: 18px;
        font-weight: bold;
        border: 0;
    }

    :root {
        --primary-color: #F47B7B;
        --secondary-color: #76F3C3;
        --gray4: #212229;
        --gray3: #545C6B;
        --gray2: #858C9F;
        --gray1: #F5F5F5;
        --gradient-1: linear-gradient(90deg, #FF55BB 0%, #FF4343 100%);
        --gradient-2: linear-gradient(90deg, #21B1B8 0%, #76F3C6 100%);
        --toastify-bg-color: var(--gray3);
        --toastify-color-info: #66b3ff;
        --toastify-color-success: var(--secondary-color);
        --toastify-color-warning: #FFCD07;
        --toastify-color-error: var(--primary-color);
    }

    .Toastify__toast-theme--colored.Toastify__toast--success {
        color: var(--toastify-color-success);
        text-shadow: 1px 1px 1px var(--gray4);
        background: var(--toastify-bg-color);
        border: 2px solid var(--default-black);
        border-radius: 10px;
        box-shadow: 0 3px 7px 2px black;
        .Toastify__progress-bar {
            background: var(--toastify-color-success);
        }
    }

    .Toastify__toast-theme--colored.Toastify__toast--warning {
        color: var(--toastify-color-warning);
        text-shadow: 1px 1px 1px var(--gray4);
        background: var(--toastify-bg-color);
        border-radius: 10px;
        box-shadow: 0 3px 7px 2px black;
        .Toastify__progress-bar {
            background: var(--toastify-color-warning);
        }
    }

    .Toastify__toast-theme--colored.Toastify__toast--error{
        color: var(--toastify-color-error);
        text-shadow: 1px 1px 1px var(--gray4);
        background: var(--toastify-bg-color);
        border-radius: 10px;
        box-shadow: 0 3px 7px 2px black;
        .Toastify__progress-bar {
            background: var(--toastify-color-error);
        }
    }

    .Toastify__toast-theme--colored.Toastify__toast--info{
        color: var(--toastify-color-info);
        text-shadow: 1px 1px 1px var(--gray4);
        background: var(--toastify-bg-color);
        border-radius: 10px;
        box-shadow: 0 3px 7px 2px black;
        .Toastify__progress-bar {
            background: var(--toastify-color-info);
        }
    }

    .App {
        max-width: 1500px;
        margin: 0 auto;
    }

    body {
        color: var(--gray1);
        min-height: 100vh;
        height: 100%;
        padding: 0 16px;
        background-color: var(--gray4);
        overflow-y: ${(props) =>
          props.isOpen || props.contactsOpen ? "hidden" : "unset"};
    }

    button {
        font-family: inherit;
    }

    button:hover {
        cursor: pointer;
    }
`;

export default GlobalStyle;
