import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditSetting(props) {
  const location = useLocation();

  const [value, setValue] = useState("");
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleNumberValue = (event) => {
    setNumberValue(event.target.value);
  };

  const handleTextValue = (event) => {
    setTextValue(event.target.value);
  };

  const Navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    Navigate("/settings");
    setName(event.target.value);
    setDescription(event.target.value);
    setNumberValue(event.target.value);
    setTextValue(event.target.value);
  };

  const id = location.state.id;
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [numberValue, setNumberValue] = useState(location.state.numberValue);
  const [textValue, setTextValue] = useState(location.state.textValue);
  return (
    <form onSubmit={handleSubmit}>
      <p>
        id: {id} <br />
        <TextField
          label="Enter text"
          variant="outlined"
          value={name}
          onChange={handleName}
        />
        name: {name} <br />
        <TextField
          label="Enter text"
          variant="outlined"
          value={description}
          onChange={handleDescription}
        />
        description: {description} <br />
        <TextField
          label="Enter number"
          variant="outlined"
          value={numberValue}
          onChange={handleNumberValue}
        />
        numberValue: {numberValue} <br />
        <TextField
          label="Enter text"
          variant="outlined"
          value={textValue}
          onChange={handleTextValue}
        />
        textValue: {textValue}
      </p>
      <button type="submit">Submit</button>
    </form>
  );
}
