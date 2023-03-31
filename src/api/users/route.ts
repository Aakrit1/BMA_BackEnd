import { NextFunction, Request, Response, Router } from 'express';
import { requestValidation } from '../../utils/middleware/validator';
import Logger from '../../loaders/logger';
import { getAllUsers, getUser } from './controllers';
import { findUserSchema } from './schema';

const usersRouter = Router();

usersRouter.get('/all', handleAllUsers);
usersRouter.get('/', requestValidation('body', findUserSchema), handleSearchUser);

async function handleAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const message = await getAllUsers();
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

async function handleSearchUser(req: Request, res: Response, next: NextFunction) {
    try {
        const message = await getUser(req.body.userId);
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

export default usersRouter;