import React from 'react';
import styled from "styled-components";
import { Container } from "@mui/material";
import { BlockWrapper, BlockTitle, BlockText } from "./style/generalStyle";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const DescriptionText = styled.div`
  color: #e5e5e5;
`;

const Description = ({ description }) => {
    return (
        <>
            <BlockWrapper>
                <Container maxWidth="md">
                    <BlockTitle>
                        <ImportContactsIcon />
                        <BlockText>About the story</BlockText>
                    </BlockTitle>
                    <DescriptionText>{description}</DescriptionText>

                </Container>
            </BlockWrapper>

        </>

    )
}

export default Description
