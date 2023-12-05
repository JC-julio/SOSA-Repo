const liberateModal = document.querySelector('#open-AlterModal');
const CloseModal = document.querySelector('#close-AlterModal');
const alterModal = document.querySelector('#AlterModal');
const ConfirmnButton = document.querySelector('#Confirmn-Alter');
const FadeAlterModal = document.querySelector('#AlterFade');

function toggleModal() {
  alterModal.classList.toggle('hide-me');
  FadeAlterModal.classList.toggle('hide-me');
}
ConfirmnButton.addEventListener('click', toggleModal);
CloseModal.addEventListener('click', toggleModal);
liberateModal.addEventListener('click', toggleModal);
FadeAlterModal.addEventListener('click', toggleModal);
