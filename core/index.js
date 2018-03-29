/**
 * Owner: Cheng
 * Date: 27 Mar, 2018
 * --------------------
 * isomorphic implementation of ipv4 converter.
 * Convert an IPv4 address String to a 32-bit integer.
 * For example, given an IP address “172.168.5.1”,
 * the output should be a 32-bit integer with “172” as the highest order 8 bit,
 * 168 as the second highest order 8 bit, 5 as the second lowest order 8 bit,
 * and 1 as the lowest order 8 bit. That is,
 *   "172.168.5.1" => 2896692481
 * Validation:
 *   "172[Space].[Space]168.5.1" is a valid input. Should process the output normally.
 *   "1[Space]72.168.5.1" is not a valid input. Should report an error.
 */
function core(input) {
  const arr = input.split('.')
  const binArr = arr.map(
    compose(
      fixedStrLen(8),
      numToBinString,
      parseDec,
      validateElm
    )
  )
  const binStr = binArr.join('')
  const result = parseInt(binStr, 2)
  return result
}

function validateElm(n) {
  const convertedStr = n.toString().trim()
  if (~convertedStr.indexOf(' ')) {
    throw new Error('invalid input ' + '>>>' + n + '<<<')
  }
  return n
}


function parseDec(n) {
  return parseInt(n, 10)
}

function numToBinString(n) {
  return (n).toString(2)
}

function fixedStrLen(n) {
  return function(str) {
    return (Array(n + 1).join('0') + str).slice(-n)
  }
}

function compose() {
  const fns = Array.prototype.slice.call(arguments)
  return function(n) {
    return fns.reduceRight(
      function (prev, next) {
        if ('function' !== typeof next) {
          return prev
        }
        return next(prev)
      },
      n
    )
  }
}

export default core
