export default function uniform(a: number, b: number): number {
  return a + Math.floor((b - a) * Math.random())
}
