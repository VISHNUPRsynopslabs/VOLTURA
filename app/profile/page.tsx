import type { Metadata } from "next";
import { ProfileDashboard } from "@/components/profile/profile-dashboard";

export const metadata: Metadata = {
  title: "Profile Dashboard",
  description: "VOLTURA member dashboard for orders, wishlist, addresses, and account settings."
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
