export default function delay(data: any) {
  const time = 200 + Math.round(Math.random() * 500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}