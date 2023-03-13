import React, { useState, useEffect } from "react";
import { CardHeader, Card, CardContent } from "@mui/material";
import AlertBox from "../common/AlertBox";
import { useFormik } from "formik";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { validate } from "../../validation/ValidateAddBuilding";
import dao from "../../ajax/dao";
import AddSubjectForm from "./AddBuildingForm";
