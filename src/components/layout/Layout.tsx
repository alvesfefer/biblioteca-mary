import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-reading-room min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-gold/15 bg-espresso/80 backdrop-blur-md">
          <div className="flex items-center gap-4 px-5 py-3.5 sm:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-[4px] border-gilded/40 text-gold-light transition-colors hover:bg-gold/10 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search
                size={15}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
              />
              <input
                type="text"
                placeholder="Pesquisar na biblioteca..."
                className="w-full rounded-[4px] border-gilded/30 bg-black/20 py-2 pl-10 pr-4 font-serif-body text-sm text-parchment-light placeholder:text-aged-beige/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
              />
            </div>

            <div className="ml-auto hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="font-serif-body text-sm text-parchment-light">
                  Bibliotecária
                </p>
                <p className="font-sans-quiet text-[10px] uppercase tracking-[0.2em] text-gold/60">
                  Administração
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-gilded/50 bg-wood/40 text-gold-light font-serif-display text-sm">
                B
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-5 py-8 sm:px-8 sm:py-10">{children}</main>

        {/* Footer */}
        <footer className="px-5 pb-8 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex items-center gap-3 text-gold/40">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-xs">❦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
            <p className="text-center font-sans-quiet text-[10px] uppercase tracking-[0.3em] text-aged-beige/40">
              Bibliotheca · Sistema de Gestão · MMXXVI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
