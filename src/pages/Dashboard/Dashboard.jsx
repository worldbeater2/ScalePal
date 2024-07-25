import React from "react";

import useFetch from "@/hooks/useFetch";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleDashed, FileBoxIcon,  Loader2,   SquareDashedBottom,   Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/units/UserContext/UserContext";


const Dashboard = () => {
  const { loading, data, error } = useFetch();
  const { userDetails } = useUser();


  const articles = data?.data || [];

  console.log("Fetched data:", data);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-3xl font-semibold md:text-6xl text-prussianblue">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 font-outfit">
      <div className="flex items-center border-b border-prussianblue border-opacity-20 pb-2">
        {userDetails && (
          <h1 className="text-sm font-medium md:text-xl md:tracking-normal text-prussianblue">
            Hello, {userDetails.firstName}!
          </h1>
        )}
      </div>
      <div className="w-[1100px] h-72 bg-prussianblue text-white p-14 font-outfit rounded-lg bg-opacity-95">
        <div className="flex flex-row w-fit ">
          <div className="flex flex-col  ">
            <div className="flex flex-row mb-5">
              <h1 className="text-xl font-semibold">
                Welcome to the ScalePal Universe <span className="animate-bounce ml-1">🚀</span>
              </h1>
            </div>
            <p className="text-sm w-[70%]">
              Ready to supercharge your startup? Dive into tools and tips
              designed just for you.We're here to help you turn your vision into reality. Let's embark on this exciting journey together!
            </p>
            <Link to="/blog" >
            <Button size="sm"  className="w-[100px] bg-carebean bg-opacity-80 mt-5 hover:bg-teal-700 " variant="default">
            Explore Blog
            </Button>
            </Link>
          </div>
          <div className="">
            <img
              src="../../assets/1.png"
              alt="pal"
              className="w-[300px] h-[200px]"
            />
          </div>
        </div>
      </div>
      <div className="flex w-[100%] h-96 items-start justify-start rounded-sm p-5">
        <div className="flex w-[80%] flex-col items-start gap-1 text-center ">
          <div className="text-sm mb-5 font-semibold md:text-xl text-prussianblue">
            Recent Activity
          </div>

          <div className="flex w-[100%] p-2">
            <Card className="w-[200px] h-[100px] hover:cursor-pointer text-prussianblue hover:border-prussianblue flex flex-row justify-center items-center hover:bg-prussianblue hover:text-white">
              <CardHeader className="flex flex-row  ">
                <FileBoxIcon strokeWidth={1} className="h-6 w-6" />
                <CardTitle className="text-sm font-normal md:text-sm ml-2 hover:cursor-pointer">
                  Templates
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="w-[200px] h-[100px] ml-3 hover:cursor-pointer text-prussianblue hover:border-prussianblue flex flex-row justify-center items-center hover:bg-prussianblue hover:text-white">
              <CardHeader className="flex flex-row  ">
                <SquareDashedBottom strokeWidth={1} className="h-6 w-6" />
                <CardTitle className="text-sm font-normal md:text-sm ml-2 hover:cursor-pointer">
                  Workspace
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-[200px] h-[100px] ml-3 hover:cursor-pointer text-prussianblue hover:border-prussianblue flex flex-row justify-center items-center hover:bg-prussianblue hover:text-white">
              <CardHeader className="flex flex-row  ">
                <Loader2 strokeWidth={1} className="h-6 w-6" />
                <CardTitle className="text-sm font-normal md:text-sm ml-2 hover:cursor-pointer">
                  Tasks
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="flex h-[450px] w-96 flex-col items-start ml-10 p-14 -mt-10 font-outfit">
            <div className="text-sm mb-3 font-semibold ml-1 md:text-xl text-prussianblue">
              Updates
            </div>
            {articles.slice(0, 3).map((item, index) => (
              
              <div
                className="card hover:cursor-pointer hover:opacity-60 card-side bg-base-100 w-80 h-28 mt-3"
                key={index}
              >
                <a
                  href={item.shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-full h-full"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <figure className="w-28 h-24 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={item.thumbnail.url}
                      alt="Article"
                    />
                  </figure>
                  <div className="card-body -mt-3 flex-grow">
                    <h2 className="card-title p-0 text-start font-normal text-xs">
                      {item.headline}
                    </h2>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-prussianblue">No data available</p>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
