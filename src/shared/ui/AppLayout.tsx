import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "./navigation";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AppLayout({ children }: {children: React.ReactNode;}) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Shield className="w-6 h-6" />
            <span className="font-mono">​PayMix </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path ?
              "text-primary bg-primary/10" :
              "text-muted-foreground hover:text-foreground hover:bg-secondary"}`
              }>
              
                {item.label}
              </Link>
            )}
          </nav>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}>
            
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen &&
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden">
            
              <div className="container py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) =>
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path ?
                "text-primary bg-primary/10" :
                "text-muted-foreground hover:text-foreground hover:bg-secondary"}`
                }>
                
                    {item.label}
                  </Link>
              )}
              </div>
            </motion.nav>
          }
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-mono">MixVault © {new Date().getFullYear()} — Privacy is a right.</p>
        </div>
      </footer>
    </div>);

}