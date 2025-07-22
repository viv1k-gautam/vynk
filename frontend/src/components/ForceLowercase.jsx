import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ForceLowercase = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lowerCasePath = location.pathname.toLowerCase();
    if (location.pathname !== lowerCasePath) {
      navigate(lowerCasePath, { replace: true });
    }
  }, [location]);

  return null;
};

export default ForceLowercase;
