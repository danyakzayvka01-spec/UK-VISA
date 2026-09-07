import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, HeartHandshake, ShieldCheck, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'О нас — UK VISA IMMIGRATION',
  description: 'Как UK VISA IMMIGRATION помогает кандидатам из шести стран подготовиться к трудоустройству и переезду в Великобританию.',
};

const values = [
  { title: 'Прозрачность', text: 'Заранее объясняем оплату в фунтах, график, жильё, удержания и требования к документам.', icon: BadgeCheck },
  { title: 'Уважение к кандидату', text: 'Учитываем страну, опыт, английский и семейную ситуацию без шаблонных обещаний.', icon: HeartHandshake },
  { title: 'Ответственная подготовка', text: 'Проверяем информацию о вакансии и помогаем подготовиться к разговору с работодателем.', icon: ShieldCheck },
  { title: 'Поддержка при переезде', text: 'Остаёмся на связи до выезда и во время первых шагов в Великобритании.', icon: UsersRound },
];

const differences = [
  ['Фокус на Великобритании', 'Подбираем варианты именно для работы в UK и объясняем местные условия понятным языком.'],
  ['Шесть направлений поддержки', 'Работаем с кандидатами из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана.'],
  ['Персональный менеджер', 'Один специалист ведёт кандидата от первой консультации до начала работы и адаптации.'],
  ['Честная оценка ситуации', 'Не гарантируем визу или вакансию: сначала проверяем документы и соответствие требованиям работодателя.'],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#101c33]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#123ed1] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[#79f2b0]">О компании</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,7vw,6.8rem)] font-black leading-[.92] tracking-[-.06em]">Помогаем подготовиться к работе и жизни в Великобритании.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72">UK VISA IMMIGRATION сопровождает кандидатов из шести стран: от первой оценки ситуации и подбора вакансии до подготовки к переезду.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow">Наша миссия</p>
          <h2 className="section-title">Сделать путь в UK понятным и ответственным</h2>
          <p className="mt-6 text-lg leading-8 text-[#62708a]">Мы помогаем сравнить вакансии, проверить основные условия, подготовиться к собеседованию и понять, какие данные потребуются работодателю. Кандидат получает ясный план и менеджера, которому можно задать вопрос.</p>
          <p className="mt-4 text-lg leading-8 text-[#62708a]">Иммиграционные решения принимает UK Visas and Immigration. Наша задача — не обещать невозможного, а помочь кандидату подготовиться и принять обоснованное решение.</p>
        </div>
        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#dfe5ef]">
          <Image src="/recruitment-consultation.png" alt="Консультант UK VISA IMMIGRATION обсуждает подготовку к работе в Великобритании" fill className="object-cover object-[62%_center]" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/94 p-5 shadow-xl backdrop-blur"><p className="font-black">Работаем на стороне кандидата</p><p className="mt-1 text-sm text-[#62708a]">Честно говорим о плюсах, сложностях и следующих шагах.</p></div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="max-w-3xl"><p className="eyebrow">Наши ценности</p><h2 className="section-title">Принципы, на которых держится наша работа</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {values.map((value) => { const Icon = value.icon; return <article key={value.title} className="rounded-[1.7rem] border border-[#101c33]/10 bg-[#f7f6f1] p-7"><span className="grid size-12 place-items-center rounded-2xl bg-[#e5edff] text-[#1657ff]"><Icon className="size-6" /></span><h3 className="mt-8 text-2xl font-black">{value.title}</h3><p className="mt-3 leading-7 text-[#62708a]">{value.text}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="eyebrow">Чем мы отличаемся</p><h2 className="section-title">Сервис, который доводит до результата</h2></div>
          <div className="divide-y divide-[#101c33]/12 border-y border-[#101c33]/12">
            {differences.map(([title, text], index) => <article key={title} className="grid gap-3 py-7 sm:grid-cols-[64px_1fr]"><span className="text-sm font-black text-[#1657ff]">0{index + 1}</span><div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-[#62708a]">{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#101c33] py-16 text-white">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 px-5 md:grid-cols-4 lg:px-8">
          {[["UK", "направление работы"], ["6 стран", "поддержки кандидатов"], ["1 менеджер", "на весь ваш путь"], ["Честно", "без гарантии визы"]].map(([value, label]) => <div key={label}><p className="text-4xl font-black tracking-[-.04em] text-[#79f2b0]">{value}</p><p className="mt-2 text-sm text-white/55">{label}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8">
        <div className="flex flex-col gap-8 rounded-[2rem] bg-[#123ed1] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div><CheckCircle2 className="size-8 text-[#79f2b0]" /><h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-.045em]">Рассматриваете работу в Великобритании?</h2><p className="mt-3 text-white/65">Выберите менеджера и напишите ему напрямую в WhatsApp.</p></div>
          <Button nativeButton={false} className="h-14 shrink-0 rounded-full bg-[#79f2b0] px-7 text-base font-black text-[#0d2a22] hover:bg-white" render={<a href="/consultation" />}>Выбрать менеджера <ArrowRight className="ml-1 size-5" /></Button>
        </div>
      </section>

      <footer className="bg-[#091427] py-10 text-white/55"><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-9 place-items-center rounded-full bg-[#1657ff]"><BriefcaseBusiness className="size-4" /></span><span className="font-black uppercase tracking-[.04em]">UK VISA IMMIGRATION</span></div><p>© 2026. Независимое агентство по трудоустройству в Великобритании.</p><a href="/" className="hover:text-white">На главную</a></div></footer>
    </main>
  );
}
