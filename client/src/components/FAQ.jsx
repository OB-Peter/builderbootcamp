import { useState } from "react";
import { FAQS } from "../data/coursesData";
import { ChevronDownIcon, HelpCircleIcon } from "./Icons";

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleAccordion = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Have Questions? <br />
            <span className="text-brand-orange">We've Got Answers.</span>
          </h2>

          <p className="section-subtitle">
            Find everything you need to know about our curriculum, scheduling, registration,
            and payment process.
          </p>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            const questionId = `faq-q-${idx}`;
            const answerId = `faq-a-${idx}`;

            return (
              <div
                key={idx}
                className={`faq-item-card ${isOpen ? "faq-item-open" : ""}`}
              >
                <button
                  type="button"
                  id={questionId}
                  className="faq-question-button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-icon-wrapper ${isOpen ? "rotate-icon" : ""}`}>
                    <ChevronDownIcon size={20} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="faq-answer-pane"
                  >
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-support-box">
          <div className="faq-support-icon">
            <HelpCircleIcon size={24} />
          </div>
          <div>
            <p className="faq-support-heading">Still have questions?</p>
            <p className="faq-support-sub">
              Reach out to our team at{" "}
              <a href="mailto:builderbootcamp@gmail.com" className="support-link">
                builderbootcamp@gmail.com
              </a>
              —we're glad to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
