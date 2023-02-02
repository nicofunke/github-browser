import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Default error page. Redirects to index
 */
export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => navigate("/"), [navigate]);
  return <></>;
}
