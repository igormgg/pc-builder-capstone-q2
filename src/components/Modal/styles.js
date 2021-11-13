import styled from 'styled-components'

export const ModalContainer = styled.div`
background-color: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0px;
right: 0px;
bottom: 0px;
left: 0px;
display: flex;
align-items: center;
justify-content: center;
z-index: 2;
    > div {
        animation: modalAnimation 1s 1 ease;
    }
@keyframes modalAnimation {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
}
`