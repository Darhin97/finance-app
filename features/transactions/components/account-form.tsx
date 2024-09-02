import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: FormValues) => {
    if (!onSubmit) return;
    onSubmit(values);
  };
  const handleDelete = async () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={"space-y-4 pt-4"}
      >
        <FormField
          name={"name"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder={"e.g. Cash, Bank, Credit Card"}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className={"w-full"} disabled={disabled}>
          {id ? "Save changes" : "Create account"}
        </Button>
        {!!id && (
          <Button
            type={"button"}
            className={"w-full"}
            disabled={disabled}
            onClick={handleDelete}
            variant={"outline"}
          >
            <Trash className={"w-4 h-4 mr-2"} />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
