import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const skills = {
  "Programming Languages": [
    "Java",
    "Python",
    "C",
    "Kotlin",
    "JavaScript",
    "TypeScript",
    "Elixir",
    "HTML",
    "CSS",
  ],
  "Frameworks & Libraries": [
    "React",
    "React-Native",
    "Node.js",
    "Express",
    "Android",
    "CUDA",
    "OpenMP",
  ],
  Databases: ["MySQL", "PostgreSQL"],
  "Tools & Others": [
    "Git",
    "GitLab",
    "Linux",
    "Scrum",
    "REST APIs",
    "Firebase",
    "AWS",
    "Multithreading",
    "GPU Programming",
  ],
};

const SkillsSection = () => {
  return (
    <section className="py-12 bg-secondary/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-8">
            <Code2 className="w-6 h-6 text-accent mr-2" />
            <h2 className="text-2xl font-semibold text-primary">
              Technologies & Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-primary mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary dark:bg-gray-700 rounded-full text-sm text-primary dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
