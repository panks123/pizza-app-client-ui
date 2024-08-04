import { Topping } from "@/types";
import ToppingCard from "./topping-card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ToppingList = ({selectedToppings, handleSelectTopping}: {selectedToppings: Topping[], handleSelectTopping: (topping: Topping, action: "check" | "uncheck") => void}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenantId');
  
  useEffect(() => {
    const fetchToppings = async () => {
      const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${tenantId}`);
      if(toppingResponse.ok) {
        const data: { data: Topping[]} = await toppingResponse.json();
        setToppings(data.data);
      }
    }
    fetchToppings();
  }, [tenantId]);

  return (
    <section className="mt-5 ">
    {toppings.length > 0 && <>
      <h4>Extra Toppings</h4>
        <div className="grid grid-cols-3 gap-2 mt-2">
            {
              toppings.map((topping) => (
                <ToppingCard 
                  topping={topping} 
                  key={topping._id}
                  selectedToppings={selectedToppings}
                  handleSelectTopping={handleSelectTopping}
                />
              ))
            }
        </div>
      </>
    }
    </section>
  )
}

export default ToppingList
