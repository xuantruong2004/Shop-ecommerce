const bills = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 3,
  },
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

// const obj = bills.reduce(
//   (acc, bill) =>
//     acc.hasOwnProperty(bill.productId)
//       ? (acc[`${bill.productId}`] = acc[`${bill.productId}`] + bill.quantity)
//       : (acc[`${bill.productId}`] = bill.quantity),
//   {}
// );

const obj = bills.reduce((acc, bill) => {
  if (acc.hasOwnProperty(bill.productId)) {
    acc[`${bill.productId}`] = acc[`${bill.productId}`] + bill.quantity;
    return acc;
  } else {
    acc[`${bill.productId}`] = bill.quantity;
    return acc;
  }
}, {});
console.log(obj);
let max = [0, 0];
for (const entry of Object.entries(obj)) {
  const [key, value] = entry;
  if (max[1] < value) {
    max = [key, value];
  }
}
console.log(max);
// const obj = bills.reduce(
//   (acc, bill) =>
//     acc.hasOwnProperty(bill.productId) ? [...acc, true] : [...acc, false],
//   []
// );
// console.log(obj);

// const abc={
// 	a:"a",
// 	b:"c"
// }
// const d="abc"
// abc[`${d}`]="d"
// console.log(abc);
