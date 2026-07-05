import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HiddenTerminal from "./components/HiddenTerminal";
import KonamiCode from "./components/KonamiCode";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => (
  <>
    <HiddenTerminal />
    <KonamiCode />
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
    <SpeedInsights />
  </>
);

export default App;
