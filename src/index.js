import React from "react";
import { render } from "react-dom";
import CustomRouter from "./components/Authentication/CustomRouter";
import "./App.scss";

const entry = document.getElementById("root");

render(<CustomRouter />, entry);
