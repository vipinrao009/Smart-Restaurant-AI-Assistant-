import Menu from "../models/Menu.js";

export async function getMenuByCategory(category) {
    return Menu.find({ category })
        .sort({ price: 1 })
        .lean();
}

export async function findDishByName(dishName) {
    return Menu.findOne({
        name: { $regex: dishName, $options: "i" },
    }).lean();
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

    return Menu.find(query).sort({ price: 1 }).lean();
}

