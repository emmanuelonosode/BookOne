"use client"; // This directive is necessary for client-side components in Next.js App Router

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // Import motion and hooks from framer-motion
import { process } from "../../Commons/details"; // Assuming this path is correct for your project
import Image from "next/image";
import Btn from "../Btn"; // Assuming this path is correct
import Tagline from "../tagline"; // Assuming this path is correct

function OurProcess() {
  // Ref for the main section to track its scroll progress
  const sectionRef = useRef(null);

  // useScroll hook to track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // When the start of the target enters view, and when the end of the target leaves view
  });

  // useTransform to map scrollYProgress to Y-axis movement for parallax
  // Adjust outputRange values to control the parallax speed and direction
  // For elements that appear to move slower than scroll (background effect):
  const leftY = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Moves from -100px to +100px
  const rightY = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Moves from -100px to +100px
  // For the center image, make it move slightly differently if desired, or keep it static relative to the section
  const centerY = useTransform(scrollYProgress, [0, 1], [50, -50]); // Moves from +50px to -50px, creating a slight foreground effect

  // Variants for staggered animation of the process steps
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.1, // Delay before the first child starts animating
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and slightly below
    visible: {
      opacity: 1,
      y: 0, // Animate to original position
      transition: {
        type: "spring", // Use spring for a natural bounce effect
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef} // Attach ref to the section
      className="py-16 md:py-28 bg-light text-neutral overflow-hidden relative" // Added relative for absolute positioning if needed, overflow-hidden for parallax
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-20">
          <Tagline tag="Engage" />
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-4 leading-tight">
            Our Simple Process for Client Success
          </h2>
          <p className="max-w-2xl text-neutral text-base md:text-lg">
            We prioritize understanding your unique needs. Our streamlined
            approach ensures effective solutions tailored for your business.
          </p>
        </div>

        {/* Process Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Steps with Parallax and Stagger */}
          <motion.div
            style={{ y: leftY }} // Apply parallax effect
            variants={containerVariants} // Apply container variants for staggering
            initial="hidden"
            whileInView="visible" // Animate when element enters viewport
            viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% of the element is visible, only once
            className="flex flex-col gap-12 max-w-xs w-full"
          >
            {process.slice(0, 2).map(({ icon, tag, desc }) => (
              <motion.div
                key={tag}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <Image src={icon} alt={tag} width={48} height={48} />
                <h4 className="mt-4 text-xl font-semibold text-neutral">
                  {tag}
                </h4>
                <p className="mt-2 text-neutral">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Image with Parallax */}
          <motion.div
            style={{ y: centerY }} // Apply parallax effect
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-sm lg:max-w-md"
          >
            <Image
              src="/hero.avif"
              alt="Our Process"
              width={540}
              height={540}
              className="rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Right Steps with Parallax and Stagger */}
          <motion.div
            style={{ y: rightY }} // Apply parallax effect
            variants={containerVariants} // Apply container variants for staggering
            initial="hidden"
            whileInView="visible" // Animate when element enters viewport
            viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% of the element is visible, only once
            className="flex flex-col gap-12 max-w-xs w-full"
          >
            {process.slice(2, 4).map(({ icon, tag, desc }) => (
              <motion.div
                key={tag}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <Image src={icon} alt={tag} width={48} height={48} />
                <h4 className="mt-4 text-xl font-semibold text-neutral">
                  {tag}
                </h4>
                <p className="mt-2 text-neutral">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
          <Btn label="Learn More" size="md" />
          <Btn label="Sign Up →" size="md" variant="ghost" />
        </div>
      </div>
    </motion.section>
  );
}

export default OurProcess;
