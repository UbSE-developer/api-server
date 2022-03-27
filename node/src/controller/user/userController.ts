import express from 'express';

const UserRouter = express.Router();

UserRouter.get('/', async(request: express.Request, response: express.Response) => {
    response.status(200).send('dd');
});

export default UserRouter;