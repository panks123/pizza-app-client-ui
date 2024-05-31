import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
        <Button
          className="bg-orange-200 hover:bg-orange-300 text-orange-600 hover:text-orange-700 px-6 py-2 rounded-full 
            shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        >
          Choose
        </Button>
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
