function decodeJwt(token) {
  try {
    const parts = token.trim().split('.');
    if (parts.length < 2) return null;
    const decodePart = p => {
      let b64 = p.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      if (typeof atob !== 'undefined') {
        return JSON.parse(decodeURIComponent(escape(atob(b64))));
      } else {
        return JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
      }
    };
    return {
      header: decodePart(parts[0]),
      payload: decodePart(parts[1])
    };
  } catch (err) {
    return null;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('tokenInput');
    const hOut = document.getElementById('headerOutput');
    const pOut = document.getElementById('payloadOutput');
    const sOut = document.getElementById('statusOutput');
    
    // Sample JWT
    input.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYWJoeWFtQHRyaXZlZHkiLCJuYW1lIjoiU2FiaHlhbSBUcml2ZWR5IiwiYWRtaW4iOnRydWUsImlhdCI6MTc5MjY2NTYwMCwiZXhwIjoxNzk1MjU3NjAwfQ.testsignature';

    function parse() {
      const decoded = decodeJwt(input.value);
      if (decoded) {
        hOut.textContent = JSON.stringify(decoded.header, null, 2);
        pOut.textContent = JSON.stringify(decoded.payload, null, 2);
        
        let status = 'Valid structure. ';
        if (decoded.payload.exp) {
          const expDate = new Date(decoded.payload.exp * 1000);
          status += `Expires: ${expDate.toUTCString()} (${expDate > new Date() ? '🟢 Active' : '🔴 Expired'})`;
        }
        sOut.textContent = status;
      } else {
        hOut.textContent = '❌ Invalid JWT Header';
        pOut.textContent = '❌ Invalid JWT Payload';
        sOut.textContent = 'Invalid format';
      }
    }
    input.addEventListener('input', parse);
    parse();
  });
}
if (typeof module !== 'undefined') module.exports = { decodeJwt };
