import React, { useState, useEffect } from "react";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import styled from "styled-components";

const Navbar = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background: ${({ scrollNav }) => (scrollNav ? "rgba(0, 0, 0, 0.9)" : 'transparent')};
  transition: all 0.5s ease-out;
`;


const Header = ({ scrollNav }) => {

    return (
        <Navbar scrollNav={scrollNav}>
            <div>
                <Toolbar>
                    <Typography variant="h6" color="white">React Video Player</Typography>
                </Toolbar>
            </div>

        </Navbar>

    )
}

export default Header
