document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let brushSize = 5;
    let brushType = "square";
    let selectedColor = "#000000"; // Default color
    let currentAlphabetIndex = 0; // Track current alphabet index
  
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
    alphabetList.forEach(function(alphabet, index) {
      alphabet.addEventListener("click", function() {
        const selectedAlphabet = this.dataset.alphabet;
        loadAlphabetImage(selectedAlphabet);
        currentAlphabetIndex = index; // Update current alphabet index
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
  
    // Done button functionality
    const doneButton = document.querySelector(".done-button");
    doneButton.addEventListener("click", function() {
        // Add completed animation class to the current alphabet li
        alphabetList[currentAlphabetIndex].classList.add("completed");

        // Wait for the animation to complete
        setTimeout(function() {
            // Change color of the current alphabet li to green
            alphabetList[currentAlphabetIndex].style.backgroundColor = "green";
            alphabetList[currentAlphabetIndex].style.color = "#fff"; 
            // Load next alphabet image if available
            if (currentAlphabetIndex < alphabetList.length - 1) {
              currentAlphabetIndex++;
              const nextAlphabet = alphabetList[currentAlphabetIndex].dataset.alphabet;
              loadAlphabetImage(nextAlphabet);
            }
        }, 1000); // Adjust the timeout value based on the duration of your animation
    });

    const clearProgressButton = document.getElementById("clearProgressButton");
    clearProgressButton.addEventListener("click", function() {
        // Reset current alphabet index
        currentAlphabetIndex = 0;

        // Reset color of alphabet list items
        alphabetList.forEach(function(alphabet) {
            alphabet.style.backgroundColor = "";
            alphabet.style.color = "black";
      
        });

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
  