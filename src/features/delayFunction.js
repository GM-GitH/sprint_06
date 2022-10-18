export default function delay(data) {
  const time = 200 + Math.round(Math.random() * 500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}