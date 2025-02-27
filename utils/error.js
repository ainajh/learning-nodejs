export const isValidNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
export const isNotNull = (value) => {
    return value == null || value == "" 
}