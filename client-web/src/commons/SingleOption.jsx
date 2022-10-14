import * as React from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function SingleOption({ props, i, res, sRes, onComplete, onDelete }) {
  const [completed, setCompleted] = useState(false);
  const handleRespuesta = (e) => {
    sRes({
      ...res,
      [e.target.name]: e.target.value,
    });

    setCompleted(true);
  };
  useEffect(() => {
    if (completed === true) {
      onComplete();
    }
  }, [completed]);

  return (
    <Box>
      <TitleQuestion>{props.Pregunta}</TitleQuestion>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 10,
          paddingTop: 5,
        }}
      >
        <RadioGroup name={props.Pregunta} onChange={handleRespuesta}>
          {props.respuesta?.map((response, key) => (
            <FormControlLabel
              key={key}
              label={response}
              value={response}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </Grid>
    </Box>
  );
}

const TitleQuestion = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  textAlign: "center",
  marginTop: "30px",
}));

export default SingleOption;
