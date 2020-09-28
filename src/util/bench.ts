export default function bench(
  description: string,
  dataSize: number[],
  fn: (iter: number) => void,
  runs: number = 100
) {
  console.log(description + ':')
  for (let i = 0; i < dataSize.length; i++) {
    const startTime = Date.now()
    for (let j = 0; j < runs; j++) {
      fn(dataSize[i])
    }
    const endTime = Date.now()
    const time = (endTime - startTime) / 1000
    console.log(`n = ${dataSize[i]}, ${runs} runs ${time} s`)
  }
}
