async function createAccount(request, accountToCreate) {
  return request.post('/api/createAccount', {
    multipart: accountToCreate,
  });
}

module.exports = { createAccount };