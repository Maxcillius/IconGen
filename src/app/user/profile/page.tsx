"use client"

import { useEffect, useState } from "react"
import { CreditCard, Settings, User, Images, ChevronRight, LogOut, X } from "lucide-react"
import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Profile() {

  const [activeSection, setActiveSection] = useState("profile")
  const [icons, setIcons] = useState<[{ key: string, url: string }] | []>([])
  const [orders, setOrders] = useState<{id: string, amount: number, status: string, date: string}[]>([])
  const [credits, setCredits] = useState("NA")
  const [show, setShow] = useState("")
  const [imageUrl, setImageUrl] = useState('');
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/")
    },
  })

  const getUserData = async () => {
    await fetch("/api/user/fetchcredits",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => response.json()).then((data) => {
      if (data.success === 0) {
        return
      }
      setCredits(data.credits)
    })

    await fetch("/api/user/fetchicons",
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
      if (!data.success) {
        return
      }
      console.log(data)
      const array: [{ key: string, url: string }] = data.contents.map((obj: { key: string, url: string }) => {
        return {
          key: obj.key,
          url: obj.url
        }
      })
      setIcons(array)
    })

    await fetch("/api/user/fetchorders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((response) => response.json()).then((data) => {
      if(data.success === 0) {
        return
      }
      setOrders(data.orders)
    })
  }


  const handleDownload = async (url: string) => {
    const imgUrl = url;
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = 'icon.png'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useEffect(() => {
    getUserData()
  }, [])

  const renderProfile = () => (
    <>
      <div className="flex items-center space-x-6">
        <div className="relative">
          {session &&
            <img
              src={session?.user!.image!}
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-[#1F2937]"
            />
          }
          <div className="absolute -bottom-2 right-0 h-6 px-2 bg-emerald-500 rounded-full flex items-center">
            <span className="text-xs font-medium text-emerald-900">Verified</span>
          </div>
        </div>
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-white">
            {session?.user?.name}
          </h1>
          {/* <p className="text-gray-400 mt-1 text-sm lg:text-base">@{session?.user}</p> */}
        </div>
      </div>
      <div className="flex flex-row justify-end h-14">
        {/* {alert && (
            <div className="flex flex-row justify-center text-red-600 mb-4 text-xs lg:text-base">
              {alert}
            </div>
          )
          } */}
      </div>

      <div className="grid gap-6">
        {["email", "name"].map((field: string) => (
          <div
            key={field}
            className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6 transition-shadow hover:shadow-lg text-sm lg:text-base"
          >
            <label className="block text-gray-400 font-medium mb-2 capitalize">
              {field}
            </label>
            {
              <div className="text-xs lg:text-lg font-medium text-white">
                {field === "name"
                  ? `${session?.user?.name}`
                  : session?.user?.email}
              </div>
            }
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-6 justify-end">
        <button
          onClick={() => signOut({ callbackUrl: '/', redirect: true })} className="group relative px-4 py-2 lg:px-6 lg:py-3 bg-[#1F2937] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 transition-transform duration-300 group-hover:translate-x-0 -translate-x-full"></div>
          <span className="relative flex items-center font-medium text-xs lg:text-base">
            <LogOut className="lg:w-4 lg:h-4 w-3 h-3 mr-2 text-xs lg:text-base" />
            Log Out
          </span>
        </button>
      </div>
    </>
  )

  const renderBilling = () => (
    <>
      <h1 className="text-xl lg:text-3xl font-bold text-white mb-8">Credits & Billing</h1>
      <div className="grid gap-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-lg mb-2">Available Credits</p>
              <p className="text-4xl font-bold text-white">{credits}</p>
            </div>
            <CreditCard className="w-12 h-12 text-blue-100" />
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
            <div className="space-y-4 h-96 overflow-y-scroll">
              {orders && orders.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1F2937] rounded-xl"
                >
                  <div className="flex flex-col justify-center gap-4">
                    <p className="font-medium">{transaction.amount === 1459 ? 250 : transaction.amount === 959 ? 120 : 50} Credits</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <span className={`${ transaction.status === "completed" ? "text-emerald-400" : "text-red-400"}`}>{transaction.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderMedia = () => (
    <>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 pt-[5rem]">
          <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => { setShow("") }}
              className="absolute top-4 right-4 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <img
              src={show}
              alt={"Icon"}
              className="w-full h-[50vh] object-contain"
            />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {icons && icons.map((image, index) => (
          <div
            onClick={() => {
              if(window.screen.width < 500) {
                window.open("https://d2sp6678va8qfs.cloudfront.net/" + image.url, "__blank")
              }
            }}
            key={index}
            className={`group relative aspect-square bg-[#0D1219] rounded-2xl border border-[#1F2937] overflow-hidden w-28 md:w-52`}
          >
            <Image src={"https://d2sp6678va8qfs.cloudfront.net/" + image.url} width={500} height={500} alt={`Media ${image.key}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex space-x-2">
                  <button onClick={() => { setShow("https://d2sp6678va8qfs.cloudfront.net/" + image.url) }} className={`md:block hidden flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-lg text-white text-sm hover:bg-white/20 transition-colors`}>
                    View
                  </button>
                  <button onClick={() => {handleDownload("https://d2sp6678va8qfs.cloudfront.net/" + image.url)}} className={`md:block hidden flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-lg text-white text-sm hover:bg-white/20 transition-colors`}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  const renderSettings = () => (
    <>
      <h1 className="text-lg lg:text-3xl font-bold text-white mb-8">Account Settings</h1>
      <div className="space-y-6">
        <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Danger Zone</h3>
          <p className="text-gray-400 mb-4 text-sm lg:text-base">Once you delete your account, there is no going back.</p>
          <button onClick={async () => {
            setDeleting(true)
            await fetch("/api/user/delete", 
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
              setDeleting(false)
            })
            location.reload()
          }} className="flex flex-row gap-5 text-xs lg:text-base px-6 py-3 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors">
            {
              deleting &&
              <div className="w-6 h-6 border-red-100 border-2 border-r-transparent animate-spin rounded-full"></div>
            }
            Delete Account
          </button>
        </div>
      </div>
    </>
);

  const sections = [
    { id: "profile", icon: User, label: "Profile", component: renderProfile },
    { id: "media", icon: Images, label: "Media", component: renderMedia },
    { id: "billing", icon: CreditCard, label: "Billing", component: renderBilling },
    // { id: "security", icon: Shield, label: "Security", component: renderSecurity },
    { id: "settings", icon: Settings, label: "Settings", component: renderSettings },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F16] text-gray-200">
      <div className="grid grid-cols-12 min-h-screen pt-16">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-[#0D1219] border-r border-[#1F2937]">
          <div className="p-6 space-y-2 flex flex-row gap-4 overflow-x-scroll scrollbar-hide lg:flex-col">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center text-xs lg:text-base justify-between px-4 py-3 rounded-xl transition-colors ${activeSection === section.id
                  ? "bg-[#1F2937] text-white"
                  : "text-gray-400 hover:bg-[#1F2937]/50"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="w-3 h-3 lg:w-5 lg:h-5" />
                  <span className="font-medium text-xs lg:text-base">{section.label}</span>
                </div>
                {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
            {
              sections.map((section) => (
                <div
                  key={section.id}
                  className={`transition-opacity duration-300 ${activeSection === section.id ? "block" : "hidden"
                    }`}
                >
                  {section.component()}
                </div>
              ))
            }
          </div>
          <div className="w-full h-96">

          </div>
        </div>
      </div>
    </div>
  )
}