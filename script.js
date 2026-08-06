document.querySelector('form').addEventListener('submit', e => { e.preventDefault(); const b=e.currentTarget.querySelector('button'); b.textContent='Заявка отправлена ✓'; b.style.background='#0b9b62'; });
document.querySelector('.menu').addEventListener('click',()=>alert('Навигация: О нас · Визы · Как работаем · FAQ'));
