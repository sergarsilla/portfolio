import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface Command {
  input: string;
  output: string[];
}

const WELCOME: Command = {
  input: '',
  output: [
    'sergarsilla terminal v2.0',
    "type 'help' to get started",
    '',
  ],
};

const STATIC_COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  whoami        - who is behind this site',
    '  cat role.txt  - current role',
    '  ls projects   - list projects',
    '  skills        - display skills tree',
    '  cat cv        - CV download links',
    '  contact       - contact information',
    '  neofetch      - system info',
    '  hack          - try the CTF challenge',
    '  matrix        - toggle matrix mode',
    '  clear         - clear terminal',
    '  exit          - close terminal',
    '',
    'This shell also understands more than it admits.',
    '',
  ],
  whoami: [
    'Sergio García Mansilla',
    'Computer Engineer | Cybersecurity & Systems',
    'Cybersecurity and Systems Engineering Technician @ Brooktec',
    'BSc Computer Engineering @ UPM (2025)',
    "Master's in Cybersecurity Management, Ethical Hacking",
    'and Offensive Security @ EIP (2026)',
    'Location: Madrid, Spain',
    '',
  ],
  'cat role.txt': [
    'cybersecurity & systems @ brooktec',
    'siem (wazuh) / hardening / cloud security / iso 27001',
    '',
  ],
  'ls projects': [
    'wazuh-anomaly-detector/   # PyTorch autoencoder for the Wazuh SIEM (TFM)',
    'wazuh-llm-triage/         # local LLM + RAG alert triage (TFM)',
    'intellicart/              # smart grocery list app (iOS/Android)',
    'trudetail/                # gift ideas planner (iOS/Android)',
    'more at github.com/sergarsilla',
    '',
  ],
  skills: [
    'Skills:',
    '├── cybersecurity',
    '│   ├── SIEM (Wazuh), SOC, incident response',
    '│   ├── Linux/macOS hardening',
    '│   ├── cloud security (AWS, Azure, GCP)',
    '│   ├── pentesting (black/white box)',
    '│   └── ISO 27001, GDPR',
    '├── systems & devops',
    '│   └── Linux, Docker, Bash, Git, CI/CD',
    '├── ai/ml',
    '│   └── PyTorch, local LLMs, RAG (Ollama, Qdrant)',
    '├── languages',
    '│   └── Python, Java, C, Kotlin, TypeScript, Elixir',
    '└── frameworks',
    '    └── React, React Native, Node.js, Jetpack Compose',
    '',
  ],
  'cat cv': [
    'CV downloads:',
    '  ES: https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_Spanish.pdf',
    '  EN: https://raw.githubusercontent.com/sergarsilla/sergarsilla/main/CV_English.pdf',
    '',
  ],
  contact: [
    'Contact:',
    '  email:    sergarsilla@gmail.com',
    '  linkedin: linkedin.com/in/sergarsilla',
    '  github:   github.com/sergarsilla',
    '',
  ],
  neofetch: [
    '        ___        sergio@portfolio',
    '       / __|       ----------------',
    '       \\__ \\_      OS: PortfolioOS 2.0 (Arch-adjacent)',
    '       |___/       Shell: hidden-sh',
    '                   Uptime: freelancing since 2023',
    '                   Packages: coffee, wazuh, docker',
    '                   Theme: terminal-green [dark/light]',
    '',
  ],
  hack: [
    'CTF challenge:',
    '',
    'Decode this message:',
    'U2VyZ2lvIGxvdmVzIGN5YmVyc2VjdXJpdHkh',
    '',
    "Hint: it's a common encoding method",
    'Type "decode <your_answer>" to check',
    '',
  ],
  'hack the planet': ['HACK THE PLANET! Zero Cool would be proud.', ''],
  ping: [
    'PING localhost (127.0.0.1): 56 data bytes',
    '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms',
    '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.039 ms',
    '--- localhost ping statistics ---',
    '2 packets transmitted, 2 received, 0.0% packet loss (obviously)',
    '',
  ],
  nmap: [
    'Starting Nmap ( https://nmap.org ) at portfolio',
    'Nmap scan report for localhost (127.0.0.1)',
    'PORT     STATE    SERVICE',
    '22/tcp   filtered ssh      # of course',
    '80/tcp   open     http',
    '443/tcp  open     https',
    '1337/tcp open     elite',
    '',
    'Note: only scan what you are authorized to scan.',
    'This host authorizes you. Others will not.',
    '',
  ],
  history: [
    '  1  sudo rm -rf / --no-preserve-root',
    '  2  git push --force origin main',
    '  3  chmod -R 777 /',
    '  4  curl http://sketchy.sh | sudo bash',
    '  5  history -c   # too late, this is evidence now',
    '',
  ],
  uname: ['PortfolioOS portfolio 2.0.0-terminal #1 SMP x86_64 GNU/Linux', ''],
  sl: [
    '      ====        ________ ',
    '  _D _|  |_______/        \\__I_I_____===__|_________|',
    '   |(_)---  |   H\\________/ |   |        =|___ ___|  ',
    '   /     |  |   H  |  |     |   |         ||_| |_||  ',
    '  |      |  |   H  |__--------------------| [___] |  ',
    '  | ________|___H__/__|_____/[][]~\\_______|       |  ',
    '  |/ |   |-----------I_____I [][] []  D   |=======|__',
    '',
    "(you typed 'sl' instead of 'ls', the train forgives you)",
    '',
  ],
};

