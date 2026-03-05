/**
 * Restaurant Menu Database
 * 
 * Centralized menu data with prices, availability, dietary tags, and descriptions.
 * In production, this would be replaced by a database (MongoDB, PostgreSQL, etc.)
 */

const menuData = {
    breakfast: [
        { name: "Classic Toast & Eggs", price: 6.99, available: true,  dietary: ["non-veg"], description: "Crispy toast with scrambled eggs and butter" },
        { name: "Pancake Stack",       price: 8.99, available: true,  dietary: ["veg"],     description: "Fluffy pancakes with maple syrup and berries" },
        { name: "Avocado Toast",       price: 9.49, available: true,  dietary: ["vegan"],   description: "Sourdough with smashed avocado, cherry tomatoes, and seeds" },
        { name: "Eggs Benedict",       price: 11.99, available: false, dietary: ["non-veg"], description: "Poached eggs on English muffin with hollandaise" },
        { name: "Oatmeal Bowl",        price: 5.99, available: true,  dietary: ["vegan"],   description: "Steel-cut oats with fresh fruits and honey" },
        { name: "French Toast",        price: 7.99, available: true,  dietary: ["veg"],     description: "Cinnamon French toast with powdered sugar" },
        { name: "Coffee",              price: 3.49, available: true,  dietary: ["vegan"],   description: "Freshly brewed premium coffee" },
    ],
    lunch: [
        { name: "Club Sandwich",       price: 10.99, available: true,  dietary: ["non-veg"], description: "Triple-decker with turkey, bacon, lettuce, and tomato" },
        { name: "Caesar Salad",        price: 9.49,  available: true,  dietary: ["veg"],     description: "Romaine lettuce with parmesan, croutons, and Caesar dressing" },
        { name: "Tomato Soup",         price: 6.99,  available: true,  dietary: ["vegan"],   description: "Creamy roasted tomato soup with basil" },
        { name: "Grilled Chicken Wrap",price: 11.49, available: true,  dietary: ["non-veg"], description: "Grilled chicken with veggies in a tortilla wrap" },
        { name: "Veggie Burger",       price: 12.99, available: false, dietary: ["vegan"],   description: "Plant-based patty with lettuce, tomato, and vegan mayo" },
        { name: "Mushroom Risotto",    price: 13.49, available: true,  dietary: ["veg"],     description: "Creamy arborio rice with wild mushrooms and parmesan" },
        { name: "Fish Tacos",          price: 12.49, available: true,  dietary: ["non-veg"], description: "Crispy fish with slaw and chipotle mayo in corn tortillas" },
    ],
    dinner: [
        { name: "Ribeye Steak",        price: 24.99, available: true,  dietary: ["non-veg"], description: "8oz grilled ribeye with herb butter" },
        { name: "Grilled Salmon",      price: 21.99, available: true,  dietary: ["non-veg"], description: "Atlantic salmon with lemon dill sauce" },
        { name: "Pasta Primavera",     price: 14.99, available: true,  dietary: ["veg"],     description: "Penne with seasonal vegetables in garlic olive oil" },
        { name: "BBQ Ribs",            price: 22.99, available: false, dietary: ["non-veg"], description: "Slow-cooked pork ribs with smoky BBQ glaze" },
        { name: "Roasted Vegetables",  price: 12.99, available: true,  dietary: ["vegan"],   description: "Seasonal veggies roasted with herbs and balsamic" },
        { name: "Lamb Chops",          price: 26.99, available: true,  dietary: ["non-veg"], description: "Herb-crusted lamb chops with mint sauce" },
        { name: "Truffle Mac & Cheese",price: 15.99, available: true,  dietary: ["veg"],     description: "Creamy mac and cheese with black truffle shavings" },
        { name: "Mashed Potatoes",     price: 5.99,  available: true,  dietary: ["veg"],     description: "Buttery mashed potatoes with chives" },
    ],
};

/**
 * Helper: Search for a dish across all categories by name (case-insensitive partial match)
 * @param {string} dishName - The dish name to search for
 * @returns {{ item: object, category: string } | null}
 */
export function findDish(dishName) {
    const searchName = dishName.toLowerCase();
    for (const [category, items] of Object.entries(menuData)) {
        const item = items.find((i) => i.name.toLowerCase().includes(searchName));
        if (item) return { item, category };
    }
    return null;
}

/**
 * Helper: Get all items, optionally filtered by category
 * @param {string} [category] - Optional category filter
 * @returns {Array<object>}
 */
export function getAllItems(category) {
    if (category) {
        return menuData[category].map((item) => ({ ...item, category }));
    }
    const allItems = [];
    for (const [cat, items] of Object.entries(menuData)) {
        allItems.push(...items.map((item) => ({ ...item, category: cat })));
    }
    return allItems;
}

export default menuData;
