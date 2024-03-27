import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { restId } = useParams();
  const [showIndex, setShowIndex] = useState(null)
  const resInfo = useRestaurantMenu(restId); // instead of writing long as below , we crrated a custom hook which makes RestaurantMenu component clean
  //RestaurantMenu comp is not responsible for fetching the data , its only responsibility to show the menu
  //useRestaurantMenu is responsibility to provide the data

  // const [resInfo, setResInfo] = useState(null);

  //   useEffect(() => {
  //     fetchMenu();
  //   }, []);

  //   const fetchMenu = async () => {
  //     const data = await fetch(MENU_API + restId);
  //     const json = await data.json();
  //     console.log("menu", json);
  //     setResInfo(json.data);
  //   };

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    c=> c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  )

  console.log("cate", categories)

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category, index) => 
         //this is a controlled component bcoz parent component has control over its child component
         //in this case show & hide of child component is controlled by parent and not by children itself
          <RestaurantCategory 
              key={category?.card?.card?.title} 
              data={category?.card?.card}
              showIndex={index === showIndex ? true : false}
              setShowIndex={() => index === showIndex ? setShowIndex(null) : setShowIndex(index)}
          />    
      )}
    </div>
  );
};

export default RestaurantMenu;
