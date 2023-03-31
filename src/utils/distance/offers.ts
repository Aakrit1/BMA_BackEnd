import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import ErrorClass from '../types/error';
import { distanceCalculation } from './calculate';

export async function distanceOffers(location) {
    try {
        const db = await database();
        const offers = await db.collection("Offers").find({}).toArray();
        const send = []
        offers.forEach(offer => {
            offer.distance = distanceCalculation(location, offer.location);
            if (offer.distance <= 10) {
                offer.link = `https://maps.google.com/?q=${offer.location.latitude},${offer.location.longitude}`
                send.push(offer);
            }
        })
        return send;
    } catch (err) {
        Logger.error(err)
        new ErrorClass(`Validation Error.Validation failed at : ${err.errors.join(',')}`, 422);
    }
}