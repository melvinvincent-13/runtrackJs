/**
 * Affiche les nombres de 1 à 151 dans la console avec les règles FizzBuzz.
 *
 * Règles (le cas FizzBuzz est testé EN PREMIER pour éviter Fizz ou Buzz seul) :
 *   - multiple de 3 ET 5 → "FizzBuzz"
 *   - multiple de 3 seul → "Fizz"
 *   - multiple de 5 seul → "Buzz"
 *   - sinon              → le nombre
 */
function fizzbuzz() {
  for (let i = 1; i <= 151; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

fizzbuzz();
