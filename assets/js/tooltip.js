const showTooltip = (inputElement, message, type = "error") => {
  hideTooltip(inputElement);

  let wrapper = inputElement.parentElement;
  if (!wrapper.classList.contains("form-field")) {
    wrapper = document.createElement("div");
    wrapper.className = "form-field";
    inputElement.parentNode.insertBefore(wrapper, inputElement);
    wrapper.appendChild(inputElement);
  }

  const tooltip = document.createElement("div");
  tooltip.className = `tooltip-error ${type}`;
  tooltip.textContent = message;
  wrapper.appendChild(tooltip);

  setTimeout(() => {
    tooltip.classList.add("show");
  }, 10);
};

// Special tooltip for radio/checkbox that doesn't change DOM structure
const showTooltipForGroup = (inputElement, message, type = "error") => {
  hideTooltipForGroup(inputElement);

  const tooltip = document.createElement("div");
  tooltip.className = `tooltip-error group-tooltip ${type}`;
  tooltip.textContent = message;

  // Position relative to the input element's parent container
  const container =
    inputElement.closest(".form-group") || inputElement.parentElement;
  container.style.position = "relative";
  container.appendChild(tooltip);

  setTimeout(() => {
    tooltip.classList.add("show");
  }, 10);
};

const hideTooltip = (inputElement) => {
  const wrapper = inputElement.closest(".form-field");
  if (wrapper) {
    const tooltip = wrapper.querySelector(".tooltip-error");
    if (tooltip) {
      tooltip.classList.remove("show");
      setTimeout(() => {
        tooltip.remove();
      }, 300);
    }
  }
};

const hideTooltipForGroup = (inputElement) => {
  const container =
    inputElement.closest(".form-group") || inputElement.parentElement;
  if (container) {
    const tooltip = container.querySelector(".tooltip-error.group-tooltip");
    if (tooltip) {
      tooltip.classList.remove("show");
      setTimeout(() => {
        tooltip.remove();
      }, 300);
    }
  }
};
