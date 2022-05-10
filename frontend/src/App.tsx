import { Routes } from "react-router";
import { Route } from "react-router-dom";
import { AuthProvider } from "./features/components/auth/auth";
import { RequireAuth } from "./features/components/auth/RequireAuth";
import FormikSign from "./features/components/Login/FormikSign";
import FormikEmail from "./features/components/Email/FormikEmail";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<FormikSign />} />

        <Route
          path="/email"
          element={
            <RequireAuth>
              <FormikEmail />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
