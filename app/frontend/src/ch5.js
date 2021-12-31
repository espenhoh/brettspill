const fakeAPI = (delay, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), delay));

console.log('Yess');
const useResult = x => console.log(new Date(), x);



     var characters = [
         {name: "Fred", plays: "bowling"},
         {name: "Barney", plays: "chess"},
         {name: "Wilma", plays: "bridge"},
         {name: "Betty", plays: "checkers"},
         {name: "Pebbles", plays: "chess"}
     ];

var list = characters
.filter((player) => ["chess", "checkers"].includes(player.plays))
.map((player) => '<li>' + player.name + '</li>\n')
.reduce((previousValue, currentValue) => previousValue.concat(currentValue), '');
;

console.log(list);