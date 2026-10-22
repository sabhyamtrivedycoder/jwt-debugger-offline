const assert = require('assert');
const { decodeJwt } = require('./app.js');
console.log('🧪 Testing JWT Debugger Offline...');
const sample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhYmh5YW0iLCJpYXQiOjE1MTYyMzkwMjJ9.signature';
const res = decodeJwt(sample);
assert(res !== null, 'Decoded successfully');
assert(res.header.alg === 'HS256', 'Header algorithm verified');
assert(res.payload.name === 'Sabhyam', 'Payload claims verified');
console.log('✅ JWT Debugger Offline test passed!');
