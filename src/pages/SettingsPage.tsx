import { useState } from 'react';
import { Bell, BookOpen, Globe2, Moon, Palette, Save } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { OrnamentDivider } from '@/components/ornaments/Ornaments';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [lateAlerts, setLateAlerts] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Preferências"
        title="Configurações"
        subtitle="Ajuste a experiência da sua biblioteca digital."
      />

      <div className="space-y-6">
        <Section
          icon={Bell}
          title="Notificações"
          desc="Avisos sobre empréstimos, devoluções e novidades."
        >
          <Toggle
            label="Notificações por e-mail"
            checked={notifications}
            onChange={setNotifications}
          />
          <Toggle
            label="Alertas de devolução atrasada"
            checked={lateAlerts}
            onChange={setLateAlerts}
          />
        </Section>

        <Section
          icon={Moon}
          title="Aparência"
          desc="Iluminação e ambiente de leitura."
        >
          <Toggle
            label="Modo noturno (sala de leitura à luz de lâmpada)"
            checked={nightMode}
            onChange={setNightMode}
          />
        </Section>

        <Section
          icon={Globe2}
          title="Idioma"
          desc="Idioma da interface e dos catálogos."
        >
          <label className="block">
            <span className="font-sans-quiet text-[10px] uppercase tracking-[0.22em] text-gold-deep/60">
              Idioma
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-2 w-full rounded-[3px] border border-gold/30 bg-espresso px-4 py-2.5 font-serif-body text-sm text-parchment-light focus:border-gold/60 focus:outline-none"
            >
              <option value="pt-BR" className="bg-espresso">Português (Brasil)</option>
              <option value="pt-PT" className="bg-espresso">Português (Portugal)</option>
              <option value="en" className="bg-espresso">English</option>
              <option value="fr" className="bg-espresso">Français</option>
            </select>
          </label>
        </Section>

        <Section
          icon={Palette}
          title="Acabamento"
          desc="Detalhes visuais da biblioteca."
        >
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Pergaminho', colors: ['#ece0c4', '#b08d4f', '#5e2a2f'] },
              { name: 'Madeira', colors: ['#3a281c', '#6b4f39', '#c9a96a'] },
              { name: 'Vinho', colors: ['#2a1d14', '#5e2a2f', '#d9bd83'] },
            ].map((theme, i) => (
              <div
                key={theme.name}
                className={`rounded-[4px] border p-3 transition-all duration-300 ${
                  i === 0
                    ? 'border-gold/60 bg-gold/10'
                    : 'border-gold/20 hover:border-gold/40'
                }`}
              >
                <div className="flex gap-1.5">
                  {theme.colors.map((c) => (
                    <span
                      key={c}
                      className="h-5 w-5 rounded-full border border-black/30"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <p className="mt-2 font-serif-body text-xs text-ink-soft">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <div className="flex justify-center">
          <OrnamentDivider />
        </div>

        <div className="flex justify-end gap-3">
          <button className="rounded-[4px] border border-gold/30 px-5 py-2.5 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:border-gold/50">
            Cancelar
          </button>
          <button className="group inline-flex items-center gap-2 rounded-[4px] border-gilded-strong bg-gold/15 px-5 py-2.5 font-sans-quiet text-[11px] uppercase tracking-[0.2em] text-gold-deep transition-all duration-300 hover:bg-gold/25 hover:shadow-[0_0_24px_-4px_rgba(176,141,79,0.5)]">
            <Save size={13} strokeWidth={1.5} />
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof Bell;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-parchment-paper rounded-[4px] border-gilded p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] border-gilded bg-wood/10 text-gold-deep">
          <Icon size={16} strokeWidth={1.4} />
        </div>
        <div className="mb-4">
          <h3 className="font-serif-display text-lg text-ink">{title}</h3>
          <p className="font-serif-body text-sm italic text-ink-soft/65">
            {desc}
          </p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span className="font-serif-body text-sm text-ink-soft">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-all duration-300 ${
          checked
            ? 'border-gold/60 bg-gold/30'
            : 'border-gold/25 bg-wood/20'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full transition-all duration-300 ${
            checked
              ? 'left-[22px] bg-gold-light shadow-[0_0_8px_rgba(201,169,106,0.6)]'
              : 'left-0.5 bg-aged-beige/70'
          }`}
        />
      </button>
    </label>
  );
}
