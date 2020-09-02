export default function bench(
  description: string,
  dataSize: number[],
  fn: (iter: number) => void
) {
  console.log(description + ':')
  for (let i = 0; i < dataSize.length; i++) {
    const startTime = Date.now()
    fn(dataSize[i])
    const endTime = Date.now()
    const time = (endTime - startTime) / 1000
    console.log('n = ' + dataSize[i] + ' ,100 runs ' + time + ' s')
  }
}
