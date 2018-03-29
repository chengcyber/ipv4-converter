(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.convert = factory());
}(this, (function () { 'use strict';

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
  const arr = input.split('.');
  const binArr = arr.map(compose(fixedStrLen(8), numToBinString, parseDec, validateElm));
  const binStr = binArr.join('');
  const result = parseInt(binStr, 2);
  return result;
}

function validateElm(n) {
  const convertedStr = n.toString().trim();

  if (~convertedStr.indexOf(' ')) {
    throw new Error('invalid input ' + '>>>' + n + '<<<');
  }

  return n;
}

function parseDec(n) {
  return parseInt(n, 10);
}

function numToBinString(n) {
  return n.toString(2);
}

function fixedStrLen(n) {
  return function (str) {
    return (Array(n + 1).join('0') + str).slice(-n);
  };
}

function compose() {
  const fns = Array.prototype.slice.call(arguments);
  return function (n) {
    return fns.reduceRight(function (prev, next) {
      if ('function' !== typeof next) {
        return prev;
      }

      return next(prev);
    }, n);
  };
}

return core;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2NvcmUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBPd25lcjogQ2hlbmdcbiAqIERhdGU6IDI3IE1hciwgMjAxOFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIGlzb21vcnBoaWMgaW1wbGVtZW50YXRpb24gb2YgaXB2NCBjb252ZXJ0ZXIuXG4gKiBDb252ZXJ0IGFuIElQdjQgYWRkcmVzcyBTdHJpbmcgdG8gYSAzMi1iaXQgaW50ZWdlci5cbiAqIEZvciBleGFtcGxlLCBnaXZlbiBhbiBJUCBhZGRyZXNzIOKAnDE3Mi4xNjguNS4x4oCdLFxuICogdGhlIG91dHB1dCBzaG91bGQgYmUgYSAzMi1iaXQgaW50ZWdlciB3aXRoIOKAnDE3MuKAnSBhcyB0aGUgaGlnaGVzdCBvcmRlciA4IGJpdCxcbiAqIDE2OCBhcyB0aGUgc2Vjb25kIGhpZ2hlc3Qgb3JkZXIgOCBiaXQsIDUgYXMgdGhlIHNlY29uZCBsb3dlc3Qgb3JkZXIgOCBiaXQsXG4gKiBhbmQgMSBhcyB0aGUgbG93ZXN0IG9yZGVyIDggYml0LiBUaGF0IGlzLFxuICogICBcIjE3Mi4xNjguNS4xXCIgPT4gMjg5NjY5MjQ4MVxuICogVmFsaWRhdGlvbjpcbiAqICAgXCIxNzJbU3BhY2VdLltTcGFjZV0xNjguNS4xXCIgaXMgYSB2YWxpZCBpbnB1dC4gU2hvdWxkIHByb2Nlc3MgdGhlIG91dHB1dCBub3JtYWxseS5cbiAqICAgXCIxW1NwYWNlXTcyLjE2OC41LjFcIiBpcyBub3QgYSB2YWxpZCBpbnB1dC4gU2hvdWxkIHJlcG9ydCBhbiBlcnJvci5cbiAqL1xuZnVuY3Rpb24gY29yZShpbnB1dCkge1xuICBjb25zdCBhcnIgPSBpbnB1dC5zcGxpdCgnLicpXG4gIGNvbnN0IGJpbkFyciA9IGFyci5tYXAoXG4gICAgY29tcG9zZShcbiAgICAgIGZpeGVkU3RyTGVuKDgpLFxuICAgICAgbnVtVG9CaW5TdHJpbmcsXG4gICAgICBwYXJzZURlYyxcbiAgICAgIHZhbGlkYXRlRWxtXG4gICAgKVxuICApXG4gIGNvbnN0IGJpblN0ciA9IGJpbkFyci5qb2luKCcnKVxuICBjb25zdCByZXN1bHQgPSBwYXJzZUludChiaW5TdHIsIDIpXG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbG0obikge1xuICBjb25zdCBjb252ZXJ0ZWRTdHIgPSBuLnRvU3RyaW5nKCkudHJpbSgpXG4gIGlmICh+Y29udmVydGVkU3RyLmluZGV4T2YoJyAnKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbnB1dCAnICsgJz4+PicgKyBuICsgJzw8PCcpXG4gIH1cbiAgcmV0dXJuIG5cbn1cblxuXG5mdW5jdGlvbiBwYXJzZURlYyhuKSB7XG4gIHJldHVybiBwYXJzZUludChuLCAxMClcbn1cblxuZnVuY3Rpb24gbnVtVG9CaW5TdHJpbmcobikge1xuICByZXR1cm4gKG4pLnRvU3RyaW5nKDIpXG59XG5cbmZ1bmN0aW9uIGZpeGVkU3RyTGVuKG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiAoQXJyYXkobiArIDEpLmpvaW4oJzAnKSArIHN0cikuc2xpY2UoLW4pXG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgY29uc3QgZm5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBmbnMucmVkdWNlUmlnaHQoXG4gICAgICBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIG5leHQpIHtcbiAgICAgICAgICByZXR1cm4gcHJldlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0KHByZXYpXG4gICAgICB9LFxuICAgICAgblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb3JlXG4iXSwibmFtZXMiOlsiY29yZSIsImlucHV0IiwiYXJyIiwic3BsaXQiLCJiaW5BcnIiLCJtYXAiLCJjb21wb3NlIiwiZml4ZWRTdHJMZW4iLCJudW1Ub0JpblN0cmluZyIsInBhcnNlRGVjIiwidmFsaWRhdGVFbG0iLCJiaW5TdHIiLCJqb2luIiwicmVzdWx0IiwicGFyc2VJbnQiLCJuIiwiY29udmVydGVkU3RyIiwidG9TdHJpbmciLCJ0cmltIiwiaW5kZXhPZiIsIkVycm9yIiwic3RyIiwiQXJyYXkiLCJzbGljZSIsImZucyIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJyZWR1Y2VSaWdodCIsInByZXYiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBU0EsSUFBVCxDQUFjQyxLQUFkLEVBQXFCO1FBQ2JDLE1BQU1ELE1BQU1FLEtBQU4sQ0FBWSxHQUFaLENBQVo7UUFDTUMsU0FBU0YsSUFBSUcsR0FBSixDQUNiQyxRQUNFQyxZQUFZLENBQVosQ0FERixFQUVFQyxjQUZGLEVBR0VDLFFBSEYsRUFJRUMsV0FKRixDQURhLENBQWY7UUFRTUMsU0FBU1AsT0FBT1EsSUFBUCxDQUFZLEVBQVosQ0FBZjtRQUNNQyxTQUFTQyxTQUFTSCxNQUFULEVBQWlCLENBQWpCLENBQWY7U0FDT0UsTUFBUDs7O0FBR0YsU0FBU0gsV0FBVCxDQUFxQkssQ0FBckIsRUFBd0I7UUFDaEJDLGVBQWVELEVBQUVFLFFBQUYsR0FBYUMsSUFBYixFQUFyQjs7TUFDSSxDQUFDRixhQUFhRyxPQUFiLENBQXFCLEdBQXJCLENBQUwsRUFBZ0M7VUFDeEIsSUFBSUMsS0FBSixDQUFVLG1CQUFtQixLQUFuQixHQUEyQkwsQ0FBM0IsR0FBK0IsS0FBekMsQ0FBTjs7O1NBRUtBLENBQVA7OztBQUlGLFNBQVNOLFFBQVQsQ0FBa0JNLENBQWxCLEVBQXFCO1NBQ1pELFNBQVNDLENBQVQsRUFBWSxFQUFaLENBQVA7OztBQUdGLFNBQVNQLGNBQVQsQ0FBd0JPLENBQXhCLEVBQTJCO1NBQ2pCQSxDQUFELENBQUlFLFFBQUosQ0FBYSxDQUFiLENBQVA7OztBQUdGLFNBQVNWLFdBQVQsQ0FBcUJRLENBQXJCLEVBQXdCO1NBQ2YsVUFBU00sR0FBVCxFQUFjO1dBQ1osQ0FBQ0MsTUFBTVAsSUFBSSxDQUFWLEVBQWFILElBQWIsQ0FBa0IsR0FBbEIsSUFBeUJTLEdBQTFCLEVBQStCRSxLQUEvQixDQUFxQyxDQUFDUixDQUF0QyxDQUFQO0dBREY7OztBQUtGLFNBQVNULE9BQVQsR0FBbUI7UUFDWGtCLE1BQU1GLE1BQU1HLFNBQU4sQ0FBZ0JGLEtBQWhCLENBQXNCRyxJQUF0QixDQUEyQkMsU0FBM0IsQ0FBWjtTQUNPLFVBQVNaLENBQVQsRUFBWTtXQUNWUyxJQUFJSSxXQUFKLENBQ0wsVUFBVUMsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7VUFDaEIsZUFBZSxPQUFPQSxJQUExQixFQUFnQztlQUN2QkQsSUFBUDs7O2FBRUtDLEtBQUtELElBQUwsQ0FBUDtLQUxHLEVBT0xkLENBUEssQ0FBUDtHQURGOzs7Ozs7Ozs7In0=
