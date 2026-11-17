async function deleteAccount(request, accountToDelete) {
  return request.delete('/api/deleteAccount', {
    multipart: accountToDelete,
  });
}

module.exports = { deleteAccount };