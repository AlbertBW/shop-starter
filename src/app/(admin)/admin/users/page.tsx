import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "~/app/_components/ui/badge";
import { Button } from "~/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { Separator } from "~/app/_components/ui/separator";
import { SortSelector } from "./_components/sort-selector";
import { UserDetailsButton } from "./_components/user-details";
import { checkRole } from "~/utils/roles";
import { type UserOrderByOptions } from "~/server/api/routers/user";
import { api } from "~/trpc/server";
import { UserFilterButton } from "./_components/user-filter";

const USER_LIST_LIMIT = 10;
type OrderByOptions = (typeof UserOrderByOptions)[number];

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderBy?: OrderByOptions;
    page?: string;
    email?: string;
    query?: string;
  }>;
}) {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  const {
    orderBy = "created_at",
    page = "1",
    email,
    query,
  } = await searchParams;
  const pageNumber = parseInt(page, 10);

  const users = await api.user.getUserList({
    limit: USER_LIST_LIMIT,
    page: pageNumber,
    orderBy,
    emailAddress: email,
    search: query,
  });

  const hasNextPage = users.data.length === USER_LIST_LIMIT;
  const hasPrevPage = pageNumber > 1;

  const orderByLabels: Record<OrderByOptions, string> = {
    created_at: "Sign up date",
    updated_at: "Last updated",
    email_address: "Email",
    web3wallet: "Web3 wallet",
    first_name: "First name",
    last_name: "Last name",
    phone_number: "Phone number",
    username: "Username",
    last_active_at: "Last active",
    last_sign_in_at: "Last sign in",
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-highlight-1">
            User Management
          </h2>
          <p className="text-muted-foreground">View and manage user accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <SortSelector currentSort={orderBy} options={orderByLabels} />
          <UserFilterButton />
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader className="px-6">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Showing {users.data.length} users{" "}
            {hasPrevPage && `(page ${pageNumber})`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last active
                  </TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        {user.imageUrl ? (
                          <picture>
                            <img
                              src={user.imageUrl}
                              alt={user.firstName ?? "User avatar"}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          </picture>
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            <span className="text-xs font-medium uppercase">
                              {user.firstName?.[0] ?? user.lastName?.[0] ?? "?"}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-highlight-1">
                            {user.firstName} {user.lastName}
                            {!user.firstName && !user.lastName && (
                              <span className="text-muted-foreground">
                                No name
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {user.username ?? "No username"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.banned ? (
                        <Badge
                          variant="destructive"
                          className="flex w-fit items-center gap-1"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Banned</span>
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="flex w-fit items-center gap-1 border-green-500 bg-green-500/10 text-green-700"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Active</span>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.emailAddresses[0]?.emailAddress ?? (
                        <span className="text-sm text-muted-foreground">
                          No email
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        <span>
                          {user.createdAt
                            ? formatDistanceToNow(new Date(user.createdAt), {
                                addSuffix: true,
                              })
                            : "Unknown"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                        <span>
                          {user.lastActiveAt
                            ? formatDistanceToNow(new Date(user.lastActiveAt), {
                                addSuffix: true,
                              })
                            : "Never"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <UserDetailsButton
                        userId={user.id}
                        isBanned={!!user.banned}
                        userData={{
                          firstName: user.firstName,
                          lastName: user.lastName,
                          createdAt: user.createdAt,
                          email: user.emailAddresses[0]?.emailAddress,
                          lastActiveAt: user.lastActiveAt,
                          imageUrl: user.imageUrl,
                          username: user.username,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing users {(pageNumber - 1) * USER_LIST_LIMIT + 1} to{" "}
          {(pageNumber - 1) * USER_LIST_LIMIT + users.data.length}
        </div>
        <div className="flex gap-2">
          {hasPrevPage ? (
            <Link
              href={`/admin/users?page=${pageNumber - 1}&orderBy=${orderBy}`}
            >
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
          )}

          {hasNextPage ? (
            <Link
              href={`/admin/users?page=${pageNumber + 1}&orderBy=${orderBy}`}
            >
              <Button size="sm">
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button size="sm" disabled>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
