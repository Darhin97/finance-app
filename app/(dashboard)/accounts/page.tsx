"use client";

import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-account";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { columns } from "@/app/(dashboard)/accounts/columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const accountQuery = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = accountQuery.data || [];

  const isDisabled = accountQuery.isLoading || deleteAccounts.isPending;

  if (accountQuery.isLoading) {
    return (
      <div className={"max-w-screen-2xl mx-auto w-full pb-10 -mt-24"}>
        <Card className={"border-none drop-shadow-sm"}>
          <CardHeader>
            <Skeleton className={"h-8 w-48"} />
          </CardHeader>
          <CardContent>
            <div
              className={"h-[500px] w-full flex items-center justify-center"}
            >
              <Loader2 className={"size-6 text-slate-300 animate-spin"} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={"max-w-screen-2xl mx-auto w-full pb-10 -mt-24"}>
      <Card className={"border-none drop-shadow-sm"}>
        <CardHeader
          className={"gap-y-2 lg:flex-row lg:items-center lg:justify-between"}
        >
          <CardTitle>Accounts page</CardTitle>
          <Button size={"sm"} onClick={newAccount.onOpen}>
            <Plus className={"size-4 mr-2"} />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey={"name"}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);

              //deleting rows
              deleteAccounts.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
