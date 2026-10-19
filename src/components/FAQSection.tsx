import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Is it available now?',
      answer: (
        <p>
          Not yet. We&apos;re in development; join the early-access list.
        </p>
      ),
    },
    {
      id: 'faq-2',
      question: 'What is it made from?',
      answer: (
        <p>
          Sugarcane bagasse (agricultural waste left after sugar extraction).
        </p>
      ),
    },
    {
      id: 'faq-3',
      question: 'How is it compostable?',
      answer: (
        <p>
          It is designed to break down naturally in standard industrial or home composting environments without leaving persistent microplastics (testing and certification in progress).
        </p>
      ),
    },
    {
      id: 'faq-4',
      question: 'How will you sell it?',
      answer: (
        <p>
          In pellet form to converters and packaging manufacturers.
        </p>
      ),
    },
    {
      id: 'faq-5',
      question: 'Can it replace conventional plastic today?',
      answer: (
        <p>
          We are developing formulations to match the processing characteristics of common packaging plastics; testing is ongoing.
        </p>
      ),
    },
    {
      id: 'faq-6',
      question: 'Are you certified?',
      answer: (
        <p>
          Certifications (e.g. ISO 17088 / IS 17088, TUV OK Compost) are part of our development roadmap and will be pursued as formulations finalize.
        </p>
      ),
    },
    {
      id: 'faq-7',
      question: 'How can I get technical details?',
      answer: (
        <div>
          <p className="mb-3">
            Contact us; we share data sheets and development updates under mutual NDA with qualified partners.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <span>Reach out via our contact form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      ),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="py-24 bg-surface text-ink relative scroll-mt-16"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            08. Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-4"
          >
            Clear, honest answers.
          </h2>
          <p className="text-base text-muted leading-relaxed">
            Everything you need to know about our material development, timelines, and collaboration roadmap.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-card rounded-xl border border-hairline overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  id={`btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${faq.id}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="font-serif text-lg sm:text-xl font-normal text-ink">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`btn-${faq.id}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-hairline"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
