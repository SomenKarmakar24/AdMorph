"use client";

import React from "react";
import { useAuthContext } from "@/app/provider";
import { User, Mail, Shield, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuthContext();

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="hero-heading text-2xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent mb-8">
        Profile
      </h1>

      <div className="glass-panel rounded-2xl p-7">
        <div className="flex items-center gap-4 mb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-16 h-16 rounded-full ring-2 ring-violet-500/30 shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-white">
              {user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <User className="w-4 h-4 text-violet-400" />
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Display Name
              </p>
              <p className="text-sm text-white">
                {user?.displayName || "Not set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Mail className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Email
              </p>
              <p className="text-sm text-white">{user?.email || "Not set"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Shield className="w-4 h-4 text-green-400" />
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Plan
              </p>
              <p className="text-sm text-white">Free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
