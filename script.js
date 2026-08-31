const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Cerrar' : 'Menú';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menú';
}));

const form = document.querySelector('#blend-form');
const summary = document.querySelector('#blend-summary');
const ingredientMessage = document.querySelector('#ingredient-message');
const ingredientInputs = [...form.querySelectorAll('input[name="ingredient"]')];

function selectedValue(name) {
  return form.querySelector(`input[name="${name}"]:checked`)?.value || '';
}

function selectedIngredients() {
  return ingredientInputs.filter(input => input.checked).map(input => input.value);
}

function updateBlend() {
  const base = selectedValue('base');
  const size = selectedValue('size');
  const ingredients = selectedIngredients();
  const atLimit = ingredients.length >= 5;

  ingredientInputs.forEach(input => {
    input.disabled = atLimit && !input.checked;
  });

  ingredientMessage.textContent = ingredients.length
    ? `${ingredients.length} de 5 ingredientes elegidos.`
    : 'Podés sumar hasta 5 ingredientes.';

  if (!base) {
    summary.textContent = 'Elegí una base para comenzar.';
    return;
  }

  const ingredientText = ingredients.length ? ingredients.join(', ') : 'sin ingredientes adicionales';
  summary.textContent = `${base} + ${ingredientText} · ${size}`;
}

form.addEventListener('change', updateBlend);
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const base = selectedValue('base');
  const size = selectedValue('size');
  const ingredients = selectedIngredients();

  const message = [
    'Hola, quiero encargar un blend personalizado de Le Tea en Violet.',
    `Base: ${base}`,
    `Ingredientes adicionales: ${ingredients.length ? ingredients.join(', ') : 'ninguno'}`,
    `Presentación: ${size}`,
    '¿Me confirman disponibilidad y valor?'
  ].join('\n');

  window.open(`https://wa.me/5491161227808?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

updateBlend();
