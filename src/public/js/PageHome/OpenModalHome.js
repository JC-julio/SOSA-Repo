const openModalButton = document.querySelector('#open-modal');
const closeModalButton = document.querySelector('#close-modal');
const closeModalButton2 = document.querySelector('#add-close-modal');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const TempoLimite = document.getElementById('InputTempo');
const Aluno = document.getElementById('Aluno');
const Servidor = document.getElementById('Servidor');
const Observe = document.getElementById('Observe');

function toggleModal(event) {
  event.preventDefault();
  modal.classList.toggle('hide');
  fade.classList.toggle('hide');
  ZeraInput();
}

function ZeraInput() {
  TempoLimite.value = '';
  Aluno.value = '';
  Servidor.value = '';
  Observe.value = '';
}

openModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);
closeModalButton2.addEventListener('click', toggleModal);
fade.addEventListener('click', toggleModal);
