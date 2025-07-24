import express from 'express';
import { testRouter } from "@/routes/testRout/test";
import {authRouter} from "@/routes/authRoutes";
import {errorHandler} from "@/middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/api/test', testRouter);
app.use('/auth', authRouter);