const makeObjectDeepCopy = (objToCopy) => {
  if (typeof objToCopy !== 'object') {
    return objToCopy;
  }
  let objectCopy = {};
  if (objToCopy instanceof Array) objectCopy = [];

  for (let key in objToCopy) {
    objectCopy[key] = makeObjectDeepCopy(objToCopy[key]);
  }

  return objectCopy;
};
const objectDeepCopy = makeObjectDeepCopy();

const selectFromInterval = (array, intervalStart, intervalEnd) => {
  if (
    array instanceof Array === false ||
    array.some((e) => typeof e !== 'number') ||
    isNaN(intervalStart) ||
    isNaN(intervalEnd)
  )
    throw new Error('Array or intervals values are invalid.');

  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const isStartMoreThanEnd = intervalStart > intervalEnd;
    switch (isStartMoreThanEnd) {
      case true:
        if (element <= intervalStart && element >= intervalEnd) newArray.push(element);
      case false:
        if (element >= intervalStart && element <= intervalEnd) newArray.push(element);
    }
  }
  return newArray;
};

const myIterable = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    this.current = this.from;
    if (this.current > this.to || typeof this.current !== 'number' || typeof this.to !== 'number') {
      throw new Error('Invalid vlue');
    } else {
      return this;
    }
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (const item of myIterable) {
  console.log(item);
}
