import { AuthProvider } from "./context/AuthContext";
import AuthenticateUser from "./AuthenticateUser";
export default function ParentProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider><AuthenticateUser>{children}</AuthenticateUser></AuthProvider>;
}
