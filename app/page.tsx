"use server";
import PublicWelcomeFeature from "@/features/public/p.welcome/p.welcome";

export default async function page() {
  return await (<PublicWelcomeFeature />);
}
