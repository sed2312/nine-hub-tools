import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/hub/HeroSection';
import { HowItWorks } from '@/components/hub/HowItWorks';
import { WhySection } from '@/components/hub/WhySection';
import { ToolsGrid } from '@/components/hub/ToolsGrid';
import { PricingSection } from '@/components/hub/PricingSection';
import { FAQSection } from '@/components/hub/FAQSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <WhySection />
      <ToolsGrid />
      <PricingSection />
      <FAQSection />
    </Layout>
  );
};

export default Index;
