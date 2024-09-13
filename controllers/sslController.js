import axios from 'axios';
import forge from 'node-forge';

export const checkSSL = async (req, res, next) => {
  const { domain } = req.body;
  console.log('Received request for domain:', domain);

  try {
    const sslData = await fetchSSLCertificate(domain);
    console.log('Sending SSL data:', sslData);
    return res.json(sslData); // Return on success
  } catch (error) {
    console.error('Error occurred:', error.message);
    return res.json({ error: error.message }); // Send error response
  }
};

const fetchSSLCertificate = async (domain) => {
  const url = `https://${domain}`;
  const response = await axios.get(url, { timeout: 5000 });
  const cert = response.request.connection.getPeerCertificate();

  return {
    isValid: cert.valid_to && new Date(cert.valid_to) > new Date(),
    expirationDate: cert.valid_to || 'Unknown',
    issuer: cert.issuer?.O || 'Unknown',
    subject: cert.subject?.CN || 'Unknown',
    caValid: validateCA(cert),
    selfSigned: cert.issuer?.CN === cert.subject?.CN,
    revoked: await checkRevocation(cert),
  };
};

const validateCA = (cert) => cert.issuer && cert.issuer.O !== '';

const checkRevocation = async (cert) => false;
