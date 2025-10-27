
"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Button,
} from "@heroui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface Repo {
  name: string;
  description: string;
  htmlUrl: string;
  stars?: number;
  forks?: number;
  language?: string | null;
  homepage?: string | null;
  topics?: string[];
}

interface ProjectsProps {
  repos: Repo[];
  isLoading?: boolean;
}

export const ProjectsSection = ({
  repos = [],
  isLoading = false,
}: ProjectsProps) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const renderSkeletons = () =>
    Array.from({ length: 3 }).map((_, i) => (
      <motion.div key={`skeleton-${i}`} variants={itemVariants}>
        <Card className="h-full flex flex-col bg-gray-800 animate-pulse">
          <CardHeader className="p-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </CardHeader>
          <CardBody className="flex-grow p-4">
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
              <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
            </div>
          </CardBody>
          <div className="p-4 flex gap-2">
            <div className="h-10 flex-1 bg-gray-700 rounded-md"></div>
            <div className="h-10 flex-1 bg-gray-700 rounded-md"></div>
          </div>
        </Card>
      </motion.div>
    ));

  return (
    <div className="w-full py-20 bg-gray-900 text-white" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        {isLoading ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {renderSkeletons()}
          </motion.div>
        ) : repos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xl">No projects to display at the moment.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {repos.map((repo) => (
              <motion.div key={repo.name} variants={itemVariants}>
                <Card className="h-full flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <CardHeader className="p-6">
                    <h3 className="text-xl font-bold">{repo.name}</h3>
                  </CardHeader>
                  <CardBody className="flex-grow p-6">
                    <p className="text-gray-400 mb-4">
                      {repo.description ||
                        "No description provided for this project."}
                    </p>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="text-xs bg-gray-700 text-white px-3 py-1 rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardBody>
                  <div className="p-6 bg-gray-800 flex gap-4">
                    <Button
                      as={Link}
                      href={repo.htmlUrl}
                      target="_blank"
                      color="primary"
                      className="flex-1"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </Button>
                    {repo.homepage && (
                      <Button
                        as={Link}
                        href={repo.homepage}
                        target="_blank"
                        variant="outline"
                        className="flex-1"
                      >
                        <FaExternalLinkAlt className="mr-2" /> Live Demo
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
