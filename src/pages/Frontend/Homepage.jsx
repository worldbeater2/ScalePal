import React, { useState } from "react";
import Footer from "../../units/Footer";
import Navbar from "../../units/Navbar";
import { db } from "@/firebase/firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error("Please enter a valid email 📧", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    try {
      await setDoc(doc(db, "waitlist", email), {
        Email: email
      });
      toast.success("Thank you for joining our waitlist", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      // Clear the form fields
      setEmail("");
    } catch (error) {
      toast.error("Please enter a valid email 📧", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="w-screen h-[600px] flex flex-col items-center">
          <div className="pt-5 mt-10 tracking-widest text-rasonblack text-center text-5xl font-outfit w-[850px]">
            Building the Future of Business Tools for Startups and Enterprises
          </div>
          <div className="pt-5 tracking-normal text-rasonblack text-opacity-80 text-center text-xl font-outfit w-[600px]">
            Join our waitlist for exclusive access when we launch
          </div>

          <div className="pt-3 mt-5 mb-5 flex flex-row w-[600px] justify-center font-outfit">
            <div className="input input-bordered flex items-center border-prussianblue gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                style={{ borderColor: isValidEmail ? 'initial' : 'red' }}
              />
            </div>

            <button
              className="btn bg-prussianblue hover:bg-carebean hover:text-whi text-white ml-3"
              onClick={handleSubmit}
            >
              Join waitlist
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="mockup-browser bg-prussianblue bg-opacity-90 border w-[1000px] font-outfit mt-5 mb-4">
            <div className="mockup-browser-toolbar">
              <div className="input">https://www.scalepal.io</div>
            </div>
            <div className="bg-base-200 flex font-outfit text-base justify-center px-4 text-prussianblue py-28">
              Coming Soon! <span className="animate-bounce">🚀</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Homepage;
