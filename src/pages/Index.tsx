
import { motion } from "framer-motion";
import Header from "../components/Header";
import ProjectGrid from "../components/ProjectGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">
              Desarrollador de Software
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Especializado en crear soluciones tecnológicas innovadoras y
              escalables. Apasionado por el desarrollo de software y las nuevas
              tecnologías.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-primary text-center mb-8">
            Proyectos Destacados
          </h2>
          <ProjectGrid />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
