function validateForm() {
  const form = document.getElementById("carInfoForm");
  const yearInput = form.year.value.trim();
  const plateNumber = form.plateNumber.value.trim();

  // Check if year is a valid number
  if (!yearInput || isNaN(yearInput)) {
    alert("Please enter a valid year");
    form.year.focus();
    return false;
  }

  const year = parseInt(yearInput);
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear + 1) {
    alert(`Please enter a valid year between 1900 and ${currentYear + 1}`);
    form.year.focus();
    return false;
  }

  console.log("Validating plate number:", plateNumber);
  console.log("Regex test result:", /^[A-Za-z0-9]{2,10}$/.test(plateNumber));

  if (!plateNumber.match(/^[A-Za-z0-9]{2,10}$/)) {
    alert("Plate number must be 2-10 alphanumeric characters");
    console.log("Failed plate number:", plateNumber);
    console.log("Length:", plateNumber.length);
    console.log("Contains non-alphanumeric:", /[^A-Za-z0-9]/.test(plateNumber));
    form.plateNumber.focus();
    return false;
  }

  return true;
}
