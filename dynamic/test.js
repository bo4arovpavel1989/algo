const chai = require('chai');
const { expect } = chai;
const Dynamic = require('./dynamic');

describe('Dynamic', () => {
  const store = [
    { name: 'name1', price: 1000, weight: 1 },
    { name: 'name2', price: 1500, weight: 1 },
    { name: 'name3', price: 2000, weight: 2 },
    { name: 'name4', price: 2500, weight: 2 },
    { name: 'name5', price: 4000, weight: 3 }
  ];

  it ('should generate optimal for total 4', () => {
    const total = 4;
    const dynamic = new Dynamic(store, total);
    const result = dynamic.getOptimal();

    expect(result.total).to.eql(5500);
    expect(result.staff).to.include.deep.members([
      { name: 'name2', price: 1500, weight: 1 },
      { name: 'name5', price: 4000, weight: 3 }
    ])
  })

  it ('should generate optimal for total 4 and having too heavy staff', () => {
    store.push({ name: 'name6', price: 99999, weight: 10 });

    const total = 4;
    const dynamic = new Dynamic(store, total);
    const result = dynamic.getOptimal();

    expect(result.total).to.eql(5500);
    expect(result.staff).to.include.deep.members([
      { name: 'name2', price: 1500, weight: 1 },
      { name: 'name5', price: 4000, weight: 3 }
    ])

    store.pop();
  })

  it ('should generate optimal for total 4 and having little and expensive', () => {
    store.push({ name: 'name6', price: 99999, weight: 0.5 })

    const total = 4;
    const dynamic = new Dynamic(store, total);
    const result = dynamic.getOptimal();

    expect(result.total).to.eql(103999);
    expect(result.staff).to.include.deep.members([
     { name: 'name6', price: 99999, weight: 0.5 },
     { name: 'name4', price: 2500, weight: 2 },
     { name: 'name2', price: 1500, weight: 1 }
   ]);

    store.pop();
  })
});
