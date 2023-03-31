import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import Logger from '../../loaders/logger';
import ErrorClass from '../types/error';

type RequestLocation = 'query' | 'body';

export function requestValidation(location: RequestLocation, schema: yup.AnyObjectSchema, stripUnknown?: boolean) {
    return async (req: Request, res: Response, next: NextFunction) => {
        let _location: any;
        switch (location) {
            case 'query':
                _location = req.query;
                break;
            case 'body':
                _location = req.body;
        }

        try {
            switch (location) {
                case 'query':
                    req.query = await schema.validate(_location, { stripUnknown: stripUnknown ?? true });
                    break;
                case 'body':
                    req.body = await schema.validate(_location, { stripUnknown: stripUnknown ?? true });
            }

            next();
        } catch (err) {
            Logger.error(err)
            next(new ErrorClass(`Validation Error.Validation failed at : ${err.errors.join(',')}`, 422));
        }
    };
}