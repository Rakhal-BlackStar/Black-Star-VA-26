
import { Service, PricingPlan, FAQItem, BookkeepingOption } from './types';

export const SERVICES: Service[] = [
  {
    id: 'admin',
    title: 'Executive Administration',
    description: 'Calendar management, email filtering, travel planning, and meeting coordination.',
    icon: 'fa-calendar-check',
    priceRate: 40
  },
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Finance',
    description: 'Accounts payable/receivable, expense tracking, invoicing, and financial reporting.',
    icon: 'fa-file-invoice-dollar',
    priceRate: 55
  },
  {
    id: 'creative',
    title: 'Content & Creative',
    description: 'Social media management, graphic design, copywriting, and email marketing.',
    icon: 'fa-pen-nib',
    priceRate: 50
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'CRM setup, website maintenance, data analysis, and software integration.',
    icon: 'fa-code',
    priceRate: 65
  },
  {
    id: 'lifestyle',
    title: 'Personal Concierge',
    description: 'Personal shopping, appointment booking, and event management for busy founders.',
    icon: 'fa-star',
    priceRate: 40
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Stellar Starter',
    price: '$1,600',
    hours: 40,
    features: [
      'Dedicated Executive Assistant Support',
      'Email & Inbox Management',
      'Calendar & Schedule Coordination',
      'Travel & Logistics Planning',
      'Standard 24h Response Time',
      'Texas-Based Project Manager'
    ]
  },
  {
    name: 'Galaxy Growth',
    price: '$2,400',
    hours: 60,
    features: [
      'Dedicated Executive Assistant Support',
      'Priority Email & Inbox Management',
      'Strategic Calendar Coordination',
      'Complex Travel & Logistics',
      'Standard 12h Response Time',
      'Quarterly Performance Reviews',
      'Dedicated Success Manager'
    ],
    recommended: true
  },
  {
    name: 'Cosmic EA',
    price: '$3,200',
    hours: 80,
    features: [
      'Dedicated Elite Executive Assistant Support',
      'Comprehensive Strategic Operations',
      'Unlimited Executive Tasks & Workflow Design',
      'Instant Communication Access',
      'Lifestyle & Concierge Support',
      'VIP Handling for All Requests',
      '24/7 Crisis & Schedule Management'
    ]
  }
];

export const BOOKKEEPING_PLANS = [
  {
    name: 'Stellar Essential Ledger',
    price: '$500',
    description: 'Perfect for small businesses and solopreneurs.',
    features: ['Monthly Bank Reconciliation', 'Expense Categorization', 'Basic Profit & Loss Statements']
  },
  {
    name: 'Galaxy Precision Growth',
    price: '$800',
    description: 'For growing teams with higher transaction volume.',
    features: ['Accounts Payable & Receivable', 'Vendor Management', 'Quarterly Financial Reviews', 'Sales Tax Filing']
  },
  {
    name: 'Full Cycle Cosmic',
    price: '$1,500',
    description: 'Complete back-office financial management.',
    features: ['Unlimited Reconciliations', 'Payroll Management', 'Strategic Cash Flow Forecasting', 'Tax Prep Collaboration']
  }
];

export const BOOKKEEPING_CHECKLIST: string[] = [
  'Accounts Payable & Receivable',
  'Monthly Bank Reconciliations',
  'Expense Categorization',
  'Financial Statement Preparation',
  'Payroll Processing & Management',
  'Sales Tax Filing & Compliance',
  'Vendor Management',
  'Strategic Cash Flow Analysis'
];

export const FAQS: FAQItem[] = [
  {
    question: "How do I get started with Blackstar VA?",
    answer: "Simply schedule a discovery call through our site. We'll assess your needs and match you with the perfect elite assistant within 48 hours."
  },
  {
    question: "How do you handle password and data security?",
    answer: "We use enterprise-grade tools like LastPass or Dashlane to manage access without ever seeing your raw passwords. All our VAs sign strict NDAs and undergo background checks before being placed with clients."
  },
  {
    question: "What happens if my VA is sick or on vacation?",
    answer: "One of the biggest perks of an agency is continuity. If your primary assistant is away, a trained backup assistant steps in to ensure your business doesn't skip a beat. Your dedicated Project Manager handles the handoff seamlessly."
  },
  {
    question: "Do I have to sign a long-term contract?",
    answer: "No. We operate on a month-to-month retainer basis. We believe our value should earn your business every month, not a piece of paper. You can upgrade, downgrade, or cancel with 30 days' notice."
  },
  {
    question: "What communication tools do you use?",
    answer: "We are flexible! Most of our clients prefer Slack, Notion, or Asana. We also integrate with Microsoft Teams, Trello, and WhatsApp depending on your preferred workflow."
  },
  {
    question: "Can I interview my assistant before we start?",
    answer: "Absolutely. After our discovery call, we narrow down the best candidates from our internal elite pool. You'll have a chance to meet your top match to ensure the 'vibe' and technical fit are perfect before onboarding begins."
  },
  {
    question: "What are your VAs' working hours?",
    answer: "While we are Texas-based, we support various time zones. Standard hours are 9 AM – 5 PM local time, but we can arrange for early morning or evening coverage if your business requires international support."
  },
  {
    question: "Is there a trial period?",
    answer: "We offer a 14-day 'Vibe Check' period. If within the first two weeks you feel the match isn't perfect, we will swap your assistant immediately or refund your remaining hours, no questions asked."
  }
];

export const TESTIMONIALS = [
  {
    text: "Switching to Black Star Va was the single best decision for my business. Their bookkeeping is flawless, and my VA feels like a true extension of my brain.",
    name: "J. Vance",
    role: "Founder",
    img: "https://picsum.photos/id/65/100/100"
  },
  {
    text: "I was skeptical about the remote model for high-level EA work, but Black Star proved me wrong. Their anticipatory logic is on another level.",
    name: "S. Thompson",
    role: "CEO",
    img: "https://picsum.photos/id/64/100/100"
  },
  {
    text: "Managing a global team across 6 timezones was killing me. Black Star stepped in and organized my life in less than two weeks.",
    name: "M. Rodriguez",
    role: "COO",
    img: "https://picsum.photos/id/101/100/100"
  },
  {
    text: "Their Texas work ethic is no joke. I've worked with agencies in NYC and London, but the attention to detail here is unmatched.",
    name: "R. Chen",
    role: "Director of Ops",
    img: "https://picsum.photos/id/91/100/100"
  },
  {
    text: "Finally, a bookkeeping service that doesn't require me to explain everything twice. They just get it.",
    name: "L. Harrison",
    role: "Principal",
    img: "https://picsum.photos/id/45/100/100"
  },
  {
    text: "My executive assistant at Black Star has reclaimed at least 15 hours of my week. I'm actually home for dinner now.",
    name: "K. Patel",
    role: "Medical Director",
    img: "https://picsum.photos/id/55/100/100"
  },
  {
    text: "Professional, discreet, and incredibly efficient. They handle my personal and business life with the utmost care.",
    name: "D. Smith",
    role: "Angel Investor",
    img: "https://picsum.photos/id/32/100/100"
  },
  {
    text: "The integration with our Slack and Notion was seamless. It felt like we hired a local team member overnight.",
    name: "A. Garcia",
    role: "Head of Product",
    img: "https://picsum.photos/id/22/100/100"
  }
];
