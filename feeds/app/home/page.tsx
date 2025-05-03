import TabSwitcher from "@/components/TabSwitcher";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4">
        <TabSwitcher />
      </main>
    </div>
  );
}
