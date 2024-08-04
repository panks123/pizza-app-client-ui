"use client";
import React from "react";
import {
  CartItem as CartItemType,
  changeItemQty,
} from "@/lib/store/features/cart/cart-slice";
import Image from "next/image";
import QtyChanger from "./qty-changer";
import { X } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const handleQtyChange = (changer: number) => {
    dispatch(changeItemQty({ hash: item.hash!, changer }));
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex items-center w-3/4">
          <Image src={item.image} alt={item.name} width={100} height={100} />
          <div className="ml-6 flex gap-2 w-full">
            <div className="flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <h3 className="text-sm text-gray-700">
                {Object.values(item.chosenConfiguration.priceConfiguration)
                  .map((value) => value)
                  .join(", ")}
              </h3>
              <h3 className="text-xs text-gray-500">
                {Object.values(item.chosenConfiguration.selectedToppings)
                  .map((topping) => topping.name)
                  .join(", ")}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <QtyChanger handleQtyChange={handleQtyChange}>
              {item.qty}
            </QtyChanger>
          </div>
          <div className="flex">
            <div className="font-bold">₹{300}</div>
            <AlertDialog>
              <AlertDialogTrigger>
                <X />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm item delete</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this item from cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleQtyChange(0)}>Delete from Cart</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
