import { useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../api/http";

export default function Redirect() {
  const { code } = useParams();

  useEffect(() => {
    async function fetchUrl() {
      const res = await http.get(`/resolve/${code}`);
      window.location.replace(res.data.longUrl);
    }
    fetchUrl();
  }, [code]);

  return <p>Redirecting...</p>;
}
