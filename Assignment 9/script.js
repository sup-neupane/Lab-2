const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('invalid');
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove('invalid');
  errorEl.textContent = '';
}

function validateName() {
  const value = nameInput.value.trim();
  if (!value) {
    showError(nameInput, nameError, 'Name is required.');
    return false;
  }
  if (value.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters.');
    return false;
  }

  clearError(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value) {
    showError(emailInput, emailError, 'Email is required.');
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    return false;
  }

  clearError(emailInput, emailError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    showError(passwordInput, passwordError, 'Password is required.');
    return false;
  }
  if (value.length < 8) {
    showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
    return false;
  }

  clearError(passwordInput, passwordError);
  return true;
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    successMessage.classList.remove('hidden');
    successMessage.textContent = 'Form submitted successfully!';

    form.reset();
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 3000);
  } else {
    successMessage.classList.add('hidden');
  }
});