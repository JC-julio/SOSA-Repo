const OpenStudentModal = document.querySelector('#Open-Student-Modal');
const closeModalButton = document.querySelector('#Close-Student-Modal');
const Studentmodal = document.querySelector('#Student-Modal');
const StudentFade = document.querySelector('#Student-fade');

function toggleModal() {
  Studentmodal.classList.toggle('Student-hide');
  StudentFade.classList.toggle('Student-hide');
}

OpenStudentModal.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);
StudentFade.addEventListener('click', toggleModal);
