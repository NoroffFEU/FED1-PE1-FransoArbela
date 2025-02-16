// 
export const displayError = (error, errorLocationElement) => {
  error.forEach((element) => {
    const errorText = document.createElement("li");
    errorText.id = "errorText";
    errorText.innerHTML = `
          ${element.message}
          `;
          errorLocationElement.appendChild(errorText);
  });
};
