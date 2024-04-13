const textEditorModule = (function() {
  // Private function to update font size based on the input value and selected unit
  const updateFontSize = (output, fontSizeInput, fontSizeUnit) => {
    const unit = fontSizeUnit.value;
    output.style.fontSize = `${fontSizeInput.value}${unit}`;
  };

  return {
    init: function() {
      // Get references to the input, output, font size input, and font size unit elements
      const textInput = document.getElementById('textInput');
      const output = document.getElementById('output');
      const fontSizeInput = document.getElementById('fontSizeInput');
      const fontSizeUnit = document.getElementById('fontSizeUnit');

      // Store the default content from the output div
      const defaultContent = output.textContent;

      // Add event listeners
      textInput.addEventListener('input', () => {
        if (textInput.value.trim() === '') {
          output.textContent = defaultContent;
        } else {
          output.textContent = textInput.value;
        }
      });

      output.addEventListener('input', () => {
        textInput.value = output.textContent;
      });

      fontSizeInput.addEventListener('input', () => {
        updateFontSize(output, fontSizeInput, fontSizeUnit);
      });

      fontSizeUnit.addEventListener('change', () => {
        updateFontSize(output, fontSizeInput, fontSizeUnit);
      });

      // Initialize font size of output text
      updateFontSize(output, fontSizeInput, fontSizeUnit);
    }
  };
})();

export default textEditorModule;
