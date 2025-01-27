function List() {
  const fruits = [
    { id: 1, name: "apple", cal: 90 },
    { id: 2, name: "banana", cal: 70 },
    { id: 3, name: "orange", cal: 80 },
    { id: 4, name: "coconut", cal: 200 },
    { id: 5, name: "mango", cal: 100 },
  ];

  //   fruits.sort((a,b) => a.name.localeCompare(b.name)); //Alphabetical swap a and b for reverse
  //   fruits.sort((a, b) => a.cal - b.cal); //Numeric order swap a and b for reverse
  //   array.filter(key => *condition*) to add to new array with filter 
  const listItem = fruits.map((fruit) => (
    <li key={fruit.id}>
      {fruit.id} - {fruit.name}: <b>{fruit.cal}</b>
    </li>
  ));
  return <ul>{listItem}</ul>;
}
export default List;
