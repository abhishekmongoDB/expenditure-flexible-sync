import authenticationContextReducer from "./AuthenticationContextReducer";
import createDataContext from './createDataContext';
import app from "../realm/RealmApp";
import Realm from "realm";
import { Alert } from "react-native";

const signin = (dispatch) => async (email, password, callback) => {
    try {
        const creds = Realm.Credentials.emailPassword(email, password);
        const user = await app.logIn(creds);

        dispatch({
            type: "signin",
            user: user
        });
        callback(user, null)

    } catch (error) {
        callback(null, error)
    }
}

const signup = (dispatch) => async (email, password, callback) => {
    try {
        await app.emailPasswordAuth.registerUser({ email, password });
        callback("done", null)
    } catch (error) {
        callback(null, error)
    }
}


const signout = (dispatch) => async (callback) => {
    try {
        if (app.currentUser == null) {
            Alert.alert("Logout done")
            dispatch({
                type: "signout",
                user: null
            });
            return;
          }
        await  app.currentUser.logOut();
          dispatch({
            type: "signout",
            user: null
        });
    } catch (error) {
        console.log("signout==>", JSON.stringify(error))
        // callback(null, error)
    }
}



export const { Provider, Context } = createDataContext(
    authenticationContextReducer,
    {
        signup,
        signout,
        signin,

    },
    {
        user: app.currentUser,
    },
);
