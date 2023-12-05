const OpenADDModal = document.querySelector('#Open-Add-Class');
const closeModal = document.querySelector('#close-StudentsModal');
const PrincipalButton = document.querySelector('#Modal-ADD-class');
const FadeModalADD = document.querySelector('#Fader');
const CloseModal = document.querySelector('#Close-Modal-Button');
const InputName = document.getElementById('Inputname');
function toggleModal(event) {
  event.preventDefault();
  PrincipalButton.classList.toggle('hider-me');
  FadeModalADD.classList.toggle('hider-me');
  ZeraInput();
}

function ZeraInput() {
  InputName.value = '';
}

OpenADDModal.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);
FadeModalADD.addEventListener('click', toggleModal);
CloseModal.addEventListener('click', toggleModal);
