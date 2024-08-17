import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotalPrice } from "@/lib/utils";

const TAX_PERCENTAGE = 5;  // TODO: Move to server
const DELIVERY_CHARGES = 50;  // TODO: Move to server

const OrderSummary = () => {
    const [discountPercentage, setDiscountPercentage] = React.useState(0);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const subTotal = React.useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.qty * getItemTotalPrice(item);
        }, 0);
    }, [cartItems]);
    const discountAmount = React.useMemo(() => {
        return Math.round(subTotal * discountPercentage / 100);
    }, [subTotal, discountPercentage]);
    const taxesAmount = React.useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return Math.round(amountAfterDiscount * TAX_PERCENTAGE / 100);
    }, [subTotal, discountAmount]);

    const grandTotal = React.useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount, discountAmount]);
  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardContent className="grid gap-4 pt-6">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-bold">₹{subTotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span className="font-bold">₹{taxesAmount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery charges</span>
            <span className="font-bold">₹{DELIVERY_CHARGES}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span className="font-bold">- ₹{discountAmount}</span>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <span className="font-bold">Order total</span>
            <span className="font-bold flex flex-col items-end">
              <span
                className={
                  discountPercentage ? "line-through text-gray-400" : ""
                } 
              >
                ₹{grandTotal}
              </span>
              {/* {discountPercentage ? ( */}
              {discountPercentage ? <span className="text-green-700">₹{grandTotal}</span> : null}
            </span>
          </div>
          {/* {discountError && <div className="text-red-500">{discountError}</div>} */}
          {false && <div className="text-red-500">{"Error"}</div>}
          <div className="flex items-center gap-4">
            <Input
              id="coupon"
              name="code"
              type="text"
              className="w-full"
              placeholder="Coupon code"
              // ref={couponCodeRef}
            />
            {/* todo: add loading */}
            {/* <Button onClick={handleCouponValidation} variant={'outline'}> */}
            <Button variant={"outline"}>Apply</Button>
          </div>

          <div className="text-right mt-6">
            {/* <Button disabled={isPlaceOrderPending}> */}
            <Button disabled={false}>
              {/* {isPlaceOrderPending ? ( */}
              {false ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  <span>Please wait...</span>
                </span>
              ) : (
                <span>Place order</span>
              )}
            </Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default OrderSummary;
