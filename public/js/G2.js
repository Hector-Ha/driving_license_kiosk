function validateForm() {
  const form = document.querySelector(".needs-validation");

  if (!form.licenseNumber.value.match(/^[A-Za-z0-9]{8}$/)) {
    alert("License number must be exactly 8 alphanumeric characters");
    return false;
  }

  const age = parseInt(form.age.value);
  if (age < 16) {
    alert("You must be at least 16 years old to apply");
    return false;
  }

  const dob = new Date(form.dob.value);
  const today = new Date();
  const calculatedAge = today.getFullYear() - dob.getFullYear();
  if (calculatedAge < 16) {
    alert("You must be at least 16 years old based on your date of birth");
    return false;
  }

  const carYear = parseInt(
    form.querySelector('[name="carDetails.year"]').value
  );
  const currentYear = new Date().getFullYear();
  if (carYear < 1900 || carYear > currentYear) {
    alert(`Please enter a valid year between 1900 and ${currentYear}`);
    return false;
  }

  const plateNumber = form.querySelector(
    '[name="carDetails.plateNumber"]'
  ).value;
  if (!plateNumber.match(/^[A-Za-z0-9]{2,8}$/)) {
    alert("Plate number must be 2-8 alphanumeric characters");
    return false;
  }

  return true;
}
