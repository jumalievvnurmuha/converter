const modal = document.querySelector('.modal');
const openBtn = document.querySelector('#btn-get');
const closeBtn = document.querySelector('.modal_close');

const showModal = () => {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

const closeModal = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});



function openOnScroll() {
  const windowBottom = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  if (windowBottom >= pageHeight - 1) {
    window.removeEventListener('scroll', openOnScroll);
  }
}

window.addEventListener('scroll', openOnScroll);

setTimeout(showModal, 10000);