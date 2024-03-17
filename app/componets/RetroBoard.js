"use client"
import { useState, useEffect } from "react"

import LocalStorageAPI from "../utils/apiUtils";

import Category from "./Category";

const DEFAULT_STATE = {
  categories: [{
    id: 1,
    title: "Went Well",
    color: "#22c55e",
    cards: []
  }, {
    id: 2,
    title: "To Improve",
    color: "#ec4899",
    cards: []
  }, {
    id: 3,
    title: "Action Items",
    color: "#d946ef",
    cards: []
  }
  ]
};

const STORAGE_KEY = "RETRO_BOARD_STATE"

const DEFAULT_CARD = {
  value: "",
  likes: 0,
}

export default function RetroBoard() {
  const [boardData, setBoardData] = useState(DEFAULT_STATE)

  useEffect(()=>{
    LocalStorageAPI.get(STORAGE_KEY)
      .then(cachedData =>{
        if(cachedData){
          console.log(cachedData)
          setBoardData(cachedData)
        }
      })
  },[])

  const addCard = (id) =>{
    const temp = {...boardData}
    temp.categories[id-1].cards.push({
      id: Date.now(),
      ...DEFAULT_CARD
    })
    setBoardData(temp)
    LocalStorageAPI.update(STORAGE_KEY, temp)
  }

  const updateCard = ({c_id, id, action, value}) =>{

    const temp = {...boardData}
    let findIndex;
    let t_id;

    switch (action) {
      case 'UPDATE_VALUE':
        temp.categories[c_id-1].cards.forEach(item=>{
          if(item.id === id){
            console.log("here", action, value)
            item.value = value
          }
        })
        break;
      case 'UPDATE_LIKE':
        temp.categories[c_id-1].cards.forEach(item=>{
          if(item.id === id){
            item.likes += 1
          }
        })
        break;
      case 'DELETE':
        findIndex = temp.categories[c_id-1].cards.findIndex(a => a.id === id)
        findIndex !== -1 && temp.categories[c_id-1].cards.splice(findIndex , 1)
        break;
      case 'MOVE_LEFT':

        t_id = c_id == 1 ? 3: (c_id == 2 ? 1: 2)
        findIndex = temp.categories[c_id-1].cards.findIndex(a => a.id === id)
        temp.categories[t_id-1].cards.push(temp.categories[c_id-1].cards[findIndex])
        findIndex !== -1 && temp.categories[c_id-1].cards.splice(findIndex , 1)

        break;
      case 'MOVE_RIGHT':
        t_id = c_id == 1? 2: (c_id == 2 ? 3: 1)
        findIndex = temp.categories[c_id-1].cards.findIndex(a => a.id === id)
        temp.categories[t_id-1].cards.push(temp.categories[c_id-1].cards[findIndex])
        findIndex !== -1 && temp.categories[c_id-1].cards.splice(findIndex , 1)
        break;
      default:
        let a=1;
    }
    setBoardData(temp);
    LocalStorageAPI.update(STORAGE_KEY, temp)
  }

  return (
    <div className="w-full flex flex-wrap justify-between">
      {
        boardData.categories.map((item, key) => {
          return (
            <Category 
              key={key} 
              id={item.id} 
              color={item.color}
              title={item.title} 
              cardsArray={item.cards} 
              addCard={addCard}
              updateCard={updateCard}
            />
          )
        })
      }

    </div>
  );
}
