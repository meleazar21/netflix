import { magic } from "@/lib/magic-client";

export const loginUser = async (email: string) => {
    try {
        if (magic) {
            const idToken = await magic.auth.loginWithMagicLink({ email });
            return idToken;
        }
    } catch (error) {
        console.log("something went wrong: ", error);
        return null;
    }
}

export const getUserEmail = async () => {
    try {
        if (magic) {
            const { email } = await magic.user.getInfo();
            return email;
        }
    } catch (error) {
        console.log("error retrieving email", error);
        return "";
    }
}

export const logout = async () => {
    try {
        if (magic) {
            const success = await magic.user.logout();
            return success;
        }
    } catch (error) {
        console.log("something went wrong when trying to logout: ", error);
        return false;
    }
}

export const isUserLogin = async () => {
    try {
        if (magic) {
            const isLoggedIn = await magic.user.isLoggedIn();
            return isLoggedIn;
        }
    } catch (error) {
        console.log("Error trying to check if user is logged In: ", error);
        return false;
    }
}