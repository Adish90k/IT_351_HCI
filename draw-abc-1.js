document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let brushSize = 5;
  let brushType = "square";
  let selectedColor = "#000000"; // Default color

  // Set up brush options
  const brushSizeInput = document.getElementById("brush-size");
  brushSizeInput.addEventListener("input", function() {
      brushSize = parseInt(brushSizeInput.value);
  });

  const brushTypeSelect = document.getElementById("brush-type");
  brushTypeSelect.addEventListener("change", function() {
      brushType = brushTypeSelect.value;
  });

  // Set up color picker
  const colorPicker = document.getElementById("color-picker");
  colorPicker.addEventListener("input", function() {
      selectedColor = colorPicker.value;
  });

  // Drawing functionality
  let isDrawing = false;
  canvas.addEventListener("mousedown", function(event) {
      isDrawing = true;
      draw(event);
  });

  canvas.addEventListener("mousemove", function(event) {
      if (isDrawing) {
          draw(event);
      }
  });

  canvas.addEventListener("mouseup", function() {
      isDrawing = false;
  });

  function draw(event) {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      ctx.fillStyle = selectedColor;
      if (brushType === "square") {
          ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      } else if (brushType === "circle") {
          ctx.beginPath();
          ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
          ctx.fill();
      }
  }

  // Handle alphabet selection
  const alphabetList = document.querySelectorAll(".alphabet-list li");
  alphabetList.forEach(function(alphabet) {
      alphabet.addEventListener("click", function() {
          const selectedAlphabet = this.dataset.alphabet;
          loadAlphabetImage(selectedAlphabet);
      });
  });

  function loadAlphabetImage(alphabet) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Load alphabet image
      const img = new Image();
      img.onload = function() {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = "alphabets/"+alphabet + ".png"; // Assuming the image files are named A.png, B.png, etc.
  }

  // Clear button functionality
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});
