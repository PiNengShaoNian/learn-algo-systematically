export default function bench(runs: number[], fn: (iter: number) => void) {
  for (let i = 0; i < runs.length; i++) {
    const startTime = Date.now()
    fn(runs[i])
    const endTime = Date.now()
    const time = (endTime - startTime) / 1000
    console.log('n = ' + runs[i] + ' ,100 runs ' + time + ' s')
  }
}
