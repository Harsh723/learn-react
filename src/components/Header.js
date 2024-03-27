import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
  const onlineStatus = useOnlineStatus();

  const { LoggedInUser } = useContext(UserContext); // this how we consume the context data using useContext hook

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
          <li className="p-4" >Cart</li>
          <li>UserName: {LoggedInUser} </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
