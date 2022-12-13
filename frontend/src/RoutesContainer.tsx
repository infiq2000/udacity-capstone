import { Navigate, Route, Routes } from "react-router-dom";
import { routesConfig } from "./router/router.config";
import { RouteConfig } from "./router/types";

const RenderRoutes = () => {
  const accessToken = localStorage.getItem("access_token");
  return routesConfig.map((r: RouteConfig, index) => {
    return r.isProtected ? (
      accessToken ? (
        <Route key={index} path={r.path} element={<r.component />} />
      ) : (
        <Route key={index} element={<Navigate to="/" replace />} />
      )
    ) : (
      <Route key={index} path={r.path} element={<r.component />} />
    );
  });
};
interface RoutesContainerProps {
  renderLogin: any;
}
const RoutesContainer = ({ renderLogin }: RoutesContainerProps) => {
  return (
    <Routes>
      {RenderRoutes()}
      {renderLogin()}
    </Routes>
  );
};
export default RoutesContainer;
