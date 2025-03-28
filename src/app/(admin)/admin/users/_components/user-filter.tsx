"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { Label } from "~/app/_components/ui/label";
import { Separator } from "~/app/_components/ui/separator";

export function UserFilterButton() {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<"query" | "email">("query");
  const [filterValue, setFilterValue] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    const email = searchParams.get("email");

    if (query) {
      setFilterType("query");
      setFilterValue(query);
    } else if (email) {
      setFilterType("email");
      setFilterValue(email);
    }
  }, [searchParams]);

  const handleApplyFilter = () => {
    if (!filterValue.trim()) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.delete("query");
    params.delete("email");
    params.delete("page");

    params.set(filterType, filterValue.trim());

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setFilterValue("");

    setOpen(false);

    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());

    const keysToRemove = ["query", "email", "page"];
    keysToRemove.forEach((key) => params.delete(key));

    const queryString = params.toString();
    const newUrl = currentPath + (queryString ? `?${queryString}` : "");

    router.replace(newUrl);
  };

  const isFiltered = searchParams.has("query") || searchParams.has("email");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isFiltered ? "secondary" : "outline"}
          size="icon"
          title="Filter users"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="end">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Filter Users</h4>
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 px-2 text-xs"
              >
                <X className="mr-1 h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="filter-type" className="text-xs font-medium">
              Filter by
            </Label>
            <Select
              value={filterType}
              onValueChange={(value) =>
                setFilterType(value as "query" | "email")
              }
            >
              <SelectTrigger id="filter-type" className="h-8 text-xs">
                <SelectValue placeholder="Select filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="query">Name or Username</SelectItem>
                <SelectItem value="email">Email Address</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="filter-value" className="text-xs font-medium">
              {filterType === "query" ? "Search term" : "Email address"}
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                id="filter-value"
                placeholder={
                  filterType === "query"
                    ? "Search users..."
                    : "user@example.com"
                }
                className="h-8 pl-7 text-xs"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleApplyFilter();
                  }
                }}
              />
            </div>
          </div>

          <Separator className="my-1" />

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleApplyFilter}
              size="sm"
              className="h-8"
              disabled={!filterValue.trim()}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
