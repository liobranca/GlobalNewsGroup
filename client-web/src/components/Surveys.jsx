import * as React from "react"
import MultipleChoice from "../commons/MultipleChoice"
import FreeDevelopment from "../commons/FreeDevelopment"
import SingleOption from "../commons/SingleOption"
import InputsInfo from "../commons/InputsInfo"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { Container } from "@mui/system"
import SendIcon from "@mui/icons-material/Send"
import { Box, Button, Grid, Typography } from "@mui/material"
import ProgressBar from "@ramonak/react-progress-bar"
import styled from "@emotion/styled"

function Surveys() {
  const [respuesta, setRespuesta] = React.useState("")
  const [survs, setSurvs] = React.useState([])
  const [progreso, setProgreso] = React.useState(0)
  const [data, setData] = React.useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/survey/single?id=${id}`)
      .then((res) => res.data)
      .then((data) => setSurvs(data))
  }, [])

  const cantidad = survs.questionAndAnswer?.length

  const porcentaje = 100 / cantidad

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/surveyCompleted/createSurveyCompleted?surveyId=${id}`,
        { answers: respuesta, respondent: data }
      )
      .then((res) => console.log(res))
    navigate("/completed")
  }

  return (
    <div>
      <Box
        style={{
          position: "fixed",
          padding: "30px",
          width: "80%",
          top: 40,
          left: 10,
        }}
      >
        <ProgressBar
          bgColor="#088bec"
          height="30px"
          completed={Math.round(progreso)}
        />
      </Box>
      <Container maxWidth="md" sx={{ border: 1 }}>
        <Title>Encuesta Global New Group</Title>

        {survs.isAnonymous === true ? (
          <InputsInfo data={data} setData={setData} />
        ) : (
          <></>
        )}

        {survs.questionAndAnswer?.map((surv, i) => {
          if (surv.type === "multiple_opcion") {
            return (
              <MultipleChoice
                onComplete={() => {
                  setProgreso(progreso + porcentaje)
                }}
                onDelete={() => {
                  setProgreso(progreso - porcentaje)
                }}
                props={surv}
                key={i}
                i={i}
                res={respuesta}
                sRes={setRespuesta}
              />
            )
          } else if (surv.type === "desarollo_libre") {
            return (
              <FreeDevelopment
                onComplete={() => {
                  setProgreso(progreso + porcentaje)
                }}
                onDelete={() => {
                  setProgreso(progreso - porcentaje)
                }}
                props={surv}
                key={i}
                i={i}
                res={respuesta}
                sRes={setRespuesta}
              />
            )
          } else {
            return (
              <SingleOption
                props={surv}
                onComplete={() => {
                  setProgreso(progreso + porcentaje)
                }}
                onDelete={() => {
                  setProgreso(progreso - porcentaje)
                }}
                key={i}
                i={i}
                res={respuesta}
                sRes={setRespuesta}
              />
            )
          }
        })}

        <Grid
          style={{ flexDirection: "row", textAlign: "end", paddingBottom: 10 }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Enviar encuesta
          </Button>
        </Grid>
      </Container>
    </div>
  )
}

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  textAlign: "center",
  marginBlock: "30px",
  fontWeight: "bold",
}))

export default Surveys
