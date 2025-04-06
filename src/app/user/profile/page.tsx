"use client"

import { useEffect, useState } from "react"
import { CreditCard, Settings, User, Image, ChevronRight, LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function Profile() {

  const [activeSection, setActiveSection] = useState("profile")
  const [icons, setIcons] = useState<[{key: string, url: string}] | []>([])
  const [credits, setCredits] = useState("NA")

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
        if(data.success === 0) {
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
        if(!data.success) {
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

    useEffect(() => {
      getUserData()
    }, [])

    const renderProfile = () => (
      <>
        <div className="flex items-center space-x-6">
          <div className="relative">
            { session &&
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
            onClick={() => signOut({ callbackUrl: '/', redirect:true })} className="group relative px-4 py-2 lg:px-6 lg:py-3 bg-[#1F2937] rounded-xl overflow-hidden">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Purchase Credits</h3>
              <div className="space-y-4">
                {[{tokens: 50, amount: 459}, {tokens: 120, amount: 1059}].map((amount) => (
                  <button
                    key={amount.amount}
                    className="w-full bg-[#1F2937] hover:bg-[#2D3748] p-4 rounded-xl transition-colors"
                  >
                    <span className="text-lg font-medium">{amount.tokens} Credits</span>
                    <span className="block text-sm text-gray-400 mt-1">${amount.amount / 100}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
              <div className="space-y-4">
                {[
                  { date: "2024-03-15", amount: 500, status: "Completed" },
                  { date: "2024-02-28", amount: 1000, status: "Completed" },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#1F2937] rounded-xl"
                  >
                    <div>
                      <p className="font-medium">{transaction.amount} Credits</p>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                    <span className="text-emerald-400">{transaction.status}</span>
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
        <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icons && icons.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square bg-[#0D1219] rounded-2xl border border-[#1F2937] overflow-hidden"
            >
              <img src={image.url} alt={`Media ${image.key}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-lg text-white text-sm hover:bg-white/20 transition-colors">
                      View
                    </button>
                    <button className="flex-1 bg-white/10 backdrop-blur-sm py-2 rounded-lg text-white text-sm hover:bg-white/20 transition-colors">
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

    const sections = [
      { id: "profile", icon: User, label: "Profile", component: renderProfile },
      { id: "media", icon: Image, label: "Media", component: renderMedia },
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

  const renderSecurity = () => (
    <>
      <h1 className="text-xl lg:text-3xl font-bold text-white mb-8">Security Settings</h1>
      <div className="space-y-6">
        <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
          <p className="text-gray-400 mb-4 text-sm lg:text-base">Add an extra layer of security to your account</p>
          <button className="text-xs lg:text-base px-6 py-3 bg-[#1F2937] rounded-xl text-white font-medium hover:bg-[#2D3748] transition-colors">
            Enable 2FA
          </button>
        </div>

        <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Password</h3>
          <p className="text-gray-400 mb-4 text-sm lg:text-base">Change your password regularly to keep your account secure</p>
          <button className="text-xs lg:text-base px-6 py-3 bg-[#1F2937] rounded-xl text-white font-medium hover:bg-[#2D3748] transition-colors">
            Change Password
          </button>
        </div>

        <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
          <div className="space-y-4">
            {[
              { device: "MacBook Pro", location: "New York, US", current: true },
              { device: "iPhone 13", location: "New York, US", current: false },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-xl">
                <div>
                  <p className="font-medium text-white">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-400">{session.location}</p>
                </div>
                {!session.current && (
                  <button className="text-red-400 hover:text-red-300 transition-colors">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <h1 className="text-lg lg:text-3xl font-bold text-white mb-8">Account Settings</h1>
      <div className="space-y-6">
        {/* <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Notifications</h3>
          {["Email notifications", "Push notifications", "Monthly newsletter"].map((setting, index) => (
            <div key={index} className="flex items-center justify-between py-4">
              <span className="text-gray-300 text-sm lg:text-base">{setting}</span>
              <button className="w-12 h-6 bg-[#1F2937] rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div>
              </button>
            </div>
          ))}
        </div> */}

        {/* <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Language & Region</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2 text-sm lg:text-base">Language</label>
              <select className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-xl text-xs lg:text-base">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2 text-sm lg:text-base">Time Zone</label>
              <select className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-xl text-xs lg:text-base">
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </div> */}

        <div className="bg-[#0D1219] rounded-2xl border border-[#1F2937] p-6">
          <h3 className="text-md lg:text-lg font-semibold text-white mb-4">Danger Zone</h3>
          <p className="text-gray-400 mb-4 text-sm lg:text-base">Once you delete your account, there is no going back.</p>
          <button className="text-xs lg:text-base px-6 py-3 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );