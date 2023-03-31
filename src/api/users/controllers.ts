import database from '../../loaders/database';
import Logger from '../../loaders/logger';

export async function getAllUsers() {
    try {
        const db = await database();
        const data = await db.collection("User").find({}).toArray();
        return {
            status: 200,
            response: { success: true, response: data }
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

export async function getUser(userId) {
    try {
        const db = await database();
        const data = await db.collection("User").aggregate([
            {
                $match: { userId }
            },
            {
                $lookup:
                {
                    from: "Account",
                    localField: "accounts",
                    foreignField: "accountId",
                    as: "accounts"
                }
            },
            {
                $lookup:
                {
                    from: "Offers",
                    localField: "offers",
                    foreignField: "offerId",
                    as: "offers"
                }
            },
            {
                $unwind: "$accounts"
            },
            {
                $lookup: {
                    from: "Transaction",
                    localField: "accounts.transaction",
                    foreignField: "transactionId",
                    as: "accounts.transaction"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    contact: { $first: "$contact" },
                    points: { $first: "$points" },
                    multiplier: { $first: "$multiplier" },
                    offers: { $first: "$offers" },
                    rewards: { $first: "$rewards" },
                    wishlist: { $first: "$wishlist" },
                    accounts: { $push: "$accounts" }
                }
            },
            {
                $unwind: "$rewards"
            },
            {
                $lookup: {
                    from: "Rewards",
                    localField: "rewards.rewardId",
                    foreignField: "rewardId",
                    as: "rewards.details"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    contact: { $first: "$contact" },
                    points: { $first: "$points" },
                    multiplier: { $first: "$multiplier" },
                    offers: { $first: "$offers" },
                    rewards: { $push: "$rewards" },
                    wishlist: { $first: "$wishlist" },
                    accounts: { $first: "$accounts" }
                }
            }
        ]).toArray();
        data[0].availableBalance = 0
        data[0].accounts.forEach(account => {
            account.availableBalance = 0
            account.transaction.forEach(element => {
                account.availableBalance += element.changeInBalance
            });
            data[0].availableBalance += account.availableBalance
        });

        return {
            status: 200,
            response: { success: true, response: data[0] }
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
