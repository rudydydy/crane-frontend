export const errorFormatter = (errors) => {
  const serverError = {};

  for(const field in errors) {
    serverError[field] = errors[field][0];
  }

  return serverError;
}
