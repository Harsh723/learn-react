import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showIndex, setShowIndex }) => {

  //if we would have used the this component itself to show and hide the component then it is uncontrolled component
  //const [showItem, setShowItem] = useState(false)

  const handleClick = () => {
    //setShowItem(!showItem)
    
    setShowIndex()
  }

  return (
    <div>
        {/* accordion header */}
      <div className="bg-gray-50 w-6/12 mx-auto shadow-lg p-4 my-4 ">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {/* accordion data */}
        { showIndex && <ItemList items={data.itemCards}/>}
      </div>
    </div>
  );
};

export default RestaurantCategory;
