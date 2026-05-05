import { StoreProvider } from "./context/StoreContext";
import { AuthProvider }  from "./context/AuthContext";
import AppRoutes         from "./routes";
import PageWrapper       from "./components/layout/PageWrapper";

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <PageWrapper>
          <AppRoutes />
        </PageWrapper>
      </StoreProvider>
    </AuthProvider>
  );
}