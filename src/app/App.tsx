import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return <Container maxWidth="sm">
    <Stack flexDirection={"column"}>
      <Box sx={{my: 4}}>
        <Typography variant="h4" component={"h4"}>
          Create React App on Typescript with REDUX
        </Typography>
      </Box>
      <RippleBadge badgeContent={4}>
      <Button variant="contained">Contained</Button>
      </RippleBadge>
    </Stack>
  </Container>
}

export default App;





