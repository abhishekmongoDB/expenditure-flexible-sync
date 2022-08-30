const authenticationContextReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return {
                user: action.user
            }
        case 'signout':
            return {
                user: null
            }

    }
}
export default authenticationContextReducer;
