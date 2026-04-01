import { Language } from '../hooks/useLanguage';

interface SecurityTool {
  name: string;
  category: string;
  proficiency: string;
  description: Record<Language, string>;
}

export function getSecurityTools(language: Language): SecurityTool[] {
  return [
    { name: 'Nmap', category: 'recon', proficiency: 'intermediate', description: { es: 'Escaneo de redes y puertos', en: 'Network and port scanning' } },
    { name: 'Burp Suite', category: 'web', proficiency: 'intermediate', description: { es: 'Testing de aplicaciones web', en: 'Web application testing' } },
    { name: 'Metasploit', category: 'exploitation', proficiency: 'intermediate', description: { es: 'Framework de exploits', en: 'Exploit framework' } },
    { name: 'SQLMap', category: 'web', proficiency: 'intermediate', description: { es: 'Detección de SQL Injection', en: 'SQL Injection detection' } },
    { name: 'Wireshark', category: 'network', proficiency: 'intermediate', description: { es: 'Análisis de tráfico de red', en: 'Network traffic analysis' } },
    { name: 'OWASP ZAP', category: 'web', proficiency: 'intermediate', description: { es: 'Scanner de vulnerabilidades', en: 'Vulnerability scanner' } },
  ];
}

export function getCertifications(language: Language): Array<{ name: string; issuer: string; date: string }> {
  return [
    {
      name: language === 'es' ? 'Máster en Ciberseguridad y Hacking Ético' : 'Master in Cybersecurity and Ethical Hacking',
      issuer: 'EIP International Business School',
      date: '2024-2025'
    },
    {
      name: language === 'es' ? 'Ruta Completa de Ciberseguridad' : 'Complete Cybersecurity Path',
      issuer: 'TryHackMe',
      date: '2024'
    },
  ];
}

export function getCTFs(): Array<{ name: string; date: string; position?: string }> {
  return [
    { name: 'TryHackMe', date: '2024-Present', position: 'Activo' },
    { name: 'HackTheBox', date: '2024-Present', position: 'Top 10%' },
  ];
}
