"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [pathname,debounceValue,currentCategoryId,router]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 mr-2 absolute top-3 left-3 text-slate-600" />
      <Input onChange={(e)=> setValue(e.target.value)} value={value}
        className="pl-9 w-full md:w-[300px] rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search course name..."
      />
    </div>
  );
};
