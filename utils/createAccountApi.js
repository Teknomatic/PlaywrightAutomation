async function createAccount(request, account) {
  return request.post('/api/createAccount', {
    multipart: account,
  });
}

module.exports = { createAccount };