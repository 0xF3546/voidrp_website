import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../logo.png";
import { useAuthProvider } from "../hooks/useAuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AppRoutes } from "../AppRouter";

const NavBar = () => {
    const [factions, setFactions] = useState<any[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [leaderboards, setLeaderboards] = useState<any[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
    const location = useLocation();
    const { currentUser } = useAuthProvider();

    // Close menu when route changes
    useEffect(() => {
        setMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown !== null) {
                const currentRef = dropdownRefs.current[activeDropdown];
                if (currentRef && !currentRef.contains(event.target as Node)) {
                    setActiveDropdown(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeDropdown]);

    useEffect(() => {
        const load = async () => {
            try {
                const [factionsResponse, leaderboardsResponse] = await Promise.all([
                    axios.get('/faction'),
                    axios.get('/leaderboards')
                ]);
                
                setFactions(factionsResponse.data);
                setLeaderboards(leaderboardsResponse.data);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        load();
    }, []);

    const toggleDropdown = (dropdownId: number) => {
        setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <NavLink to="/" className="flex items-center space-x-3 group">
                        <motion.div 
                            className="bg-gray-800 p-2 rounded-full shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <img src={Logo || "/placeholder.svg"} className="h-10 w-10 rounded-full" alt="Logo" />
                        </motion.div>
                        <span className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">Void Roleplay</span>
                    </NavLink>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white transition-colors"
                            aria-controls="navbar-cta"
                            aria-expanded={menuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-1">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-full transition-colors ${isActive 
                                    ? "bg-orange-500 text-white font-medium" 
                                    : "text-white hover:bg-gray-800"}`
                            }
                        >
                            Start
                        </NavLink>
                        
                        <div className="relative" ref={el => { dropdownRefs.current[1] = el; }}>
                            <button 
                                onClick={() => toggleDropdown(1)} 
                                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                                    activeDropdown === 1 
                                        ? "bg-orange-500 text-white font-medium" 
                                        : "text-white hover:bg-gray-800"
                                }`}
                            >
                                <span>Hilfe</span>
                                <svg 
                                    className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 1 ? "rotate-180" : ""}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 1 && (
                                    <motion.div 
                                        className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-2xl shadow-xl overflow-hidden z-50"
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="py-1">
                                            <Link to="/rules" className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors">
                                                Regeln
                                            </Link>
                                            <Link to="/contact" className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors">
                                                Kontakt
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {factions.length > 0 && (
                            <div className="relative" ref={el => { dropdownRefs.current[2] = el; }}>
                                <button 
                                    onClick={() => toggleDropdown(2)} 
                                    className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                                        activeDropdown === 2 
                                            ? "bg-orange-500 text-white font-medium" 
                                            : "text-white hover:bg-gray-800"
                                    }`}
                                >
                                    <span>Fraktionen</span>
                                    <svg 
                                        className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 2 ? "rotate-180" : ""}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 2 && (
                                        <motion.div 
                                            className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-2xl shadow-xl overflow-hidden z-50"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="py-1 max-h-[60vh] overflow-y-auto">
                                                {factions.map((faction) => (
                                                    <Link 
                                                        key={faction.id}
                                                        to={`/factions/${faction.name.toLowerCase()}`} 
                                                        className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors"
                                                    >
                                                        {faction.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {leaderboards.length > 0 && (
                            <div className="relative" ref={el => { dropdownRefs.current[3] = el; }}>
                                <button 
                                    onClick={() => toggleDropdown(3)} 
                                    className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                                        activeDropdown === 3 
                                            ? "bg-orange-500 text-white font-medium" 
                                            : "text-white hover:bg-gray-800"
                                    }`}
                                >
                                    <span>Leaderboards</span>
                                    <svg 
                                        className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 3 ? "rotate-180" : ""}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === 3 && (
                                        <motion.div 
                                            className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-2xl shadow-xl overflow-hidden z-50"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="py-1 max-h-[60vh] overflow-y-auto">
                                                {leaderboards.map((leaderboard, index) => (
                                                    <Link 
                                                        key={index}
                                                        to={`/leaderboard/${leaderboard.url}`} 
                                                        className="block px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors"
                                                    >
                                                        {leaderboard.display}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Login/Dashboard button */}
                    <div className="hidden md:block">
                        {currentUser ? (
                            <Link 
                                to={AppRoutes.DASHBOARD.path} 
                                className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/20"
                            >
                                <span>Dashboard</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        ) : (
                            <Link 
                                to="/auth/login" 
                                className="inline-flex items-center px-6 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all transform hover:scale-105"
                            >
                                <span>Login</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        ></motion.div>
                        
                        <motion.div 
                            className="fixed right-0 top-0 h-full w-72 bg-gray-900 shadow-2xl p-6 z-50 overflow-y-auto md:hidden"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-white">Menu</h2>
                                <button 
                                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-2">
                                <NavLink 
                                    to="/" 
                                    className={({ isActive }) => 
                                        `block px-4 py-3 rounded-xl transition-colors ${isActive 
                                            ? "bg-orange-500 text-white font-medium" 
                                            : "text-white hover:bg-gray-800"}`
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Start
                                </NavLink>
                                
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => toggleDropdown(1)} 
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                                            activeDropdown === 1 
                                                ? "bg-orange-500 text-white font-medium" 
                                                : "text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        <span>Hilfe</span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform ${activeDropdown === 1 ? "rotate-180" : ""}`} 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {activeDropdown === 1 && (
                                            <motion.div 
                                                className="pl-4 space-y-1"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Link 
                                                    to="/rules" 
                                                    className="block px-4 py-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Regeln
                                                </Link>
                                                <Link 
                                                    to="/contact" 
                                                    className="block px-4 py-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    Kontakt
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                
                                {factions.length > 0 && (
                                    <div className="space-y-2">
                                        <button 
                                            onClick={() => toggleDropdown(2)} 
                                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                                                activeDropdown === 2 
                                                    ? "bg-orange-500 text-white font-medium" 
                                                    : "text-white hover:bg-gray-800"
                                            }`}
                                        >
                                            <span>Fraktionen</span>
                                            <svg 
                                                className={`w-4 h-4 transition-transform ${activeDropdown === 2 ? "rotate-180" : ""}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <AnimatePresence>
                                            {activeDropdown === 2 && (
                                                <motion.div 
                                                    className="pl-4 space-y-1 max-h-[40vh] overflow-y-auto"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {factions.map((faction) => (
                                                        <Link 
                                                            key={faction.id}
                                                            to={`/factions/${faction.name.toLowerCase()}`} 
                                                            className="block px-4 py-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            {faction.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                                
                                {leaderboards.length > 0 && (
                                    <div className="space-y-2">
                                        <button 
                                            onClick={() => toggleDropdown(3)} 
                                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                                                activeDropdown === 3 
                                                    ? "bg-orange-500 text-white font-medium" 
                                                    : "text-white hover:bg-gray-800"
                                            }`}
                                        >
                                            <span>Leaderboards</span>
                                            <svg 
                                                className={`w-4 h-4 transition-transform ${activeDropdown === 3 ? "rotate-180" : ""}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <AnimatePresence>
                                            {activeDropdown === 3 && (
                                                <motion.div 
                                                    className="pl-4 space-y-1 max-h-[40vh] overflow-y-auto"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {leaderboards.map((leaderboard, index) => (
                                                        <Link 
                                                            key={index}
                                                            to={`/leaderboard/${leaderboard.url}`} 
                                                            className="block px-4 py-3 rounded-xl text-white hover:bg-gray-800 transition-colors"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            {leaderboard.display}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8">
                                {currentUser ? (
                                    <Link 
                                        to="/cp" 
                                        className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium transition-all"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>Dashboard</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link 
                                        to="/auth/login" 
                                        className="flex items-center justify-center w-full px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>Login</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
