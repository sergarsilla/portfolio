import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface Command {
  input: string;
  output: string[];
}

const HiddenTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    {
      input: '',
      output: [
        '╔═══════════════════════════════════════════════════════╗',
        '║  Welcome to sergarsilla\'s Terminal v1.0              ║',
        '║  Type "help" for available commands                  ║',
        '╚═══════════════════════════════════════════════════════╝',
        ''
      ]
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string[]> = {
    help: [
      'Available commands:',
      '  whoami      - Display user information',
      '  ls          - List projects',
      '  cat cv      - Show CV link',
      '  skills      - Display skills tree',
      '  contact     - Show contact information',
      '  hack        - Try the CTF challenge',
      '  matrix      - Enable matrix mode',
      '  clear       - Clear terminal',
      '  exit        - Close terminal',
      ''
    ],
    whoami: [
      'Sergio García Mansilla',
      'Computer Engineer | Cybersecurity & Software Development',
      'Cybersecurity and Systems Engineering Technician @ Brooktec',
      'Location: Madrid, Spain',
      'Education: UPM - Universidad Politécnica de Madrid',
      'Master\'s: Cybersecurity, Ethical Hacking & Offensive Security @ EIP',
      'Certifications: IT Specialist - Network Security (Certiport)',
      'TOEIC: 890/990 (B2)',
      ''
    ],
    ls: [
      'Projects:',
      '  📱 IntelliCart - Smart Grocery List App',
      '  🎁 TruDetail - Gift Ideas Planner',
      '  🎾 Tennis Tournaments App',
      '  🎨 AI Image Generator',
      '  📝 Word Games App',
      '  ✅ Task Manager App',
      '  🌤️  Weather App',
      ''
    ],
    'cat cv': [
      'CV Links:',
      '  🇪🇸 Spanish: https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf',
      '  🇬🇧 English: https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf',
      ''
    ],
    skills: [
      'Skills Tree:',
      '├── Programming Languages',
      '│   ├── Java, Python, C, Kotlin',
      '│   └── JavaScript, TypeScript, Elixir, HTML, CSS',
      '├── Frameworks & Libraries',
      '│   ├── React, React Native, Node.js',
      '│   ├── Jetpack Compose, Express',
      '│   └── Flutter (learning)',
      '├── Databases',
      '│   └── MySQL, PostgreSQL, Firebase, Room',
      '├── DevOps & Cloud',
      '│   ├── AWS, Azure, Google Cloud',
      '│   ├── CI/CD, DevSecOps',
      '│   └── Git, GitLab, Git Flow',
      '├── Cybersecurity',
      '│   ├── Penetration Testing (Black Box, White Box)',
      '│   ├── Linux & Mac Hardening',
      '│   ├── SIEM (Wazuh), WAF (Wordfence)',
      '│   ├── Network Security, SOC',
      '│   └── Ethical Hacking, Offensive Security',
      '└── Methodologies',
      '    ├── Clean Architecture, DDD',
      '    └── SCRUM, Agile',
      ''
    ],
    contact: [
      'Contact Information:',
      '  📧 Email: sergarsilla@gmail.com',
      '  💼 LinkedIn: linkedin.com/in/sergarsilla',
      '  🐙 GitHub: github.com/sergarsilla',
      '  🌐 Website: sergarsilla.is-a.dev',
      ''
    ],
    hack: [
      '🔐 CTF Challenge Activated!',
      '',
      'Decode this message:',
      'U2VyZ2lvIGxvdmVzIGN5YmVyc2VjdXJpdHkh',
      '',
      'Hint: It\'s a common encoding method',
      'Type "decode <your_answer>" to check',
      ''
    ],
    matrix: [
      '🟢 Matrix mode activated!',
      'Reloading interface...',
      ''
    ],
    clear: [],
    exit: ['Closing terminal...', '']
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'exit') {
      setHistory(prev => [...prev, { input: cmd, output: commands.exit }]);
      setTimeout(() => setIsOpen(false), 500);
      return;
    }

    if (trimmedCmd === 'matrix') {
      setHistory(prev => [...prev, { input: cmd, output: commands.matrix }]);
      setTimeout(() => {
        document.documentElement.classList.add('hacker-mode');
      }, 1000);
      return;
    }

    if (trimmedCmd.startsWith('decode ')) {
      const answer = trimmedCmd.substring(7).trim();
      const correctAnswer = 'sergio loves cybersecurity!';
      
      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        setHistory(prev => [...prev, {
          input: cmd,
          output: [
            '✅ Correct! Well done!',
            '',
            '🎉 Achievement Unlocked: "Code Breaker"',
            '',
            'The message was Base64 encoded.',
            'Sergio loves cybersecurity!',
            ''
          ]
        }]);
      } else {
        setHistory(prev => [...prev, {
          input: cmd,
          output: [
            '❌ Incorrect. Try again!',
            'Hint: Try using a Base64 decoder',
            ''
          ]
        }]);
      }
      return;
    }

    const output = commands[trimmedCmd] || [
      `Command not found: ${cmd}`,
      'Type "help" for available commands',
      ''
    ];

    setHistory(prev => [...prev, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-4xl h-[600px] terminal-window"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-sm font-mono">sergarsilla@portfolio:~$</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary/50 rounded p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="h-[calc(100%-48px)] overflow-y-auto p-4 bg-background font-mono text-sm"
          >
            {history.map((cmd, i) => (
              <div key={i} className="mb-2">
                {cmd.input && (
                  <div className="flex items-center gap-2 text-accent">
                    <span className="text-muted-foreground">sergarsilla@portfolio:~$</span>
                    <span>{cmd.input}</span>
                  </div>
                )}
                {cmd.output.map((line, j) => (
                  <div key={j} className="text-foreground whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-muted-foreground">sergarsilla@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-accent"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="cursor-blink text-accent">▊</span>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HiddenTerminal;
