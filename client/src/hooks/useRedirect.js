import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const useRedirect = () => {
  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  return Redirect;
};
export default useRedirect;
