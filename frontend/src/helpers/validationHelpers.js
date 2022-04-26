/**
 * @description This file contains all validation-related helper functions.
 */

/**
 * Check if @param value is an empty string.
 *
 * @param {String} value
 * @return {Boolean} True if @param value is an empty string, false otherwise
*/
export const isEmptyString = (value) => {
    const empty_ws_regex = /\S/;
    return !empty_ws_regex.test(value);
}

/**
 * Check if @param value has a valid url format.
 *
 * @param {String} value
 * @return {Boolean} True if @param value has a valid url format, false otherwise
*/
export const isValidUrl = (value) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const url_regex = new RegExp(expression);
    return value.match(url_regex);
}
