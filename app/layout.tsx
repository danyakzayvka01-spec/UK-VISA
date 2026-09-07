import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ variable: '--font-manrope', subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vektor-rabota-agency.dm532337.chatgpt.site'),
  title: 'UK VISA IMMIGRATION — трудоустройство в Великобритании',
  description: 'Подбор вакансий в Великобритании и сопровождение кандидатов из Беларуси, России, Украины, Кыргызстана, Узбекистана и Таджикистана.',
  openGraph: {
    title: 'UK VISA IMMIGRATION — трудоустройство в Великобритании',
    description: 'Подбор вакансий в Великобритании и сопровождение кандидатов из шести стран.',
    images: [{ url: '/og.png', width: 1728, height: 896, alt: 'Вектор Работа' }],
    locale: 'ru_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK VISA IMMIGRATION — трудоустройство в Великобритании',
    description: 'Подбор вакансий в Великобритании и сопровождение кандидатов из шести стран.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" className="scroll-smooth"><body className={`${manrope.variable} antialiased`}>{children}</body></html>;
}
