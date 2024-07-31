import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/units/Footer";
import Navbar from "@/units/Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      setTimeout(() => {
        window.location.href = "dashboard";
      }, 1000);

      toast.success(" Logged in successfully ⚫️ Welcome! 🚀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error.message);
      //
    }
  };

  async function googleSignup() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName,
        lastName: "",
        email: user.email,
        photoUrl: user.photoURL,
      });

      toast.success("Logged in successfully ⚫️ Welcome! 🚀", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      window.location.href = "dashboard";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] font-outfit my-1 ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6 ">
            <div className="grid gap-2 text-center">
              <h1 className="text-5xl mb-3 text-rasonblack -mt-10 font-semibold">
                Login
              </h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                className="border-neutral-600"
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                className="border-neutral-600"
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-prussianblue hover:bg-sky-900"
                onClick={handleSubmit}
              >
                Login
              </Button>

              <div className="text-center divider font">or</div>

              <Button
                variant="outline"
                className="w-full bg-carebean text-white hover:bg-teal-600 hover:text-white"
                onClick={googleSignup}
              >
                      <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z"
                      fill="#ffffff"
                    ></path>{" "}
                  </g>
                </svg>
                Login with Google
        
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup">
                <a href="#" className="underline">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden bg-muted lg:block max-h-[850px]">
          <img
            src="https://images.unsplash.com/photo-1719306563732-d96ebd9163e5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width="1920"
            height="1080"
            className="h-full w-full   dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>

      <Footer />

      <ToastContainer />
    </>
  );
};
//src="https://images.unsplash.com/photo-1719937075848-6c189dffdbed?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default Login;
