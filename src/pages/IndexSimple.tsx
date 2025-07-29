import { useState, useEffect } from "react";

const IndexSimple = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-foreground">
          Test Page - Portfolio Working
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          If you can see this, the basic setup is working.
        </p>
      </div>
    </div>
  );
};

export default IndexSimple;