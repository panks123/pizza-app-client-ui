import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, LayoutDashboard, Pizza, Store } from "lucide-react";
import Link from "next/link";

const Payment = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full mt-32">
      <CheckCircle size={80} className="text-green-500" />
      <h1 className="text-2xl font-bold">Order Placed Successfully.</h1>
      <p className="text-base font-semibold -mt-4 text-gray-700">Thank you for your order.</p>

      <Card className="mt-4">
        <CardHeader className="p-4">
            <CardTitle className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Store size={35} className="text-primary"/>
                    <span>Your order information</span>
                </div>
                <Badge className="text-base px-2" variant="secondary">Confirmed</Badge>
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
            <div className="flex items-center gap-2">
                <LayoutDashboard />
                <h2 className="text-base font-medium">Order reference: </h2>
                <Link href={`/order/${34232623232}`} className="text-primary underline">{"34232623232"}</Link> {/* TODO */}
            </div>
            <div className="flex items-center gap-2 mt-2">
                <LayoutDashboard />
                <h2 className="text-base font-medium">Payment status: </h2>
                <span>Paid</span>
            </div>
        </CardContent>
      </Card>
      <div className="flex items-center text-lg font font-semibold gap-4">
        <p> Want another pizza?</p>
        <Button asChild>
            <Link href="/">Get now <ArrowRight className="ml-2"/></Link>
        </Button>
      </div>
    </div>
  )
}

export default Payment;
