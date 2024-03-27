import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";

//chunking
//Code Spliting
//Dynamic Bundling
//Laz Loading
//on demand loading
//all above mentioned names means same thing
const About = lazy(() => import("./components/About"));

console.log(React); // object


const AppLayout = () => {

  const [userName, setUserName] =  useState();

  useEffect(()=>{
    //make an api call and send username & password
    const data = {
      name:"Harsh"
    }
    console.log("effect callled")
    setUserName(data.name)
  },[])

  return (
    //here at this line 35 still loggedInUser value will be default user as store in UserContext will creating it
    //entire app will now have userName as "Harsh" not "Default user"... this is how we update our context value
    <UserContext.Provider value={{ LoggedInUser: userName, setUserName }}>
      <div className="app">
      <UserContext.Provider value={{ LoggedInUser: "Rahul" }}>
         {/* only header will have "Rahul" as LoggedInUser not "Harsh" */}
        <Header />
      </UserContext.Provider>
        {/* <Body /> */}
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     errorElement: <Error />,
//   },
//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     path: "/contact",
//     element: <Contact />,
//   },
// ]);

//if I want my header to be intact in all the pages then
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restuarant/:restId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
