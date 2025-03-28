"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";

interface SortSelectorProps {
  currentSort: string;
  options: Record<string, string>;
}

export function SortSelector({ currentSort, options }: SortSelectorProps) {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("orderBy", value);
    router.push(url.pathname + url.search);
  };

  return (
    <Select defaultValue={currentSort} onValueChange={handleValueChange}>
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {Object.entries(options).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
