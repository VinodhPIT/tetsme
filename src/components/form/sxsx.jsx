'use client'


function validateForm() {
    const emailInput = document.getElementById('email');
    const textareaInput = document.getElementById('textarea');
    
    // Validate email
    const emailValue = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return false;
    }
    
    // Validate textarea
    const textareaValue = textareaInput.value;
    if (textareaValue.trim() === '') {
      alert('Please enter some text in the textarea.');
      textareaInput.focus();
      return false;
    }
    
    return true;
  }

  export default validateForm