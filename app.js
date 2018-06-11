// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'block';
  
  setTimeout(calculateResults, 2000);
  
  e.preventDefault();
});

// Calculate results
function calculateResults() {
  
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPaymen = document.getElementById('monthly-payment');
  const totalPaymen = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = Math.abs(parseFloat(amount.value));
  const calculatedInterest = Math.abs(parseFloat(interest.value) / 100 / 12);
  const calculatedPayments = Math.abs(parseFloat(years.value) * 12);
  
  // Compute monthly payment
  const x = Math.pow(1+ calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPaymen.value = monthly.toFixed(2);
    totalPaymen.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    
    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show error
function showError(error) {
  // Create div
  const errorDiv = document.createElement('div');
  
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  // Add class
  errorDiv.className = 'alert alert-danger';
  
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  
  // Hide loader
  document.getElementById('loading').style.display = 'none';
  
  // Clear error
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}