import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0px;
  height: 60px;
  padding: 5px 0 5px 0;
  z-index: 2;
  background-color: var(--gray4);
  display: flex;
  justify-content: space-between;
  align-items: center;

  #LogoDiv {
    display: flex;
    gap: 10px;

    h1 {
      display: none;
    }

    img {
      width: 70px;
    }
    :hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }

  #headerEnd {
    display: flex;
    align-items: center;
    gap: 5px;

    #buttonsDiv {
      display: flex;
      gap: 5px;

      button {
        width: 80px;
        height: 30px;
        border-radius: 8px;
      }

      #button1 {
        color: var(--gray1);
        border: solid 2px transparent;
        background-image: linear-gradient(var(--gray4), var(--gray4)),
          radial-gradient(circle at top left, #21b1b8, #76f3c6);
        background-origin: border-box;
        background-clip: content-box, border-box;

        :hover {
          border: none;
          background: var(--gradient-2);
          color: var(--gray4);
        }
      }

      #button2 {
        border: none;
        background: var(--gradient-2);
        color: var(--gray4);

        :hover {
          color: var(--gray1);
          border: solid 2px transparent;
          background-image: linear-gradient(var(--gray4), var(--gray4)),
            radial-gradient(circle at top left, #21b1b8, #76f3c6);
          background-origin: border-box;
          background-clip: content-box, border-box;
        }
      }
    }

    svg {
      font-size: 26px;
      color: var(--gray1);

      :hover {
        cursor: pointer;
        filter: brightness(0.7);
      }
    }
  }

  @media screen and (min-width: 769px) {
    #LogoDiv {
      h1 {
        display: unset;
      }
    }

    #headerEnd {
      gap: 25px;
      flex-direction: row-reverse;

      #buttonsDiv {
        gap: 25px;

        button {
          width: 130px;
          height: 40px;
        }
      }

      svg {
        font-size: 32px;
      }
    }
  }
`;
