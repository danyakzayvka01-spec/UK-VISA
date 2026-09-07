import type { Metadata } from 'next';
import Image from 'next/image';
import { BriefcaseBusiness, CheckCircle2, MessageCircle } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { getWhatsAppUrl, managers } from '@/lib/managers';

export const metadata: Metadata = {
  title: 'Консультация — UK VISA IMMIGRATION',
  description: 'Выберите персонального менеджера для консультации о вакансиях и трудоустройстве в Великобритании.',
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#101c33]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#123ed1] py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-[1240px] px-5 text-center lg:px-8">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[#79f2b0]">Консультация</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-black leading-[.94] tracking-[-.06em]">Выберите персонального менеджера</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/72">Менеджер уточнит опыт, английский и документы, а затем объяснит возможные шаги для трудоустройства в Великобритании.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div><p className="eyebrow">Ваша команда поддержки</p><h2 className="section-title">Наши менеджеры</h2></div>
          <p className="max-w-md leading-7 text-[#62708a]">Пять менеджеров готовы ответить на вопросы и помочь разобраться с дальнейшими шагами.</p>
        </div>

        <div className="mx-auto mt-12 flex flex-wrap justify-center gap-6">
          {managers.map((manager) => (
            <article key={manager.name} className="relative min-h-[540px] w-full max-w-[390px] overflow-hidden rounded-[1.7rem] border border-[#101c33]/10 shadow-xl shadow-[#14306a]/8 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <Image src={manager.image} alt={`Менеджер ${manager.name}`} fill sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: manager.imagePosition }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#79f2b0]">Менеджер</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.03em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.55)]">{manager.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">Консультация по вакансиям и подготовке к трудоустройству в Великобритании.</p>
                <a href={getWhatsAppUrl(manager.whatsapp)} target="_blank" rel="noreferrer" aria-label={`Открыть WhatsApp менеджера ${manager.name}`} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 text-sm font-black text-white backdrop-blur transition-colors hover:bg-[#20b965]"><MessageCircle className="size-4" /> WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-[#091427] py-10 text-white/55"><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-9 place-items-center rounded-full bg-[#1657ff]"><CheckCircle2 className="size-4" /></span><span className="font-black uppercase tracking-[.04em]">UK VISA IMMIGRATION</span></div><p>© 2026. Независимое агентство по трудоустройству в Великобритании.</p><a href="/" className="hover:text-white"><BriefcaseBusiness className="mr-2 inline size-4" />На главную</a></div></footer>
    </main>
  );
}
