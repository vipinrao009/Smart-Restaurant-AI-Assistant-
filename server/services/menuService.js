import * as menuRepository from "../repositories/menuRepository.js";

export const getMenuByCategory = async (category) => {
    return menuRepository.getMenuByCategory(category);
};

export const searchMenu = async (filters) => {
    return menuRepository.searchMenuItems(filters);
};

export const findDishByName = async (dishName) => {
    return menuRepository.findDishByName(dishName);
};
