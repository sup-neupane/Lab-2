const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const buttonColorInput = document.getElementById('buttonColor');
const applyBtn = document.getElementById('applyTheme');
const resetBtn = document.getElementById('resetTheme');
const themeOutput = document.getElementById('themeOutput');

const defaultTheme = {
  background: '#f9fafb',
  text: '#111827',
  button: '#2563eb',
};

let currentTheme = { ...defaultTheme };

function renderThemeObject() {
  themeOutput.textContent = JSON.stringify(currentTheme, null, 2);
}

function applyTheme(theme) {
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;
  document.documentElement.style.setProperty('--btn', theme.button);
  currentTheme = { ...theme };
  renderThemeObject();
}

applyBtn.addEventListener('click', () => {
  const newTheme = {
    background: bgColorInput.value,
    text: textColorInput.value,
    button: buttonColorInput.value,
  };

  applyTheme(newTheme);
});

resetBtn.addEventListener('click', () => {
  bgColorInput.value = defaultTheme.background;
  textColorInput.value = defaultTheme.text;
  buttonColorInput.value = defaultTheme.button;
  applyTheme(defaultTheme);
});

// Initialize
bgColorInput.value = defaultTheme.background;
textColorInput.value = defaultTheme.text;
buttonColorInput.value = defaultTheme.button;
applyTheme(defaultTheme);
