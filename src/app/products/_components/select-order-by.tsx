"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { type OrderByOptions } from "~/lib/types";

export function SelectOrderBy() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const router = useRouter();

  const handleChange = (value: OrderByOptions) => {
    const url = new URL(window.location.href);
    url.searchParams.set("orderBy", value);
    router.push(url.toString());
  };

  return (
    <Select defaultValue={orderBy ?? "popular"} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="priceDesc">Price (high to low)</SelectItem>
          <SelectItem value="priceAsc">Price (low to high)</SelectItem>
          <SelectItem value="A-Z">Name (A-Z)</SelectItem>
          <SelectItem value="Z-A">Name (Z-A)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
