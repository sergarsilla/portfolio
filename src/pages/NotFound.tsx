import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background px-4">
      <div className="terminal-window w-full max-w-xl">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="text-xs font-mono ml-2 text-muted-foreground">sergarsilla@portfolio:~$</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-2">
          <p>
            <span className="text-accent">$</span> cat {location.pathname}
          </p>
          <p className="text-muted-foreground">
            cat: {location.pathname}: No such file or directory (404)
          </p>
          <p className="pt-2">
            <span className="text-accent">$</span>{" "}
            <Link to="/" className="underline underline-offset-4 hover:text-accent transition-colors">
              cd ~
            </Link>
            <span className="cursor-blink text-accent ml-1">▊</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
