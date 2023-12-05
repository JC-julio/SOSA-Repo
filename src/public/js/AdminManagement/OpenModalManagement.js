const openModalButton = document.querySelector('#open-modal');
const closeModalButton = document.querySelector('#close-modal');
const closeModalButton2 = document.querySelector('#add-close-modal');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const input = document.getElementById('Nome');
const input1 = document.getElementById('Senha1');
const input2 = document.getElementById('Senha2');

function toggleModal(event) {
  modal.classList.toggle('hide');
  fade.classList.toggle('hide');
}

function ZeraInput() {
  input.value = '';
  input1.value = '';
  input2.value = '';
}

openModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);
closeModalButton2.addEventListener('click', toggleModal);
fade.addEventListener('click', toggleModal);
