import { NextFunction, Request, Response, Router } from 'express';
import { requestValidation } from '../../utils/middleware/validator';
import Logger from '../../loaders/logger';
import { updateLocation } from './controllers';
import { locationUpdateSchema, findUserSchema } from './schema';

const locationRouter = Router();

locationRouter.post(
    '/',
    requestValidation('query', findUserSchema),
    requestValidation('body', locationUpdateSchema),
    handleSearchUser
);

async function handleSearchUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        const { latitude, longitude } = req.body;
        const message = await updateLocation(userId, latitude, longitude);
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

export default locationRouter;