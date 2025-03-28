import { useAuth } from "@clerk/nextjs";
import { ShoppingBag, Calendar, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "~/app/_components/loading-spinner";
import { api } from "~/trpc/react";
import { createPriceString } from "~/app/_lib/utils";
import { OrderStatus } from "@prisma/client";

const dummyOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    status: "delivered" as OrderStatus,
    total: 12999,
    currency: "USD",
    shippingMethod: "standard",
    createdAt: new Date("2024-03-15"),
    OrderItem: [
      {
        id: 1,
        product: {
          name: "Premium Leather Wallet",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
      {
        id: 2,
        product: {
          name: "Minimalist Watch",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    status: "shipped" as OrderStatus,
    total: 8499,
    currency: "USD",
    shippingMethod: "express",
    createdAt: new Date("2024-03-20"),
    OrderItem: [
      {
        id: 3,
        product: {
          name: "Wireless Earbuds",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1606741965429-02e27d6e43e9?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    status: "processing" as OrderStatus,
    total: 15999,
    currency: "USD",
    shippingMethod: "standard",
    createdAt: new Date("2024-03-25"),
    OrderItem: [
      {
        id: 4,
        product: {
          name: "Designer Sunglasses",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
      {
        id: 5,
        product: {
          name: "Summer Hat",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
      {
        id: 6,
        product: {
          name: "Beach Towel",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
      {
        id: 7,
        product: {
          name: "Flip Flops",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1603487742131-4160ec9fcde0?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    status: "pending" as OrderStatus,
    total: 5999,
    currency: "USD",
    shippingMethod: "standard",
    createdAt: new Date("2024-03-26"),
    OrderItem: [
      {
        id: 8,
        product: {
          name: "Phone Case",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
      {
        id: 9,
        product: {
          name: "Screen Protector",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1611791484670-ce19b801d192?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    status: "cancelled" as OrderStatus,
    total: 21999,
    currency: "USD",
    shippingMethod: "express",
    createdAt: new Date("2024-03-10"),
    OrderItem: [
      {
        id: 10,
        product: {
          name: "Designer Handbag",
          ProductImages: [
            {
              imageUrl:
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop",
            },
          ],
        },
      },
    ],
  },
];

export default function UserOrders() {
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  // const { data: orders, isLoading } = api.order.getUserOrders.useQuery(
  //   undefined,
  //   { enabled: !!userId },
  // );
  const [orders, setOrders] = useState(dummyOrders);
  const isLoading = false;
  // Helper function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  // Status badge styling
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 border-b border-muted">
        <ul className="-mb-px flex flex-wrap text-sm font-medium">
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg p-4 pt-0 ${
                activeTab === "all"
                  ? "border-b-2 border-primary text-primary"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Orders
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg p-4 pt-0 ${
                activeTab === "active"
                  ? "border-b-2 border-primary text-primary"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block rounded-t-lg p-4 pt-0 ${
                activeTab === "completed"
                  ? "border-b-2 border-primary text-primary"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders
            .filter((order) => {
              if (activeTab === "all") return true;
              if (activeTab === "active")
                return ["pending", "processing", "shipped"].includes(
                  order.status,
                );
              if (activeTab === "completed")
                return order.status === "delivered";
              return true;
            })
            .map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-highlight-2/20 p-2">
                      <ShoppingBag size={20} className="text-highlight-1" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        Order #{order.orderNumber}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <span className="text-sm font-medium">
                      {createPriceString(order.total, order.currency)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="flex items-center gap-3 sm:col-span-8">
                    <div className="flex">
                      {order.OrderItem.slice(0, 3).map((item, idx) => (
                        <div
                          key={item.id}
                          className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800"
                          style={{ marginLeft: idx > 0 ? "-8px" : "0" }}
                        >
                          {item.product.ProductImages[0] && (
                            <Image
                              src={
                                "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/action-cam-1LvQm1RmnvR9zbhgmv1w6eG5TCqXA5.jpg"
                              }
                              alt={item.product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          )}
                        </div>
                      ))}
                      {order.OrderItem.length > 3 && (
                        <div className="relative ml-[-8px] flex h-16 w-16 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-xs font-medium dark:border-gray-800 dark:bg-gray-900">
                          +{order.OrderItem.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-muted-foreground">
                        {order.OrderItem.length}{" "}
                        {order.OrderItem.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:col-span-4 sm:justify-end">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      {order.shippingMethod === "express"
                        ? "Express"
                        : "Standard"}{" "}
                      Shipping
                    </div>
                    <Link
                      href={`/user-profile/orders/${order.id}`}
                      className="ml-4 rounded-md bg-highlight-2/20 p-2 text-sm font-medium text-highlight-1 transition-colors hover:bg-highlight-2 hover:text-highlight-2"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16 text-center dark:border-gray-800 dark:bg-gray-900/50">
          <ShoppingBag size={48} className="mb-3 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">No orders yet</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/products"
            className="bg-highlight-1 px-4 py-2 text-sm font-semibold uppercase text-highlight-2 transition-colors hover:bg-highlight-2 hover:text-highlight-1"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
