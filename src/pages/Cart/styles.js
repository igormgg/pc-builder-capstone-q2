import styled from "styled-components";

export const CartContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - 60px);

  #topContainer {
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h1 {
      font-size: 36px;
    }

    button {
      width: 80px;
      height: 30px;
      color: var(--gray1);
      border: solid 2px transparent;
      border-radius: 8px;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;

      :hover {
        color: var(--gray1);
        background: var(--gradient-1);
        border: none;
      }

      :disabled {
        background: none;
        background-color: var(--gray3);
      }
    }
  }
  #backToShopping {
    width: 250px;
    height: 50px;
    min-height: 50px;
    color: var(--gray1);
    background: var(--gradient-1);
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;

    :hover {
      color: var(--gray1);
      border: solid 2px transparent;
      border-radius: 8px;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  }

  #productsContainer {
    width: 100%;
    max-width: 850px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;

    li {
      width: 100%;
      height: 74px;
      border: 2px solid var(--gray3);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      #leftDiv {
        width: 85%;
        height: 100%;
        padding: 5px 0 5px 5px;
        display: flex;
        align-items: center;
        gap: 5px;

        img {
          width: 50px;
          height: 100%;
          background-color: var(--gray1);
        }

        #productDetails {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          line-height: 100%;

          h3 {
            font-size: 12px;
            color: var(--gray1);
          }

          p {
            font-size: 10px;
            color: var(--gray2);
          }

          span {
            font-size: 12px;
            font-weight: bold;
            color: var(--gray1);
          }
        }
      }

      #trashDiv {
        height: 100%;
        display: flex;
        padding: 10px 10px 0 0;
        color: var(--gray1);

        :hover {
          cursor: pointer;
          filter: brightness(0.7);
        }
      }

      :hover {
        border: 2px solid transparent;
        background-image: linear-gradient(var(--gray4), var(--gray4)),
          radial-gradient(circle at top left, #ff55bb, #ff4343);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
    }
  }

  #bottomContainer {
    width: 100%;
    max-width: 850px;
    border-top: 2px solid var(--gray2);
    margin-top: 20px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: var(--gray1);
      font-size: 24px;
    }
  }

  #checkoutButton {
    width: 250px;
    height: 50px;
    min-height: 50px;
    color: var(--gray1);
    background: var(--gradient-1);
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;

    :hover {
      color: var(--gray1);
      border: solid 2px transparent;
      border-radius: 8px;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }
  }

  @media screen and (min-width: 769px) {
    padding-bottom: 50px;

    #topContainer {
      margin-bottom: 30px;

      h1 {
        font-size: 72px;
      }

      button {
        width: 150px;
        height: 40px;
      }
    }

    #productsContainer {
      gap: 20px;

      li {
        height: 154px;

        #leftDiv {
          width: 50%;
          gap: 25px;

          img {
            width: 140px;
            height: 100%;
            background-color: var(--gray1);
          }

          #productDetails {
            padding: 15px 0;

            h3 {
              font-size: 18px;
              line-height: 1.4;
            }

            p {
              font-size: 14px;
            }

            span {
              font-size: 18px;
            }
          }
        }

        #trashDiv {
          padding: 20px 20px 0 0;
          font-size: 24px;
        }
      }
    }

    #bottomContainer {
      margin-top: 40px;

      h2 {
        font-size: 26px;
      }
    }

    #checkoutButton {
      width: 650px;
      height: 60px;
      font-size: 18px;
    }
  }
`;