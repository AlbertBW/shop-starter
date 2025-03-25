import { api } from "~/trpc/server";
import BackLink from "../_components/back-link";
import AddToCartForm from "../_components/add-to-cart-form";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  void (await api.product.getBySlug({ slug }));

  return (
    <div className="flex flex-col py-2">
      <div>
        <BackLink />
      </div>

      <AddToCartForm />
    </div>
  );
}
