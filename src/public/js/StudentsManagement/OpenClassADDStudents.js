const OpenAlterModal = document.querySelector('#open-modal-alterClass');
const CloseAlterModal = document.querySelector('#close-ClassModal');
const AlterModal = document.querySelector('#Modal-Alter-Class');
const FadeAlterModal = document.querySelector('#Overlay');
const AlterModalButton = document.querySelector('#Close-Alter-Button');
function toggleModal(event) {
  event.preventDefault();
  AlterModal.classList.toggle('blurem');
  FadeAlterModal.classList.toggle('blurem');
}

OpenAlterModal.addEventListener('click', toggleModal);
CloseAlterModal.addEventListener('click', toggleModal);
FadeAlterModal.addEventListener('click', toggleModal);
AlterModalButton.addEventListener('click', toggleModal);
