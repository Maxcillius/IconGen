import { useDispatch } from "react-redux";
import { setUserInfoState } from "@/state/userData/userData";
import { useState } from "react";

const useGetUserData = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
      credits: 0,
      subscription: -1,
    })

    const [icons, setIcons] = useState<[{key: string, url: string}] | []>([])

    const getUserData = async () => {
        await fetch("/api/user",
          {
            method: "GET",
            headers:
            {
              "Content-Type": "application/json"
            }
          }
        ).then((response) => response.json()).then((data) => {
          if(data.success === 0) {
            return
          }
          setUserData(data)
        })

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
          setIcons(array)
        })
      }

      dispatch(setUserInfoState({
        credits: userData.credits,
        subscription: userData.subscription,
        icons: icons
      }))

    return getUserData
};

export default useGetUserData;
