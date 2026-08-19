import { NavLink } from 'react-router-dom';
import {
  BookHeart,
  BookMarked,
  BookOpen,
  Home,
  Library,
  Settings,
  Users,
  UserCheck,
  X,
} from 'lucide-react';
import { Crest } from '@/components/ornaments/Ornaments';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', label: 'Início', icon: Home, exact: true },
  { to: '/biblioteca', label: 'Biblioteca', icon: Library },
  { to: '/livros', label: 'Livros', icon: BookMarked },
  { to: '/autores', label: 'Autores', icon: BookOpen },
  { to: '/usuarios', label: 'Usuários', icon: Users },
  { to: '/emprestimos', label: 'Empréstimos', icon: UserCheck },
  { to: '/favoritos', label: 'Favoritos', icon: BookHeart },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`bg-wood-panel fixed inset-y-0 left-0 z-40 flex w-72 flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* gilded right edge */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <div className="absolute inset-y-0 right-px w-px bg-gradient-to-b from-transparent via-black/40 to-transparent" />

        {/* Brand */}
        <div className="relative px-6 pb-6 pt-7">
          <button
            onClick={onClose}
            className="absolute right-4 top-5 text-gold/60 transition-colors hover:text-gold lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-3">
            <div className="animate-soft-glow text-gold">
              <Crest size={34} />
            </div>
            <div>
              <h1 className="font-serif-display text-2xl font-semibold leading-none text-parchment-light">
                Bibliotheca
              </h1>
              <p className="mt-1 font-sans-quiet text-[9px] uppercase tracking-[0.35em] text-gold/60">
                Est. MDCCCXLII
              </p>
            </div>
          </div>
          {/* ornamental underline */}
          <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.exact}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `nav-glow group flex items-center gap-3 rounded-[5px] px-3 py-2.5 font-serif-body text-[15px] transition-colors duration-300 ${
                        isActive
                          ? 'bg-black/25 text-gold-light'
                          : 'text-aged-beige/80 hover:text-parchment-light'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-[3px] border transition-all duration-300 ${
                            isActive
                              ? 'border-gold/50 bg-gold/10 text-gold-light'
                              : 'border-transparent text-gold/55 group-hover:border-gold/30 group-hover:text-gold-light'
                          }`}
                        >
                          <Icon size={15} strokeWidth={1.4} />
                        </span>
                        <span className="tracking-wide">{item.label}</span>
                        {isActive && (
                          <span className="ml-auto h-1 w-1 rounded-full bg-gold animate-soft-glow" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer plaque */}
        <div className="px-5 pb-6 pt-4">
          <div className="rounded-[4px] border-gilded/50 bg-black/25 px-4 py-3 text-center">
            <p className="font-serif-body text-xs italic text-aged-beige/60">
              "A leitura é uma conversa
              <br />
              com os maiores espíritos."
            </p>
            <p className="mt-1.5 font-sans-quiet text-[9px] uppercase tracking-[0.25em] text-gold/40">
              — René Descartes
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
