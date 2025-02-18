// display error messages extracted from the api
export const displayError = (error, errorLocationElement) => {
  //error is the error message from the api, the errLocationElement is the selected element in the html where it would display
  error.forEach((element) => {
    const errorText = document.createElement("li");
    errorText.id = "errorText";
    errorText.innerHTML = `
          ${element.message}
          `;
    errorLocationElement.appendChild(errorText);
  });
};
