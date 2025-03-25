"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { Label } from "~/app/_components/ui/label";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import { createPriceString } from "~/app/_lib/utils";
import { useEffect, useState } from "react";
import ImageCarousel from "./image-carousel";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { useShoppingCart } from "~/app/_context/shopping-cart-context";
import { LoadingSpinnerSmall } from "~/app/_components/loading-spinner";

export default function AddToCartForm() {
  const { cart, isLoading } = useShoppingCart();
  const { slug } = useParams<{ slug: string }>();
  const [sessionId, setSessionId] = useState<string>();
  const { userId } = useAuth();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [product] = api.product.getBySlug.useSuspenseQuery({ slug });

  useEffect(() => {
    if (!userId) {
      let storedSessionId = localStorage.getItem("cart_session_id");
      if (!storedSessionId) {
        storedSessionId = nanoid();
        localStorage.setItem("cart_session_id", storedSessionId);
      }
      setSessionId(storedSessionId);
    }
  }, [userId]);

  const price = selectedVariant
    ? (product.ProductVariants.find((variant) => variant.id === selectedVariant)
        ?.price ?? product.price)
    : product.price;

  const utils = api.useUtils();
  const createCartItem = api.cart.addCartItem.useMutation({
    onSuccess: async () => {
      setError(null);
      await utils.cart.getCart.invalidate();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-12 pb-2 pt-8 md:flex-row">
      <ImageCarousel
        product={{ name: product.name, ProductImages: product.ProductImages }}
      />
      <div className="flex w-full flex-col gap-4 text-center md:w-1/2 md:text-left">
        <h1 className="text-2xl font-semibold tracking-wide">{product.name}</h1>
        <p className="">{product.description}</p>
        <p className="text-2xl font-light tracking-wide">
          {createPriceString(price, product.currency)}
        </p>

        <form
          className="flex w-full flex-col gap-8 md:mt-12"
          onSubmit={(e) => {
            e.preventDefault();
            createCartItem.mutate({
              sessionId: sessionId,
              productId: product.id,
              variantId: selectedVariant,
              quantity: 1,
            });
          }}
        >
          <div className="flex w-full flex-col items-center gap-2 md:items-start">
            {product.ProductVariants.length > 0 && (
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="product-variant" className="text-lg font-light">
                  Options
                </Label>
                <Select onValueChange={(e) => setSelectedVariant(Number(e))}>
                  <SelectTrigger className="flex h-12 w-full justify-center md:justify-between md:text-lg">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {product.ProductVariants.map((variant) => (
                        <SelectItem
                          key={variant.id}
                          value={variant.id.toString()}
                          disabled={variant.stock <= 0}
                        >
                          {variant.name}{" "}
                          {variant.stock > 0 ? "" : "(Out of stock)"}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Label htmlFor="product-quantity" className="text-lg font-light">
              Quantity
            </Label>
            <Input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min={1}
              defaultValue={1}
              max={product.stock}
              className="h-12 w-24 rounded-none border-x-0 border-b-2 border-t-0 p-2 font-light md:text-lg"
              placeholder="1"
            />
          </div>

          <Button
            type="submit"
            className="w-full min-w-52 rounded-none border-0 px-8 py-6 text-lg font-light transition-colors md:w-fit"
            disabled={
              (product.stock <= 0 ||
                (product.ProductVariants.length > 0 && !selectedVariant) ||
                cart?.items.some(
                  (i) =>
                    i.productId === product.id &&
                    i.variantId === selectedVariant,
                )) ??
              (createCartItem.isPending || isLoading)
            }
          >
            {createCartItem.isPending || isLoading ? (
              <LoadingSpinnerSmall variant="secondary" />
            ) : cart?.items.some(
                (i) =>
                  i.productId === product.id && i.variantId === selectedVariant,
              ) ? (
              "IN CART"
            ) : (
              "ADD TO CART"
            )}
          </Button>

          {error && <p className="text-red-500">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
}
