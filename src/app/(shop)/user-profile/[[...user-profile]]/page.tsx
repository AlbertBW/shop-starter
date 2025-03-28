"use client";

import { useAuth, UserProfile } from "@clerk/nextjs";
import { Package } from "lucide-react";
import { redirect } from "next/navigation";
import LoadingSpinner from "~/app/_components/loading-spinner";
import UserOrders from "../_components/user-orders";

export default function UserProfilePage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    <LoadingSpinner />;
  }

  if (isLoaded && !isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div className="flex justify-center">
      <UserProfile path="/user-profile" routing="path">
        <UserProfile.Page label="account" />
        <UserProfile.Page
          label="Orders"
          labelIcon={<Package size={16} />}
          url="orders"
        >
          <UserOrders />
        </UserProfile.Page>
        <UserProfile.Page label="security" />
      </UserProfile>
    </div>
  );
}
