// 1. Write a function named `getFullName` that accepts two input `firstName` and `lastName` and return the `fullName`

function fullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

// 2. Write a function named `isPalindrome` that accepts one input returns `true` or `false` based on wether the value passed is palindrome or not.

function isPalindrome(input) {
  let reverseValue = input.reverse().value;
}

// 3. Create 2 functions that calculate properties of a circle, using the definitions here.

// - Create a function called `getCircumfrence`:

// Pass the radius of a circle to the function and it returns the circumference based on the radius, and output `The circumference is NN`.

// - Create a function called `getArea`:

// Pass the radius to the function and it returns the area based on the radius, and output `The area is NN`.

function getCircumfrence(radius) {
  return `The circumference of the cirle is ${2 * Math.PI * radius}`;
}
function getArea(radius) {
  return `The area of the cirle is ${Math.PI * radius ** 2}`;
}

module.exports = {
  fullName,
  isPalindrome,
  getCircumfrence,
  getArea,
};
