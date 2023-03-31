import { NextFunction, Request, Response, Router } from 'express';
import { requestValidation } from '../../utils/middleware/validator';
import Logger from '../../loaders/logger';
import { allOffers, nearbyOffers } from './controllers';
import { locationUpdateSchema, findUserSchema } from './schema';

const offersRouter = Router();

offersRouter.get(
    '/',
    requestValidation('query', findUserSchema),
    requestValidation('body', locationUpdateSchema),
    handleAllOffers
);

offersRouter.get(
    '/near',
    requestValidation('query', findUserSchema),
    requestValidation('body', locationUpdateSchema),
    handleNearOffers
);

async function handleAllOffers(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        const { latitude, longitude } = req.body;
        const message = await allOffers(userId, latitude, longitude);
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

async function handleNearOffers(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        const { latitude, longitude } = req.body;
        const message = await nearbyOffers(userId, latitude, longitude);
        res.status(message.status || 503).json(message.response || "ISR")
    } catch (err: any) {
        Logger.error(err.error)
        res.status(err.code || 503).json({ success: false, message: err.error || "ISR" })
    }
}

export default offersRouter;