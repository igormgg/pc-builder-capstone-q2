import styled from "styled-components";
import MobileCover from "../../assets/images/homecover_mobile.png";
import Cover from "../../assets/images/homecover.png";

export const Container = styled.div`
  min-height: calc(100vh - 60px);

  #homeCover {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${MobileCover}) no-repeat;
    background-size: cover;
    justify-self: center;
    margin: 20px auto;
    min-width: 288px;
    max-width: 1500px;
    height: 180px;

    button {
      width: 150px;
      height: 50px;
      background: var(--gradient-1);
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      font-size: 16px;

      :hover {
        background-color: transparent;
        border: solid 2px transparent;
        background-image: linear-gradient(var(--gray4), var(--gray4)),
          radial-gradient(circle at top left, #ff55bb, #ff4343);
        background-origin: border-box;
        background-clip: content-box, border-box;
      }
    }
  }

  #banner {
    min-width: 288px;
    max-width: 1500px;
    height: 70px;
    background-color: var(--secondary-color);
    display: grid;
    place-items: center;
    margin: 20px auto;
    color: var(--gray4);

    h3 {
      font-size: 36px;
    }
  }

  #filters {
    margin: 0 auto;
    display: grid;
    place-items: center;
    display: flex;
    justify-content: space-between;
    input {
      border: 2px solid transparent;
      width: 230px;
      height: 50px;
      background-color: var(--gray1);
      border-radius: 8px;
      padding-left: 15px;
      margin-right: 5px;
      color: var(--gray4);
      :focus {
        border: 2px solid var(--primary-color);
        background-color: white;
      }
    }

    select {
      border: 2px solid transparent;
      width: 230px;
      height: 50px;
      background-color: var(--gray1);
      border-radius: 8px;
      padding-left: 15px;
      margin-left: 5px;
      color: var(--gray4);
      :focus {
        border: 2px solid var(--primary-color);
        background-color: white;
      }
    }
  }

  #products {
    margin: 20px auto;
    border-top: 2px solid var(--gray2);

    #card {
      border: 2px solid var(--gray3);
      border-radius: 5px;
      width: 200px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      margin-top: 40px;

      #imageDiv {
        background-color: white;
        width: 100%;
        min-height: 100px;
        max-width: 200px;
        display: grid;
        place-items: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      #contentDiv {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;

        #info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          h3:first-child {
            width: 95%;
          }

          p {
            cursor: pointer;
            font-size: 18px;
            line-height: 16px;
            color: var(--gray2);
            display: flex;
            gap: 5px;
            align-items: center;

            #plusIcon {
              font-size: 20px;
              color: var(--gray1);
            }
          }
        }

        button {
          margin-top: 10px;
          margin-bottom: 10px;
          width: 150px;
          height: 40px;
          background: var(--gradient-1);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 16px;

          :hover {
            background-color: transparent;
            border: solid 2px transparent;
            background-image: linear-gradient(var(--gray4), var(--gray4)),
              radial-gradient(circle at top left, #ff55bb, #ff4343);
            background-origin: border-box;
            background-clip: content-box, border-box;
          }
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

    #empty {
      width: 100%;
      height: 250px;
      display: grid;
      place-items: center;
    }
  }

  @media screen and (min-width: 769px) {
    #homeCover {
      background: url(${Cover}) no-repeat;
      background-position: center;
      background-size: cover;
      justify-content: flex-end;
      align-items: flex-end;
      button {
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }

    #products {
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
      #card {
        height: 450px;
        width: 300px;
        flex-direction: column;
        margin-left: 20px;
        margin-right: 20px;

        #imageDiv {
          background-color: white;
          width: 100%;
          min-height: 200px;
          max-width: 300px;
          display: grid;
          place-items: center;
          img {
            width: 200px;
            height: 200px;
            object-fit: contain;
          }
        }

        #contentDiv {
          flex-direction: column;
          width: 70%;
          align-items: center;
          justify-content: space-evenly;

          #info {
            width: 300px;
            align-items: center;

            p {
              #plusIcon {
              }
            }
          }
        }
      }
    }
  }
`;
