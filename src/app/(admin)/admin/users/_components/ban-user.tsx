"use client";

import { UserX } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

export function BanUser({ userId }: { userId: string }) {
  const utils = api.useUtils();
  const banUser = api.user.ban.useMutation({
    onSuccess: async () => {
      await utils.user.getUserList.invalidate();
    },
  });
  return (
    <Button
      variant="outline"
      className="gap-2 border-destructive text-destructive"
      onClick={() => {
        banUser.mutate({ userId });
      }}
    >
      <UserX className="h-4 w-4" />
      Ban User
    </Button>
  );
}

export function UnbanUser({ userId }: { userId: string }) {
  const utils = api.useUtils();
  const banUser = api.user.unban.useMutation({
    onSuccess: async () => {
      await utils.user.getUserList.invalidate();
    },
  });
  return (
    <Button
      variant="outline"
      className="gap-2 border-destructive text-destructive"
      onClick={() => {
        banUser.mutate({ userId });
      }}
    >
      <UserX className="h-4 w-4" />
      Ban User
    </Button>
  );
}
