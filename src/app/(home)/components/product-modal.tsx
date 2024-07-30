'use client';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import ToppingList from "./topping-list";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Topping } from "@/types";
import { addToCart, CartItem } from "@/lib/store/features/cart/cart-slice";
import { useAppDispatch } from "@/lib/store/hooks";

type ProductConfig = {
  [key: string]: string;
}

const ProductModal: React.FC<{ product: Product }> = ({ product }) => {
    const defaultConfig = Object.entries(product.priceConfiguration).map(([key, value]) => {
      return {
        key,
        value: Object.keys(value.availableOptions)[0]
      }
    }).reduce((acc, curr) => {
      return { ...acc, [curr.key]: curr.value };
    }, {});
    const [chosenConfig, setChosenConfig] = useState<ProductConfig>(defaultConfig);
    const [selctedToppings, setSelectedToppings] = React.useState<Topping[]>([]);
    const dispatch = useAppDispatch();

    const handleSelectTopping = (topping: Topping, action: "check" | "uncheck") => {
      if(action === "check")
        setSelectedToppings((prev) => prev.concat(topping));
      else 
        setSelectedToppings((prev) => prev.filter(x => x._id !== topping._id))
    }

    const handleRadioConfigChange = (key: string, value: string) => {
      setChosenConfig((prev) => ({ ...prev, [key]: value }));
      console.log({key, value})
    }
    console.log({chosenConfig})
    const handleAddToCart = (product: Product) => {
        console.log("Add to Cart")
        const cartItem = {
          product,
          chosenConfiguration: {
            priceConfiguration: chosenConfig!,
            selectedToppings: selctedToppings
          }
        }
        dispatch(addToCart(cartItem));
    }
  return (
    <Dialog>
      <DialogTrigger
        className="bg-orange-200 hover:bg-orange-300 text-orange-600 hover:text-orange-700 px-6 py-2 rounded-full 
            shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        Choose
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <div className="flex">
          <div className="w-1/3 bg-white rounded px-4 flex items-center justify-center">
            <Image
              src={product.image}
              alt="pizza-image"
              width={450}
              height={450}
            />
          </div>
          <div className="w-2/3 p-8">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1">{product.description}</p>
            {Object.entries(product.priceConfiguration).map(([key, value]) => {
              return (
                <div key={key}>
                  <h4 className="mt-6 mb-2 pl-1">Choose {key}</h4>
                  <RadioGroup
                    defaultValue={Object.keys(value.availableOptions)[0]}
                    className="grid grid-cols-3 gap-4"
                    onValueChange={(data) => {
                      console.log({data})
                      handleRadioConfigChange(key, data)}
                    }
                  >
                    {Object.keys(value.availableOptions).map((option) => {
                      return (
                        <div key={option}>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="peer sr-only"
                            aria-label={option}
                          />
                          <Label
                            htmlFor={option}
                            className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })}

            <ToppingList selctedToppings={selctedToppings} handleSelectTopping={handleSelectTopping} />
            <div className="flex justify-between items-center mt-8">
              <span className="font-semibold">₹689</span>
              <Button className="flex gap-2" onClick={() => handleAddToCart(product)}>
                <ShoppingCart size={22} />
                <span>Add to Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
