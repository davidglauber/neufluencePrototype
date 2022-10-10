// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import { ProfileIcon } from "components/Icons/Icons";
import { CloseIcon, SunIcon } from "@chakra-ui/icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Followers",
    rtlName: "لوحة القيادة",
    icon: <ProfileIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/",
    name: "You're very welcome here",
    rtlName: "لوحة القيادة",
    icon: <SunIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  }
];
export default dashRoutes;
