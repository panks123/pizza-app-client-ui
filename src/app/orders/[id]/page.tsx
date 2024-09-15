import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { Order } from "@/types";
import { Banknote, Coins, LayoutDashboardIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TrackOrderStatus from "./components/tack-order-status";

const OrderDetails = async ({ params }: { params: { id: string } }) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/order/orders/${params.id}?fields=address,paymentStatus,paymentMode,paymentId,createdAt`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      }
    );

    if (!response.ok) {
      return <div>Something went wrong</div>;
    }

    const order: Order = await response.json();
    return (
      <div className="container mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TrackOrderStatus />
          </CardContent>
        </Card>

        <div className="flex gap-6 mt-5 px-16">
          <Card className="w-1/3">
            <CardHeader className="p-3">
              <CardTitle className="flex items-start text-lg justify-between">
                Delivery Address
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <h2>
                {order.customerId.firstName} {order.customerId.lastName}
              </h2>
              <p>Email: {order.customerId.email}</p>
              <p className="mt-2">{order.address}</p>
            </CardContent>
          </Card>

          <Card className="w-2/3">
            <CardHeader className="p-3">
              <CardTitle className="flex items-start text-lg justify-between">
                Order Details
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 my-2">
                <LayoutDashboardIcon size={20} />
                <h2 className="text-base font-medium"> Order Reference:</h2>
                {order._id}
              </div>
              <div className="flex items-center gap-2 my-2">
                <Coins size={20} />
                <h2 className="text-base font-medium"> Payment Mode:</h2>
                <span className="uppercase">{order.paymentMode}</span>
              </div>
              {order.paymentMode === "card" && (
                <>
                  <div className="flex items-center gap-2 my-2">
                    <Banknote size={20} />
                    <h2 className="text-base font-medium"> Payment Status:</h2>
                    <span className="uppercase">{order.paymentStatus}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
};

export default OrderDetails;
