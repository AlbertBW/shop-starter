"use client";

import { useAuth, UserProfile } from "@clerk/nextjs";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "~/app/_components/loading-spinner";

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
    <LoadingSpinner />;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
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
