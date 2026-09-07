const links = [
  ['Главная', '/'],
  ['О нас', '/about'],
  ['Услуги', '/services'],
  ['FAQ', '/faq'],
  ['Консультация', '/consultation'],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#123ed1] bg-[#f3f3f1]/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] max-w-[1380px] items-center justify-between gap-3 px-5 py-3 lg:gap-5 lg:px-8">
        <a href="/" className="shrink-0" aria-label="UK Visa Immigration — на главную">
          <span className="whitespace-nowrap text-[15px] font-black uppercase tracking-[-0.025em] text-[#111827] sm:text-xl">UK VISA IMMIGRATION</span>
        </a>
        <nav className="hidden items-center gap-5 text-[13px] font-bold lg:flex xl:gap-7 xl:text-sm" aria-label="Основная навигация">
          {links.map(([label, href]) => <a key={label} className="whitespace-nowrap transition-colors hover:text-[#1657ff]" href={href}>{label}</a>)}
        </nav>
        <a className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#101c33] px-4 text-sm font-bold text-white transition-colors hover:bg-[#1657ff] sm:px-5" href="/consultation">Работа в UK</a>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-[#102348]/8 px-5 py-3 text-sm font-bold lg:hidden" aria-label="Мобильная навигация">
        {links.map(([label, href]) => <a key={label} className="shrink-0 whitespace-nowrap" href={href}>{label}</a>)}
      </nav>
    </header>
  );
}
