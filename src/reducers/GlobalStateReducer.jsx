const GlobalStateReducer = (state, action) => {
    switch (action.type) {
        case 'USER_CONNECT':
            return {
                ...state,
                user: action.payload.user
            };
        case 'USER_DISCONNECT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default GlobalStateReducer;
