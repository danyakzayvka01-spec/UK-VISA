import type { Metadata } from 'next';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Handshake,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Услуги для работы в Великобритании — UK VISA IMMIGRATION',
  description: 'Подбор вакансий в Великобритании, проверка условий, подготовка документов и поддержка кандидатов при переезде.',
};

const services = [
  { icon: BriefcaseBusiness, title: 'Подбор работы в UK', text: 'Учитываем опыт, английский, документы, желаемый график и уровень дохода.' },
  { icon: ShieldCheck, title: 'Проверка условий', text: 'Уточняем обязанности, ставку в фунтах, часы, жильё и возможные удержания.' },
  { icon: FileCheck2, title: 'Подготовка к оформлению', text: 'Помогаем собрать данные для работодателя и разобраться в требованиях вакансии.' },
  { icon: Handshake, title: 'Поддержка при переезде', text: 'Остаёмся на связи до выезда и в период адаптации в Великобритании.' },
];

const articles = [
  {
    id: 'reliable-vacancy',
    number: '01',
    icon: BadgeCheck,
    accent: 'bg-[#dce7ff] text-[#1657ff]',
    category: 'Вакансии в UK',
    title: 'Что проверить в вакансии в Великобритании',
    excerpt: 'Оплата, часы, жильё, удержания и документы, которые важно обсудить до согласия.',
    time: '4 минуты',
  },
  {
    id: 'first-conversation',
    number: '02',
    icon: MessageSquareText,
    accent: 'bg-[#dff8ec] text-[#138253]',
    category: 'Консультация',
    title: 'Что подготовить перед разговором о работе в UK',
    excerpt: 'Документы, опыт и сведения, которые помогут менеджеру оценить вашу ситуацию.',
    time: '5 минут',
  },
  {
    id: 'first-month',
    number: '03',
    icon: Route,
    accent: 'bg-[#fff0d8] text-[#b56108]',
    category: 'Переезд',
    title: 'Первые недели в Великобритании: что предусмотреть',
    excerpt: 'Дорога, жильё, связь и первые рабочие дни — короткий план без лишней суеты.',
    time: '4 минуты',
  },
];

