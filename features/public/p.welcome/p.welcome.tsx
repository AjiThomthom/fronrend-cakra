"use client";

import { HeroSection } from "./pw.hero";
import { CreditSection } from "./pw.credit";
import { WhatsOnSection } from "./pw.whatson";
import { FaQSection } from "./pw.faq";
import { RegisterSection } from "./pw.register";
import { FooterSection } from "./pw.footer";
import { Container } from "@mui/material";
import { motion, Variants } from "framer-motion";

export default function PublicWelcomeFeature() {
  // Ditambahkan tipe Variants dan 'as const' pada array bezier
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } 
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Container maxWidth="xl" className="space-y-24 py-8 md:py-16">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <HeroSection />
        </motion.section>

        {/* CREDIT SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <CreditSection />
        </motion.section>

        {/* WHATS ON SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <WhatsOnSection />
        </motion.section>

        {/* FAQ SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <FaQSection />
        </motion.section>

        {/* REGISTER SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <RegisterSection />
        </motion.section>

        {/* FOOTER SECTION */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} 
          variants={sectionVariants}
        >
          <FooterSection />
        </motion.section>

      </Container>
    </div>
  );
}