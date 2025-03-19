"use client";

import { useEffect, useState } from "react";

export default function ClientLogger({ data }: { data: any }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("Client-side log:", data);
  }, [data]);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black bg-opacity-70 text-white text-xs max-w-[400px] max-h-[300px] overflow-auto rounded">
      <h3 className="font-bold mb-2">Client Debug Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
