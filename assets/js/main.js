document.addEventListener("DOMContentLoaded", () => {
  const formInputs = $$("input, textarea");
  const form = document.querySelector("form");

  if (document.referrer) {
    $$(".referer-form-url").forEach((input) => {
      input.value = document.referrer;
    });
  }

  $$("referer-url").forEach((input) => {
    input.value = location.href;
  });

  if (form) {
    form.setAttribute("novalidate", "");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(this)) {
        form.submit();
      }
    });
  }

  formInputs.forEach((input) => {
    // Handle blur events for text inputs
    if (input.type !== "radio" && input.type !== "checkbox") {
      input.addEventListener("blur", () => {
        validateInput(input);
      });

      input.addEventListener("input", () => {
        hideTooltip(input);
      });
    }

    // Handle radio button changes
    if (input.type === "radio") {
      input.addEventListener("change", () => {
        if (input.name) {
          validateRadioGroup(input.name);
        }
      });
    }

    // Handle checkbox changes
    if (input.type === "checkbox") {
      input.addEventListener("change", () => {
        if (input.name) {
          validateCheckboxGroup(input.name);
        } else {
          validateSingleCheckbox(input);
        }
      });
    }
  });
});
