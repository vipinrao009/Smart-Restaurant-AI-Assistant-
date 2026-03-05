/**
 * In-memory Orders Store
 * 
 * Tracks placed orders. In production, this would use a database.
 */

const orders = [];
let orderIdCounter = 1;

/**
 * Create a new order and store it
 * @param {{ customerName: string, items: Array<{name: string, price: number}>, total: number }} orderData
 * @returns {object} The created order
 */
export function createOrder({ customerName, items, total }) {
    const order = {
        id: orderIdCounter++,
        customerName,
        items,
        total: Math.round(total * 100) / 100,
        status: "confirmed",
        timestamp: new Date().toISOString(),
    };
    orders.push(order);
    return order;
}

/**
 * Get all orders
 * @returns {Array<object>}
 */
export function getOrders() {
    return orders;
}

/**
 * Find an order by ID
 * @param {number} id
 * @returns {object | undefined}
 */
export function findOrderById(id) {
    return orders.find((o) => o.id === id);
}
