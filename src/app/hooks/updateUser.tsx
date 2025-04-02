import { useDispatch } from "react-redux";
import { setUserInfoState } from "@/state/userData/userData";

const useGetUserInfo = () => {
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const response = await fetch("/api/user/profile", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Error fetching user info");
            }

            const data = await response.json();

            if (!data.success) return;

            dispatch(setUserInfoState({
                email: data.msg.email,
                username: data.msg.username,
                firstname: data.msg.firstname,
                middlename: data.msg.middlename,
                lastname: data.msg.lastname,
                credits: data.msg.credits,
                uid: data.msg.uid,
                subscription: data.msg.subscription
            }));
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    return getUserInfo;
};

export default useGetUserInfo;
