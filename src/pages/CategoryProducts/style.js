import styled from "styled-components";

export const Container = styled.div`

#banner {
min-width: 288px;
max-width: 1240px;
height: 60px;
background-color: var(--secondary-color);
display: grid;
place-items: center;
margin: 20px auto;
color: var(--gray4);
}

#searchInput {
    margin: 0 auto;
    display: grid;
    place-items: center;
    input {
        border: 2px solid transparent;
        width: 230px;
        height: 50px;
        background-color: var(--gray1);
        border-radius: 8px;
        padding-left: 15px;
        color: var(--gray4);
        :focus {
            border: 2px solid var(--primary-color);
            background-color: white;
        }
    }
}

#products {
    margin: 0 auto;
    margin-top: 20px;
    border-top: 2px solid var(--gray2);
    overflow-y: auto;
    height: 70vh;
    
    #card {
        border: 2px solid transparent;
        border-radius: 5px;
        background-image: linear-gradient(var(--gray4), var(--gray4)), radial-gradient(circle at top left, #FF55BB, #FF4343);
        background-origin: border-box;
        background-clip: content-box, border-box;
        width: 235px;
        height: 340px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        margin-top: 40px;

        #imageDiv {
            background-color: white;
            width: 95%;
            margin: 5px 5px 10px 5px;
            display: grid;
            place-items: center;

            img {
                width: 139px;
                height: 139px;
            }
        }

        #contentDiv {
            height: 100%;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: space-around;
            text-align: center;

            p {
                cursor: pointer;
                font-size: 18px;
                line-height: 16px;
                color: var(--gray2);
            }

            button {
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
                    background-image: linear-gradient(var(--gray4), var(--gray4)), radial-gradient(circle at top left, #FF55BB, #FF4343);
                    background-origin: border-box;
                    background-clip: content-box, border-box;
                }
            }
        }
    }

    #empty {
        width: 100%;
        height: 250px;
        display: grid;
        place-items: center;
    }
}

`

