/**
 * EcoTrace Packaging Private Limited - Configuration & Contact Endpoints
 * 
 * Production Configuration:
 * 1. FORM_ENDPOINT: Enter your Formspree endpoint (e.g. "https://formspree.io/f/xbjnqwe")
 *    or custom backend POST URL. If left empty, the form automatically uses the mailto fallback.
 * 2. PRIMARY_EMAIL: Verified company contact email.
 * 3. LINKEDIN_URL: Official LinkedIn profile/company page once created.
 */

export const CONFIG = {
  COMPANY_LEGAL_NAME: "EcoTrace Packaging Private Limited",
  BRAND_NAME: "EcoTrace",
  LOCATION: "Kolkata, West Bengal, India",
  PRIMARY_EMAIL: "sanchetiujjwal@gmail.com",
  
  // Founder & CEO official LinkedIn profile
  LINKEDIN_URL: "https://www.linkedin.com/in/ujjwal-sancheti",
  
  // Set your Formspree, Basin, or custom webhook URL here:
  // e.g. "https://formspree.io/f/YOUR_FORM_ID"
  FORM_ENDPOINT: "", // Empty string activates transparent mailto fallback
  
  // Cookie-free analytics configuration note:
  // Plausible / Google Analytics can be connected in index.html
  ANALYTICS_ENABLED: false,
};

export type TargetAudienceRole = 
  | "Brand"
  | "Packaging Converter"
  | "Investor / Incubator"
  | "Researcher / Academic"
  | "Other";
