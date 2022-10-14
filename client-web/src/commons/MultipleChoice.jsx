import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

function MultipleChoice({ props, res, sRes, onComplete, onDelete }) {
  const [arr, setArr] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleChecked = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setArr([...arr, value]);
      sRes({
        ...res,
        [e.target.name]: [...arr, value],
      });
    } else {
      setArr(arr.filter((e) => e !== value));
      sRes({
        ...res,
        [e.target.name]: arr.filter((e) => e !== value),
      });
    }

    if (checked) {
      setCompleted(true);
      setDeleted(false);
    }
    if (!checked) {
      if (res[props.Pregunta]?.length -1 === 0) {
        setDeleted(true);
        setCompleted(false);
      }
    }
  };

  useEffect(() => {
    if (completed === true) {
      onComplete();
    }
  }, [completed]);
  useEffect(() => {
    if (deleted === true) {
      onDelete();
    }
  }, [deleted]);


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
        <FormGroup>
          {props.respuesta?.map((response, index) => (
            <FormControlLabel
              key={index}
              label={response}
              control={
                <Checkbox
                  edge="start"
                  value={response}
                  name={`${props.Pregunta}`}
                  onChange={handleChecked}
                  disableRipple
                />
              }
            />
          ))}
        </FormGroup>
      </Grid>
    </Box>
  );
}

const TitleQuestion = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  textAlign: "center",
  marginTop: "30px",
}));

export default MultipleChoice;
