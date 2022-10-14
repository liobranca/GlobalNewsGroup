import { TextField } from "@mui/material";
import React from "react";

function InputsInfo({ data, setData }) {
  const handleName = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleEmail = (e) => {
    setData({
      ...data,
      email: e.target.value,
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        onChange={handleName}
        id="standard-basic"
        label="Nombre"
        variant="standard"
        style={{ marginRight: "20px" }}
      />
      <TextField
        onChange={handleEmail}
        id="standard-basic"
        label="Email"
        variant="standard"
      />
    </div>
  );
}

export default InputsInfo;
