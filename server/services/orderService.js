import * as orderRepository from "../repositories/orderRepository.js";

export const getAllOrders = async () => {
    return orderRepository.listOrders();
};

export const getOrderById = async (orderId) => {
    return orderRepository.getOrderByOrderId(orderId);
};

export const createNewOrder = async (orderData) => {
    return orderRepository.createOrder(orderData);
};

export const updateStatus = async (orderId, status) => {
    return orderRepository.updateOrderStatus(orderId, status);
};
