
"use client";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  level?: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

const skills: SkillCategory[] = [
  {
    category: "Data Analysis",
    items: [
      { name: "Python" },
      { name: "Power BI & Tableau" },
      { name: "Systems, Applications & Products in Data Processing (SAP)" },
      { name: "Advanced Excel" },
      { name: "Data Visualization" },
      { name: "Data Cleaning & Preprocessing" },
      { name: "Data Integration & ETL" },
      { name: "Data Modeling & Warehousing" },
      { name: "Data Storytelling" },
    ],
  },
  {
    category: "Data Science",
    items: [
      { name: "Deep Learning" },
      { name: "Machine Learning" },
      { name: "Natural Language Processing" },
      { name: "Time Series Analysis" },
      { name: "Predictive Modeling" },
      { name: "Feature Engineering" },
      { name: "Model Evaluation & Validation" },
    ],
  },
  {
    category: "AI & LLM",
    items: [
      { name: "Large Language Models" },
      { name: "Agentic Workflows" },
      { name: "Retrieval  Augmented Generation" },
      { name: "Model Context Protocol" },
      { name: "Prompt Engineering" },
      { name: "Fine-tuning & Training" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "Structured Query Language (SQL)" },
      { name: "Relational Database Management Systems (RDBMS)" },
      { name: "Vector Databases" },
    ],
  },
  {
    category: "Statistics",
    items: [
      { name: "Descriptive & Inferential Statistics" },
      { name: "A/B Testing & Bayesian Statistics" },
      { name: "Conversion Optimization & Trend Analysis" },
      { name: "Customer Segmentation" },
    ],
  },
  {
    category: "More Skills",
    items: [
      { name: "Microsoft Office Suite" },
      { name: "Strategic Planning" },
      { name: "Analytical thinking" },
      { name: "Market Research & Analysis" },
      { name: "Reporting & Documentation" },
      { name: "Presentation Skills" },
      { name: "Collaboration & Clear Communication" },
      { name: "Trilingual: English, Hindi, Gujarati" },
      { name: "Web Development technologies (basic)" },
      { name: "Understanding of Business Processes, Finance and Marketing" },
    ],
  },
];

export const CoreCompetenciesSection = () => {
  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Core Competencies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gray-800 h-full">
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    {skillCategory.category}
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((item) => (
                      <Chip key={item.name} color="primary">
                        {item.name}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
