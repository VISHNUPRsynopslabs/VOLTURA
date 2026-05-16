import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/auth-panel";

export const metadata: Metadata = {
  title: "Login or Register",
  description: "Access your VOLTURA member account."
};

export default function AuthPage() {
  return <AuthPanel />;
}
