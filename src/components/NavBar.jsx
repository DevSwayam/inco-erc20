import React, { useState } from "react";
import inco_logo from "../assets/images/inco_logo.jpeg";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export default function NavBar() {
  const { login, logout, ready, authenticated } = usePrivy();

  if (!ready) {
    return <></>;
  }
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4 flex justify-between w-full">
            {/* Logo */}
            <img
              src={inco_logo}
              alt="Inco Logo"
              width={40} // Set the appropriate width
              height={32} // Set the appropriate height
            ></img>
            {!authenticated ? (
              <Button onClick={login}>Connect Wallet</Button>
            ) : (
              <Button onClick={logout}>Disconnect</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
