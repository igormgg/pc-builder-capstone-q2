import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  min-width: 230px;
`;

export const Header = styled.div`
  .text {
    width: 100%;
    height: 70px;
    display: grid;
    place-items: center;
    background: var(--secondary-color);

    h3 {
      font-size: 36px;
      color: var(--gray4);
      text-transform: uppercase;
    }
  }

  .info {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    #total {
      min-width: 190px;
    }
  }
`;

export const Main = styled.div`
  padding: 40px 0;
  border-top: 2px solid var(--gray2);
  border-bottom: 2px solid var(--gray2);
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  .card {
    width: 100%;
    max-width: 235px;
    height: 340px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--gray2);

    :hover {
      color: var(--gray1);
      border: solid 2px transparent;
      background-image: linear-gradient(var(--gray4), var(--gray4)),
        radial-gradient(circle at top left, #ff55bb, #ff4343);
      background-origin: border-box;
      background-clip: content-box, border-box;
    }

    .content {
      width: 100%;
      flex: 1;
      display: grid;
      place-items: center;
      h3 {
        font-size: 24px;
        font-weight: bold;
      }
    }

    .footer {
      width: 100%;
      display: grid;
      place-items: center;
      padding: 15px;
    }

    &.filled {
      .header {
        width: 100%;
        height: 145px;
        background: #fff;
        display: grid;
        place-items: center;
        img {
          width: 130px;
          height: 130px;
        }
      }

      .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;

        #category {
          font-size: 14px;
          color: var(--gray2);
        }

        #model {
          font-size: 14px;
          font-weight: 400;
        }

        #price {
          font-size: 14px;
        }
      }
    }
  }
`;

export const Footer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
`;
