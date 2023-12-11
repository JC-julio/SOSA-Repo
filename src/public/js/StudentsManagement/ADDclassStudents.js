const OpenModalClass = document.querySelector('#open-ADD-Class');
const CloseModal1 = document.querySelector('#close-modal1');
const Button_principal = document.querySelector('#Modal-ADD-class');
const Pattern_Modal = document.querySelector('#Pattern');
const CloseModal = document.querySelector('#close-modal');
function toggleModal(event) {
  event.preventDefault();
  Button_principal.classList.toggle('esconda-me');
  Pattern_Modal.classList.toggle('esconda-me');
}

OpenModalClass.addEventListener('click', toggleModal);
CloseModal1.addEventListener('click', toggleModal);
Pattern_Modal.addEventListener('click', toggleModal);
CloseModal.addEventListener('click', toggleModal);
