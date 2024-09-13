export const validateDomain = (req, res, next) => {
  const { domain } = req.body;

  if (!domain) {
    return res.json({ error: 'A domain name is required.' });
  }

  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.?)+[a-zA-Z]{2,6}$/;


  if (!domainRegex.test(domain)) {
    return res.json({ error: 'Invalid domain format.' });
  }

  next(); 
};

export default validateDomain;
