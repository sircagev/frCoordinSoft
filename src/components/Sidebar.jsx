import { ChevronFirst, ChevronLast, MoreVertical, X, Menu, Power, Copyright } from "lucide-react";
import logo from "../assets/inventarioslogo.png";
import logo_sena from "../assets/logo_sena.png";
import profile from "../assets/profile.png";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ModalLogout } from "../configs/ModalLogout";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <aside className="h-screen bg-slate-50 text-black border-r shadow-sm">
                <nav className="h-full flex flex-col justify-start">
                    <div className="px-4 pt-2 pb-2 flex justify-between items-center">
                        <div className="flex items-end gap-2">
                            <img src={logo} className={`overflow-hidden duration-500 ease-out rounded-full ${expanded ? "w-20" : "w-0"}`} alt="Logo" />
                        </div>
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <span className="ml-3 h-8 flex items-center">
                            MENU
                        </span>

                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 px-1 2xl:px-3 mt-4 py-6 border-b border-gray-200">{children}</ul>
                        </SidebarContext.Provider>
                    </div>

                    <div className=" flex p-3 absolute bottom-5 w-full cursor-pointer border-gray-200">
                        <Power className="ml-1" size={20} />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>
                            <div>
                                <ModalLogout />
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export function SidebarItem({ nav, icon, text, alert }) {
    const { expanded } = useContext(SidebarContext);
    const { pathname } = useLocation();

    const isActive = pathname.startsWith(nav);

    return (
        <Link to={nav}>
            <li className={`relative flex items-center py-2 px-3 my-1 font-normal rounded-md cursor-pointer group ${isActive ? "bg-orange-500 text-black" : "hover:bg-orange-500 hover:text-white text-black"}`}>
                {icon}
                <span className={`overflow-hidden transition-all duration-300 ${expanded ? "w-48 ml-3" : "w-0"}`}>{text}</span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
                    </div>
                )}
                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-50 text-sky-900 text-sm invisible opacity-0 transform -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    );
}
