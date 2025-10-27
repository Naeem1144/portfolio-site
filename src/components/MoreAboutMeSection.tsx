
"use client";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";

export const MoreAboutMeSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className="bg-gray-800 text-white rounded-lg shadow-lg">
        <CardHeader>
          <h2 className="text-3xl font-bold">About Me</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-gray-300">
              As a 21-year-old aspiring data scientist and analyst, I am deeply
              passionate about leveraging data to uncover impactful insights,
              address real-world challenges, and empower businesses with
              actionable intelligence. My robust foundation in data science,
              programming, statistics, and mathematics equips me to tackle
              projects with analytical rigor and a commitment to delivering
              meaningful results.
            </p>
            <p className="text-gray-300">
              My journey in technology began as a child, captivated by
              programming in C++ on my father&apos;s laptop. This early
              curiosity blossomed into a profound appreciation for the
              transformative power of technology and data. Since 2019, I have
              dedicated myself to continuous growth in the field, earning
              multiple certifications, engaging in advanced coursework, and
              immersing myself in hands-on projects across diverse real-world
              scenarios. By actively participating in the data science
              community, I consistently hone my skills and contribute to the
              field&apos;s advancement.
            </p>
            <p className="text-gray-300">
              While I may not yet have extensive corporate experience, I bring
              an abundance of dedication, knowledge, and a relentless drive to
              excel. I am eager to contribute my expertise and enthusiasm to any
              organization, delivering exceptional value and impactful
              outcomes.
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
