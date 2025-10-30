import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Logo from "./Logo"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('isLoggedIn') === 'true')
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    window.addEventListener('storage', syncAuth)
    window.addEventListener('authChanged', syncAuth as EventListener)
    return () => {
      window.removeEventListener('storage', syncAuth)
      window.removeEventListener('authChanged', syncAuth as EventListener)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    window.dispatchEvent(new Event('authChanged'))
    setIsOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-[#0A0F1C] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => handleNavigation("/")} className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`${
                    isActive(item.href)
                      ? "text-emerald-500"
                      : "text-gray-300 hover:text-emerald-400"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </button>
              ))}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className={`${isActive("/dashboard") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className={`${isActive("/login") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/register")}
                    className={`${isActive("/register") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>


          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`${isActive(item.href) ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                >
                  {item.name}
                </button>
              ))}
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className={`${isActive("/dashboard") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`text-gray-300 hover:text-emerald-400 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation("/login")}
                    className={`${isActive("/login") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation("/register")}
                    className={`${isActive("/register") ? "text-emerald-500" : "text-gray-300 hover:text-emerald-400"} block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
