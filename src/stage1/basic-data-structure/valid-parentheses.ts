import ArrayStack from './array-stack'

const isValid = (s: string) => {
  const stack = new ArrayStack<string>()

  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '(' || c === '{' || c === '[') {
      stack.push(c)
    } else {
      if (stack.isEmpty()) return false

      const topChar = stack.peek()

      if (c === ')' && topChar !== '(') {
        return false
      }
      if (c === '}' && topChar !== '{') {
        return false
      }

      if (c === ']' && topChar !== '[') {
        return false
      }
      stack.pop()
    }
  }

  return stack.isEmpty()
}

export default isValid
