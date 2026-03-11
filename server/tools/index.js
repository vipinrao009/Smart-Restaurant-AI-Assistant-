/**
 * Tools Registry
 * 
 * Central barrel export for all agent tools.
 * Add new tools here to automatically register them with the agent.
 */

import menuTool from "./menuTool.js";
import priceTool from "./priceTool.js";
import availabilityTool from "./availabilityTool.js";
import recommendationTool from "./recommendationTool.js";
import orderTool from "./orderTool.js";
import searchMenuTool from "./searchMenuTool.js";
import orderStatusTool from "./orderStatusTool.js";

const tools = [
    menuTool,
    priceTool,
    availabilityTool,
    recommendationTool,
    searchMenuTool,
    orderTool,
    orderStatusTool,
];

export default tools;
