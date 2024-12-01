require('dotenv').config()
import Express from "express";
import { router } from "./router";

const app = Express()

app.use(Express.urlencoded())
app.use(Express.json())
app.use("/", router)

export { app }