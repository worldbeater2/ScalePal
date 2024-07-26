import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {

    const location = useLocation();

    console.log(location)

    let currentLink = "";

    const crumbs = location.pathname.split("/").filter((crumb) => crumb !== "").map((crumb) => {
      currentLink += `/${crumb}`;
      return {
        path: currentLink,
        breadcrumb: crumb
      };
    })

    console.log(crumbs)


  return (
    <>
      {/* Breadcrumbs starts */}
      <div className="breadcrumbs text-sm font-outfit text-prussianblue font-light ml-4 ">
        <ul>
          {crumbs.map((crumb, index) => (
            <li key={index}>
              <Link to={crumb.path}>{crumb.breadcrumb}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Breadcrumbs ends */}
    </>
  );
};

export default BreadCrumbs;
