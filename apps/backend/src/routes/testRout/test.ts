import { Router } from 'express';

export const testRouter = Router();

testRouter.get('/', () => console.log('pong'));