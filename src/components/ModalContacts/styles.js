import styled from "styled-components";

export const ModalContactsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  > div {
    animation: modalAnimation 1s 1 ease;
  }

  #contactModal {
    width: 250px;
    height: 400px;
    background-color: var(--gray4);
    box-shadow: 0 8px 32px 5px black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      align-self: flex-end;
      margin: 5px 5% 0 0;
      font-size: 24px;

      :hover {
        cursor: pointer;
        filter: brightness(0.8);
      }
    }

    h1 {
      margin-bottom: 5px;
    }

    #profileDiv {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0px 20px 0px 20px;

      .devProfile {
        width: calc(100% / 2);
        max-width: 205px;
        margin-bottom: 30px;

        img {
          width: 60%;
          max-width: 110px;
        }

        h2 {
          font-size: 14px;
          font-weight: bold;
        }

        .devSocial {
          display: flex;
          justify-content: center;
          gap: 10px;

          a {
            width: 30px;
            height: 30px;
          }

          img {
            width: 100%;
            max-width: 50px;

            :hover {
              filter: brightness(0.9);
            }
          }
        }
      }
    }

    @media screen and (min-width: 320px) {
      width: 300px;
      height: 450px;

      #profileDiv {
        .devProfile {
          h2 {
            font-size: 16px;
          }

          .devSocial {
            a {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }

    @media screen and (min-width: 700px) {
      width: 650px;
      height: 650px;

      svg {
        margin-top: unset;
        font-size: 36px;
      }

      h1 {
        font-size: 36px;
      }

      #profileDiv {
        padding: 20px 50px 20px 50px;

        .devProfile {
          h2 {
            font-size: 24px;
          }
        }
      }
    }
  }

  @keyframes modalAnimation {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
  }
`;
