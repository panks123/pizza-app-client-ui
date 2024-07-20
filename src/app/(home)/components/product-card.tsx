import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ToppingList from "./topping-list";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductCard: React.FC<PropType> = ({ product }) => {
  return (
    <Card>
      <CardHeader>
        <Image src={product.image} alt="pizza-image" width={150} height={150} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>
          <span>From </span>
          <span className="font-bold"> ₹{product.price}</span>
        </p>
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
                <div>
                  <h4 className="mt-6 mb-2 pl-1">Choose size</h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="small"
                        className="peer sr-only"
                        aria-label="Small"
                      />
                      <Label
                        htmlFor="small"
                        className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Small
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        htmlFor="medium"
                        className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Medium
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="large"
                        id="large"
                        className="peer sr-only"
                        aria-label="Large"
                      />
                      <Label
                        htmlFor="large"
                        className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Large
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="mt-6 mb-1 pl-1">Choose crust</h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="thin"
                        id="thin"
                        className="peer sr-only"
                        aria-label="Thin"
                      />
                      <Label
                        htmlFor="thin"
                        className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thin
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="thick"
                        id="thick"
                        className="peer sr-only"
                        aria-label="Thick"
                      />
                      <Label
                        htmlFor="thick"
                        className="flex flex-col items-center justify-between rounded-md border bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Thick
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <ToppingList/>
                <div className="flex justify-between items-center mt-8">
                  <span className="font-semibold">₹689</span>
                  <Button className="flex gap-2">
                    <ShoppingCart size={22}/> 
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
};
type PropType = {
  product: Product;
};

export default ProductCard;
