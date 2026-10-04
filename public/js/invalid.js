(() => {
  "use strict";

  // Fetch all the forms we want to apply custom validation to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and manage validation states manually
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Find all interactive inputs in this specific form
        const inputs = form.querySelectorAll("input, select, textarea");

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Check each field individually instead of marking the whole form
        inputs.forEach((input) => {
          if (!input.checkValidity()) {
            // If the field is broken, make it red
            input.classList.add("is-invalid");

            // Remove the red style as soon as the user changes/fixes the text
            input.addEventListener("input", () => {
              if (input.checkValidity()) {
                input.classList.remove("is-invalid");
              }
            }); // 'once' ensures the event listener cleans itself up
          } else {
            // If the field is already valid, make sure it stays normal (no green)
            input.classList.remove("is-invalid");
          }
        });
      },
      false,
    );
  });
})();
