import { useState } from "react";
import { logger } from "../Logging/logger";

export default function LogConsole() {
  const [_, setN] = useState(0);
  const logs = logger.getAll();

  return (
    <div style={{ border: "1px solid gray", padding: 10, marginTop: 20 }}>
      <button onClick={() => setN(x => x + 1)}>Refresh Logs</button>
      <ul>
        {logs.map((l, i) => (
          <li key={i}>[{l.type}] {l.time} - {l.message}</li>
        ))}
      </ul>
    </div>
  );
}
