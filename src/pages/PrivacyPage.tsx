import { AnimatedPage } from "@/components/AnimatedPage";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPage = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-cream py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/en/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p>Last updated: December 2024</p>
            
            <h2 className="text-xl font-semibold mt-8">Information We Collect</h2>
            <p>We collect email addresses for product delivery and payment information processed securely by Stripe.</p>
            
            <h2 className="text-xl font-semibold mt-8">How We Use Your Data</h2>
            <p>Your data is used solely for product delivery and customer support. We do not sell your information.</p>
            
            <h2 className="text-xl font-semibold mt-8">Third-Party Services</h2>
            <p>We use Stripe for payments and Google Analytics for website analytics.</p>
            
            <h2 className="text-xl font-semibold mt-8">Contact</h2>
            <p>For privacy inquiries: support@avodivina.com</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default PrivacyPage;