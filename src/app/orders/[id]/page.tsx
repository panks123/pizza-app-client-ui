import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from 'next/dynamic';

const TrackOrderStatus = dynamic(() => import('./components/tack-order-status'), {
  ssr: false,
});

const OrderDetails = () => {
  return (
    <div className="container mt-6">
      <Card>
        <CardHeader><CardTitle>Order Status</CardTitle></CardHeader>
        <CardContent>
            <TrackOrderStatus />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
