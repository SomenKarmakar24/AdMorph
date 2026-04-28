"use client";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAuthContext } from "../provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ProfileAvatar() {
  const user = useAuthContext();
  const router = useRouter();
  const onButtonPress = async () => {
    try {
      await signOut(auth);
      // Clear any cached data or local storage if needed
      localStorage.clear();
      // Sign-out successful, redirect to landing page
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {user?.user?.photoURL && (
            <img
              src={user?.user?.photoURL}
              alt="profile"
              className="w-[35px] h-[35px] rounded-full"
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-full mx-w-lg cursor-pointer">
          <h2 onClick={onButtonPress}>Logout</h2>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProfileAvatar;
