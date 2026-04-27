import { useFormatCurrency } from "@/hooks/use-format-currency";
import { HandCoins, Landmark, PiggyBank, Wallet } from "lucide-react";

export default function TransactionItem({
  type,
  category,
  description,
  amount,
}) {
  console.log("type:", type); // 👈 check terminal for this

  const typesMap = {
    Income: {
      icons: HandCoins,
      colors: "text-green-500 dark:text-green-400",
    },
    Expense: {
      icons: Wallet,
      colors: "text-red-500 dark:text-red-400",
    },
    Saving: {
      icons: PiggyBank,
      colors: "text-blue-500 dark:text-blue-400",
    },
    Investment: {
      icons: Landmark,
      colors: "text-purple-500 dark:text-purple-400",
    },
  };

  const IconComponent = typesMap[type]?.icons;
  const colors = typesMap[type]?.colors;

  if (!IconComponent) {
    return null;
  }

  const formattedAmount = useFormatCurrency(amount);

  return (
    <div className="w-full flex items-center">
      <div className="flex items-center mr-4 grow">
        <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
        <span>{description}</span>
      </div>

      <div className="min-w-37.5 items-center hidden md:flex">
        {category && (
          <div className="rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5">
            {category}
          </div>
        )}
      </div>

      <div className="min-w-17.5 text-right">{formattedAmount}</div>

      <div className="min-w-25 flex justify-end">...</div>
    </div>
  );
}
