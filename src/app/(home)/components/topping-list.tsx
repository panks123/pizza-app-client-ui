'use client';
import React from "react";
import ToppingCard, { Topping } from "./topping-card";

const toppings = [
  { id: 1, name: "Chicken", image: "/chicken.png", price: 50, isAvailable: true },
  { id: 2, name: "Jelepeno", image: "/jelapeno.png", price: 50, isAvailable: true },
  { id: 3, name: "Mushroom", image: "/mushroom.png", price: 50, isAvailable: true },
]
const ToppingList = () => {
  const [selctedToppings, setSelectedToppings] = React.useState([toppings[0]]);
  const handleSelectTopping = (topping: Topping, action: "check" | "uncheck") => {
    if(action === "check")
      setSelectedToppings((prev) => prev.concat(topping));
    else 
      setSelectedToppings((prev) => prev.filter(x => x.id !== topping.id))
  }
  return (
    <section className="mt-5 ">
      <h4>Extra Toppings</h4>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {
          toppings.map((topping) => (
            <ToppingCard 
              topping={topping} 
              key={topping.id} 
              selectedToppings={selctedToppings}
              handleSelectTopping={handleSelectTopping}
            />
          ))
        }
      </div>
    </section>
  )
}

export default ToppingList
