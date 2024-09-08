'use client';
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotalPrice } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { validateCoupon } from "@/lib/http/api";
import { useSearchParams } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const TAX_PERCENTAGE = 5;  // TODO: Move to server
const DELIVERY_CHARGES = 50;  // TODO: Move to server

export interface OrderSummaryHandle {
  getAppliedCouponCode: () => string;
}

const OrderSummary = React.forwardRef<OrderSummaryHandle>((props, ref) => {
    const [discountPercentage, setDiscountPercentage] = React.useState({ code: "", discount: 0 });
    const [discountError, setDiscountError] = React.useState("");
    const couponCodeRef = React.useRef<HTMLInputElement>(null);
    const serachParams = useSearchParams();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const subTotal = React.useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.qty * getItemTotalPrice(item);
        }, 0);
    }, [cartItems]);
    const discountAmount = React.useMemo(() => {
        return Math.round(subTotal * discountPercentage.discount / 100);
    }, [subTotal, discountPercentage.discount]);
    const taxesAmount = React.useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return Math.round(amountAfterDiscount * TAX_PERCENTAGE / 100);
    }, [subTotal, discountAmount]);

    const grandTotal = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount]);
    const grandTotalAfterDiscount = React.useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount, discountAmount]);

    const { mutate, isPending } = useMutation({
        mutationKey: ['coupon-validate'],
        mutationFn: async () => {
            const couponCode = couponCodeRef.current?.value;
            const tenantId = serachParams.get('tenantId');
            if(!couponCode || !tenantId) {
                return;
            }
            const payload = {
                code: couponCode,
                tenantId: Number(tenantId)
            }
            return await validateCoupon(payload).then((res) => {
                return res.data;
            });
        },
        onSuccess: (data) => {
            if(data.valid) {
                setDiscountError("");
                console.log("ON success", data);
                setDiscountPercentage({code: couponCodeRef.current?.value!, discount: data.discount});
                return;
            }
            setDiscountError("Invalid coupon code");
            // if(discountPercentage === 0) {
            //     setDiscountPercentage(0);
            // }
        },
        onError: (err) => {
            console.log(err);
            setDiscountError("Invalid coupon code");
        }
    })

    const handleCouponValidate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(couponCodeRef.current?.value && couponCodeRef.current.value === discountPercentage.code) {
          console.log("Coupon code is same as applied coupon code");
          return;
        }
        mutate();
    }

    React.useImperativeHandle(ref, () => ({
        getAppliedCouponCode: () => {
            return discountPercentage.code;
        }
    }), [discountPercentage.code]);
    
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
            {discountAmount ? 
            <HoverCard>
                <HoverCardTrigger asChild>
                    <div className="flex space-x-2"><span>Discount ({discountPercentage.code})</span><CircleAlert size={14} className="text-orange-500" /></div>
                </HoverCardTrigger>
                <HoverCardContent>
                    <div>
                        <h2>Applied Coupon: <span className="font-semibold ml-2">{discountPercentage.code}</span></h2>
                        <p>Discount Amount: <span className="ml-2">₹{discountAmount}</span></p>
                    </div>
                </HoverCardContent>
            </HoverCard>
            : <span>Discount</span>}
            <span className="font-bold">- ₹{discountAmount}</span>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <span className="font-bold">Order total</span>
            <span className="font-bold flex flex-col items-end">
              <span
                className={
                  !!discountPercentage.discount ? "line-through text-gray-400" : ""
                } 
              >
                ₹{grandTotal}
              </span>
              {!!discountPercentage.discount ? <span className="text-green-700">₹{grandTotalAfterDiscount }</span> : null}
            </span>
          </div>
          
          {false && <div className="text-red-500">{"Error"}</div>}
          <div className="flex items-center gap-4">
            <Input
              id="coupon"
              name="code"
              type="text"
              className="w-full"
              placeholder="Coupon code"
              ref={couponCodeRef}
              onChange={(e) => {
                e.preventDefault();
                if(discountError && !e.target.value) {
                    setDiscountError("");
                }
              }}
            />
            {/* todo: add loading */}
            <Button onClick={handleCouponValidate} variant={'outline'}>
                {isPending ? "Please wait..." : "Apply"}
            </Button>
          </div>
          {discountError && <div className="text-red-500">{discountError}</div>}
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
});

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
