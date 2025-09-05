import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/Loading";
import useTitle from "../hooks/UseTitle";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  useTitle("FAQ");
  useEffect(() => {
    axios.get("http://localhost:5000/faqs").then((res) => {
      setFaqs(res.data);
    });
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  if (faqs.length === 0) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-poppins text-base-content">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-primary rounded-lg p-4 shadow-md cursor-pointer bg-base-200"
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <span className="text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.p
                  className="mt-3 text-secondary"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
