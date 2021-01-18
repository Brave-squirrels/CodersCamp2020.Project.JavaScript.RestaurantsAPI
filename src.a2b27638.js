// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"src/add-removeLS.js":[function(require,module,exports) {
//Add restaurant to fav and change the style of stars and Fav view star
var manageLSSingle = function manageLSSingle(objToStore, trigger) {
  if (trigger.checked === false) {
    localStorage.setItem(objToStore.id, JSON.stringify(objToStore));
    trigger.checked = true;
  } else if (trigger.checked === true) {
    localStorage.removeItem(objToStore.id);
    trigger.checked = false;
  }
}; //Add listener to star in fav and change single res star style and remove from localStorage using ID of object (stored in value of star)
//By trigger param pass e.target


var manageLSFav = function manageLSFav(objId, trigger) {
  var secondStar = trigger.id.replace('fav', '');
  var secondChk = document.querySelector("#".concat(CSS.escape(secondStar)));

  if (!trigger.checked) {
    localStorage.removeItem(secondStar);

    if (secondChk) {
      secondChk.checked = false;
    }
  }
};

module.exports = {
  manageLSSingle: manageLSSingle,
  manageLSFav: manageLSFav
};
},{}],"node_modules/node-fetch/browser.js":[function(require,module,exports) {

"use strict"; // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

if (global.fetch) {
  exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
},{}],"src/cookies.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @param {array} restaurants - array of restaurants
 * 
 * @add restaurants to cookies
 */
var saveInfo = function saveInfo(restaurants) {
  var nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);

  var _iterator = _createForOfIteratorHelper(restaurants),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var restaurant = _step.value;
      var name = restaurant.id;
      var cookie = name + "=" + JSON.stringify(restaurant) + ";path=/;expires=" + nextDay;
      document.cookie = cookie;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
/**
 * @return array of cookies as single objects
 */


var arrayOfCookies = function arrayOfCookies() {
  var cookiesArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var cookies = document.cookie.split('; ');
  cookies.forEach(function (cookie) {
    cookie = cookie.slice(cookie.indexOf('=') + 1);
    cookiesArray.push(JSON.parse(cookie));
  });
  return cookiesArray;
};
/**
 * @delete all of the cookies from cookies
 */


var deleteFirstCity = function deleteFirstCity(cityName) {
  var cookies = arrayOfCookies();
  cookies.forEach(function (cookie) {
    if (cookie.city === cityName) {
      var name = cookie.id;
      document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  });
};
/**
 * 
 * @param {string} cityName - name of the city from users input
 * 
 * @check if restaurants from current city are saved in cookies
 * @check if there are no cookies, check if no more than 2 different cities are save in cookies, if yes, delete both (error 431)
 */


var checkCookies = function checkCookies(cityName) {
  if (document.cookie.includes(cityName)) {
    var check = 0;
    var cookies = arrayOfCookies();
    cookies.forEach(function (cookie) {
      if (cookie.city === cityName) {
        ++check;
      }

      ;
    });
    if (check > 0) return true;
  } else if (document.cookie.includes('=')) {
    var _cookies = arrayOfCookies();

    var cityNames = [];

    _cookies.forEach(function (cookie) {
      if (cityNames[0] !== cookie.city) {
        cityNames.push(cookie.city);
      }

      if (cityNames.length === 2) {
        deleteFirstCity(cityNames[0]);
        return false;
      }
    });
  }
};
/**
 * 
 * @param {string} cityName - name of the city
 * @param {array} restaurants - array of restaurants
 * 
 * @fetch data about restaurants from cookies
 * @return array of restaurants filled with data of restaurants from current city
 */


var getCookies = function getCookies(cityName) {
  var restaurants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var cookies = arrayOfCookies();
  cookies.forEach(function (cookie) {
    if (cookie.city === cityName) {
      restaurants.push(cookie);
      return;
    }
  });
  return restaurants;
};

module.exports = {
  saveInfo: saveInfo,
  checkCookies: checkCookies,
  getCookies: getCookies
};
},{}],"src/restaurants-api.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetch = require('node-fetch');

var _require = require('./cookies'),
    saveInfo = _require.saveInfo,
    checkCookies = _require.checkCookies,
    getCookies = _require.getCookies;
/**
 * @declare class Restaurant with basic informations about it inside
 */


var Restaurant = function Restaurant(id, name, logo, cuisines, priceRaiting, address, phone, rating, reviews, city) {
  _classCallCheck(this, Restaurant);

  this.id = id, this.name = name, this.logo = logo, this.cuisines = cuisines, this.priceRaiting = priceRaiting, this.address = address, this.phone = phone, this.rating = rating, this.reviews = reviews, this.city = city;
};
/**
 * 
 * @param {string} url - a url addres to api 
 * 
 * @fetch JSON from api url
 * 
 * @return JSON of fetched data 
 */


