import { RootState } from "../state/store"
import { setStyleState } from "../state/styles/style"
import { useDispatch, useSelector } from "react-redux"

export default function Styles() {

    const setStyleContent = useDispatch()
    const currStyle = useSelector((state: RootState) => {
        return state.style.value
    })

    return (
        <div className="col-span-2 flex flex-row flex-wrap justify-between h-full p-10 overflow-y-scroll gap-5">
            <div onClick={() => {
                setStyleContent(setStyleState("Normal"))
            }} className={`group h-36 w-36 ${ currStyle == "Normal" ? "bg-green-700" : "bg-green-600 hover:bg-green-500 hover:cursor-pointer"} border-2 rounded-3xl flex flex-col justify-end`}>
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Normal
                </p>
            </div>
            <div onClick={() => {
                setStyleContent(setStyleState("Cartoon"))
            }}  className={`group h-36 w-36 ${ currStyle == "Cartoon" ? "bg-green-700" : "bg-green-600 hover:bg-green-500 hover:cursor-pointer"} border-2 rounded-3xl flex flex-col justify-end`}>
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div onClick={() => {
                setStyleContent(setStyleState("Pixel"))
            }}  className={`group h-36 w-36 ${ currStyle == "Pixel" ? "bg-green-700" : "bg-green-600 hover:bg-green-500 hover:cursor-pointer"} border-2 rounded-3xl flex flex-col justify-end`}>
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Pixel
                </p>
            </div>
            <div onClick={() => {
                setStyleContent(setStyleState("Realistic"))
            }}  className={`group h-36 w-36 ${ currStyle == "Realistic" ? "bg-green-700" : "bg-green-600 hover:bg-green-500 hover:cursor-pointer"} border-2 rounded-3xl flex flex-col justify-end`}>
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Realistic
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
            <div className="group h-36 w-36 bg-green-600 hover:bg-green-500 hover:cursor-pointer border-2 rounded-3xl flex flex-col justify-end">
                <p className="pb-10 text-sm hidden opacity-60 group-hover:block text-center text-white font-bold">
                    Cartoon
                </p>
            </div>
        </div>
    )
}