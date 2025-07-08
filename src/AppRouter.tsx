import { JSX, useContext, useMemo } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { RouteConfig } from "./types/RouteConfig";
import HomeView from "./pages/Default/Home/HomeView";
import BaseLayout from "./layouts/BaseLayout";
import LoginView from "./pages/Default/Auth/Login";
import { FactionsView } from "./pages/Default/Factions/Factions";
import { FactionView } from "./pages/Default/Factions/Faction";
import { IFunctionRoute } from "./types/IFunctionRoute";
import { authContext } from "./contexts/authContext";
import { LeaderboardView } from "./components/Leaderboard";
import { Rules } from "./pages/Default/Rules";
import { Contact } from "./pages/Default/Contact";
import { PlayView } from "./pages/Default/Play";
import { TeamView } from "./pages/Default/Team/Team";
import ImprintView from "./pages/Default/Legal/ImprintView";
import PrivacyPolicyView from "./pages/Default/Legal/PrivacyView";
import PanelView from "./pages/Dashboard/Panel";
import DashboardLayout from "./layouts/DashboardLayout";
import TicketsPage from "./pages/Dashboard/Tickets/TicketsPage";
import TicketPage from "./pages/Dashboard/Tickets/TicketPage";
import AdminTicketsPage from "./pages/Dashboard/Tickets/AdminTicketsPage";
import PlayersListPage from "./pages/Admin/PlayersList";
import PlayerPage from "./pages/Admin/Player";
import LogsPage from "./pages/Admin/Logs";
import FactionPage from "./pages/Admin/Faction";
import FactionsPage from "./pages/Admin/Factions";

interface AuthContextType {
  currentUser: { id: string } | null;
}

export const AppRoutes: Record<string, RouteConfig> = {
  HOME: {
    path: "/",
    element: <HomeView />,
    auth: false,
    layout: <BaseLayout />,
  },
  LOGIN: {
    path: "/auth/login",
    element: <LoginView />,
    auth: false,
    layout: <BaseLayout />,
  },
  FACTIONS: {
    path: "/factions",
    element: <FactionsView />,
    auth: false,
    layout: <BaseLayout />,
  },
  FACTION: {
    path: "/factions/:faction",
    element: <FactionView />,
    auth: false,
    layout: <BaseLayout />,
  },
  LEADERBOARD: {
    path: "/leaderboard/:type",
    element: <LeaderboardView />,
    auth: false,
    layout: <BaseLayout />,
  },
  RULES: {
    path: "/rules",
    element: <Rules />,
    auth: false,
    layout: <BaseLayout />,
  },
  IMPRINT: {
    path: "/imprint",
    element: <ImprintView />,
    auth: false,
    layout: <BaseLayout />,
  },
  PRIVACY_POLICY: {
    path: "/privacy-policy",
    element: <PrivacyPolicyView />,
    auth: false,
    layout: <BaseLayout />,
  },
  CONTACT: {
    path: "/contact",
    element: <Contact />,
    auth: false,
    layout: <BaseLayout />,
  },
  PLAY: {
    path: "/play",
    element: <PlayView />,
    auth: false,
    layout: <BaseLayout />,
  },
  TEAM: {
    path: "/team",
    element: <TeamView />,
    auth: false,
    layout: <BaseLayout />,
  },
  TICKETS: {
    path: "/panel/tickets",
    element: <TicketsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  TICKET: {
    path: "/panel/tickets/:id",
    element: <TicketPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_TICKETS: {
    path: "/panel/admin/tickets",
    element: <AdminTicketsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_PLAYERSLIST: {
    path: "/panel/admin/players",
    element: <PlayersListPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_PLAYER: {
    path: "/panel/admin/players/:uuid",
    element: <PlayerPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_LOGS: {
    path: "/panel/admin/logs",
    element: <LogsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_FACTIONS: {
    path: "/panel/admin/factions",
    element: <FactionsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ADMIN_FACTION: {
    path: "/panel/admin/factions/:name",
    element: <FactionPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  DASHBOARD: {
    path: "/panel",
    element: <PanelView />,
    auth: true,
    layout: <DashboardLayout />,
  }
};

export default function AppRouter(): JSX.Element {
  const renderRoutes = useMemo((): JSX.Element[] => {
    const routesByLayout = new Map<JSX.Element, RouteConfig[]>();

    Object.values(AppRoutes).forEach(route => {
      const layout = route.layout ?? <></>;
      if (!routesByLayout.has(layout)) routesByLayout.set(layout, []);
      routesByLayout.get(layout)!.push(route);
    });

    return Array.from(routesByLayout.entries()).map(([layout, routes], i) => (
      <Route
        key={`layout-${i}`}
        element={
          routes.some(route => route.auth) ? (
            <AuthRoutes redirectTo="/auth/login">
              {layout}
            </AuthRoutes>
          ) : (
            layout
          )
        }
      >
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    ));
  }, []);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes}</Routes>
    </BrowserRouter>
  );
}

const AuthRoutes = ({ redirectTo = "/auth/login", children }: IFunctionRoute & { children?: React.ReactNode }) => {
  const { currentUser } = useContext(authContext) as AuthContextType;
  return currentUser ? <>{children ? children : <Outlet />}</> : <Navigate to={redirectTo} replace />;
};