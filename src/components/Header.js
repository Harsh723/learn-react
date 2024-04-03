import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

  const [ btnNameReact, setBtnNameReact ] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { LoggedInUser } = useContext(UserContext); // this how we consume the context data using useContext hook

  // Subscribing to the store using a selector and read the data from the store using a selector
  const cartItems = useSelector((store) => store.cart.items); //this hook will gives us access to the redux store
  console.log("cartItems", cartItems) //now we will tell this selector what portion of redux store we need access to read the data
  //here we just need access to cart items 
  //in other words we can say that here we are just subscribing to the small portion of redux store which is cart.items
  //Whenever cart.items will modify then our local cartItems will modify

  return (
    <div className="flex justify-between">
      <div className="w-56">
        <img src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4 justify-evenly">
          <li className="p-4">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="p-4">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4">
            <Link to="/about">About us</Link>
          </li>
          <li className="p-4">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="p-4">
            <Link to="/cart">Cart-({cartItems.length} items)</Link>
          </li>
          <button
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login")
            }}
          >
            {btnNameReact}
          </button>
          <li>UserName: {LoggedInUser} </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
