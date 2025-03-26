"use client";

import Link from "next/link";
import { type OrderByOptions } from "~/lib/types";
import { api } from "~/trpc/react";
import Image from "next/image";
import { createPriceString } from "../_lib/utils";

export default function HomeProducts({ orderBy }: { orderBy: OrderByOptions }) {
  const [products] = api.product.getAll.useSuspenseQuery({
    limit: 3,
    orderBy,
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group relative w-72 overflow-hidden rounded-lg bg-highlight-1 p-4"
        >
          <Image
            src={product.ProductImages[0]?.imageUrl ?? ""}
            alt={product.name}
            width={300}
            height={300}
            className="aspect-square h-auto w-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 rounded-tr-lg bg-highlight-1 px-2 py-1 text-secondary transition-all duration-200 group-hover:bottom-0 group-hover:left-0">
            {product.name}
          </div>
          <div className="absolute bottom-2 right-2 rounded-tl-lg bg-highlight-1 px-2 py-1 text-secondary transition-all duration-200 group-hover:bottom-0 group-hover:right-0">
            {createPriceString(product.price, product.currency)}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function HomeProductsSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-72 w-72 animate-pulse overflow-hidden rounded-lg bg-highlight-1 p-4"
        ></div>
      ))}
    </div>
  );
}
