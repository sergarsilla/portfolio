import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Ongawa",
    position: "Software Engineering / Developer Intern",
    period: "February 2025 - Present",
    description:
      "I have developed a climate vulnerability application at Ongawa as a Software Engineering / Developer Intern. Using Kotlin, MVC, Clean Architecture, and Domain Driven Design with Jetpack Compose for the UI, we built a robust solution to address climate vulnerability challenges. We also used GitLab with Git Flow for version control and SCRUM for effective teamwork and quality assurance.",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "GitLab",
      "Clean Architecture",
      "Domain Driven Design",
      "SCRUM Methodology",
      "ADR",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-8">
            <Briefcase className="w-6 h-6 text-accent mr-2" />
            <h2 className="text-2xl font-semibold text-primary">
              Work Experience
            </h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-primary mb-1">
                  {exp.position}
                </h3>
                <h4 className="text-lg text-accent mb-2">{exp.company}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {exp.period}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary dark:bg-gray-700 rounded-full text-sm text-primary dark:text-gray-300"
                    >
                      {tech}
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

export default ExperienceSection;
