const open1 = document.querySelector('#open-DeleteModal');
const close1 = document.querySelector('#close-DeleteModal');
const ModifyModal = document.querySelector('#DeleteModal');
const Blur1 = document.querySelector('#Blur1');
const ButtonSim = document.querySelector('#Sim');
const ButtonNao = document.querySelector('#Nao');

function toggleModal(event) {
  event.preventDefault();
  ModifyModal.classList.toggle('hider');
  Blur1.classList.toggle('hider');
}
ButtonNao.addEventListener('click', toggleModal);
ButtonSim.addEventListener('click', toggleModal);
close1.addEventListener('click', toggleModal);
open1.addEventListener('click', toggleModal);
Blur1.addEventListener('click', toggleModal);
