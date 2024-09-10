import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle, CircleX, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: {
    success: string;
    orderId: string;
    tenantId?: string;
  }
};

const Payment: React.FC<Props> = ({ searchParams: { success, orderId, tenantId } }) => {

  const isOrderSuccess = success === "true";

  return (
    <div className="flex flex-col items-center gap-4 w-full mt-32">
      {
        isOrderSuccess ? (
          <>
            <CheckCircle size={80} className="text-green-500" />
            <h1 className="text-2xl font-bold">Order Placed Successfully.</h1>
            <p className="text-base font-semibold -mt-4 text-gray-700">Thank you for your order.</p>
          </>
        ) : (
          <>
            <CircleX size={70} className="text-red-500" />
            <h1 className="text-2xl font-bold">Payment failed 😒</h1>
            <p className="text-base font-semibold -mt-4 text-gray-700">Please try again later.</p>
          </>
        )
      }
      
      {
        isOrderSuccess && (
        <Card className="mt-4">
          <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                      <Store size={35} className="text-primary"/>
                      <span>Order Details</span>
                  </div>
                  <Badge className="text-base px-2" variant="secondary">Confirmed</Badge>
              </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                  <LayoutDashboard />
                  <h2 className="text-base font-medium">Order reference: </h2>
                  <Link href={`/order-status/${orderId}${tenantId ? `?tenantId=${tenantId}` : ""}`} className="text-primary underline">{orderId}</Link> {/* TODO */}
              </div>
              <div className="flex items-center gap-2 mt-2">
                  <LayoutDashboard />
                  <h2 className="text-base font-medium">Payment status: </h2>
                  <span>Paid</span>
              </div>
          </CardContent>
        </Card>
        )
      }
      {
        isOrderSuccess ? (
          <Button asChild>
            <Link href={`/${tenantId ? `?tenantId=${tenantId}` : ""}`}>Place another order <ArrowRight className="ml-2"/></Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={`/checkout${tenantId ? `?tenantId=${tenantId}` : ""}`}><ArrowLeft className="mr-2"/>Try again</Link>
          </Button>
        )
      }
    </div>
  )
}

export default Payment;
