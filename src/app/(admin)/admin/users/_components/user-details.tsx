import { Eye, ShoppingBag, Mail, Calendar } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/app/_components/ui/dialog";
import { Badge } from "~/app/_components/ui/badge";
import { Separator } from "~/app/_components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { BanUser, UnbanUser } from "./ban-user";

interface UserDetailsButtonProps {
  userId: string;
  isBanned: boolean;
  // Modified userData to use only serializable properties
  userData: {
    firstName: string | null;
    lastName: string | null;
    email?: string;
    imageUrl: string | null;
    username: string | null;
    createdAt: number | null;
    lastActiveAt: number | null;
  };
}

export function UserDetailsButton({
  userId,
  isBanned,
  userData,
}: UserDetailsButtonProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Details</span>
          </Button>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>User Details</DialogTitle>
            </div>
            <DialogDescription>
              Manage user information and actions
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* User Profile Header */}
            <div className="flex items-center space-x-4">
              {userData?.imageUrl ? (
                <picture>
                  <img
                    src={userData.imageUrl}
                    alt="User avatar"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </picture>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span className="text-lg font-medium uppercase">
                    {userData?.firstName?.[0] ?? userData?.lastName?.[0] ?? "?"}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium">
                  {userData?.firstName} {userData?.lastName}
                  {!userData?.firstName && !userData?.lastName && "No name"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userData?.username ?? "No username"}
                </p>
              </div>
              {isBanned ? (
                <Badge variant="destructive" className="ml-auto">
                  Banned
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="ml-auto border-green-500 bg-green-500/10 text-green-700"
                >
                  Active
                </Badge>
              )}
            </div>

            <Separator />

            {/* User Details */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2">{userData?.email ?? "No email"}</span>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2">
                  {userData?.createdAt
                    ? formatDistanceToNow(new Date(userData.createdAt), {
                        addSuffix: true,
                      })
                    : "Unknown"}
                </span>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last active:</span>
                <span className="ml-2">
                  {userData?.lastActiveAt
                    ? formatDistanceToNow(new Date(userData.lastActiveAt), {
                        addSuffix: true,
                      })
                    : "Never"}
                </span>
              </div>
            </div>

            <Separator />

            {/* Additional Data - could be expanded with more user info */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">User ID</h4>
              <code className="block w-full overflow-x-auto rounded bg-muted p-2 text-xs">
                {userId}
              </code>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-between">
            <Link href={`/admin/orders?userId=${userId}`}>
              <Button variant="outline" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                View Orders
              </Button>
            </Link>

            <div className="flex gap-2">
              {isBanned ? (
                <UnbanUser userId={userId} />
              ) : (
                <BanUser userId={userId} />
              )}
              <DialogTrigger asChild>
                <Button>Close</Button>
              </DialogTrigger>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
