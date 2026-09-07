import type { Metadata } from 'next';
import { ArrowRight, BriefcaseBusiness, CircleHelp, MessageCircleQuestion } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'FAQ — UK VISA IMMIGRATION',
  description: 'Ответы на частые вопросы о вакансиях, документах и трудоустройстве в Великобритании для кандидатов из шести стран.',
};

const questions = [
  ['С кандидатами из каких стран вы работаете?', 'Мы консультируем кандидатов из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана, которые рассматривают легальную работу в Великобритании.'],
  ['Вы гарантируете вакансию или рабочую визу?', 'Нет. Доступность вакансии зависит от опыта, английского, документов и требований работодателя. Решение по визе принимает UK Visas and Immigration, а не агентство.'],
  ['Как начинается подбор работы в UK?', 'Вы выбираете менеджера и пишете ему в WhatsApp об опыте, английском и документах. Менеджер оценивает ситуацию и объясняет, какие варианты и следующие шаги реалистичны.'],
  ['Какие документы понадобятся?', 'Список зависит от гражданства, текущего статуса, профессии и работодателя. На первой консультации достаточно описать ситуацию; не отправляйте оригиналы документов незнакомым людям.'],
  ['Нужно ли знать английский язык?', 'Требования отличаются. Для одних позиций достаточно понимать инструкции, для других нужен разговорный английский. Менеджер уточнит уровень до подбора предложения.'],
  ['Сколько стоят услуги?', 'Условия и стоимость каждой услуги должны быть объяснены до начала работы. На этом этапе сайта цены не опубликованы — их добавим после утверждения компанией.'],
  ['Есть ли вакансии с жильём и транспортом?', 'Такие предложения возможны, но не гарантируются. До согласия важно получить адрес, стоимость, условия проживания и понять, как добираться до работы.'],
  ['Можно ли обратиться без опыта?', 'Да. Расскажите, какую работу готовы выполнять и какие навыки у вас есть. Менеджер проверит, существуют ли подходящие стартовые позиции с учётом документов и английского.'],
  ['Сколько занимает трудоустройство?', 'Единого срока нет: он зависит от вакансии, собеседования, документов, решения работодателя и, если требуется, визового процесса. Мы не обещаем искусственно коротких сроков.'],
  ['Остаётся ли менеджер на связи после переезда?', 'Да. Вы сможете сообщить о вопросах по заселению, графику и фактическим условиям работы, чтобы вместе определить следующий шаг.'],
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#101c33]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#123ed1] py-20 text-white lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[.18em] text-[#79f2b0]">Вопросы и ответы</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(3.2rem,6vw,6.2rem)] font-black leading-[.94] tracking-[-.06em]">Главное о работе в Великобритании</h1>
            <p className="max-w-xl text-lg leading-8 text-white/72">Ответы для кандидатов из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-8 lg:py-24">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <span className="grid size-14 place-items-center rounded-2xl bg-[#dce7ff] text-[#1657ff]"><CircleHelp className="size-7" /></span>
          <h2 className="mt-7 text-4xl font-black tracking-[-.045em]">Коротко и понятно</h2>
          <p className="mt-4 max-w-sm leading-7 text-[#62708a]">Нажмите на вопрос, чтобы открыть ответ. Каждая ситуация зависит от страны, документов и требований конкретного работодателя.</p>
          <a href="/consultation" className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#101c33] px-6 font-black text-white transition-colors hover:bg-[#1657ff]">Выбрать менеджера <ArrowRight className="ml-2 size-5" /></a>
        </aside>

        <div className="space-y-3">
          {questions.map(([question, answer], index) => (
            <details key={question} className="group rounded-[1.4rem] border border-[#101c33]/10 bg-white open:border-[#1657ff]/35 open:shadow-lg open:shadow-[#14306a]/8">
              <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-6 text-lg font-black marker:content-none md:px-7">
                <span className="text-sm text-[#1657ff]">{String(index + 1).padStart(2, '0')}</span>
                <span className="flex-1">{question}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef2f9] text-xl font-medium transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-[#101c33]/8 px-6 pb-7 pt-5 leading-7 text-[#62708a] md:px-[4.6rem]">{answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#101c33] py-20 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><MessageCircleQuestion className="size-8 text-[#79f2b0]" /><h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-.045em]">Не нашли нужный ответ?</h2><p className="mt-3 text-white/60">Напишите подходящему менеджеру напрямую в WhatsApp.</p></div>
          <a href="/consultation" className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-[#79f2b0] px-7 text-base font-black text-[#0d2a22] transition-colors hover:bg-white">Связаться с менеджером <ArrowRight className="ml-2 size-5" /></a>
        </div>
      </section>

      <footer className="bg-[#091427] py-10 text-white/55"><div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 text-sm md:flex-row md:items-center md:justify-between lg:px-8"><div className="flex items-center gap-3 text-white"><span className="grid size-9 place-items-center rounded-full bg-[#1657ff]"><BriefcaseBusiness className="size-4" /></span><span className="font-black uppercase tracking-[.04em]">UK VISA IMMIGRATION</span></div><p>© 2026. Независимое агентство по трудоустройству в Великобритании.</p><a href="/" className="hover:text-white">На главную</a></div></footer>
    </main>
  );
}
