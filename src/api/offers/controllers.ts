import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import { distanceCalculation } from '../../utils/distance/calculate';
import { distanceOffers } from '../../utils/distance/offers';

export async function allOffers(userId, latitude, longitude) {
    try {
        const db = await database();
        const data = await db.collection("User").findOne({ userId });
        if (!data) {
            throw { code: 401, error: "User Not Found" };
        }
        await db.collection("User").findOneAndUpdate({ userId }, { $set: { location: { latitude, longitude } } });
        const offers = await db.collection("Offers").find({}).toArray();
        offers.forEach(offer => {
            offer.distance = distanceCalculation(offer.location, { latitude, longitude });
            offer.link = `https://maps.google.com/?q=${offer.location.latitude},${offer.location.longitude}`;
        })
        return {
            status: 200,
            response: { success: true, offers }
        }
    }
    catch (err: any) {
        Logger.error(err.error)
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || "ISR" }
        }
    }
}

export async function nearbyOffers(userId, latitude, longitude) {
    try {
        const db = await database();
        const data = await db.collection("User").findOne({ userId });
        if (!data) {
            throw { code: 401, error: "User Not Found" };
        }
        await db.collection("User").findOneAndUpdate({ userId }, { $set: { location: { latitude, longitude } } })
        const offers = await distanceOffers({ latitude, longitude })
        return {
            status: 200,
            response: { success: true, offers }
        }
    }
    catch (err: any) {
        Logger.error(err.error)
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || "ISR" }
        }
    }
}