import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/firebase";
import Footer from "@/units/Footer";
import Navbar from "@/units/Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; 
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";



const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {    
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
     

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName : lastName,
          email    : email,
          // photoUrl: "",
        });
      }
      console.log("User created successfully");

      window.location.href = "/login";

      toast.success("Account created successfully", {
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

  async function googleSignup() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName,
        lastName: '',
        email: user.email,
        photoUrl: user.photoURL

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
      <section
        className="bg-cover bg-center font-outfit"
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: -1,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 1,
          backgroundBlendMode: "multiply", // Adds a darker effect to the image
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.2)
          ), url(${"https://images.unsplash.com/photo-1588857015448-734faab35b84?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`, //https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
        }}
      >
        <Navbar className="text-prussianblue" />
  
          <Card className="mx-auto max-w-sm my-20 border-prussianblue">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Max" required
   
                      onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name" >Last name</Label>
                    <Input id="last-name" placeholder="Robinson" required

                      onChange={(e) => setLastName(e.target.value)} value={lastName} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password"
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <Button onClick={handleSignUp} type="submit" className="w-full bg-prussianblue hover:bg-sky-900 font-outfit"   >
                  Create an account
                </Button>
                <div className="text-center divider">or</div>
                <Button
                  variant="outline"
                  className="w-full bg-carebean text-white hover:bg-teal-600 hover:text-white font-outfit"  
                  onClick={googleSignup}
                >
                  Sign up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
    

        <Footer />
        <ToastContainer />
      </section>
    </>
  );
};

export default Signup;
