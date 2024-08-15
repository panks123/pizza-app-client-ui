"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginBtn = () => {
    const searchParams = useSearchParams();
    const sParams = new URLSearchParams(searchParams);
    const existingQS = sParams.toString();
    const pathname = window.location.pathname;
    sParams.append("returnTo", `${pathname}?${existingQS}`)
  return (
    <Button size={"sm"} asChild>
      <Link href={`/login?${sParams}`}>Login</Link>
    </Button>
  );
};

export default LoginBtn;
