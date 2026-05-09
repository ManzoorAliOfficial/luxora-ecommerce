import { StoreProvider } from "./context/StoreContext";
import { AuthProvider }  from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";  
import AppRoutes         from "./routes";
import PageWrapper       from "./components/layout/PageWrapper";

export default function App() {
  return (
    <ThemeProvider>  
      <AuthProvider>
        <StoreProvider>
          <PageWrapper>
            <AppRoutes />
          </PageWrapper>
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider> 
  );
}