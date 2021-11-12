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

  img {
    width: 70px;

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
        color: var(--gray1);
      }

      #button1 {
        border: solid 2px transparent;
        background-image: linear-gradient(var(--gray4), var(--gray4)),
          radial-gradient(circle at top left, #21b1b8, #76f3c6);
        background-origin: border-box;
        background-clip: content-box, border-box;

        :hover {
          border: none;
          background: var(--gradient-2);
        }
      }

      #button2 {
        border: none;
        background: var(--gradient-2);

        :hover {
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
    #headerEnd {
      gap: 15px;
      flex-direction: row-reverse;

      #buttonsDiv {
        gap: 15px;

        button {
          width: 130px;
          height: 40px;
        }
      }
    }
  }
`;
