import React from "react";
import ProfileMain from "../Components/ProfileMain";
import Settings from "../Components/Settings/Settings";

export default function ProfileSettingsScreen() {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <ProfileMain />
        <Settings/>
      </div>
    </>
  );
}
