import { redirect } from "next/navigation";
import Link from "next/link";
import { checkRole } from "~/utils/roles";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";
import { Separator } from "~/app/_components/ui/separator";
import { Badge } from "~/app/_components/ui/badge";

export default async function AdminDashboard() {
  const isAdmin = await checkRole("admin");

  if (!isAdmin) {
    redirect("/");
  }

  // Dummy data for the dashboard
  const salesData = {
    total: "$12,456",
    percentChange: 12.5,
    isPositive: true,
    lastMonth: "$11,072",
  };

  const usersData = {
    total: 1254,
    percentChange: 8.2,
    isPositive: true,
    newUsers: 142,
  };

  const ordersData = {
    total: 342,
    percentChange: -3.7,
    isPositive: false,
    pending: 24,
  };

  const productsData = {
    total: 76,
    percentChange: 5.3,
    isPositive: true,
    outOfStock: 3,
  };

  const recentOrders = [
    {
      id: "ORD-5324",
      customer: "Sarah Johnson",
      amount: "$129.99",
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: "ORD-5323",
      customer: "Michael Chen",
      amount: "$85.50",
      status: "processing",
      date: "3 hours ago",
    },
    {
      id: "ORD-5322",
      customer: "Emily Rodriguez",
      amount: "$210.75",
      status: "completed",
      date: "5 hours ago",
    },
    {
      id: "ORD-5321",
      customer: "David Kim",
      amount: "$49.99",
      status: "failed",
      date: "6 hours ago",
    },
    {
      id: "ORD-5320",
      customer: "Lisa Taylor",
      amount: "$165.25",
      status: "completed",
      date: "8 hours ago",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 145,
      revenue: "$21,750",
      growth: 12.4,
    },
    { name: "Smart Watch", sales: 132, revenue: "$19,800", growth: 8.7 },
    { name: "Bluetooth Speaker", sales: 97, revenue: "$8,730", growth: -2.5 },
    { name: "Laptop Stand", sales: 89, revenue: "$5,340", growth: 15.2 },
    { name: "USB-C Hub", sales: 76, revenue: "$4,560", growth: 5.8 },
  ];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-highlight-1">
            Dashboard
          </h2>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      <Separator />

      {/* Key metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {salesData.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {salesData.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  salesData.isPositive ? "text-green-500" : "text-red-500"
                }
              >
                {salesData.percentChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Last month: {salesData.lastMonth}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {usersData.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {usersData.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  usersData.isPositive ? "text-green-500" : "text-red-500"
                }
              >
                {usersData.percentChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              {usersData.newUsers} new users this month
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {ordersData.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {ordersData.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  ordersData.isPositive ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(ordersData.percentChange)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              {ordersData.pending} orders pending
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-2xl font-bold">
              {productsData.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {productsData.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  productsData.isPositive ? "text-green-500" : "text-red-500"
                }
              >
                {productsData.percentChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              {productsData.outOfStock} products out of stock
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Recent orders across your store</CardDescription>
            </div>
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customer}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-medium">{order.amount}</div>
                      <div className="text-xs text-muted-foreground">
                        {order.date}
                      </div>
                    </div>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "outline"
                          : order.status === "processing"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        order.status === "completed"
                          ? "border-green-500 bg-green-500/10 text-green-700"
                          : undefined
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Your best-selling products this month
              </CardDescription>
            </div>
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} units
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-medium">{product.revenue}</div>
                      <div className="flex items-center justify-end text-xs">
                        {product.growth > 0 ? (
                          <ArrowUpRight className="mr-1 h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-3.5 w-3.5 text-red-500" />
                        )}
                        <span
                          className={
                            product.growth > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Shortcuts to common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Link href="/admin/products/new">
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-center justify-center gap-2 p-6 text-center"
              >
                <Package className="h-6 w-6" />
                <div className="font-medium">Add New Product</div>
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-center justify-center gap-2 p-6 text-center"
              >
                <ShoppingCart className="h-6 w-6" />
                <div className="font-medium">View Orders</div>
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-center justify-center gap-2 p-6 text-center"
              >
                <Users className="h-6 w-6" />
                <div className="font-medium">Manage Users</div>
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button
                variant="outline"
                className="h-auto w-full flex-col items-center justify-center gap-2 p-6 text-center"
              >
                <CreditCard className="h-6 w-6" />
                <div className="font-medium">Payment Settings</div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
