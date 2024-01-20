
function start() { // Randomly Execute Function
 ranFunc = Math.floor(Math.random() * 3);
 
 if (ranFunc == 0) {
  main1();
 }
 if (ranFunc == 1) {
  main2();
 }
 if (ranFunc == 2) {
  main3();
 }
}
start();