import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Ticket,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../logo.png"
import { useAuthProvider } from "../hooks/useAuthProvider";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Tickets",
    icon: Ticket,
    href: "/tickets",
  },
  {
    permlevel: 60,
    label: "Admin",
    icon: Lock,
    href: "/admin/tickets",
    subItems: [
      { label: "Tickets", permlevel: 60, href: "/admin/tickets" },
      { label: "Spieler", permlevel: 60, href: "/admin/players" },
      { label: "Fraktionen", permlevel: 60, href: "/admin/factions" },
      { label: "Logs", permlevel: 60, href: "/admin/logs" }
    ],
  },
  {
    label: "Logout",
    icon: LogOut,
    href: "/logout",
  },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const { currentUser } = useAuthProvider();

  // Detect screen size changes to manage isSidebarOpen
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyDesktop = window.innerWidth >= 768;
      setIsDesktop(isCurrentlyDesktop);
      if (isCurrentlyDesktop) {
        setIsSidebarOpen(false); // Reset for desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (label: any) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Animation variants for mobile only
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="md:hidden p-4 fixed top-0 left-0 z-50 text-white bg-black/80 backdrop-blur-sm rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        // Apply animations only on mobile
        variants={isDesktop ? {} : sidebarVariants}
        initial={isDesktop ? {} : "closed"}
        animate={isDesktop ? {} : isSidebarOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="
          fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-black to-neutral-900 text-white font-satoshi 
          flex flex-col shadow-2xl z-40
          md:static md:h-screen md:w-64 md:flex md:translate-x-0
        "
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-center border-b border-neutral-700/50">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={Logo}
            alt="Void Roleplay Logo"
            className="h-10"
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-4">
            {currentUser && routes.filter(x => (x.permlevel || 0) < currentUser.permission).map((route) => (
              <li key={route.label}>
                {route.subItems ? (
                  <>
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(38, 38, 38, 0.8)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleDropdown(route.label)}
                      className="flex items-center w-full p-3 rounded-lg text-white hover:bg-neutral-800/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
                    >
                      <route.icon className="w-5 h-5 mr-3 text-neutral-400" />
                      <span className="flex-1 text-left text-sm font-medium">{route.label}</span>
                      <motion.div
                        animate={{ rotate: openDropdown === route.label ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openDropdown === route.label ? (
                          <ChevronDown className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-neutral-400" />
                        )}
                      </motion.div>
                    </motion.button>
                    {openDropdown === route.label && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="ml-8 mt-1 space-y-1"
                      >
                        {route.subItems.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              to={"/panel" + subItem.href}
                              className="flex items-center p-2 rounded-lg text-neutral-400 hover:bg-neutral-800/80 hover:text-white transition-all duration-200 text-sm"
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </>
                ) : (
                  <motion.div whileHover={{ backgroundColor: "rgba(38, 38, 38, 0.8)" }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to={"/panel" + route.href}
                      className="flex items-center p-3 rounded-lg text-white hover:bg-neutral-800/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <route.icon className="w-5 h-5 mr-3 text-neutral-400" />
                      <span className="text-sm font-medium">{route.label}</span>
                    </Link>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;