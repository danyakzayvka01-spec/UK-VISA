export const managers = [
  {
    name: 'Лансарова Регина Алишеровна',
    image: '/manager-regina.png',
    imagePosition: '50% 40%',
    whatsapp: '+44 7384 729765',
  },
  {
    name: 'Osmanova Esma Rinatovna',
    image: '/manager-esma.png',
    imagePosition: '50% 42%',
    whatsapp: '+44 7341 979831',
  },
  {
    name: 'Алиева Аида Алиевна',
    image: '/manager-aida.png',
    imagePosition: '50% 45%',
    whatsapp: '+44 7341 154379',
  },
  {
    name: 'Зарема Жанбековна',
    image: '/manager-zarema.png',
    imagePosition: '50% 38%',
    whatsapp: '+44 7348 210938',
  },
  {
    name: 'Жумабеков Эльдиар Нурланович',
    image: '/manager-eldiyar.png',
    imagePosition: '50% 40%',
    whatsapp: '+44 73 9371 0492',
  },
];

export function getWhatsAppUrl(whatsapp: string) {
  const phone = whatsapp.replace(/\D/g, '');
  return phone ? `https://wa.me/${phone}` : 'https://wa.me/';
}
