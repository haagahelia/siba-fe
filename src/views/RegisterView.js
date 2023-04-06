import { TextField, Card, CardContent, Grid, Button } from "@mui/material";
import { useState } from "react";
import dao from "../ajax/dao";
import bcrypt from "bcryptjs";
import AddUser from "../components/user/AddUser";

export default function RegisterView() {
  return <AddUser />;
}
