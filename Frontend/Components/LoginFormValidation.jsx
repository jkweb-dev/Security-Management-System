const validate = (form) => {
  const errors = {};

  const email = form.email.trim();
  const password = form.password.trim();

 
  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Enter a valid email";
  } else if (email.length > 254) {
    errors.email = "Email is too long";
  }

  
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (password.length > 128) {
    errors.password = "Password is too long";
  }

  return errors;
};

export default validate