import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {productsRouter} from "@/routes/proudctsRoutes";
import {authRouter} from "@/routes/authRoutes";
import {categoryRouter} from "@/routes/categoryRoutes";
import {errorHandler} from "@/middlewares/errorHandler";

export const app = express();
const allowedOrigins = [
    "http://localhost:5173"
]

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("cors error");
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);