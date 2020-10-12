function hash(...args: any[]): number {
  if (args.length > 1) {
    return hash(args)
  } else {
    const value = args[0]

    if (value == null) {
      return 0
    }

    if (typeof value == 'boolean') {
      return toInt32(value ? 1231 : 1237)
    } else if (typeof value == 'number') {
      const bits = Number(doubleToInt64Bits(value))
      return toInt32(bits ^ (bits >> 32))
    } else if (typeof value == 'string') {
      let result = 0

      for (let i = 0; i < value.length; i++) {
        result = toInt32(31 * result + value.charCodeAt(i))
      }

      return result
    } else if (
      value instanceof Array ||
      value instanceof Int8Array ||
      value instanceof Uint8Array ||
      value instanceof Int16Array ||
      value instanceof Uint16Array ||
      value instanceof Int32Array ||
      value instanceof Uint32Array ||
      value instanceof BigInt64Array ||
      value instanceof BigUint64Array
    ) {
      let result = 1

      for (const element of value) {
        const hash0 = hash(element)

        if (hash0 == undefined) {
          return 0 & 0xffffffff
        }

        result = toInt32(31 * result + hash0)
      }

      return result
    } else if (value instanceof Map) {
      let result = 0

      for (const entry of value.entries()) {
        const hash0 = hash(entry[0])
        const hash1 = hash(entry[1])

        if (hash0 == undefined || hash1 == undefined) {
          return 0 & 0xffffffff
        }

        result = toInt32(result + (hash0 ^ hash1))
      }

      return result
    } else if (value instanceof Set) {
      let result = 0

      for (const entry of value.values()) {
        const hash0 = hash(entry)

        if (hash0 == undefined) {
          return 0 & 0xffffffff
        }

        result = toInt32(result + hash0)
      }

      return result
    } else if (typeof value == 'object') {
      let result = 0

      for (const entry of Object.entries(value)) {
        const hash0 = hash(entry[0])
        const hash1 = hash(entry[1])

        if (hash0 == undefined || hash1 == undefined) {
          return 0 & 0xffffffff
        }

        result = toInt32(result + (hash0 ^ hash1))
      }

      return result
    } else return 0 & 0xffffffff
  }
}

function toInt32(value: number): number {
  return value & 0xffffffff
}

const arrayBuffer = new ArrayBuffer(8)
const bigInt64Array = new BigInt64Array(arrayBuffer)
const float64Array = new Float64Array(arrayBuffer)

function doubleToInt64Bits(value: number) {
  if (!isNaN(value)) {
    float64Array[0] = value
    return bigInt64Array[0]
  }

  return 0x7ff8000000000000
}

export default hash
