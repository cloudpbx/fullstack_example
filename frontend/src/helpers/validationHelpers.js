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
