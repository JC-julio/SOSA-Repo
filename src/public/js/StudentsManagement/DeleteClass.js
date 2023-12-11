const OpenDeleteModal = document.querySelector('#Del-Class');
const closeModal = document.querySelector('#close-StudentsModal');
const PrincipalButton = document.querySelector('#Modal-Delete-class');
const FadeModalADD = document.querySelector('#Fader');
const CloseDeleteModal = document.querySelector('#Close-Modal-Button');
const InputName = document.getElementById('Inputname');
function toggleModal(event) {
  event.preventDefault();
  PrincipalButton.classList.toggle('hider-me');
  FadeModalADD.classList.toggle('hider-me');
}

OpenDeleteModal.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);
FadeModalADD.addEventListener('click', toggleModal);
CloseDeleteModal.addEventListener('click', toggleModal);
