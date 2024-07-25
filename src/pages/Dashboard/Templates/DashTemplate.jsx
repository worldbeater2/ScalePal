import { Outlet } from "react-router-dom";



const DashTemplate = () => {
  return (
    <>
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4 font-outfit">
       <p className="text-sm font-semibold md:text-xl text-prussianblue">Templates</p>
       <div>
        <Outlet />
       </div>
    </main>
  
 </>
  )
}

export default DashTemplate;



