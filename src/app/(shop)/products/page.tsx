import { api } from "~/trpc/server";
import Link from "next/link";
import { SelectOrderBy } from "./_components/select-order-by";
import { Suspense } from "react";
import LoadingSpinner from "~/app/_components/loading-spinner";
import ProductPagination from "./_components/product-pagination";
import { createPriceString } from "~/app/_lib/utils";
import { type OrderByOptions } from "~/lib/types";
import { MobileProductSidebar } from "./_components/product-sidebar";
import { PRODUCTS_PER_PAGE } from "~/lib/constants";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    orderBy?: OrderByOptions;
    search?: string;
    page?: string;
  }>;
}) {
  const {
    category: categoryParam,
    orderBy = "popular",
    search,
    page,
  } = await searchParams;
  const categories = await api.category.getAll({ search });
  const selectedCategory = categories.find(
    (category) => category.slug === categoryParam,
  );

  const productCount = categories.reduce((acc, category) => {
    if (category.slug === categoryParam || !categoryParam) {
      return acc + category._count.Product;
    }
    return acc;
  }, 0);

  const pages = Math.ceil(productCount / PRODUCTS_PER_PAGE);
  const suspenseKey = `products-${categoryParam ?? "all"}-${orderBy}-${page}`;

  return (
    <div className="flex gap-4">
      <div className="hidden min-w-44 px-4 md:block">
        <ul className="flex flex-col gap-8 text-muted-foreground">
          <li>
            <Link
              href={`/products`}
              className="hover:text-primary data-[active=true]:text-primary"
              data-active={!categoryParam && !search}
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/products?category=${category.slug}`}
                data-active={category.slug === categoryParam ? true : undefined}
                className="hover:text-primary data-[active=true]:text-primary"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 text-center md:flex-row md:gap-0 md:text-left">
          <h1 className="text-xl font-light tracking-wide text-primary">
            {search
              ? `Search for ${search}`
              : selectedCategory
                ? selectedCategory.name
                : "All Products"}
          </h1>
          <div className="flex items-center gap-4">
            <MobileProductSidebar
              categories={categories}
              param={categoryParam}
            />
            <SelectOrderBy />
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />} key={suspenseKey}>
          <ProductsList
            categorySlug={categoryParam}
            search={search}
            orderBy={orderBy}
            page={page}
          />
        </Suspense>
        {pages > 1 && (
          <ProductPagination
            totalPages={pages}
            initialPage={page ? Number(page) : undefined}
          />
        )}
      </div>
    </div>
  );
}

async function ProductsList({
  categorySlug,
  search,
  orderBy,
  page,
}: {
  categorySlug?: string;
  search?: string;
  orderBy: OrderByOptions;
  page?: string;
}) {
  const products = await api.product.getAll({
    categorySlug,
    search,
    orderBy,
    page: Number(page) || 1,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          href={`/product/${product.slug}`}
          key={product.id}
          className="flex flex-col gap-2 pb-4"
        >
          <div>
            <picture>
              <img
                src={product.ProductImages[0]?.imageUrl}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </picture>
          </div>
          <h3 className="font-light">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            {createPriceString(product.price, product.currency)}
          </p>
        </Link>
      ))}
    </div>
  );
}
