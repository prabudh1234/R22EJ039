import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../api/http";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    http.get(`/stats/${code}`).then((res) => setData(res.data));
  }, [code]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Stats for {code}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
