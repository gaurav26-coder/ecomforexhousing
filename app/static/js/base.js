/**
 * Returns the nearest ancestor node of the specified element type.
 * @param {object} htmlElementNode Element to get ancestor for
 * @param {string} targetAncestorElementTag Type of element to look for
 */
function getNearestAncestor(htmlElementNode, targetAncestorElementTag) {
  while (htmlElementNode) {
      htmlElementNode = htmlElementNode.parentNode;
      if (htmlElementNode.tagName.toLowerCase() === targetAncestorElementTag) {
          return htmlElementNode;
      }
  }
  return undefined;
}

/**
 * Shows the overlay/popup modal.
 * @param {string} actionType Can be either 'create' or 'update'.
 */
function showModal() {
  const element = document.getElementById('modal');
  element.classList.add('is-active');
  document.getElementsByTagName('body')[0].classList.add('is-clipped');
}

/**
 * Hides the overlay/popup modal.
 */
function hideModal() {
  const element = document.getElementById('modal');
  element.classList.remove('is-active');
  document.getElementsByTagName('body')[0].classList.remove('is-clipped');
}

function toggleIsActive(htmlNodeElement) {
  htmlNodeElement.classList.toggle('is-active');
}

/**
 * Submits the input values to the specified route.
 * @param {string} route
 */
function saveChanges(route, id=null) {
  // Create JSON to send to web server.
  modalInputs = getModalInputs();
  let payload = {}

  // Adds a new key for the payload that holds the id's integer
  if (id != null) {
    for (let i = 0; i < id.length; i++) {
      payload[id[i][0]] = id[i][1]
    }
  }

  // Iterate through the inputs and assign the values to a payload['column_name_of_the_HTML_table']
  for (let i = 0; i < modalInputs.length; i++) {
    payload[modalInputs[i].id] = modalInputs[i].value;
  }
  submitForm(route, payload);
}

/**
 * Submits the input to the specified route.
 * @param {string} path Basically the route.
 * @param {object} params
 * @param {string} method
 */
function submitForm(path, params, method='post') {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function hideElement(id) {
  document.querySelector(`#${id}`).classList.add('is-hidden');
}

function showElement(id) {
  document.querySelector(`#${id}`).classList.remove('is-hidden');
}

function animateToNextStep(currentId, nextId, animationClass) {
  let currentStep = document.querySelector(`#${currentId}`);
  currentStep.addEventListener('animationend', () => {
    hideElement(currentId);
    showElement(nextId);
  });
  currentStep.classList.add(animationClass);
  currentStep.classList.add('animate__animated');
}
