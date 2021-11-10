import styled from "styled-components";

const SignContainer = styled.div`
  min-height: calc(100vh - 60px);
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    h1 {
      font-size: 24px;
      text-transform: uppercase;
      color: var(--gray1);
    }

    input {
      max-width: 500px;
      width: 100%;
      height: 40px;
      color: var(--gray4);
      background-color: var(--gray1);
      font-size: 16px;
      padding: 0 15px;
      border: 2px solid transparent;
      border-radius: 8px;

      :focus {
        border: 2px solid var(--primary-color);
      }
    }

    button {
      max-width: 500px;
      width: 100%;
      height: 40px;
      font-size: 16px;
      border-radius: 8px;
    }
  }

  #loginForm {
    padding: 10px 0 20px 0;

    button {
      color: var(--gray1);
      background: var(--gradient-1);
      border: none;

      :hover {
        border: solid 2px transparent;
        background-image: linear-gradient(var(--gray4), var(--gray4)),
          radial-gradient(circle at top left, #ff55bb, #ff4343);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
    }
  }

  #registerForm {
    padding-top: 10px;
    border-top: 2px solid var(--gray2);

    button {
      color: var(--gray1);
      border: solid 2px transparent;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;

      :hover {
        color: var(--gray1);
        background: var(--gradient-1);
        border: none;
      }
    }
  }

  @media screen and (min-width: 769px) {
    display: flex;
    flex-direction: row;
    justify-content: center;

    /* form {
      align-items: unset;
    } */

    #registerForm {
      border-top: none;
      border-left: 2px solid var(--gray2);
    }
  }
`;

export default SignContainer;
