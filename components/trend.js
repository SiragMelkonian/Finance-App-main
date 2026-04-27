import { useMemo } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useFormatCurrency } from "../hooks/use-format-currency";

export default function Trend({ type, amount, prevAmount }) {
  const colorClasses = {
    Income: "text-green-700 dark:text-green-300",
    Expense: "text-red-700 dark:text-red-400",
    Investment: "text-blue-700 dark:text-blue-300",
    Saving: "text-purple-700 dark:text-purple-300",
  };

  const calcPercentageChange = (amount, prevAmount) => {
    if (!prevAmount || prevAmount === 0) return 0;
    return ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(
    () => calcPercentageChange(amount, prevAmount).toFixed(0),
    [amount, prevAmount],
  );

  const formatedAmount = useFormatCurrency(amount);

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className="text-2xl font-semibold dark:text-white mb-2">
        {formatedAmount}
      </div>
      <div className="flex space-x-1 items-center text-sm">
        {percentageChange <= 0 && (
          <ArrowDownLeft className="text-red-700 dark:text-red-300" />
        )}
        {percentageChange > 0 && (
          <ArrowUpRight className="text-green-700 dark:text-green-300" />
        )}
        {percentageChange}% vs last period
      </div>
    </div>
  );
}
