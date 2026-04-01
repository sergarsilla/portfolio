import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Bug, Award, ChevronRight, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import CyberCard from '../ui/cyber/CyberCard';
import { getCertifications, getCTFs, getSecurityTools } from '../../data/securityData';

type TabType = 'ctf' | 'certs' | 'tools';

const SecurityResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ctf');

  const ctfs = getCTFs();
  const certifications = getCertifications('es');
  const tools = getSecurityTools('es');

  const proficiencyColors: Record<string, string> = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/50',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    recon: <TerminalIcon className="w-3 h-3" />,
    web: <Bug className="w-3 h-3" />,
    exploitation: <Shield className="w-3 h-3" />,
    network: <ChevronRight className="w-3 h-3" />,
  };

  const tabs = [
    { id: 'ctf' as TabType, label: 'CTFs', icon: TerminalIcon },
    { id: 'certs' as TabType, label: 'Certificaciones', icon: Award },
    { id: 'tools' as TabType, label: 'Herramientas', icon: Shield },
  ];

  return (
    <section id="security" className="section-spacing relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-gradient">Investigación en Seguridad</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            CTFs, certificaciones, herramientas y análisis de vulnerabilidades
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 border-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2',
                activeTab === tab.id
                  ? 'border-cyber-green text-cyber-green bg-cyber-green/10'
                  : 'border-gray-700 text-gray-400 hover:border-gray-600'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'ctf' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {ctfs.map((ctf, i) => (
                <CyberCard key={ctf.name} variant="terminal" className="p-6">
                  <div className="flex items-start gap-3">
                    <TerminalIcon className="w-8 h-8 text-cyber-green mt-1" />
                    <div>
                      <h3 className="text-lg font-bold font-mono text-cyber-cyan">{ctf.name}</h3>
                      <p className="text-xs text-gray-500 mb-2 font-mono">{ctf.date} {ctf.position && `• ${ctf.position}`}</p>
                      <p className="text-sm text-gray-300">Participación activa en competiciones de hacking</p>
                    </div>
                  </div>
                </CyberCard>
              ))}
            </div>
          )}

          {activeTab === 'certs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {certifications.map((cert, i) => (
                <CyberCard key={cert.name} variant="security" className="p-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-8 h-8 text-cyber-magenta mt-1" />
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white mb-2">{cert.name}</h3>
                      <p className="text-xs text-cyber-magenta font-mono">{cert.issuer}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">{cert.date}</p>
                    </div>
                  </div>
                </CyberCard>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {tools.map((tool, i) => (
                <CyberCard key={tool.name} variant="terminal" className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-cyber-green font-mono">{tool.name}</h4>
                      <span className={cn('text-xs px-2 py-1 rounded-full border', proficiencyColors[tool.proficiency])}>
                        {tool.proficiency.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-cyber-cyan/60 font-mono uppercase tracking-wider flex items-center gap-1">
                      {categoryIcons[tool.category]}
                      {tool.category}
                    </span>
                    <p className="text-xs text-gray-400 font-mono">{tool.description.es}</p>
                  </div>
                </CyberCard>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityResearchSection;
