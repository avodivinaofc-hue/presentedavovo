import { AnimatedPage } from "@/components/AnimatedPage";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPage = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-cream py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/en/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <h1 className="text-3xl font-display font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <h2 className="text-xl font-semibold">7-Day Money-Back Guarantee</h2>
            <p>We offer a full refund within 7 days of purchase, no questions asked.</p>
            
            <h2 className="text-xl font-semibold mt-8">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email support@avodivina.com with your order details</li>
              <li>Receive confirmation within 24-48 hours</li>
              <li>Refund processed to original payment method within 5-7 business days</li>
            </ol>
            
            <h2 className="text-xl font-semibold mt-8">Contact</h2>
            <p>Email: support@avodivina.com</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RefundPage;