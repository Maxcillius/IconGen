import { useDispatch } from "react-redux";
import { setUserInfoState } from "@/state/userData/userData";
import { setUserIconsState } from "@/state/icons/userIcons";

const useGetUserData = () => {
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        try {
            const response = await fetch("/api/user/profile", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.msg)
            }

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
            console.error(error);
        }
    }

    const getUserIcons = async () => {
        await fetch("/api/icon/fetch",
          {
            method: "GET",
            headers:
            {
              "Content-Type": "application/json"
            }
          }
        ).then((response) => {
          return response.json()
        }).then((data) => {
          if(!data.contents) {
            return
          }
          const array: [{key: string, url: string}] = data.contents.map((obj: { key: string, url: string }) => {
            return {
                key: obj.key,
                url: obj.url
            }
          })
          dispatch(setUserIconsState(array))
        })
      }

    return [getUserInfo, getUserIcons]
};

export default useGetUserData;
