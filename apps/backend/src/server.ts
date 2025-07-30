import express from 'express';
import {productsRouter} from "@/routes/proudctsRoutes";
import {authRouter} from "@/routes/authRoutes";
import {categoryRouter} from "@/routes/categoryRoutes";
import {errorHandler} from "@/middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);