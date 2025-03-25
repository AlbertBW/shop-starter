"use client";

import { UserButton } from "@clerk/nextjs";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserButtonClerk({
  showUserName,
}: {
  showUserName?: boolean;
}) {
  const router = useRouter();

  return (
    <UserButton
      showName={showUserName}
      userProfileMode="navigation"
      userProfileUrl="/user-profile"
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Your orders"
          labelIcon={<Package size={14} />}
          onClick={() => router.push("/user-profile/orders")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
