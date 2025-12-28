import { useTranslation } from "react-i18next";
import LandingPageEN from "./LandingPageEN";
import LandingPagePT from "./LandingPagePT";

const LandingPage = () => {
  const { i18n } = useTranslation();

  // Render language-specific landing page
  // Render language-specific landing page
  if (i18n.language.startsWith('pt')) {
    return <LandingPagePT />;
  }

  // Default to English version for EN and other languages
  return <LandingPageEN />;
};

export default LandingPage;