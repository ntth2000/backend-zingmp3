import GlobalStyles from "./components/GlobalStyles";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "~/Layout";
import { privateRoutes, publicRoutes } from "./routes";
import { useSelector } from "react-redux";
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <GlobalStyles>
      <Layout>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                element={<Page />}
                key={index}
                path={route.path + "/*"}
                end={!!route.end}
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                element={isLoggedIn ? <Page /> : <Navigate to="/" replace />}
                key={index}
                path={route.path + "/*"}
              />
            );
          })}
        </Routes>
      </Layout>
    </GlobalStyles>
  );
}

export default App;
