import { NextFunction, Request, Response, Router } from 'express';
import { requestValidation } from '../../utils/middleware/validator';
import Logger from '../../loaders/logger';
import { loginUsers } from './controllers';
import { loginUserSchema } from './schema';

const loginRouter = Router();

loginRouter.post('/', requestValidation('body', loginUserSchema), handleSearchUser);

async function handleSearchUser(req: Request, res: Response, next: NextFunction) {
    try {
        const message = await loginUsers(req.body.userId, req.body.password);
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

export default loginRouter;