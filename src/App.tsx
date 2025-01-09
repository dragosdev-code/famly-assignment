import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-foreground">
      <div className="max-w-5xl mx-auto px-8">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </Button>
      </div>
    </main>
  );
}

export default App;
