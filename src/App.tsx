import { ChildList } from "@/components/ChildList";

function App() {
  return (
    <main className="min-h-screen bg-foreground">
      <div className="max-w-5xl mx-auto px-8">
        <ChildList batchSize={5} />
      </div>
    </main>
  );
}

export default App;
