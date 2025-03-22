import { Outlet } from "react-router-dom";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navBar";
import { useState } from "react";

export default function Layout() {

  
    return (
      <div className="min-h-screen bg-gray-100">
       
              <Outlet />

        <Footer />
  
        
      </div>
    );
  }