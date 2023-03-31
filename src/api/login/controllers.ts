import database from '../../loaders/database';
import Logger from '../../loaders/logger';

export async function loginUsers(userId: any, password: String) {
    try {
        const db = await database();
        if (await db.collection("User").findOne({ userId, password })) {
            return {
                status: 200,
                response: { success: true, userId }
            }    
        }
        return {
            status: 401,
            response: { success: false, message: "Wrong Password or UserId"}
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