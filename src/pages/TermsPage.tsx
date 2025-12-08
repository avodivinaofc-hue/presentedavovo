import { AnimatedPage } from "@/components/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-cream py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/en/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <h1 className="text-3xl font-display font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p>Last updated: December 2024</p>
            
            <h2 className="text-xl font-semibold mt-8">1. Agreement to Terms</h2>
            <p>By purchasing the Inner Oracle e-book, you agree to these Terms of Service.</p>
            
            <h2 className="text-xl font-semibold mt-8">2. Digital Product</h2>
            <p>The Inner Oracle is a digital product delivered via email. You will receive instant access upon successful payment.</p>
            
            <h2 className="text-xl font-semibold mt-8">3. License</h2>
            <p>Upon purchase, you receive a personal, non-transferable license to use the e-book for personal purposes only.</p>
            
            <h2 className="text-xl font-semibold mt-8">4. Refund Policy</h2>
            <p>We offer a 7-day money-back guarantee. If unsatisfied, contact support@avodivina.com for a full refund.</p>
            
            <h2 className="text-xl font-semibold mt-8">5. Contact</h2>
            <p>For questions, email: support@avodivina.com</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default TermsPage;