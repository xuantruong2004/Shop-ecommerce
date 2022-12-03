// const categorys = [
//   {
//     category: "sofa",
//   },
//   {
//     category: "sofa",
//   },
//   {
//     category: "mobile",
//   },
//   {
//     category: "chair",
//   },
//   {
//     category: "chair",
//   },
//   {
//     category: "watch",
//   },
//   {
//     category: "watch",
//   },
// ];

// const obj = categorys.reduce((acc, item) => {
//   if (acc.hasOwnProperty(item.category)) {
//     acc[`${item.category}`] = acc[`${item.category}`] + 1;
//     return acc;
//   } else {
//     acc[`${item.category}`] = 1;
//     return acc;
//   }
// }, {});
// console.log(obj);
// const arr = [];
// for (const entry of Object.entries(obj)) {
//   const [key, value] = entry;
//   arr.push({ name: key, qty: value });
// }
// console.log(arr);

const arr = [
  {
    wireless: 2,
  },
  {
    sofa: 2,
  },
  {
    wireless: 3,
  },
  {
    chair: 5,
  },
];

let obj2 = { sofa: 0, chair: 0, mobile: 0, watch: 0, wireless: 0 };

for (let i = 0; i < arr.length; i++) {
  for (const entry of Object.entries(arr[i])) {
    const [key, value] = entry;
    if (obj2.hasOwnProperty(key)) {
      obj2[`${key}`] = obj2[`${key}`] + value;
    } else {
      obj2[`${key}`] = value;
    }
  }
}
const data = [];
for (const entry of Object.entries(obj2)) {
  const [key, value] = entry;
  data.push({ name: key, qty: value });
}

console.log(data);
