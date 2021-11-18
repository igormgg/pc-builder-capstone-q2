import styled from "styled-components";

export const Container = styled.div`
    min-height: calc(100vh - 60px);

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
    margin: 20px auto;
    border-top: 2px solid var(--gray2);
    
    #card {
        border: 2px solid var(--gray3);
        border-radius: 5px;
        width: 235px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        margin-top: 40px;

        #imageDiv {
            background-color: white;
            width: 95%;
            max-width: 200px;
            margin: 5px 5px 5px 5px;
            display: grid;
            place-items: center;

            img {
                width: 139px;
                height: 139px;
                object-fit: contain;
            }
        }

        #contentDiv {
            height: 100%;
            display: flex;
            flex-direction:column;
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

        :hover {
            border: 2px solid transparent;
            background-image: linear-gradient(var(--gray4), var(--gray4)), radial-gradient(circle at top left, #FF55BB, #FF4343);
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
    #searchInput {
        display: block;
    }

    #products {

        #card {
            height: 160px;
            max-width: 1114px;
            width: 100%;
            flex-direction: row;
    
            #imageDiv {
                
    
                img {
                    
                }
            }
    
            #contentDiv {
                flex-direction: row;
                width: 70%;
                justify-content: space-between;
    
                #info {
                    width: 345px;
                    align-items: flex-start;
                    margin-left: 30px;
                    
                    h3:first-child {
                        text-align: left;
                    }
        
                    p {
                        
                        #plusIcon {
                            
                        }
                    }
                }
            }
        }
    }
}

`

