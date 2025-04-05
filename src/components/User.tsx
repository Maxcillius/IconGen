import Image from "next/image"
import { useSession } from "next-auth/react"

export default function User({name, email}: {name: string, email: string}) {
    const {data: session, status} = useSession()
    return (
        <>
            <div className="flex flex-row justify-center gap-4">
                <div className="flex flex-col justify-center">
                    {   session &&
                        <Image src={session.user!.image!} height={100} width={100} alt="dp" className="rounded-full h-10 w-10"></Image>
                    }
                </div>
                <div className="lg:flex flex-col justify-center hidden lg:visible">
                    <div className="flex flex-row justify-between">
                        <p className="text-[#E4E4E4] font-medium text-[15px] self-center">{name}</p>
                        <div className="flex flex-col justify-center">
                            <p className="text-white font-semibold px-2 text-[6px] text-md self-center bg-[#7693F0] rounded-xl">Basic</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[#BABABA] font-light text-[10px] self-center">{email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}