import PageHeader from "@/components/page-header";

export default function Home() {
  return (
    <div className="my-2 space-y-1">
      <PageHeader className="mb-4" />
      <div className="flex justify-center gap-5">
        <h1>Welcome to my app</h1>
        <p>This is my home page.</p>
      </div>
    </div>
  );
}
