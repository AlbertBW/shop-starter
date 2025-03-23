"use client";

import { useAuth, UserProfile } from "@clerk/nextjs";
import { DotIcon, Package } from "lucide-react";
import { useRouter } from "next/navigation";

function OrdersPage() {
  return (
    <div>
      <h3>Orders page</h3>
      <p>This is the content of the Orders page.</p>
    </div>
  );
}

export default function UserProfilePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="border-primary h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return router.push("/sign-in");
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
          <OrdersPage />
        </UserProfile.Page>
        <UserProfile.Page label="security" />
      </UserProfile>
    </div>
  );
}
