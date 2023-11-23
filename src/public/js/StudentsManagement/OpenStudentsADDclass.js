const OpenADDModal = document.querySelector('#Open-Add-Class');
const closeModal = document.querySelector('#close-StudentsModal');
const PrincipalButton = document.querySelector('#Modal-ADD-class');
const FadeModalADD = document.querySelector('#Fader');

function toggleModal() {
  PrincipalButton.classList.toggle('hider-me');
  FadeModalADD.classList.toggle('hider-me');
}

OpenADDModal.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);
FadeModalADD.addEventListener('click', toggleModal);
