import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constant";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const { restId } = useParams();

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + restId);
    const json = await data.json();
    console.log("menu", json);
    setResInfo(json.data);
  };

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <h1>Menu</h1>
      {itemCards.map((item) => (
        <li key={item.card.info.id}>
          {item.card.info.name} -{" Rs. "}
          {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
        </li>
      ))}
    </div>
  );
};

export default RestaurantMenu;
