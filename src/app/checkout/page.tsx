import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customer-form";

const Checkout: React.FC<{searchParams: { tenantId : string}}> = async ({searchParams}) => {
  const sParams = new URLSearchParams(searchParams);
  const existingQS = sParams.toString();
  
  sParams.append("returnTo", `checkout?${existingQS}`)
  const session = await getSession();
  if (!session) {
    redirect(`/login?${sParams}`);
  }
  return (
    <CustomerForm />
  );
};

export default Checkout;
