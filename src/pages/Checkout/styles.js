import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

export const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  min-width: 260px;

  .flex_end {
    text-align: right;
  }

  .section_header {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--gray2);
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      width: 100%;
      font-size: 36px;
    }
    span {
      color: var(--gray2);
    }
  }

  .section_body {
    h3 {
      font-size: 36px;
      margin: 20px 0;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      div {
        width: 100%;

        input {
          width: 100%;
          height: 60px;
          border-radius: 8px;
          padding: 0 10px;
          font-size: 28px;
          border: none;
          &[type="number"] {
            -moz-appearance: textfield;
          }
          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &::placeholder {
            font-size: 25px;
            color: var(--gray2);
          }

          &:disabled {
            background: var(--gray3);
            color: white;
          }
        }
      }

      .row_content {
        display: flex;
        gap: 10px;
      }

      .button_content {
        padding: 20px 0;
        display: grid;
        place-items: center;
      }
    }
  }
`;

export const CheckoutContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
