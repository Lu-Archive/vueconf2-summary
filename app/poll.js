/* 轮询条件函数，根据状态执行相应回调
 * @param {Function} fn- 条件函数
 * @param {Function} callback - 成功回调
 * @param {Function} errback - 失败回调
 * @param {int} timeout - 超时间隔
 * @param {int} interval - 轮询间隔
 */
function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;
  
    (function p() {
      // If the condition is met, we're done!
      if(fn()) {
        callback();
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Number(new Date()) < endTime) {
        setTimeout(p, interval);
      }
      // Didn't match and too much time, reject!
      else {
        errback(new Error('timed out for ' + fn + ': ' + arguments));
      }
    })();
  }
  
  // Usage:  ensure element is visible
  poll(
    function() {
      return document.getElementById('lightbox').offsetWidth > 0;
    },
    function() {
      // Done, success callback
    },
    function() {
      // Error, failure callback
    }
  );
  