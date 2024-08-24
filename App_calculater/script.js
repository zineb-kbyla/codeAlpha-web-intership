document.getElementById('ageCalculatorForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
  
    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();
  
    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <div class="result-title">Your Age:</div>
      <div class="result-details">
        <div class="result-icon">🎉</div>
        <div class="result-text">
          You are <span class="result-highlight">${ageYears}</span> years,
          <span class="result-highlight">${ageMonths}</span> months, and
          <span class="result-highlight">${ageDays}</span> days old.
        </div>
      </div>
    `;
  
    // Ajout de la classe pour l'animation
    resultDiv.classList.add('show');
  });
  