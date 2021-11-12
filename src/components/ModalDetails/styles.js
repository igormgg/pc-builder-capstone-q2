import styled from "styled-components";

export const DetailsDiv = styled.div`
width: 275px;
min-height: 200px;
padding: 5px;
background-color: var(--gray4);
color: var(--gray1);
border-radius: 8px;

header {
    display: flex;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;

    #closeIcon {

        svg {
            font-size: 24px;
        }
    }
}

#detailsContent {
    width: 95%;
    margin: 0 auto;
    
    .infos {
        margin: 10px 0;
    }
}
`