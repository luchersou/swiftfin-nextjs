import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { KeyFeatures } from "@/components/sections/KeyFeatures";
import { Security } from "@/components/sections/Security";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <Security />
      <TechStack />
      <FAQ />
    </>
  );
}