const articleBodies = [
  {
    id: 'reliable-vacancy',
    eyebrow: 'Статья 01 · Вакансии в UK',
    title: 'Что проверить в вакансии в Великобритании',
    intro: 'Надёжное предложение начинается с понятных условий. До согласия важно проверить работодателя, оплату, рабочие часы, жильё и требования к праву на работу в Великобритании.',
    points: [
      ['Уточните ставку и часы', 'Попросите указать оплату в фунтах, количество гарантированных часов, порядок сверхурочных и периодичность выплат.'],
      ['Посчитайте удержания', 'Узнайте заранее стоимость жилья, транспорта, формы и других расходов, которые могут вычитаться из заработка.'],
      ['Проверьте жильё и дорогу', 'Если жильё предоставляет работодатель, запросите адрес, фотографии, стоимость, количество соседей и расстояние до места работы.'],
      ['Уточните право на работу', 'Работодатель должен ясно объяснить требования к документам и, если применимо, спонсорству. Решение по визе всегда принимает UK Visas and Immigration.'],
    ],
    note: 'Менеджер UK VISA IMMIGRATION помогает сравнить заявленные условия и подготовить вопросы работодателю до принятия решения.',
  },
  {
    id: 'first-conversation',
    eyebrow: 'Статья 02 · Консультация',
    title: 'Что подготовить перед разговором о работе в UK',
    intro: 'Чем точнее исходные данные, тем честнее менеджер сможет оценить доступные варианты. Подготовьте основную информацию, но не отправляйте оригиналы документов неизвестным людям.',
    points: [
      ['Страна и документы', 'Сообщите гражданство, страну проживания и текущий статус документов, связанных с поездкой или правом на работу.'],
      ['Опыт и профессия', 'Подготовьте короткий список мест работы, обязанностей, квалификаций и техники, с которой умеете работать.'],
      ['Уровень английского', 'Честно опишите, понимаете ли инструкции, можете ли отвечать на вопросы и проходить собеседование на английском.'],
      ['Сроки и ожидания', 'Укажите, когда готовы переехать, какой график рассматриваете и какая минимальная оплата после расходов для вас приемлема.'],
    ],
    note: 'На консультации мы сопоставляем ваши данные с требованиями доступных вакансий и объясняем, чего не хватает для следующего шага.',
  },
  {
    id: 'first-month',
    eyebrow: 'Статья 03 · Переезд',
    title: 'Первые недели в Великобритании: что предусмотреть',
    intro: 'Переезд проходит спокойнее, когда маршрут, жильё и первые рабочие дни продуманы заранее. Сохраните адреса и контакты, а важные договорённости держите под рукой.',
    points: [
      ['Соберите маршрут', 'Запишите адрес жилья, место работы, варианты транспорта и контакт человека, который встретит или поможет заселиться.'],
      ['Подготовьте резерв', 'Возьмите доступные средства на дорогу, питание и первые бытовые расходы до получения первой выплаты.'],
      ['Уточните рабочие правила', 'В первый день переспросите график, перерывы, требования безопасности, форму и порядок сообщения об опоздании или болезни.'],
      ['Сверяйте условия', 'Если фактическая работа, часы, жильё или удержания отличаются от обсуждённых, сразу сохраните факты и свяжитесь с менеджером.'],
    ],
    note: 'UK VISA IMMIGRATION остаётся на связи после переезда — менеджеру можно сообщить о вопросах адаптации и фактических условиях.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#101c33]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#123ed1] py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border-[70px] border-white/8" />
        <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[#79f2b0]">Работа в Великобритании</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(3rem,6vw,6.2rem)] font-black leading-[.94] tracking-[-.06em]">От первой консультации до работы в UK</h1>
            <p className="max-w-xl text-lg leading-8 text-white/72">Подбираем вакансии, разбираем требования и помогаем кандидатам подготовиться к переезду в Великобританию.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl"><p className="eyebrow">Что мы делаем</p><h2 className="section-title">Поддержка с учётом страны и документов</h2></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => { const Icon = service.icon; return <article key={service.title} className="rounded-[1.7rem] border border-[#101c33]/10 bg-white p-6"><span className="grid size-12 place-items-center rounded-2xl bg-[#e5edff] text-[#1657ff]"><Icon className="size-6" /></span><h3 className="mt-7 text-xl font-black">{service.title}</h3><p className="mt-3 leading-7 text-[#62708a]">{service.text}</p></article>; })}
        </div>
      </section>

      <section className="border-y border-[#101c33]/8 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div className="max-w-3xl"><p className="eyebrow">Полезные статьи</p><h2 className="section-title">Главное о работе и переезде в UK</h2></div><p className="max-w-sm leading-7 text-[#62708a]">Короткие практические материалы для кандидатов из шести стран.</p></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {articles.map((article) => { const Icon = article.icon; return (
              <article key={article.id} className="group flex min-h-[470px] flex-col overflow-hidden rounded-[1.8rem] border border-[#101c33]/10 bg-[#f7f6f1] transition-transform duration-300 hover:-translate-y-1">
                <div className={`relative flex min-h-52 items-center justify-center overflow-hidden ${article.accent}`}><span className="absolute left-6 top-5 text-xs font-black uppercase tracking-[.14em]">{article.category}</span><span className="absolute right-6 top-4 text-5xl font-black opacity-15">{article.number}</span><Icon className="size-20" strokeWidth={1.5} /></div>
                <div className="flex flex-1 flex-col p-6"><div className="flex items-center gap-2 text-sm text-[#62708a]"><Clock3 className="size-4" /><span>Время чтения: {article.time}</span></div><h3 className="mt-5 text-2xl font-black leading-tight tracking-[-.025em]">{article.title}</h3><p className="mt-4 leading-7 text-[#62708a]">{article.excerpt}</p><a href={`#${article.id}`} className="mt-auto flex items-center justify-between border-t border-[#101c33]/10 pt-5 font-black text-[#1657ff]">Читать статью <ArrowDownRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a></div>
              </article>
            ); })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1050px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="space-y-24">
          {articleBodies.map((article, articleIndex) => (
            <article id={article.id} key={article.id} className="scroll-mt-28">
              <p className="eyebrow">{article.eyebrow}</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-.045em] md:text-6xl">{article.title}</h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#62708a]">{article.intro}</p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {article.points.map(([title, text], index) => <section key={title} className="rounded-[1.5rem] border border-[#101c33]/10 bg-white p-6"><span className="text-sm font-black text-[#1657ff]">{articleIndex + 1}.{index + 1}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-[#62708a]">{text}</p></section>)}
              </div>
              <div className="mt-5 flex gap-4 rounded-[1.5rem] bg-[#101c33] p-6 text-white md:p-8"><Sparkles className="mt-1 size-6 shrink-0 text-[#79f2b0]" /><p className="leading-7 text-white/78">{article.note}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#101c33] py-20 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between lg:px-8"><div><UserRoundCheck className="size-8 text-[#79f2b0]" /><h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-.045em]">Хотите обсудить работу в Великобритании?</h2><p className="mt-3 text-white/60">Выберите подходящего менеджера и напишите ему напрямую в WhatsApp.</p></div><a className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-[#79f2b0] px-7 text-base font-black text-[#0d2a22] transition-colors hover:bg-white" href="/consultation">Выбрать менеджера <ArrowRight className="ml-2 size-5" /></a></div>
      </section>

      <footer className="bg-[#091427] py-10 text-white/55"><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-9 place-items-center rounded-full bg-[#1657ff]"><CheckCircle2 className="size-4" /></span><span className="font-black uppercase tracking-[.04em]">UK VISA IMMIGRATION</span></div><p>© 2026. Независимое агентство по трудоустройству в Великобритании.</p><a href="/" className="hover:text-white">На главную</a></div></footer>
    </main>
  );
}
