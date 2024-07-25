import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUser,
  Menu,
  Search,
  BriefcaseBusiness,
  FileBox,
  Loader2,
  BarChart2,
  SquareDashedBottom,
  Home,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/firebase/firebase";
import { useUser } from "@/units/UserContext/UserContext";

const Dashboardmain = () => {
  const { userDetails, isLoading } = useUser();
  const location = useLocation();

  useEffect(() => {
    if (!userDetails && !isLoading) {

      console.log("User details not found!");
    }
  }, [userDetails, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      toast.success("Logged out successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  const getLinkClass = (path) => {
    // Check if the current URL path matches the given path
    if (location.pathname === path) {
      // Return the CSS class name for the active link with background color and text color
      return "flex items-center gap-3 rounded-lg px-3 py-2 bg-prussianblue text-white transition-all";
    } else {
      // Return the CSS class name for the inactive link with default text color and hover effect
      return "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
    }
  };

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-outfit">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to="/dashboard/overview">
                <a className="btn btn-ghost text-xl">
                  <img
                    src="/assets/ScalePal Default.svg"
                    className="w-28 text-black"
                    alt="ScalePal Logo"
                  />
                </a>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 ">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/dashboard/overview"
                  className={getLinkClass("/dashboard/overview")}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/workspace"
                  className={getLinkClass("/dashboard/workspace")}
                >
                  <SquareDashedBottom className="h-4 w-4" />
                  Workspace
                </Link>
                <Link
                  to="/dashboard/templates"
                  className={getLinkClass("/dashboard/templates")}
                >
                  <FileBox className="h-4 w-4" />
                  Templates
                </Link>
                <Link
                  to="/dashboard/status"
                  className={getLinkClass("/dashboard/status")}
                >
                  <Loader2 className="h-4 w-4" />
                  Tasks
                </Link>
                <Link
                  to="/dashboard/analytics"
                  className={getLinkClass("/dashboard/analytics")}
                >
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="text-base text-prussianblue font-medium">Upgrade to Pro</CardTitle>
                  <CardDescription className="text-sm font-light text-muted-foreground">
                    Unlock all features and get unlimited access 
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button  className="w-full bg-prussianblue hover:bg-prussianblue text-sm bg-opacity-90">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-outfit">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col font-medium">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <BriefcaseBusiness className="h-6 w-6" />
                    <span className="sr-only">Scalepal</span>
                  </Link>
                  <Link
                    to="/dashboard/overview"
                    className={getLinkClass("/dashboard/overview")}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/workspace"
                    className={getLinkClass("/dashboard/workspace")}
                  >
                    <SquareDashedBottom className="h-5 w-5" />
                    Workspace
                  </Link>
                  <Link
                    to="/dashboard/templates"
                    className={getLinkClass("/dashboard/templates")}
                  >
                    <FileBox className="h-5 w-5" />
                    Templates
                  </Link>
                  <Link
                    to="/dashboard/status"
                    className={getLinkClass("/dashboard/status")}
                  >
                    <Loader2 className="h-5 w-5" />
                    Tasks
                  </Link>
                  <Link
                    to="/dashboard/analytics"
                    className={getLinkClass("/dashboard/analytics")}
                  >
                    <BarChart2 className="h-5 w-5" />
                    Analytics
                  </Link>
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                    <CardTitle className="text-base text-prussianblue font-medium">Upgrade to Pro</CardTitle>
                  <CardDescription className="text-sm font-light text-muted-foreground">
                    Unlock all features and get unlimited access 
                  </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Button  className="w-full bg-prussianblue hover:bg-prussianblue text-sm bg-opacity-90">
                    Upgrade
                  </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Explore ScalePal..."
                    className="w-full text-sm appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="cursor-pointer">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboardmain;
