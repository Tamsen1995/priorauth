import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar: React.FC = () => {
  const supportsHaptics =
    typeof window !== "undefined" && "vibrate" in navigator;

  const handleTouchStart = () => {
    if (supportsHaptics) {
      window.navigator.vibrate(15);
    }
  };

  return (
    <div className="flex-grow">
      <AppBar position="static" className="bg-blue-500">
        <Toolbar className="flex justify-between">
          <Link href="/" passHref>
            <Button
              color="inherit"
              onTouchStart={handleTouchStart}
              className="text-white font-bold"
            >
              Home
            </Button>
          </Link>
          <div>
            <Link href="/about" passHref>
              <Button
                color="inherit"
                onTouchStart={handleTouchStart}
                className="text-white"
              >
                About
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                color="inherit"
                onTouchStart={handleTouchStart}
                className="text-white"
              >
                Contact
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
