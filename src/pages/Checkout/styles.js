import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 20px;
  min-height: calc(100vh - 60px);
  column-gap: 20px;
  row-gap: 40px;
  overflow: hidden;
`;

export const CheckoutConfirmation = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  .confirmation_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
  }
  .icon_content {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 3px;
    border-style: solid;
    border-color: #74f1c5;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    font-size: 30px;
    animation: icon_anim 0.6s 1 linear;

    @keyframes icon_anim {
      0% {
        border-style: dashed;
      }
      25% {
        border-color: #74f1c5 var(--gray2) var(--gray2) var(--gray2);
        border-style: solid dashed dashed dashed;
      }
      50% {
        border-color: #74f1c5 #74f1c5 var(--gray2) var(--gray2);
        border-style: solid solid dashed dashed;
      }
      75% {
        border-color: #74f1c5 #74f1c5 #74f1c5 var(--gray2);
        border-style: solid solid solid dashed;
      }
      100% {
        border-color: #74f1c5;
        border-style: solid;
      }
    }

    svg {
      animation: fade_in 1.2s 1 ease-in-out;

      @keyframes fade_in {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(0);
          opacity: 0;
        }
        80% {
          transform: scale(1.4);
        }
      }
    }
  }

  .confirmation_content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h3 {
      font-size: calc(16px + 10 * ((100vw - 320px) / 680));
      text-align: center;
    }

    animation: text_anim 1s 1 ease-in-out;

    @keyframes text_anim {
      0% {
        opacity: 0;
      }
      70% {
        transform: translateY(-30px);
        opacity: 0;
      }
    }
  }
`;

export const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  min-width: 240px;

  .flex_end {
    /* text-align: right; */
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
    }
    .address_info {
      .info_content {
        padding: 20px 0;
        h3 {
          font-size: 18px;
          padding: 8px 0;
          color: var(--gray2);
          span {
            color: white;
          }
        }
      }
    }

    .address_info {
      h3 {
        font-size: 18px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px 0;
      div {
        width: 100%;

        input {
          width: 100%;
          height: 60px;
          border-radius: 8px;
          padding: 0 10px;
          font-size: 28px;
          border: none;
          &#address_number {
            width: 120px;
          }

          &[type="number"] {
            -moz-appearance: textfield;
          }
          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &::placeholder {
            font-size: 20px;
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

        &.card {
          div:last-child {
            width: 260px;
          }
        }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  select {
    margin-bottom: 40px;
  }
`;
