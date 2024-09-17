import AccountFilter from "@/components/account-filter";
import DateFilters from "@/components/date-filters";

export const Filters = () => {
  return (
    <div
      className={
        "flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2 "
      }
    >
      <AccountFilter />
      <DateFilters />
    </div>
  );
};
