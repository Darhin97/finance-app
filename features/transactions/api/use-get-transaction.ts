import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    //fetched if we have an id
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("failed to get transaction");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
