import express from 'express';
import { testRouter } from "@/routes/testRout/test";

export const app = express();

app.use(express.json());
app.use('/api/test', testRouter);