var fetchData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              headers: {
                'Content-type': 'application/json',
                'user-key': '63106852ba4b223bc312eb4f6606cbe3'
              }
            }).then(function (res) {
              return res.json();
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchData(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 
 * @param {string} url - addres url to api
 * 
 * @fetch cityname based on user input (might also find weird cities from all over the world)
 * @check if city was found, or sadly the api do not include it
 * 
 * @return cityname found in api
 */


var fetchCity = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var res, cityId, _cityId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchData(url);

          case 2:
            res = _context2.sent;

            if (!(res.location_suggestions[0] == undefined)) {
              _context2.next = 8;
              break;
            }

            cityId = undefined;
            return _context2.abrupt("return", cityId);

          case 8:
            _cityId = res.location_suggestions[0].city_id;
            return _context2.abrupt("return", _cityId);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchCity(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 
 * @param {string} url
 * 
 * @fetch info about restaurants in current city
 * 
 * @return array of restaurants with basic info
 */


var fetchRestaurants = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
    var addRestaurant, result, restaurantsFromCity, _iterator, _step, item;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            addRestaurant = function addRestaurant(item) {
              var restaurant = new Restaurant(item.restaurant.id, item.restaurant.name, item.restaurant.featured_image, item.restaurant.cuisines, item.restaurant.price_range, item.restaurant.location.address, item.restaurant.phone_numbers, item.restaurant.user_rating.aggregate_rating, [], replacePolishChar(item.restaurant.location.city));
              restaurantsFromCity.push(restaurant);
            };

            _context3.next = 3;
            return fetchData(url);

          case 3:
            result = _context3.sent;
            restaurantsFromCity = [];
            _iterator = _createForOfIteratorHelper(result.restaurants);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                item = _step.value;
                addRestaurant(item);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context3.abrupt("return", restaurantsFromCity);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchRestaurants(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 
 * @param {string} getCityName - current input from user (perhaps a city name)
 * 
 * @replace polish and uppercase letters to 'normal' lowercase
 * 
 * @retun replaced string
 */


var replacePolishChar = function replacePolishChar(getCityName) {
  var cityName = getCityName.replace(/ą/gi, 'a').replace(/ć/gi, 'c').replace(/ę/gi, 'e').replace(/ł/gi, 'l').replace(/ń/gi, 'n').replace(/ó/gi, 'o').replace(/ś/gi, 's').replace(/ż/gi, 'z').replace(/ź/gi, 'z');
  cityName = cityName.toLowerCase();
  return cityName;
};
/**
 * 
 * @param {string} getCityNames - input from user (perhaps a city name)
 * 
 * @check check if input actually might be a cityname, not a number, or some different weird stuff
 * 
 * @retun true if it is propably correct city name, false otherwise 
 */


var validateTown = function validateTown(getCityNames) {
  var format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
  return isNaN(getCityNames) && getCityNames.length !== 0 && !format.test(getCityNames);
};
/**
 * 
 * @param {string} getCityName - input from user (perhaps a cityname)
 * 
 * @check if string from input is actually a valid cityname
 * @check if its valid, check if restaurants from this city are saved in cookies
 * @check if yes return data from cookies
 * @check if no, make sure, the city we are looking for, exists in api
 * @fetch If it exists, fetch info about restaurants from api, if no, return error message
 * 
 * @retun return array with restaurats
 */


var mainFunc = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(getCityName) {
    var cityName, ValidateCity, checkCookie, restaurants, cityId, _restaurants;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return replacePolishChar(getCityName);

          case 2:
            cityName = _context4.sent;
            _context4.next = 5;
            return validateTown(cityName);

          case 5:
            ValidateCity = _context4.sent;

            if (ValidateCity) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", ['incorrect syntax']);

          case 8:
            _context4.next = 10;
            return checkCookies(cityName);

          case 10:
            checkCookie = _context4.sent;

            if (!checkCookie) {
              _context4.next = 18;
              break;
            }

            _context4.next = 14;
            return getCookies(cityName);

          case 14:
            restaurants = _context4.sent;
            return _context4.abrupt("return", restaurants);

          case 18:
            _context4.next = 20;
            return fetchCity("https://developers.zomato.com/api/v2.1/locations?query=".concat(cityName));

          case 20:
            cityId = _context4.sent;

            if (!(cityId === undefined)) {
              _context4.next = 23;
              break;
            }

            return _context4.abrupt("return", ['city does not exist']);

          case 23:
            _context4.next = 25;
            return fetchRestaurants("https://developers.zomato.com/api/v2.1/search?entity_id=".concat(cityId, "&entity_type=city"));

          case 25:
            _restaurants = _context4.sent;
            _context4.next = 28;
            return saveInfo(_restaurants);

          case 28:
            return _context4.abrupt("return", _restaurants);

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function mainFunc(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 
 * @param {string} restaurantId - id from api about current restaurant
 * @param {array} restaurants - array of restaurants
 * 
 * @fetch data about reviews for current restaurant, from api
 * @add reviews to current restaurant (based on id)
 * 
 * @return restaurants array with current restaurant updated by reviews
 */


var fetchUserReviews = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(restaurantId, restaurants) {
    var listOfReviews, result, _iterator2, _step2, item;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            listOfReviews = [];
            _context5.next = 3;
            return fetchData("https://developers.zomato.com/api/v2.1/reviews?res_id=".concat(restaurantId));

          case 3:
            result = _context5.sent;
            _iterator2 = _createForOfIteratorHelper(result.user_reviews);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                item = _step2.value;

                if (item.review.review_text != '') {
                  listOfReviews.push({
                    textReview: item.review.review_text,
                    ratingReview: item.review.rating
                  });
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            ;
            restaurants.forEach(function (restaurant) {
              if (restaurant.id == restaurantId) {
                restaurant.reviews = [].concat(listOfReviews);
                return;
              }
            });
            return _context5.abrupt("return", restaurants);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function fetchUserReviews(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * @export functions - exports functions for frontend purposes
 */


module.exports = {
  mainFunc: mainFunc,
  fetchUserReviews: fetchUserReviews
};
},{"node-fetch":"node_modules/node-fetch/browser.js","./cookies":"src/cookies.js"}],"src/feature-pagination.js":[function(require,module,exports) {
//Setup for one page
var state = {
  //Elements on page
  'pageSize': 3,
  //On which page it starts
  'pageNumber': 1
};

var resetState = function resetState() {
  state.pageSize = 3;
  state.pageNumber = 1;
}; //Generate slice of the array that we wanna display (depends on setup in state object)


var paginate = function paginate(obj, pageSize, pageNumber) {
  var current = (pageNumber - 1) * pageSize;
  var endData = current + pageSize;
  return obj.slice(current, endData);
}; //Generate buttons depending on which page we are


var generatePage = function generatePage(arr, btnContainer) {
  var maxPage = Math.ceil(arr.length / state.pageSize);

  if (arr.length <= state.pageSize) {
    //Delete buttons and back to the first page when elements are less or equal of max elements per page
    btnContainer.innerHTML = '';
    state.pageNumber = 1;
  } else {
    btnContainer.innerHTML = state.pageNumber === 1 ? "<button id='btn2'>Next page</button>" : state.pageNumber === maxPage ? "<button id='btn1'>Previous page</button>" : "<button id='btn1'>Previous page</button> <button id='btn2'>Next page</button>";
  }
}; //Update DOM by appending current data


var appendData = function appendData(result, arr, btnContainer, dataContainer) {
  generatePage(arr, btnContainer);
  dataContainer.innerHTML = result.join(" ");
}; //Default data when reloading the site - envoke this in filter/search function as a setup


var append = function append(arr, btnContainer, dataContainer) {
  appendData(paginate(arr, state.pageSize, state.pageNumber), arr, btnContainer, dataContainer);
}; //Switch pages events


var generateBtn = function generateBtn(e) {
  if (e.target && e.target.id == 'btn2') {
    state.pageNumber += 1;
  } else if (e.target && e.target.id == 'btn1') {
    state.pageNumber -= 1;
  }
};

module.exports = {
  generateBtn: generateBtn,
  append: append,
  resetState: resetState
};
},{}],"src/validate.js":[function(require,module,exports) {
var notValid = function notValid(inputDOM) {
  inputDOM.classList.add("invalid");
  setTimeout(function () {
    inputDOM.classList.remove('invalid');
  }, 500);
};

module.exports = notValid;
},{}],"src/templates.js":[function(require,module,exports) {
//Template for navigation
var navTemplate = function navTemplate(obj, arr) {
  arr.push("<div id='resDiv' class='resDiv' data-name=\"".concat(obj.id, "\">\n                <span class='resTitle' data-name=\"").concat(obj.id, "\">\n                    ").concat(obj.name, "\n                </span>\n                <span class='resCs' data-name=\"").concat(obj.id, "\">\n                    ").concat(obj.address, "\n                </span>\n                <span class='resAdr' data-name=\"").concat(obj.id, "\">\n                    ").concat(obj.rating, "\n                </span>\n                <div class='imgArrow' data-name=\"").concat(obj.id, "\">\n                    <img src=\"//cdn.clipartsfree.net/vector/small/50542-right-grey-arrow-icon.png\" alt=\"\" class='resImg' data-name=\"").concat(obj.id, "\">\n                </div>\n            </div>"));
}; //Template for restaurant main info


var resBasicInfoTemplate = function resBasicInfoTemplate(resObj) {
  var checkbox = "";

  if (localStorage.getItem(resObj.id) !== null) {
    checkbox = " <input type=\"checkbox\" name=\"starFav\" class=\"starFavInput\" id='".concat(resObj.id, "' value='").concat(resObj.id, "' checked>\n        <label  class=\"starFav\" for='").concat(resObj.id, "' id='").concat(resObj.id, "' ></label>");
  } else {
    checkbox = " <input type=\"checkbox\" name=\"starFav\" class=\"starFavInput\" id='".concat(resObj.id, "'  value='").concat(resObj.id, "'>\n        <label  class=\"starFav\" for='").concat(resObj.id, "' id='").concat(resObj.id, "'></label>");
  }

  var RestaurantPriceRating;

  switch (resObj.priceRaiting) {
    case 1:
      RestaurantPriceRating = '$';
      break;

    case 2:
      RestaurantPriceRating = '$$';
      break;

    case 3:
      RestaurantPriceRating = '$$$';
      break;

    case 4:
      RestaurantPriceRating = '$$$$';
      break;

    default:
      RestaurantPriceRating = '';
      break;
  }

  return "\n    <div class=\"restaurantInfo\">\n\n        <img src=\"https://www.eldynamic.com/en/img/restaurant.jpeg\" alt=\"restauration\" class='restaurantImg'>\n        <div class=\"restaurantIntro\">\n\n        <span class='restaurantName'>\n            ".concat(resObj.name, "\n        </span>\n\n        <span class='restaurantAdress'>\n            ").concat(resObj.address, "\n        </span>\n        \n\n        </div>\n        \n        ").concat(checkbox, "\n        \n        <div id='cross' class='cross'>\u2715</div>\n        \n    </div>\n    <div class=\"restaurantAvg\">\n\n        <span class='restaurantAvgRating'>\n            <span>Average rating:</span> ").concat(resObj.rating, "\n        </span>\n\n        <span class='restaurantAvgCost'>\n            <span>Price rating:</span> ").concat(RestaurantPriceRating, "\n        </span>\n    </div>\n\n    <button id='displayReviews' class='displayReviews'>Reviews</button>\n    ");
}; //Template for restaurant reviews


var resReviewInfoTemplate = function resReviewInfoTemplate(obj) {
  var templateString = "";

  if (obj.length === 0) {
    templateString = "\n        <div class='noRevFound'>\n            There's no reviews for this restaurant\n        </div>\n        ";
  } else {
    var tempString = "";
    obj.reviews.forEach(function (n) {
      tempString += "\n                <div class=\"singleReview\">\n                    <span class=\"dish\">\n                        ".concat(n.textReview, "\n                    </span>\n                    <span class=\"cost\">\n                        Rate: ").concat(n.ratingReview, "/5\n                    </span>\n                </div>\n            ");
    });
    templateString = "\n        <div id=\"reviews\">\n        <div class='reviews'>\n            <span class=\"reviewsTitle\">\n                Reviews\n            </span>\n            ".concat(tempString, "\n        </div>\n        </div>\n        ");
  }

  return templateString;
};

module.exports = {
  navTemplate: navTemplate,
  resBasicInfoTemplate: resBasicInfoTemplate,
  resReviewInfoTemplate: resReviewInfoTemplate
};
},{}],"src/single-res-view.js":[function(require,module,exports) {
var _require = require('./restaurants-api'),
    mainFunc = _require.mainFunc,
    fetchUserReviews = _require.fetchUserReviews;

var _require2 = require('./templates'),
    navTemplate = _require2.navTemplate,
    resBasicInfoTemplate = _require2.resBasicInfoTemplate,
    resReviewInfoTemplate = _require2.resReviewInfoTemplate;

var _require3 = require('./add-removeLS'),
    manageLSSingle = _require3.manageLSSingle,
    manageLSFav = _require3.manageLSFav; //display restaurant function


var displayRestaurant = function displayRestaurant(result, resId) {
  var resCnt = document.querySelector('article');
  var firstSectionCnt = document.querySelector('#restaurantFirst');
  var revCnt = document.querySelector('#restaurantSpecificInfo');
  resCnt.style.display = 'block';
  revCnt.innerHTML = ''; //Take the restaurant with this ID from result

  var objOfReviews = [];
  result.map(function (n) {
    if (n.id === resId) {
      objOfReviews = n;
    }
  }); //Append the base data

  firstSectionCnt.innerHTML = resBasicInfoTemplate(objOfReviews); //Handle review show button

  var revButton = document.querySelector('#displayReviews');
  revCnt.classList.remove('revDisplayed');
  revButton.addEventListener('click', function () {
    revCnt.style.display = 'grid';

    if (revCnt.classList.contains('revDisplayed')) {
      revCnt.style.display = 'none';
      revCnt.classList.remove('revDisplayed');
      resCnt.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      revCnt.innerHTML = resReviewInfoTemplate(objOfReviews);
      revCnt.classList.add('revDisplayed');
      revCnt.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
  document.addEventListener('click', function (e) {
    var trigger = document.querySelector("#".concat(CSS.escape(objOfReviews.id)));

    if (e.target.id == objOfReviews.id) {
      manageLSSingle(objOfReviews, trigger);
    }
  });
};

module.exports = displayRestaurant;
},{"./restaurants-api":"src/restaurants-api.js","./templates":"src/templates.js","./add-removeLS":"src/add-removeLS.js"}],"src/filter-nav.js":[function(require,module,exports) {
//Append filters to DOM
var addFilterContent = function addFilterContent(object, dom) {
  var currentFilters = object.slice(0, 6);
  dom.innerHTML = '';
  currentFilters.forEach(function (n) {
    dom.innerHTML += n;
  });

  if (object.length <= 6) {
    return;
  } else {
    var restFiltersCnt = document.querySelector('#restOfTheFilters');
    var restFilters = object.slice(7, object.length - 1);
    restFiltersCnt.innerHTML = '';
    restFilters.forEach(function (n) {
      restFiltersCnt.innerHTML += n;
    });
  }
}; //Display or hide rest of the filters


var filterNav = function filterNav(dom) {
  var filterButton = document.querySelector('#filterBtn');
  var restFiltersCnt = document.querySelector('#restOfTheFilters');
  var clicked = 0;
  filterButton.addEventListener('click', function () {
    if (clicked === 0) {
      restFiltersCnt.style.transform = 'translateY(0)';
      restFiltersCnt.style.visibility = 'visible';
      filterButton.style.transform = 'translateY(0)';
      filterButton.style.transition = 'all 0.3s ease-out;';
      restFiltersCnt.style.transition = 'all 0.3s ease-out;';
      restFiltersCnt.style.zIndex = '999';
      filterButton.innerHTML = 'Hide';
      clicked++;
    } else if (clicked === 1) {
      restFiltersCnt.style.transform = 'translateY(-100%)';
      restFiltersCnt.style.visibility = 'hidden';
      filterButton.style.transform = 'translateY(-100%)';
      filterButton.style.transition = 'all 0.3s ease-out;';
      restFiltersCnt.style.transition = 'all 0.3s ease-out;';
      restFiltersCnt.style.zIndex = '-9999';
      filterButton.innerHTML = 'Show more filters';
      clicked--;
    }
  });
};

module.exports = {
  filterNav: filterNav,
  addFilterContent: addFilterContent
};
},{}],"src/search-view.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//Importing main function
var _require = require('./restaurants-api'),
    mainFunc = _require.mainFunc,
    fetchUserReviews = _require.fetchUserReviews;

var _require2 = require('./feature-pagination'),
    generateBtn = _require2.generateBtn,
    append = _require2.append,
    resetState = _require2.resetState;

var notValid = require('./validate');

var displayRestaurant = require('./single-res-view');

var _require3 = require('./templates'),
    navTemplate = _require3.navTemplate,
    resBasicInfoTemplate = _require3.resBasicInfoTemplate,
    resReviewInfoTemplate = _require3.resReviewInfoTemplate;

var _require4 = require('./filter-nav'),
    filterNav = _require4.filterNav,
    addFilterContent = _require4.addFilterContent; //Display data when click on search button


function display(e) {
  resetState(); //Prevent from reloading page on submit 

  e.preventDefault(); //Get DOM elements

  var val = document.querySelector('#townSearch');
  var container = document.querySelector('nav');
  var mainSection = document.querySelector('main');
  mainSection.style.height = '80%'; //Resets container by default

  container.style.display = 'none';
  var resCnt = document.querySelector('article');
  resCnt.style.display = 'none'; //Format the input

  var inputValue = val.value.trim();
  var loading = document.querySelector("#loading");
  loading.style.display = 'flex'; //Add value of checkbox here where is empty array

  mainFunc(inputValue).then(function (result) {
    //Reset DOM
    var buttons = document.querySelector('#paginationContainer');
    var divData = document.querySelector('#restaurantsNavCon');
    var filter = document.querySelector('#filterRestaurants');
    var filterViewCnt = document.querySelector('#restOfTheFilters');
    var filterBtn = document.querySelector('#filterBtn');
    filterBtn.innerHTML = 'Show more filters';
    mainSection.style.height = '86%';
    var navData = []; //Validation

    if (result[0] === 'incorrect syntax') {
      notValid(val);
      mainSection.style.height = '80%';
    } else if (result[0] === 'city does not exist') {
      container.style.display = 'grid';
      divData.style.display = 'none';
      buttons.style.display = 'none';
      filter.style.display = 'none';
      container.innerHTML += "\n                        <div class='townNotFound'>\n                            Sorry, we can't find the restaurants in <br> <br> ".concat(inputValue, "\n                        </div>\n                    "); //Scroll to the nav after submit

      container.scrollIntoView();
    } else {
      if (container.contains(document.querySelector('.townNotFound'))) {
        container.removeChild(document.querySelector('.townNotFound'));
      }

      divData.innerHTML = '';
      buttons.innerHTML = '';
      filter.innerHTML = '';
      divData.style.display = 'grid';
      buttons.style.display = 'flex';
      filter.style.display = 'grid'; //Creating templates with data and pushing into array

      container.style.display = 'grid';
      result.forEach(function (element) {
        //data-name - get this on click and base on that display restaurant
        navTemplate(element, navData);
      }); //Default append data on the first site

      append(navData, buttons, divData); //Get the array of all cuisines in the city

      var cuisinesAll = [];
      result.forEach(function (element) {
        var cuisinesSplit = element.cuisines.split(',');
        cuisinesSplit.forEach(function (cuisine) {
          if (!cuisinesAll.includes(cuisine.trim()) && cuisine.length >= 3) {
            cuisinesAll.push(cuisine.trim());
          }
        });
      });
      var arrayOfHTML = []; //Display filters

      cuisinesAll.forEach(function (element) {
        arrayOfHTML.push("\n                        <label for=\"".concat(element, "\" id=\"filterLabel\" class='container'>").concat(element, "\n                        <input type=\"checkbox\" id=\"").concat(element, "\" name=\"cuisineFilter\" value=\"").concat(element, "\" class=\"chkId\">\n                        <span class='checkmark'></span>\n                        </label>\n                    "));
      }); //Saving the array of data

      var savedNavData = navData;

      var filterRestaurants = function filterRestaurants(e) {
        //Checking target of the event
        if (e.target.className === 'chkId') {
          resetState();
          var filterArray = []; //Getting all the checkboxes

          var checkedValues = document.querySelectorAll('.chkId'); //Pushing all checked value into the array

          _toConsumableArray(checkedValues).forEach(function (element) {
            if (element.checked) {
              filterArray.push(element.value);
            }
          });

          var tmpNavData = []; //Getting restaurants with matching cuisines

          result.forEach(function (element) {
            var splitArr = element.cuisines.split(',');
            var formatedArr = splitArr.map(function (el) {
              return el.trim();
            });
            var rez = filterArray.some(function (r) {
              return formatedArr.includes(r);
            });

            if (rez) {
              navTemplate(element, tmpNavData);
            }
          }); //Resets data to default when unchecked

          if (tmpNavData.length === 0) {
            var check = true;

            _toConsumableArray(checkedValues).forEach(function (element) {
              if (element.checked) {
                check = false;
              }
            });

            if (check === true) {
              navData = savedNavData;
            } else {
              navData = [];
            }
          } else {
            navData = tmpNavData;
          } //Displaying filtered data and generate new buttons


          generateBtn(e);
          append(navData, buttons, divData);
        }
      }; //AppendFilters


      addFilterContent(arrayOfHTML, filter); //Hide and show more filters

      filterNav(filter); //Run filter

      document.addEventListener('click', filterRestaurants); //To append pass array with data, element that will contain the buttons, element that will contain data
      //Add event to generate buttons

      document.addEventListener('click', function (e) {
        generateBtn(e);
        append(navData, buttons, divData);
      }); //Event for display single restaurant

      document.addEventListener('click', function (e) {
        var resDiv = document.querySelector('#resDiv');

        if (e.target.id === 'resDiv' || resDiv.contains(e.target) || e.target.className === 'imgArrow' || e.target.className === 'resImg') {
          var resId = e.target.dataset.name;
          var allRest = document.querySelector('#restaurantsNavCon');
          var pageButt = document.getElementById('paginationContainer');

          var _loading = document.querySelector("#loading");

          _loading.style.display = 'flex'; //Fetching reviews and passing into display function

          fetchUserReviews(resId, result).then(function (res) {
            // resCnt.style.display = 'none';
            displayRestaurant(res, resId); // singleRest.style.animationName = 'slideOff';

            var singleRest = document.querySelector('article');
            singleRest.style.display = 'block';
            allRest.style.display = 'none';
            pageButt.style.display = 'none';
            _loading.style.display = 'none';
          });
        }
      }); //Close single restaurant view and show all restaurants

      document.addEventListener('click', function (e) {
        if (e.target.id === 'cross') {
          var allRest = document.getElementById('restaurantsNavCon');
          var pageButt = document.getElementById('paginationContainer');
          var singleRest = document.querySelector('article');
          singleRest.style.display = 'none';
          allRest.style.display = 'grid';
          pageButt.style.display = 'flex';
        }
      }); //Scroll to the nav after submit

      container.scrollIntoView({
        behavior: 'smooth'
      });
    }

    loading.style.display = 'none';
  });
} //Exporting main function


module.exports = display;
},{"./restaurants-api":"src/restaurants-api.js","./feature-pagination":"src/feature-pagination.js","./validate":"src/validate.js","./single-res-view":"src/single-res-view.js","./templates":"src/templates.js","./filter-nav":"src/filter-nav.js"}],"src/nav-bar.js":[function(require,module,exports) {
var displayFav = function displayFav(e) {
  var favList = document.querySelector('aside');
  var openList = document.querySelector('#favIcon');
  var closeList = document.querySelector('#closeFav'); //Open favList

  if (e.target.id === 'favIcon') {
    if (window.innerWidth < 1000) {
      favList.style.width = '100%';
    } else {
      favList.style.width = '45%';
    }

    favList.style.right = '0';
  } //Close favList
  else if (e.target.id === 'closeFav' || favList !== e.target && !favList.contains(e.target)) {
      favList.style.width = '0';
      favList.style.right = '-4em';
    }
};

module.exports = displayFav;
},{}],"src/feature-file-save.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @param {array} restaurants 
 * 
 * @download basic info about favourite restaurants as txt file
 */
var createTxtFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(restaurants) {
    var download, text;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            download = function _download(filename, text) {
              var element = document.createElement('a');
              element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
              element.setAttribute('download', filename);
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            };

            if (!(restaurants[0] === undefined)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            text = "";
            restaurants.forEach(function (restaurant) {
              text += "Restaurant name: ".concat(restaurant.name, "\nRestaurant Rating: ").concat(restaurant.rating, "\nRestaurant Address: ").concat(restaurant.address, "\nRestaurant Phone: ").concat(restaurant.phone, "\nRestaurant Cuisines: ").concat(restaurant.cuisines, "\n\n\n");
            }); // Start file download.

            download('MyFavouriteRestaurants.txt', text);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTxtFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = createTxtFile;
},{}],"src/manageFav.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./add-removeLS'),
    manageLSSingle = _require.manageLSSingle,
    manageLSFav = _require.manageLSFav;

var createTxtFile = require('./feature-file-save');

var displayRestaurant = require('./single-res-view');

var _require2 = require('./restaurants-api'),
    mainFunc = _require2.mainFunc,
    fetchUserReviews = _require2.fetchUserReviews;

var _require3 = require('./feature-pagination'),
    generateBtn = _require3.generateBtn,
    append = _require3.append,
    resetState = _require3.resetState;

var _require4 = require('./templates'),
    navTemplate = _require4.navTemplate,
    resBasicInfoTemplate = _require4.resBasicInfoTemplate,
    resReviewInfoTemplate = _require4.resReviewInfoTemplate;

var _require5 = require('./filter-nav'),
    filterNav = _require5.filterNav,
    addFilterContent = _require5.addFilterContent;

var notValid = require('./validate'); //Main function


var manageFav = function manageFav() {
  //Getting all the keys from LS
  var dataArr = [];
  var values = [];
  var keys = Object.keys(localStorage); //Getting all of the objects

  for (var i = 0; i < keys.length; i++) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  } //Pushing HTML template of every object in LS


  var favCnt = document.querySelector('#favourites');
  var noFav = document.querySelector('#noFav');
  favCnt.innerHTML = '';
  noFav.innerHTML = '';

  if (values.length === 0) {
    noFav.innerHTML = "\n            <h1>No favourites yet</h1>\n            <div>Search for restaurants to find what you like!</div>\n        ";
    return;
  } else {
    values.forEach(function (n) {
      dataArr.push("\n        <div id='resDivFav' class='resDivFav' data-name=\"".concat(n.id, "\" >\n            <span class='resTitle' id='").concat(n.id, "fav' data-name=\"").concat(n.city, "\">\n                ").concat(n.name, "\n            </span>\n            <span class='resCs'>\n                ").concat(n.address, "\n            </span>\n            <span class='resAdr'>\n                ").concat(n.rating, "\n            </span>\n            <div class='addFav'>\n                <input type=\"checkbox\" name=\"starFav\" class=\"starFavInput\" id='").concat(n.id, "fav' value='").concat(n.id, "fav' checked>\n                <label  class=\"starFavLabel\" for='").concat(n.id, "fav' id='").concat(n.id, "fav' ></label>\n            </div>\n        </div>"));
    }); //Adding event listener to remove fav and link to restaurant onclick

    document.addEventListener('click', function (e) {
      if (e.target.className === 'starFavLabel') {
        manageLSFav(e.target.id, e.target);
        manageFav();
      } else if (e.target.className === 'resTitle') {
        resetState(); //Prevent from reloading page on submit 
        //Get DOM elements

        var val = document.querySelector('#townSearch');
        var container = document.querySelector('nav');
        var mainSection = document.querySelector('main');
        mainSection.style.height = '80%'; //Resets container by default

        container.style.display = 'none';
        var resCnt = document.querySelector('article');
        resCnt.style.display = 'none'; //Format the input

        var inputValue = val.value.trim();
        var loading = document.querySelector("#loading");
        loading.style.display = 'flex';
        mainFunc(e.target.dataset.name).then(function (result) {
          //Reset DOM
          var buttons = document.querySelector('#paginationContainer');
          var divData = document.querySelector('#restaurantsNavCon');
          var filter = document.querySelector('#filterRestaurants');
          var filterViewCnt = document.querySelector('#restOfTheFilters');
          var filterBtn = document.querySelector('#filterBtn');
          filterBtn.innerHTML = 'Show more filters';
          mainSection.style.height = '86%';
          var navData = []; //Validation

          if (result[0] === 'incorrect syntax') {
            notValid(val);
            mainSection.style.height = '80%';
          } else if (result[0] === 'city does not exist') {
            container.style.display = 'grid';
            divData.style.display = 'none';
            buttons.style.display = 'none';
            filter.style.display = 'none';
            container.innerHTML += "\n                                <div class='townNotFound'>\n                                    Sorry, we can't find the restaurants in <br> <br> ".concat(inputValue, "\n                                </div>\n                            "); //Scroll to the nav after submit

            container.scrollIntoView();
          } else {
            if (container.contains(document.querySelector('.townNotFound'))) {
              container.removeChild(document.querySelector('.townNotFound'));
            }

            divData.innerHTML = '';
            buttons.innerHTML = '';
            filter.innerHTML = '';
            divData.style.display = 'grid';
            buttons.style.display = 'flex';
            filter.style.display = 'grid'; //Creating templates with data and pushing into array

            container.style.display = 'grid';
            result.forEach(function (element) {
              //data-name - get this on click and base on that display restaurant
              navTemplate(element, navData);
            }); //Default append data on the first site

            append(navData, buttons, divData); //Get the array of all cuisines in the city

            var cuisinesAll = [];
            result.forEach(function (element) {
              var cuisinesSplit = element.cuisines.split(',');
              cuisinesSplit.forEach(function (cuisine) {
                if (!cuisinesAll.includes(cuisine.trim()) && cuisine.length >= 3) {
                  cuisinesAll.push(cuisine.trim());
                }
              });
            });
            var arrayOfHTML = []; //Display filters

            cuisinesAll.forEach(function (element) {
              arrayOfHTML.push("\n                                <label for=\"".concat(element, "\" id=\"filterLabel\" class='container'>").concat(element, "\n                                <input type=\"checkbox\" id=\"").concat(element, "\" name=\"cuisineFilter\" value=\"").concat(element, "\" class=\"chkId\">\n                                <span class='checkmark'></span>\n                                </label>\n                            "));
            }); //Saving the array of data

            var savedNavData = navData;

            var filterRestaurants = function filterRestaurants(e) {
              //Checking target of the event
              if (e.target.className === 'chkId') {
                resetState();
                var filterArray = []; //Getting all the checkboxes

                var checkedValues = document.querySelectorAll('.chkId'); //Pushing all checked value into the array

                _toConsumableArray(checkedValues).forEach(function (element) {
                  if (element.checked) {
                    filterArray.push(element.value);
                  }
                });

                var tmpNavData = []; //Getting restaurants with matching cuisines

                result.forEach(function (element) {
                  var splitArr = element.cuisines.split(',');
                  var formatedArr = splitArr.map(function (el) {
                    return el.trim();
                  });
                  var rez = filterArray.some(function (r) {
                    return formatedArr.includes(r);
                  });

                  if (rez) {
                    navTemplate(element, tmpNavData);
                  }
                }); //Resets data to default when unchecked

                if (tmpNavData.length === 0) {
                  var check = true;

                  _toConsumableArray(checkedValues).forEach(function (element) {
                    if (element.checked) {
                      check = false;
                    }
                  });

                  if (check === true) {
                    navData = savedNavData;
                  } else {
                    navData = [];
                  }
                } else {
                  navData = tmpNavData;
                } //Displaying filtered data and generate new buttons


                generateBtn(e);
                append(navData, buttons, divData);
              }
            }; //AppendFilters


            addFilterContent(arrayOfHTML, filter); //Hide and show more filters

            filterNav(filter); //Run filter

            document.addEventListener('click', filterRestaurants); //To append pass array with data, element that will contain the buttons, element that will contain data
            //Add event to generate buttons

            document.addEventListener('click', function (e) {
              generateBtn(e);
              append(navData, buttons, divData);
            }); //Event for display single restaurant

            document.addEventListener('click', function (e) {
              var resId = e.target.dataset.name;

              if (e.target.id === 'resDiv') {
                var allRest = document.querySelector('#restaurantsNavCon');
                var pageButt = document.getElementById('paginationContainer'); //Fetching reviews and passing into display function

                fetchUserReviews(resId, result).then(function (res) {
                  // resCnt.style.display = 'none';
                  displayRestaurant(res, resId); // singleRest.style.animationName = 'slideOff';

                  var singleRest = document.querySelector('article');
                  singleRest.style.display = 'block';
                  singleRest.style.animationName = 'slideLeft';
                  allRest.style.display = 'none';
                  pageButt.style.display = 'none';
                });
              }
            }); //Close single restaurant view and show all restaurants

            document.addEventListener('click', function (e) {
              if (e.target.id === 'cross') {
                var allRest = document.getElementById('restaurantsNavCon');
                var pageButt = document.getElementById('paginationContainer');
                var singleRest = document.querySelector('article');
                singleRest.style.display = 'none';
                allRest.style.display = 'grid';
                pageButt.style.display = 'flex';
                allRest.style.animationName = 'slideRight';
              }
            }); //Scroll to the nav after submit

            container.scrollIntoView({
              behavior: 'smooth'
            });
          }

          loading.style.display = 'none';
          document.querySelector('nav').style.display = 'grid';
          document.querySelector('#restaurantsNavCon').style.display = 'none';
          document.querySelector('#paginationContainer').style.display = 'none';
        });
        var string = e.target.id.replace('fav', '');
        document.querySelector('nav').style.display = 'grid';
        document.querySelector('#restaurantsNavCon').style.display = 'none';
        displayRestaurant(values, string);
        document.querySelector('article').scrollIntoView({
          behavior: 'smooth'
        });
        var favList = document.querySelector('aside');
        favList.style.width = '0';
        favList.style.right = '-4em';
      }
    });
  } //Appending all the data


  dataArr.forEach(function (n) {
    favCnt.innerHTML += n;
  });
};
/**
 * @call the function to download the file
 */


document.querySelector('.exportFavData').addEventListener("click", function () {
  var values = [];
  var keys = Object.keys(localStorage); //Getting all of the objects

  for (var i = 0; i < keys.length; i++) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  createTxtFile(values);
}, false);
module.exports = manageFav;
},{"./add-removeLS":"src/add-removeLS.js","./feature-file-save":"src/feature-file-save.js","./single-res-view":"src/single-res-view.js","./restaurants-api":"src/restaurants-api.js","./feature-pagination":"src/feature-pagination.js","./templates":"src/templates.js","./filter-nav":"src/filter-nav.js","./validate":"src/validate.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");

var _require = require('../src/add-removeLS'),
    manageLSSingle = _require.manageLSSingle,
    manageLSFav = _require.manageLSFav;

var display = require('../src/search-view');

var displayFav = require('../src/nav-bar');

var manageFav = require('../src/manageFav'); //Handle the favList


document.addEventListener('click', displayFav); //Handle search form

document.querySelector('#searchForm').addEventListener('submit', display);
document.addEventListener('click', function () {
  if (document.querySelector('.starFav')) manageFav();
});

window.onload = function () {
  manageFav();
};
},{"regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","../src/add-removeLS":"src/add-removeLS.js","../src/search-view":"src/search-view.js","../src/nav-bar":"src/nav-bar.js","../src/manageFav":"src/manageFav.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56339" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map