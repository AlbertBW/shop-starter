import { api, HydrateClient } from "~/trpc/server";
import AddToCartForm from "../_components/add-to-cart-form";
import { Suspense } from "react";
import LoadingSpinner from "~/app/_components/loading-spinner";
import BackButton from "../../../_components/back-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  void (await api.product.getBySlug.prefetch({ slug }));

  return (
    <HydrateClient>
      <div className="flex flex-col py-2">
        <div>
          <BackButton />
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <AddToCartForm />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
