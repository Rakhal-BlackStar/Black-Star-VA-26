
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceRate: number; // Hourly rate for this specific service type
}

export interface PricingPlan {
  name: string;
  price: string;
  hours: number;
  features: string[];
  recommended?: boolean;
}

export interface BookkeepingOption {
  id: string;
  label: string;
  included: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
