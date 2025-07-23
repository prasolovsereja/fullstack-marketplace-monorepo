import { app } from "@/server";
import dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on ${port}...`));