function ConfirmAlter(id) {
  const quest = confirm('Tem certeza disso?');
  if (!quest) return;
  fetch('/AdminManagement/' + id, { method: 'PUT' });
  alert('Certo, reinicie a página');
}
