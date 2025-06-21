"use client";

import { motion } from "framer-motion";

export const FadeInSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3, once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);
