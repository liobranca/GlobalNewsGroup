import styled from "@emotion/styled"
import { Container, ImageList, ImageListItem, Typography } from "@mui/material"
import React from "react"
import Header from "../components/Header"
import logo from "../assets/logo-p5.png"

const SurveyCompleted = () => {
  return (
    <>
      <Header />
      <Container>
        <Title>
          Muchas gracias por tomarse el tiempo para completar la encuesta!
        </Title>

        <ImageList cols={1} sx={{ width: "70%", margin: "auto" }}>
          <ImageListItem>
            <img src={logo} alt="Gracias" />
          </ImageListItem>
        </ImageList>
      </Container>
    </>
  )
}

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  textAlign: "center",
  marginBlock: "30px",
  fontWeight: "bold",
}))

export default SurveyCompleted
