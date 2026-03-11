import { getCollection } from "../db/mongo.js";

const MENU_COLLECTION = "menuItems";

export async function getMenuByCategory(category) {
    return getCollection(MENU_COLLECTION)
        .find({ category })
        .sort({ price: 1 })
        .toArray();
}

export async function findDishByName(dishName) {
    return getCollection(MENU_COLLECTION).findOne({
        name: { $regex: dishName, $options: "i" },
    });
}

export async function searchMenuItems({
    keyword,
    category,
    cuisine,
    dietary,
    maxPrice,
    onlyAvailable = true,
}) {
    const query = {};

    if (onlyAvailable) query.available = true;
    if (category) query.category = category;
    if (cuisine) query.cuisine = cuisine;
    if (dietary) query.dietary = dietary;
    if (typeof maxPrice === "number") query.price = { $lte: maxPrice };

    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { cuisine: { $regex: keyword, $options: "i" } },
        ];
    }

    return getCollection(MENU_COLLECTION).find(query).sort({ price: 1 }).toArray();
}

