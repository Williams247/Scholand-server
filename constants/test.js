function doSomething(p1, { object1, object2 }) {
  console.log(p1)
  console.log(object1, object2)
};

doSomething('hello', { object1: 'First object ---- 1', object2: 'Second Object' });
