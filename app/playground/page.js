import PageHeader from "@/components/page-header";
import TransactionItem from "@/components/transaction-item";
import Trend from "@/components/trend";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import Button from "@/components/button";
import Label from "@/components/label";
import Input from "@/components/input";
import Select from "@/components/select";
import Separator from "@/components/separator";
import Skeleton from "@/components/skeleton";

export const metadata = {
  title: "Playground",
};

export default function Page() {
  return (
    <main className="space-y-8 my-16">
      <h1 className="text-4xl mt-t">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Pageheader</h2>
        <Separator />
        <div>
          <PageHeader />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator />
        <div className="flex space-x-8">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expense" amount={12000} prevAmount={10000} />
          <Trend type="Investment" amount={7000} prevAmount={11100} />
          <Trend type="Saving" amount={500} prevAmount={900} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Saving"
            description="For Children"
            amount={500}
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-mono">
          TransactionSummaryItem + TransactionItem
        </h2>
        <div className="space-y-4">
          <TransactionSummaryItem date="2026/4/24" amount={3500} />
          <Separator />

          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem
            type="Expense"
            category="Food"
            description="Going out to eat"
            amount={29}
          />
          <TransactionItem
            type="Saving"
            description="For Children"
            amount={500}
          />
          <TransactionItem
            type="Investment"
            description="In Microsoft"
            amount={9000}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Your Name
            </Label>
            <Input type="text" placeholder="Enter your name" />
          </div>

          <div>
            <Label htmlFor="city" className="mb-1">
              City
            </Label>
            <Select>
              <option value="">Select a city</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
            </Select>
          </div>

          <div className="col-span-2 flex items-center">
            <Input type="checkbox" id="terms" />
            <Label className="ml-2" htmlFor="terms">
              Accept terms
            </Label>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Separator />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </main>
  );
}
