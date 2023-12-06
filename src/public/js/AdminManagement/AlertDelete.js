function ConfirmDelete(id) {
  const Quest = confirm('Tem certeza disso?');
  if (!Quest) return;
  fetch('/AdminManagement/' + id, { method: 'DELETE' });
  alert('Certo, reinicie a página');
}