const cowsay = (text: string): string[] => {
  const message = text.trim() || 'moo. hire sergio.';
  const border = '-'.repeat(message.length + 2);
  return [
    ` ${border}`,
    `< ${message} >`,
    ` ${border}`,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
    '',
  ];
};

const RM_RF_SEQUENCE = [
  'removing /usr ...',
  'removing /home ...',
  'removing /var ...',
  'removing /etc ...',
  'removing everything you love ...',
];

const RM_RF_AFTERMATH = [
  '',
  "rm: cannot remove '/': Permission denied (nice try)",
  'Restoring from backup... done.',
  'ISO 27001 says: keep backups. I do.',
  '',
];

const HiddenTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([WELCOME]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [vimMode, setVimMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const handleOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpen);
    };
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

  const print = useCallback((cmd: string, output: string[]) => {
    setHistory((prev) => [...prev, { input: cmd, output }]);
  }, []);

  const runRmRf = useCallback(
    (cmd: string) => {
      setBusy(true);
      print(cmd, []);
      RM_RF_SEQUENCE.forEach((line, i) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { input: '', output: [line] }]);
        }, 250 * (i + 1));
      });
      setTimeout(() => {
        document.documentElement.classList.add('meltdown');
      }, 250 * RM_RF_SEQUENCE.length + 200);
      setTimeout(() => {
        document.documentElement.classList.remove('meltdown');
        setHistory((prev) => [...prev, { input: '', output: RM_RF_AFTERMATH }]);
        setBusy(false);
      }, 250 * RM_RF_SEQUENCE.length + 2600);
    },
    [print],
  );

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    const lower = cmd.toLowerCase();

    if (vimMode) {
      if (lower === ':q' || lower === ':q!' || lower === ':wq') {
        setVimMode(false);
        print(cmd, ['Escaped. Achievement unlocked: vim survivor.', '']);
      } else {
        print(cmd, [`E492: Not an editor command: ${cmd}`, "(hint: ':q!' is the emergency exit)", '']);
      }
      return;
    }

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    if (lower === 'exit') {
      print(cmd, ['Closing terminal...', '']);
      setTimeout(() => setIsOpen(false), 400);
      return;
    }

    if (lower === 'matrix') {
      const active = document.documentElement.classList.toggle('hacker-mode');
      print(cmd, [active ? 'Matrix mode ON. Follow the white rabbit.' : 'Matrix mode OFF. Back to reality.', '']);
      return;
    }

    // rm -rf easter egg: with sudo it "works", without it permission is denied
    if (/^(sudo\s+)?rm\s+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)\s+\/(\s|$)/.test(lower)) {
      if (lower.startsWith('sudo')) {
        runRmRf(cmd);
      } else {
        print(cmd, ["rm: cannot remove '/': Permission denied", '(try harder)', '']);
      }
      return;
    }

    if (lower.startsWith('sudo')) {
      print(cmd, ['sergarsilla is not in the sudoers file.', 'This incident will be reported.', '']);
      return;
    }

    if (lower.startsWith('ssh')) {
      const host = cmd.split(/\s+/)[1] ?? 'prod';
      print(cmd, [`ssh: connect to host ${host} port 22: Connection refused`, '(nice try)', '']);
      return;
    }

    if (lower === 'vim' || lower === 'vi' || lower === 'nano' || lower.startsWith('vim ')) {
      setVimMode(true);
      print(cmd, ['Entering vim...', '', 'How do you exit vim? Exactly.', '-- INSERT --', '']);
      return;
    }

    if (lower.startsWith('cowsay')) {
      print(cmd, cowsay(cmd.slice(6)));
      return;
    }

    if (lower.startsWith('decode ')) {
      const answer = cmd.substring(7).trim().toLowerCase();
      if (answer === 'sergio loves cybersecurity!') {
        print(cmd, [
          'Correct!',
          '',
          'Achievement unlocked: "Code Breaker"',
          'The message was Base64 encoded.',
          '',
        ]);
      } else {
        print(cmd, ['Incorrect. Try again!', 'Hint: try a Base64 decoder', '']);
      }
      return;
    }

    if (lower === 'ls' || lower === 'ls ~/projects' || lower === 'ls projects' || lower === 'ls projects/') {
      print(cmd, STATIC_COMMANDS['ls projects']);
      return;
    }

    if (lower === 'uname' || lower === 'uname -a') {
      print(cmd, STATIC_COMMANDS.uname);
      return;
    }

    if (lower.startsWith('ping')) {
      print(cmd, STATIC_COMMANDS.ping);
      return;
    }

    if (lower.startsWith('nmap')) {
      print(cmd, STATIC_COMMANDS.nmap);
      return;
    }

    const output = STATIC_COMMANDS[lower] || [
      `Command not found: ${cmd}`,
      "Type 'help' for available commands",
      '',
    ];
    print(cmd, output);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !busy) {
      setCmdHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      handleCommand(input);
      setInput('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.96, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-3xl h-[560px] terminal-window"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <div className="flex-1 flex items-center justify-center gap-2 text-muted-foreground">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">sergarsilla@portfolio:~$</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary rounded p-1 transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={terminalRef}
            className="h-[calc(100%-41px)] overflow-y-auto p-4 bg-card font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((cmd, i) => (
              <div key={i} className="mb-1.5">
                {cmd.input && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground shrink-0">$</span>
                    <span className="text-accent">{cmd.input}</span>
                  </div>
                )}
                {cmd.output.map((line, j) => (
                  <div key={j} className="text-foreground/90 whitespace-pre-wrap break-words">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-muted-foreground">{vimMode ? '--' : '$'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-accent"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HiddenTerminal;
