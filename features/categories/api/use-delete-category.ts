import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Category deleted successfully.");
      await queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      //TODO: invalidate summary and transactions
    },
    onError: () => {
      toast.error("Error deleting category");
    },
  });

  return mutation;
};
