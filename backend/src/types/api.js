/**
 * @typedef {Object} GetPlanRequest
 * @property {string} UserID
 */

/**
 * @typedef {Object} APIMeal
 * @property {string} Name
 * @property {string} Restaurant
 * @property {number} Calorie
 * @property {string[]} Ingredients
 * @property {number} Price
 * @property {string} Purchase_url
 * @property {string} Image_url
 */

/**
 * @typedef {Object} GetPlanResponse
 * @property {APIMeal} morn
 * @property {APIMeal} afternoon
 * @property {APIMeal} dinner
 * @property {APIMeal[]} Alt
 */

module.exports = {}; 