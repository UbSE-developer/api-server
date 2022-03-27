import express from 'express';
import UserRouter from './user/userController';

const RootRouter = express.Router();

RootRouter.use('/user', UserRouter);

export default RootRouter;