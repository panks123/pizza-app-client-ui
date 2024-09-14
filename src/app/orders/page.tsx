"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustomerOrders } from "@/lib/http/api";
import { Order } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Orders = () => {
  const perPage = 10;
  const [page, setPage] = React.useState(1);

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useQuery<{
    data: Order[];
    currentPage: number;
    totalPages: number;
    total: number;
  }>({
    queryKey: ["customer-orders", page],
    queryFn: async () => {
      return await getCustomerOrders(page, perPage).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;

  const orders = ordersData?.data;
  const totalPages = ordersData?.totalPages || 0;
  const total = ordersData?.total || 0;
  return (
    <div className="container mt-8">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {total > 0 ? (
            <>
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Order Date Time</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium text-primary underline">
                        <Link href={`/orders/${order._id}`}>
                          {String(order._id).slice(-7)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="uppercase">{order.paymentStatus}</span>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{order.paymentMode}</span>
                      </TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>
                        <Badge className="text-gray-800 outline outline-1 outline-purple-900 bg-purple-400 hover:bg-purple-400">
                          {" "}
                          {/* Todo: Make styles dynamic based on order status */}
                          <span className="uppercase">{order.orderStatus}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>₹{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="w-full bg-gray-50 px-6 py-3 flex justify-end items-center">
                <div className="flex space-x-4 items-center">
                  <p>
                    Showing: <b>{page * perPage - perPage + 1}</b> to{" "}
                    <b>{Math.min(total, page * perPage)}</b> of <b>{total}</b>
                  </p>
                  <div className="flex items-center space-x-2">
                    <ChevronFirst
                      size={16}
                      onClick={() => {
                        if (page > 1) setPage(1);
                      }}
                      className={`${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                    <ChevronLeft
                      size={16}
                      onClick={() => {
                        if (page > 1) setPage(page - 1);
                      }}
                      className={`${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                    <p>
                      Page <b>{page}</b> of <b>{totalPages}</b>
                    </p>
                    <ChevronRight
                      size={16}
                      onClick={() => {
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={`${
                        page === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                    <ChevronLast
                      size={16}
                      onClick={() => {
                        if (page < totalPages) setPage(totalPages);
                      }}
                      className={`${
                        page === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No orders placet yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
