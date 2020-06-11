export function openModal() {
    return {
        type: '@auth/OPEN_MODAL',
        payload: {},
    };
}

export function closeModal() {
    return {
        type: '@auth/CLOSE_MODAL',
        payload: {},
    };
}
