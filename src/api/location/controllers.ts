import database from '../../loaders/database';
import Logger from '../../loaders/logger';

export async function updateLocation(userId, latitude, longitude) {
    try {
        const db = await database();
        const data = await db.collection("User").findOne({ userId });
        if (!data) {
            throw { code: 401, error: "User Not Found" };
        }
        await db.collection("User").findOneAndUpdate({ userId }, { $set: { location: { latitude, longitude } } })
        return {
            status: 200,
            response: { success: true, message: "Location Updated" }
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