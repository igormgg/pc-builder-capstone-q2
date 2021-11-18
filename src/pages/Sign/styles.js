import Logo from "../../assets/images/gray3logo.png";
import styled from "styled-components";

const SignContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: contain;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3vh;

    h1 {
      font-size: 24px;
      text-transform: uppercase;
      color: var(--gray1);
    }

    .inputWrap {
      max-width: 500px;
      width: 100%;
      height: 55px;

      input {
        width: 100%;
        height: 40px;
        color: var(--gray4);
        background-color: var(--gray1);
        font-size: 18px;
        padding: 0 15px;
        border: 2px solid transparent;
        border-radius: 8px;

        :focus {
          border: 2px solid var(--primary-color);
        }
      }

      label {
        font-size: 12px;
        color: var(--primary-color);
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
    padding: 10px 0 4vh 0;
    animation: left_cont 0.5s 1 ease-in-out;

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
    padding-top: 3vh;
    border-top: 2px solid var(--gray2);
    margin-bottom: 30px;
    animation: right_cont 0.5s 1 ease-in-out;

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
    align-items: unset;
    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    form {
      gap: unset;
      justify-content: space-evenly;

      .inputWrap {
        height: 60px;

        input {
          height: 60px;
          font-size: 24px;
        }
      }

      button {
        height: 60px;
      }
    }

    #loginForm {
      height: calc(200px + 26vh);
      padding: 10px 16px 0 0;
    }

    #registerForm {
      height: calc(350px + 37vh);
      border-top: none;
      border-left: 2px solid var(--gray2);
      padding: 10px 0 20px 16px;
      margin-bottom: unset;
    }
  }

  @keyframes left_cont {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
  }

  @keyframes right_cont {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;

export default SignContainer;
