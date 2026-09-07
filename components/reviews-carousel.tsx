'use client';

import { Quote, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const reviews = [
  {
    name: 'Анна',
    text: 'Менеджер спокойно объяснил порядок действий и помог подготовить вопросы по вакансии. Особенно понравилось, что условия разобрали заранее и без спешки.',
  },
  {
    name: 'Максим',
    text: 'Получил понятный список следующих шагов и документов. На каждом этапе можно было задать вопрос и быстро получить простой ответ.',
  },
  {
    name: 'Ольга',
    text: 'Мне помогли сравнить график, оплату и условия проживания. Благодаря консультации я лучше поняла, на что обращать внимание перед решением.',
  },
  {
    name: 'Бекзат',
    text: 'Всё объясняли поэтапно и понятным языком. Менеджер учёл мой опыт и подсказал, как подготовиться к разговору с работодателем.',
  },
  {
    name: 'Дилшод',
    text: 'Понравилось внимательное отношение и честное обсуждение требований. Я заранее узнал о графике, обязанностях и возможных расходах.',
  },
  {
    name: 'Фирдавс',
    text: 'Консультант помог собрать информацию и ничего не обещал вслепую. Было удобно, что один менеджер оставался на связи по всем вопросам.',
  },
  {
    name: 'Ирина',
    text: 'Получила подробную консультацию по вакансии и подготовке к переезду. Ответы были конкретными, а общение — доброжелательным.',
  },
  {
    name: 'Артём',
    text: 'Со мной разобрали требования работодателя и помогли подготовить короткий рассказ об опыте. Теперь процесс выглядит намного понятнее.',
  },
  {
    name: 'Мадина',
    text: 'Менеджер внимательно выслушал мои пожелания по графику и подробно рассказал о дальнейших шагах. Общаться было легко и спокойно.',
  },
  {
    name: 'Рустам',
    text: 'Хорошая организация консультации: сначала уточнили опыт, потом объяснили условия и только после этого предложили подходящий порядок действий.',
  },
];

const ratingStars = [1, 2, 3, 4, 5];

export function ReviewsCarousel() {
  return (
    <section className="overflow-hidden bg-[#101c33] py-24 text-white" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-[#79f2b0]">Отзывы кандидатов</p>
          <h2 id="reviews-title" className="section-title text-white">Истории людей, которые готовились к работе в UK</h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/60">Листайте карточки свайпом вправо или влево. Стрелки также работают с мышью и клавиатурой.</p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto mt-12 max-w-[1120px]"
          aria-label="Отзывы кандидатов"
        >
          <CarouselContent className="-ml-5">
            {reviews.map((review) => (
              <CarouselItem key={review.name} className="pl-5 md:basis-1/2 lg:basis-1/3">
                <article className="flex min-h-[360px] h-full flex-col rounded-[1.7rem] border border-white/10 bg-white/[.065] p-7 shadow-xl shadow-black/10">
                  <div className="flex items-center justify-between gap-4">
                    <Quote className="size-9 text-[#79f2b0]" aria-hidden="true" />
                    <div className="flex gap-1 text-[#ffd45a]" aria-label="Оценка: 5 из 5">
                      {ratingStars.map((star) => <Star key={star} className="size-4 fill-current" aria-hidden="true" />)}
                    </div>
                  </div>
                  <blockquote className="mt-8 flex-1 text-[17px] font-semibold leading-8 text-white/85">«{review.text}»</blockquote>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="text-lg font-black">{review.name}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Предыдущий отзыв" className="-left-3 size-12 border-white/15 bg-white text-[#101c33] shadow-xl hover:bg-[#79f2b0] disabled:opacity-40 sm:-left-5" />
          <CarouselNext aria-label="Следующий отзыв" className="-right-3 size-12 border-white/15 bg-white text-[#101c33] shadow-xl hover:bg-[#79f2b0] disabled:opacity-40 sm:-right-5" />
        </Carousel>

        <p className="mt-9 text-center text-sm leading-6 text-white/45">Сейчас показаны демонстрационные примеры отзывов. Заменим их на реальные истории после получения материалов от клиентов.</p>
      </div>
    </section>
  );
}
