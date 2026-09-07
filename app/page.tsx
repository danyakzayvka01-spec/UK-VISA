import Image from 'next/image';
import {
  ArrowRight, BadgeCheck, BriefcaseBusiness, CheckCircle2,
  ClipboardCheck, FileCheck2, Globe2, Headphones, Heart, MapPin,
  MessageCircle, Search, ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { ReviewsCarousel } from '@/components/reviews-carousel';
import { SiteHeader } from '@/components/site-header';
import { getWhatsAppUrl, managers } from '@/lib/managers';

const steps = [
  { n: '01', title: 'Знакомимся', text: 'Уточняем гражданство, опыт, знание английского и готовность к переезду.', icon: UsersRound },
  { n: '02', title: 'Подбираем', text: 'Показываем подходящие вакансии в Великобритании и подробно разбираем условия.', icon: Search },
  { n: '03', title: 'Готовим', text: 'Помогаем подготовиться к собеседованию и собрать данные для оформления.', icon: ClipboardCheck },
  { n: '04', title: 'Сопровождаем', text: 'Остаёмся на связи во время переезда и после начала работы.', icon: Headphones },
];

const services = [
  { title: 'Вакансии в UK', text: 'Предложения под ваш опыт, английский, график и желаемый доход.', icon: BriefcaseBusiness },
  { title: 'Проверка условий', text: 'Разбираем работодателя, оплату в фунтах, график, жильё и возможные удержания.', icon: ShieldCheck },
  { title: 'Подготовка документов', text: 'Объясняем, какие данные понадобятся для работодателя и выбранного маршрута.', icon: FileCheck2 },
  { title: 'Поддержка при переезде', text: 'Личный менеджер отвечает на вопросы до выезда и после начала работы.', icon: Headphones },
];

const countries = ['Беларусь', 'Россия', 'Украина', 'Кыргызстан', 'Узбекистан', 'Таджикистан'];

const faqs = [
  ['Кандидатам из каких стран вы помогаете?', 'Мы работаем с кандидатами из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана. Возможность оформления зависит от документов и конкретной вакансии.'],
  ['Вы гарантируете визу в Великобританию?', 'Нет. Мы помогаем разобраться с требованиями вакансии и подготовкой данных, но решение о визе принимает UK Visas and Immigration.'],
  ['Можно обратиться без опыта и английского?', 'Да, можно начать с консультации. Менеджер оценит вашу ситуацию и честно объяснит, какие направления доступны и что стоит подготовить.'],
  ['Бывают ли вакансии с проживанием?', 'Для части предложений работодатель или партнёр помогает с жильём. Стоимость, адрес и условия проживания обсуждаются до согласия кандидата.'],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f6f1] text-[#101c33]">
      <SiteHeader />

      <section id="top" className="relative bg-[#123ed1] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"><ShieldCheck className="size-4 text-[#79f2b0]" /> Трудоустройство в Великобритании</div>
            <h1 className="max-w-[720px] text-[clamp(3rem,6.2vw,5.9rem)] font-black leading-[.92] tracking-[-.055em]">Ваша работа в <span className="text-[#79f2b0]">Великобритании.</span></h1>
            <p className="mt-7 max-w-[620px] text-lg leading-8 text-white/78">Подбираем вакансии и сопровождаем кандидатов из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/consultation" className="inline-flex h-14 items-center justify-center rounded-full bg-[#79f2b0] px-7 text-base font-bold text-[#0d2a22] transition-colors hover:bg-white">Выбрать менеджера <ArrowRight className="ml-2 size-5" /></a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#79f2b0]" /> Условия объясняем заранее</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#79f2b0]" /> Поддержка до и после переезда</span>
            </div>
          </div>
          <div className="relative lg:pl-5">
            <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#d9e1ec] shadow-2xl shadow-[#071a70]/35">
              <Image src="/recruitment-consultation.png" alt="Менеджер обсуждает с кандидатом трудоустройство в Великобритании" fill priority className="object-cover object-[62%_center]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081a46]/90 to-transparent p-7 pt-28">
                <p className="text-sm font-bold uppercase tracking-[.14em] text-[#79f2b0]">Личный менеджер</p>
                <p className="mt-2 max-w-sm text-2xl font-bold leading-tight">Один специалист ведёт вас от заявки до начала работы в UK</p>
              </div>
            </div>
            <div className="absolute -left-3 top-8 rounded-2xl bg-white p-4 text-[#101c33] shadow-xl lg:-left-8"><p className="text-3xl font-black">6 стран</p><p className="text-xs font-semibold text-[#62708a]">поддержки кандидатов</p></div>
            <div className="absolute -bottom-5 right-3 rounded-2xl bg-[#79f2b0] p-4 text-[#0d2a22] shadow-xl lg:-right-5"><MapPin className="mb-2 size-5" /><p className="text-sm font-bold">Работа в Великобритании</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#101c33]/10 bg-white">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-[#101c33]/10 px-5 py-7 md:grid-cols-4 lg:px-8">
          {[["UK", "главное направление"], ["6 стран", "работы с кандидатами"], ["1 менеджер", "ведёт вашу заявку"], ["Пошагово", "объясняем процесс"]].map(([value, label]) => <div key={label} className="px-4 py-3 text-center"><p className="text-3xl font-black tracking-[-.04em] text-[#1657ff]">{value}</p><p className="mt-1 text-xs font-semibold text-[#62708a]">{label}</p></div>)}
        </div>
      </section>

      <section id="process" className="bg-[#101c33] py-24 text-white">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="eyebrow text-[#79f2b0]">Понятный маршрут</p><h2 className="section-title text-white">От заявки<br />до работы в UK</h2></div><p className="max-w-xl text-lg leading-8 text-white/60">Ваш менеджер учитывает страну, документы и опыт, а затем объясняет каждый следующий шаг простым языком.</p></div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => { const Icon = step.icon; return <article key={step.n} className="relative min-h-[310px] bg-[#101c33] p-6"><span className="absolute right-5 top-4 text-5xl font-black text-white/8">{step.n}</span><Icon className="size-8 text-[#79f2b0]" /><h3 className="mt-24 text-2xl font-black">{step.title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{step.text}</p></article>; })}
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start"><p className="eyebrow">Наша поддержка</p><h2 className="section-title">Не просто вакансия. Подготовка к переезду.</h2><p className="mt-5 max-w-md leading-7 text-[#62708a]">Помогаем разобраться в условиях работы в Великобритании и не принимать решения вслепую.</p><div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#dff8ea] px-4 py-2 text-sm font-bold text-[#176b45]"><BadgeCheck className="size-4" /> Без обещаний гарантированной визы</div></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className={`rounded-[1.7rem] border border-[#101c33]/10 p-6 ${index === 0 ? 'bg-[#1657ff] text-white' : 'bg-white'}`}><Icon className={`size-7 ${index === 0 ? 'text-[#79f2b0]' : 'text-[#1657ff]'}`} /><h3 className="mt-12 text-2xl font-black tracking-[-.035em]">{service.title}</h3><p className={`mt-3 text-sm leading-6 ${index === 0 ? 'text-white/70' : 'text-[#62708a]'}`}>{service.text}</p></article>; })}
        </div>
      </section>

      <section id="consultants" className="scroll-mt-20 bg-[#e7ebf4] py-24 text-[#101c33]">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <div className="text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full border border-[#1657ff]/15 bg-white shadow-sm"><Heart className="size-5 text-[#1657ff]" /></span>
            <p className="mt-5 text-sm font-black uppercase tracking-[.18em] text-[#1657ff]">Ваши менеджеры</p>
            <h2 className="section-title mx-auto max-w-3xl">Лучшие менеджеры этого месяца</h2>
          </div>
          <div className="mx-auto mt-14 flex flex-wrap justify-center gap-6">
            {managers.map((manager) => <article key={manager.name} className="relative min-h-[520px] w-full max-w-[390px] overflow-hidden rounded-[1.6rem] border border-white/15 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <Image src={manager.image} alt={`Менеджер ${manager.name}`} fill sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: manager.imagePosition }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#79f2b0]">Менеджер</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.55)]">{manager.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">Напишите менеджеру напрямую в WhatsApp</p>
                <a href={getWhatsAppUrl(manager.whatsapp)} target="_blank" rel="noreferrer" aria-label={`Открыть WhatsApp менеджера ${manager.name}`} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-sm font-black text-white backdrop-blur transition hover:border-[#20b965] hover:bg-[#20b965]"><MessageCircle className="size-4" /> WhatsApp</a>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-[#fff0cf] p-8 md:grid-cols-[.7fr_1.3fr] md:p-12">
          <div><Globe2 className="size-10 text-[#1657ff]" /><p className="mt-8 text-sm font-black uppercase tracking-[.16em] text-[#1657ff]">Кому мы помогаем</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em]">Шесть стран — одно направление</h2></div>
          <div><p className="text-xl font-bold leading-8">Консультации для кандидатов, которые рассматривают легальную работу и переезд в Великобританию.</p><div className="mt-7 flex flex-wrap gap-3">{countries.map((country) => <span key={country} className="rounded-full bg-white px-5 py-3 text-sm font-black shadow-sm">{country}</span>)}</div><p className="mt-7 text-sm leading-6 text-[#6f654e]">Доступность вакансии и возможность оформления оцениваются индивидуально по документам кандидата и требованиям работодателя.</p></div>
        </div>
      </section>

      <ReviewsCarousel />

      <section className="border-y border-[#101c33]/10 bg-white py-24">
        <div className="mx-auto grid max-w-[1020px] gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><p className="eyebrow">Вопросы и ответы</p><h2 className="section-title">Коротко о главном</h2></div><div className="divide-y divide-[#101c33]/10">{faqs.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-black">{q}<span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e9efff] text-[#1657ff] transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pr-12 pt-4 leading-7 text-[#62708a]">{a}</p></details>)}</div></div>
      </section>

      <footer className="bg-[#091427] py-10 text-white/55">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-9 place-items-center rounded-full bg-[#1657ff]"><BriefcaseBusiness className="size-4" /></span><span className="font-black uppercase tracking-[.04em]">UK VISA IMMIGRATION</span></div><p>© 2026. Независимое агентство по трудоустройству в Великобритании.</p><div className="flex gap-5"><a href="#top" className="hover:text-white">Наверх</a><a href="#consultants" className="hover:text-white">Менеджеры</a></div></div>
      </footer>
    </main>
  );
}
