import { Navigate, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/apiSlices/authSlice";
 

const PrivateRoute = ({ children }:{children:React.ReactNode}) => {
  const location = useLocation(); 

  const { data:profile, isLoading, isFetching, isError } =useProfileQuery(undefined)  
  
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError || !profile?.data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (profile?.data?.role === "admin" || profile?.data?.role === "super_admin") {
    return children; 
  }

  
  return <Navigate to="/login" />;
};

export default PrivateRoute;