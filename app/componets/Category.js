import React from "react";
import Card from "./Card";

const Category = ({ id, title, color, cardsArray, addCard, updateCard, ...restProps }) => {
  return (
    <div className="w-1/3 min-w-80 px-2">
      <div className="w-full flex flex-wrap ">
        <h2 className="w-full mb-2 font-bold text-xl">{title}</h2>
        <button
          type="button"
          className="w-full bg-gray-300 text-gray-900 font-bold py-2 px-4 border-b-3 border-gray-950 hover:bg-gray-400 transition duration-300 ease-in-out"
          onClick={() => addCard(id)}
        >
          +
        </button>
        <div className="w-full flex flex-wrap mt-2">
          {cardsArray.map((card, key) => {
            return (
              <Card
                key={title + key}
                cardId={card.id}
                likes={card.likes}
                value={card.value}
                categoryId={id}
                color={color}
                updateCard={updateCard}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Category;
