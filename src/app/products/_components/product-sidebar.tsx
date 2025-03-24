import { type Category } from "@prisma/client";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/_components/ui/sheet";
import { VisuallyHidden } from "radix-ui";

export function MobileProductSidebar({
  categories,
  slug,
}: {
  categories: Category[];
  slug?: string[];
}) {
  return (
    <div className="w-full md:hidden">
      <Sheet>
        <SheetTrigger asChild className="w-full rounded-none">
          <Button variant="outline" className="font-extralight text-primary">
            Categories
          </Button>
        </SheetTrigger>
        <SheetContent>
          <VisuallyHidden.Root>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden.Root>

          <div className="min-w-44 px-4 pt-12 text-xl font-extralight">
            <ul className="flex flex-col gap-8 text-muted-foreground">
              <li>
                <Link
                  href={`/products`}
                  className="hover:text-primary data-[active=true]:text-primary"
                  data-active={!slug}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/${category.slug}`}
                    data-active={category.slug === slug?.[0] ? true : undefined}
                    className="hover:text-primary data-[active=true]:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
