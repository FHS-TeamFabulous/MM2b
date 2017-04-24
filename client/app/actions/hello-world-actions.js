const types = {
    HELLO: 'HELLO'
};

function createHelloAction() {
    return {
        action: types.HELLO
    };
}

export { types, createHelloAction };
