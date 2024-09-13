export const errorHandler = (err, req, res, next) => {
  console.error('Error middleware triggered:', err);

  if (res.headersSent) {
    return next(err);
  }

  let status = 500;
  let message = 'An unexpected error occurred. Please try again later.';

  if (err.code === 'ENOTFOUND') {
    status = 404;
    message = 'Domain not found. Please check the domain and try again.';
  } else if (err.code === 'ECONNREFUSED') {
    status = 503;
    message = 'Network error: Unable to reach the domain. Please try again later.';
  } else if (err.message === 'Invalid domain name') {
    status = 400;
    message = 'Invalid domain name. Please provide a valid domain.';
  }

  res.status(status).json({ error: message });
};

export default errorHandler;
