export const focusLastChar = (input) => {
    const value = input.value;
    input.value = '';
    input.focus();
    input.value = value;
};
