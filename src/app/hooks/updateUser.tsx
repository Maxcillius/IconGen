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
    }

    const getUserIcons = async () => {
        // console.log("fetching")
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
          // console.log(data.contents)
          // if(!data.contents) redirect("/")
          // console.log(data)
          const array: [{key: string, url: string}] = data.contents.map((obj: { key: string, url: string }) => {
            return {
                key: obj.key,
                url: obj.url
            }
          })
          // console.log(array)
          dispatch(setUserIconsState(array))
        })
      }

    return [getUserInfo, getUserIcons]
};

export default useGetUserData;
