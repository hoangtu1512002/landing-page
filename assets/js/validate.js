const validateInput = (input) => {
  const value = input.value.trim();

  // Define validation rules with patterns and handlers
  const validationRules = [
    {
      attribute: "is-required",
      test: () => !value,
      getMessage: (attr) => input.getAttribute(attr),
    },
    {
      attribute: "is-email",
      test: () =>
        value &&
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      getMessage: (attr) => input.getAttribute(attr),
    },
    {
      attribute: "is-phone",
      test: () => value && !/^\d{10}$/.test(value),
      getMessage: (attr) => input.getAttribute(attr),
    },
    {
      attribute: "is-tel",
      test: () => value && !/^\d{10}$/.test(value),
      getMessage: (attr) => input.getAttribute(attr),
    },
    {
      attribute: "is-pattern",
      test: () => {
        const pattern = input.getAttribute("pattern");
        return value && pattern && !new RegExp(pattern).test(value);
      },
      getMessage: (attr) => input.getAttribute(attr),
    },
  ];

  // Check each validation rule
  for (const rule of validationRules) {
    if (input.hasAttribute(rule.attribute) && rule.test()) {
      const message = rule.getMessage(rule.attribute);
      showTooltip(input, message);
      return false;
    }
  }

  hideTooltip(input);
  return true;
};

// Validate radio group
const validateRadioGroup = (groupName, container = document) => {
  const radios = container.querySelectorAll(
    `input[type="radio"][name="${groupName}"]`
  );
  const firstRadio = radios[0];
  const isRequired = firstRadio && firstRadio.hasAttribute("is-required");

  if (isRequired) {
    const isChecked = Array.from(radios).some((radio) => radio.checked);
    if (!isChecked) {
      const message = firstRadio.getAttribute("is-required");
      showTooltipForGroup(firstRadio, message);
      return false;
    }
  }

  // Hide tooltip if validation passes
  if (radios.length > 0) {
    hideTooltipForGroup(radios[0]);
  }
  return true;
};

// Validate checkbox group
const validateCheckboxGroup = (groupName, container = document) => {
  const checkboxes = container.querySelectorAll(
    `input[type="checkbox"][name="${groupName}"]`
  );
  const firstCheckbox = checkboxes[0];
  const isRequired = firstCheckbox && firstCheckbox.hasAttribute("is-required");

  if (isRequired) {
    const isChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    if (!isChecked) {
      const message = firstCheckbox.getAttribute("is-required");
      showTooltipForGroup(firstCheckbox, message);
      return false;
    }
  }

  // Hide tooltip if validation passes
  if (checkboxes.length > 0) {
    hideTooltipForGroup(checkboxes[0]);
  }
  return true;
};

// Validate single checkbox (like terms agreement)
const validateSingleCheckbox = (checkbox) => {
  if (checkbox.hasAttribute("is-required") && !checkbox.checked) {
    const message = checkbox.getAttribute("is-required");
    showTooltipForGroup(checkbox, message);
    return false;
  }

  hideTooltipForGroup(checkbox);
  return true;
};

// Form validation function that can be called from main.js
const validateForm = (form) => {
  let isValid = true;

  // Validate text inputs and textareas
  const inputs = form.querySelectorAll(
    "input[is-required], textarea[is-required], input[is-email], input[is-phone], input[is-tel], input[is-pattern]"
  );

  inputs.forEach((input) => {
    if (input.type === "radio" || input.type === "checkbox") {
      return; // Skip radio/checkbox here, handle separately
    }
    if (!validateInput(input)) {
      isValid = false;
    }
  });

  // Validate radio groups
  const radioNames = new Set();
  form.querySelectorAll('input[type="radio"][is-required]').forEach((radio) => {
    radioNames.add(radio.name);
  });
  radioNames.forEach((name) => {
    if (!validateRadioGroup(name, form)) {
      isValid = false;
    }
  });

  // Validate checkbox groups
  const checkboxNames = new Set();
  form
    .querySelectorAll('input[type="checkbox"][is-required]')
    .forEach((checkbox) => {
      if (checkbox.name) {
        checkboxNames.add(checkbox.name);
      } else {
        // Single checkbox without name (like terms agreement)
        if (!validateSingleCheckbox(checkbox)) {
          isValid = false;
        }
      }
    });
  checkboxNames.forEach((name) => {
    if (!validateCheckboxGroup(name, form)) {
      isValid = false;
    }
  });

  return isValid;
};
