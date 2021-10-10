var starter = (function (exports) {
  'use strict';

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function get$2(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    return xs[index];
  }

  function caml_make_vect(len, init) {
    var b = new Array(len);
    for(var i = 0; i < len; ++i){
      b[i] = init;
    }
    return b;
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat([x]));
        }
        }(f,args));
      }
      _args = caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity));
      continue ;
    }}

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1 :
            return o(a0);
        case 2 :
            return function (param) {
              return o(a0, param);
            };
        case 3 :
            return function (param, param$1) {
              return o(a0, param, param$1);
            };
        case 4 :
            return function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
        case 5 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
        case 6 :
            return function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
        case 7 :
            return function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
        default:
          return app(o, [a0]);
      }
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [a1]);
        case 2 :
            return o(a0, a1);
        case 3 :
            return function (param) {
              return o(a0, a1, param);
            };
        case 4 :
            return function (param, param$1) {
              return o(a0, a1, param, param$1);
            };
        case 5 :
            return function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
        case 6 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
        case 7 :
            return function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
        default:
          return app(o, [
                      a0,
                      a1
                    ]);
      }
    }
  }

  function _3(o, a0, a1, a2) {
    var arity = o.length;
    if (arity === 3) {
      return o(a0, a1, a2);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2
                      ]);
        case 2 :
            return app(o(a0, a1), [a2]);
        case 3 :
            return o(a0, a1, a2);
        case 4 :
            return function (param) {
              return o(a0, a1, a2, param);
            };
        case 5 :
            return function (param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
        case 6 :
            return function (param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
        case 7 :
            return function (param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
        default:
          return app(o, [
                      a0,
                      a1,
                      a2
                    ]);
      }
    }
  }

  function _4(o, a0, a1, a2, a3) {
    var arity = o.length;
    if (arity === 4) {
      return o(a0, a1, a2, a3);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [a3]);
        case 4 :
            return o(a0, a1, a2, a3);
        case 5 :
            return function (param) {
              return o(a0, a1, a2, a3, param);
            };
        case 6 :
            return function (param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
        case 7 :
            return function (param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3
                    ]);
      }
    }
  }

  function _5(o, a0, a1, a2, a3, a4) {
    var arity = o.length;
    if (arity === 5) {
      return o(a0, a1, a2, a3, a4);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [a4]);
        case 5 :
            return o(a0, a1, a2, a3, a4);
        case 6 :
            return function (param) {
              return o(a0, a1, a2, a3, a4, param);
            };
        case 7 :
            return function (param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      }
    }
  }

  function _6(o, a0, a1, a2, a3, a4, a5) {
    var arity = o.length;
    if (arity === 6) {
      return o(a0, a1, a2, a3, a4, a5);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [a5]);
        case 6 :
            return o(a0, a1, a2, a3, a4, a5);
        case 7 :
            return function (param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      }
    }
  }

  function _7(o, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o.length;
    if (arity === 7) {
      return o(a0, a1, a2, a3, a4, a5, a6);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6
                      ]);
        case 6 :
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
        case 7 :
            return o(a0, a1, a2, a3, a4, a5, a6);
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      }
    }
  }

  function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o.length;
    if (arity === 8) {
      return o(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      switch (arity) {
        case 1 :
            return app(o(a0), [
                        a1,
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 2 :
            return app(o(a0, a1), [
                        a2,
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 3 :
            return app(o(a0, a1, a2), [
                        a3,
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 4 :
            return app(o(a0, a1, a2, a3), [
                        a4,
                        a5,
                        a6,
                        a7
                      ]);
        case 5 :
            return app(o(a0, a1, a2, a3, a4), [
                        a5,
                        a6,
                        a7
                      ]);
        case 6 :
            return app(o(a0, a1, a2, a3, a4, a5), [
                        a6,
                        a7
                      ]);
        case 7 :
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
        default:
          return app(o, [
                      a0,
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      }
    }
  }
  /* No side effect */

  function set(s, i, ch) {
    if (i < 0 || i >= s.length) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    s[i] = ch;
    
  }

  function caml_fill_bytes(s, i, l, c) {
    if (l <= 0) {
      return ;
    }
    for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
      s[k] = c;
    }
    
  }

  function caml_create_bytes(len) {
    if (len < 0) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.create",
            Error: new Error()
          };
    }
    var result = new Array(len);
    for(var i = 0; i < len; ++i){
      result[i] = /* '\000' */0;
    }
    return result;
  }

  function caml_blit_bytes(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    if (s1 === s2) {
      if (i1 < i2) {
        var range_a = (s1.length - i2 | 0) - 1 | 0;
        var range_b = len - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1[i2 + j | 0] = s1[i1 + j | 0];
        }
        return ;
      }
      if (i1 <= i2) {
        return ;
      }
      var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
      var range_b$1 = len - 1 | 0;
      var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
      for(var k = 0; k <= range$1; ++k){
        s1[i2 + k | 0] = s1[i1 + k | 0];
      }
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1[i1 + i | 0];
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* '\000' */0;
    }
    
  }

  function bytes_to_string(a) {
    var len = a.length;
    var s = "";
    var s_len = len;
    if (len <= 4096 && len === a.length) {
      return String.fromCharCode.apply(null, a);
    }
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      for(var k = 0; k < next; ++k){
        tmp_bytes[k] = a[k + offset | 0];
      }
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }  return s;
  }

  function caml_blit_string(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return ;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0; i < len; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return ;
    }
    for(var i$1 = 0; i$1 < off1; ++i$1){
      s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
    }
    for(var i$2 = off1; i$2 < len; ++i$2){
      s2[i2 + i$2 | 0] = /* '\000' */0;
    }
    
  }

  function bytes_of_string(s) {
    var len = s.length;
    var res = new Array(len);
    for(var i = 0; i < len; ++i){
      res[i] = s.charCodeAt(i);
    }
    return res;
  }
  /* No side effect */

  function escaped$2(c) {
    var exit = 0;
    if (c >= 40) {
      if (c === 92) {
        return "\\\\";
      }
      exit = c >= 127 ? 1 : 2;
    } else if (c >= 32) {
      if (c >= 39) {
        return "\\'";
      }
      exit = 2;
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 :
            return "\\b";
        case 9 :
            return "\\t";
        case 10 :
            return "\\n";
        case 0 :
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
        case 12 :
            exit = 1;
            break;
        case 13 :
            return "\\r";
        
      }
    }
    switch (exit) {
      case 1 :
          var s = [
            0,
            0,
            0,
            0
          ];
          s[0] = /* '\\' */92;
          s[1] = 48 + (c / 100 | 0) | 0;
          s[2] = 48 + (c / 10 | 0) % 10 | 0;
          s[3] = 48 + c % 10 | 0;
          return bytes_to_string(s);
      case 2 :
          var s$1 = [0];
          s$1[0] = c;
          return bytes_to_string(s$1);
      
    }
  }

  function uppercase_ascii$1(c) {
    if (c >= /* 'a' */97 && c <= /* 'z' */122) {
      return c - 32 | 0;
    } else {
      return c;
    }
  }
  /* No side effect */

  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }

  function caml_int_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }
  /* No side effect */

  function some(x) {
    if (x === undefined) {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: 0
            };
    } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
            };
    } else {
      return x;
    }
  }

  function valFromOption(x) {
    if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
      return x;
    }
    var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return ;
    } else {
      return {
              BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
            };
    }
  }
  /* No side effect */

  var id = {
    contents: 0
  };

  function create$2(str) {
    id.contents = id.contents + 1 | 0;
    return str + ("/" + id.contents);
  }

  function caml_is_extension(e) {
    if (e == null) {
      return false;
    } else {
      return typeof e.RE_EXN_ID === "string";
    }
  }
  /* No side effect */

  var $$Error = /* @__PURE__ */create$2("Caml_js_exceptions.Error");

  function internalToOCamlException(e) {
    if (caml_is_extension(e)) {
      return e;
    } else {
      return {
              RE_EXN_ID: $$Error,
              _1: e
            };
    }
  }
  /* No side effect */

  function make$1(n, c) {
    var s = caml_create_bytes(n);
    caml_fill_bytes(s, 0, n, c);
    return s;
  }

  function copy(s) {
    var len = s.length;
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, 0, r, 0, len);
    return r;
  }

  function sub$1(s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.sub / Bytes.sub",
            Error: new Error()
          };
    }
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }

  function sub_string(b, ofs, len) {
    return bytes_to_string(sub$1(b, ofs, len));
  }

  function blit$1(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Bytes.blit",
            Error: new Error()
          };
    }
    return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }

  function blit_string(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "String.blit / Bytes.blit_string",
            Error: new Error()
          };
    }
    return caml_blit_string(s1, ofs1, s2, ofs2, len);
  }

  function escaped$1(s) {
    var n = 0;
    for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
      var match = s[i];
      n = n + (
        match >= 32 ? (
            match > 92 || match < 34 ? (
                match >= 127 ? 4 : 1
              ) : (
                match > 91 || match < 35 ? 2 : 1
              )
          ) : (
            match >= 11 ? (
                match !== 13 ? 4 : 2
              ) : (
                match >= 8 ? 2 : 4
              )
          )
      ) | 0;
    }
    if (n === s.length) {
      return copy(s);
    }
    var s$prime = caml_create_bytes(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length; i$1 < i_finish$1; ++i$1){
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'b' */98;
              break;
          case 9 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 't' */116;
              break;
          case 10 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'n' */110;
              break;
          case 0 :
          case 1 :
          case 2 :
          case 3 :
          case 4 :
          case 5 :
          case 6 :
          case 7 :
          case 11 :
          case 12 :
              exit = 1;
              break;
          case 13 :
              s$prime[n] = /* '\\' */92;
              n = n + 1 | 0;
              s$prime[n] = /* 'r' */114;
              break;
          
        }
      }
      switch (exit) {
        case 1 :
            s$prime[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 :
            s$prime[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }

  function map$4(f, s) {
    var l = s.length;
    if (l === 0) {
      return s;
    }
    var r = caml_create_bytes(l);
    for(var i = 0; i < l; ++i){
      r[i] = _1(f, s[i]);
    }
    return r;
  }

  function uppercase_ascii(s) {
    return map$4(uppercase_ascii$1, s);
  }
  /* No side effect */

  function get$1(s, i) {
    if (i >= s.length || i < 0) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
    }
    return s.charCodeAt(i);
  }

  function make(n, ch) {
    return String.fromCharCode(ch).repeat(n);
  }
  /* No side effect */

  function ensure_ge(x, y) {
    if (x >= y) {
      return x;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.concat",
          Error: new Error()
        };
  }

  function sum_lengths(_acc, seplen, _param) {
    while(true) {
      var param = _param;
      var acc = _acc;
      if (!param) {
        return acc;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (!tl) {
        return hd.length + acc | 0;
      }
      _param = tl;
      _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
      continue ;
    }}

  function unsafe_blits(dst, _pos, sep, seplen, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (!param) {
        return dst;
      }
      var tl = param.tl;
      var hd = param.hd;
      if (tl) {
        caml_blit_string(hd, 0, dst, pos, hd.length);
        caml_blit_string(sep, 0, dst, pos + hd.length | 0, seplen);
        _param = tl;
        _pos = (pos + hd.length | 0) + seplen | 0;
        continue ;
      }
      caml_blit_string(hd, 0, dst, pos, hd.length);
      return dst;
    }}

  function concat$1(sep, l) {
    if (!l) {
      return "";
    }
    var seplen = sep.length;
    return bytes_to_string(unsafe_blits(caml_create_bytes(sum_lengths(0, seplen, l)), 0, sep, seplen, l));
  }

  function escaped(s) {
    var needs_escape = function (_i) {
      while(true) {
        var i = _i;
        if (i >= s.length) {
          return false;
        }
        var match = s.charCodeAt(i);
        if (match < 32) {
          return true;
        }
        if (match > 92 || match < 34) {
          if (match >= 127) {
            return true;
          }
          _i = i + 1 | 0;
          continue ;
        }
        if (match > 91 || match < 35) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }  };
    if (needs_escape(0)) {
      return bytes_to_string(escaped$1(bytes_of_string(s)));
    } else {
      return s;
    }
  }

  var blit = blit_string;
  /* No side effect */

  function mk(lo, hi) {
    return [
            hi,
            (lo >>> 0)
          ];
  }

  var min_int$1 = [
    -2147483648,
    0
  ];

  var max_int$1 = [
    2147483647,
    4294967295
  ];

  var one = [
    0,
    1
  ];

  var zero = [
    0,
    0
  ];

  var neg_one = [
    -1,
    4294967295
  ];

  function neg_signed(x) {
    return (x & -2147483648) !== 0;
  }

  function non_neg_signed(x) {
    return (x & -2147483648) === 0;
  }

  function neg(param) {
    var other_lo = (param[1] ^ -1) + 1 | 0;
    return [
            (param[0] ^ -1) + (
              other_lo === 0 ? 1 : 0
            ) | 0,
            (other_lo >>> 0)
          ];
  }

  function add_aux(param, y_lo, y_hi) {
    var x_lo = param[1];
    var lo = x_lo + y_lo | 0;
    var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
    return [
            param[0] + y_hi + overflow | 0,
            (lo >>> 0)
          ];
  }

  function add$1(self, param) {
    return add_aux(self, param[1], param[0]);
  }

  function eq(x, y) {
    if (x[0] === y[0]) {
      return x[1] === y[1];
    } else {
      return false;
    }
  }

  function sub_aux(x, lo, hi) {
    var y_lo = ((lo ^ -1) + 1 >>> 0);
    var y_hi = (hi ^ -1) + (
      y_lo === 0 ? 1 : 0
    ) | 0;
    return add_aux(x, y_lo, y_hi);
  }

  function sub(self, param) {
    return sub_aux(self, param[1], param[0]);
  }

  function lsl_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var lo = x[1];
    if (numBits >= 32) {
      return [
              (lo << (numBits - 32 | 0)),
              0
            ];
    } else {
      return [
              (lo >>> (32 - numBits | 0)) | (x[0] << numBits),
              ((lo << numBits) >>> 0)
            ];
    }
  }

  function asr_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var hi = x[0];
    if (numBits < 32) {
      return [
              (hi >> numBits),
              (((hi << (32 - numBits | 0)) | (x[1] >>> numBits)) >>> 0)
            ];
    } else {
      return [
              hi >= 0 ? 0 : -1,
              ((hi >> (numBits - 32 | 0)) >>> 0)
            ];
    }
  }

  function is_zero(param) {
    if (param[0] !== 0) {
      return false;
    } else {
      return param[1] === 0;
    }
  }

  function mul(_this, _other) {
    while(true) {
      var other = _other;
      var $$this = _this;
      var lo;
      var this_hi = $$this[0];
      var exit = 0;
      var exit$1 = 0;
      var exit$2 = 0;
      if (this_hi !== 0) {
        exit$2 = 4;
      } else {
        if ($$this[1] === 0) {
          return zero;
        }
        exit$2 = 4;
      }
      if (exit$2 === 4) {
        if (other[0] !== 0) {
          exit$1 = 3;
        } else {
          if (other[1] === 0) {
            return zero;
          }
          exit$1 = 3;
        }
      }
      if (exit$1 === 3) {
        if (this_hi !== -2147483648 || $$this[1] !== 0) {
          exit = 2;
        } else {
          lo = other[1];
        }
      }
      if (exit === 2) {
        var other_hi = other[0];
        var lo$1 = $$this[1];
        var exit$3 = 0;
        if (other_hi !== -2147483648 || other[1] !== 0) {
          exit$3 = 3;
        } else {
          lo = lo$1;
        }
        if (exit$3 === 3) {
          var other_lo = other[1];
          if (this_hi < 0) {
            if (other_hi >= 0) {
              return neg(mul(neg($$this), other));
            }
            _other = neg(other);
            _this = neg($$this);
            continue ;
          }
          if (other_hi < 0) {
            return neg(mul($$this, neg(other)));
          }
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 = c48 + (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 = c48 + (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          return [
                  c32 | (c48 << 16),
                  ((c00 & 65535 | ((c16 & 65535) << 16)) >>> 0)
                ];
        }
        
      }
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int$1;
      }
    }}

  function ge(param, param$1) {
    var other_hi = param$1[0];
    var hi = param[0];
    if (hi > other_hi) {
      return true;
    } else if (hi < other_hi) {
      return false;
    } else {
      return param[1] >= param$1[1];
    }
  }

  function neq(x, y) {
    return !eq(x, y);
  }

  function lt(x, y) {
    return !ge(x, y);
  }

  function gt(x, y) {
    if (x[0] > y[0]) {
      return true;
    } else if (x[0] < y[0]) {
      return false;
    } else {
      return x[1] > y[1];
    }
  }

  function to_float(param) {
    return param[0] * 0x100000000 + param[1];
  }

  function of_float(x) {
    if (isNaN(x) || !isFinite(x)) {
      return zero;
    }
    if (x <= -9.22337203685477581e+18) {
      return min_int$1;
    }
    if (x + 1 >= 9.22337203685477581e+18) {
      return max_int$1;
    }
    if (x < 0) {
      return neg(of_float(-x));
    }
    var hi = x / 4294967296 | 0;
    var lo = x % 4294967296 | 0;
    return [
            hi,
            (lo >>> 0)
          ];
  }

  function isSafeInteger(param) {
    var hi = param[0];
    var top11Bits = (hi >> 21);
    if (top11Bits === 0) {
      return true;
    } else if (top11Bits === -1) {
      return !(param[1] === 0 && hi === -2097152);
    } else {
      return false;
    }
  }

  function to_string(self) {
    if (isSafeInteger(self)) {
      return String(to_float(self));
    }
    if (self[0] < 0) {
      if (eq(self, min_int$1)) {
        return "-9223372036854775808";
      } else {
        return "-" + to_string(neg(self));
      }
    }
    var approx_div1 = of_float(Math.floor(to_float(self) / 10));
    var lo = approx_div1[1];
    var hi = approx_div1[0];
    var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
    var rem_lo = match[1];
    var rem_hi = match[0];
    if (rem_lo === 0 && rem_hi === 0) {
      return to_string(approx_div1) + "0";
    }
    if (rem_hi < 0) {
      var rem_lo$1 = ((rem_lo ^ -1) + 1 >>> 0);
      var delta = Math.ceil(rem_lo$1 / 10);
      var remainder = 10 * delta - rem_lo$1;
      return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
    }
    var delta$1 = Math.floor(rem_lo / 10);
    var remainder$1 = rem_lo - 10 * delta$1;
    return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
  }

  function div$1(_self, _other) {
    while(true) {
      var other = _other;
      var self = _self;
      var self_hi = self[0];
      var exit = 0;
      var exit$1 = 0;
      if (other[0] !== 0 || other[1] !== 0) {
        exit$1 = 2;
      } else {
        throw {
              RE_EXN_ID: "Division_by_zero",
              Error: new Error()
            };
      }
      if (exit$1 === 2) {
        if (self_hi !== -2147483648) {
          if (self_hi !== 0) {
            exit = 1;
          } else {
            if (self[1] === 0) {
              return zero;
            }
            exit = 1;
          }
        } else if (self[1] !== 0) {
          exit = 1;
        } else {
          if (eq(other, one) || eq(other, neg_one)) {
            return self;
          }
          if (eq(other, min_int$1)) {
            return one;
          }
          var half_this = asr_(self, 1);
          var approx = lsl_(div$1(half_this, other), 1);
          var exit$2 = 0;
          if (approx[0] !== 0) {
            exit$2 = 3;
          } else {
            if (approx[1] === 0) {
              if (other[0] < 0) {
                return one;
              } else {
                return neg(one);
              }
            }
            exit$2 = 3;
          }
          if (exit$2 === 3) {
            var rem = sub(self, mul(other, approx));
            return add$1(approx, div$1(rem, other));
          }
          
        }
      }
      if (exit === 1) {
        var other_hi = other[0];
        var exit$3 = 0;
        if (other_hi !== -2147483648) {
          exit$3 = 2;
        } else {
          if (other[1] === 0) {
            return zero;
          }
          exit$3 = 2;
        }
        if (exit$3 === 2) {
          if (self_hi < 0) {
            if (other_hi >= 0) {
              return neg(div$1(neg(self), other));
            }
            _other = neg(other);
            _self = neg(self);
            continue ;
          }
          if (other_hi < 0) {
            return neg(div$1(self, neg(other)));
          }
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var b = Math.floor(to_float(rem$1) / to_float(other));
            var approx$1 = 1 > b ? 1 : b;
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[0] < 0 || gt(approxRem, rem$1)) {
              approx$1 = approx$1 - delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            }          if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add$1(res, approxRes);
            rem$1 = sub(rem$1, approxRem);
          }        return res;
        }
        
      }
      
    }}

  function div_mod(self, other) {
    var quotient = div$1(self, other);
    return [
            quotient,
            sub(self, mul(quotient, other))
          ];
  }

  function to_int32(x) {
    return x[1] | 0;
  }

  function to_hex(x) {
    var x_lo = x[1];
    var x_hi = x[0];
    var aux = function (v) {
      return (v >>> 0).toString(16);
    };
    if (x_hi === 0 && x_lo === 0) {
      return "0";
    }
    if (x_lo === 0) {
      return aux(x_hi) + "00000000";
    }
    if (x_hi === 0) {
      return aux(x_lo);
    }
    var lo = aux(x_lo);
    var pad = 8 - lo.length | 0;
    if (pad <= 0) {
      return aux(x_hi) + lo;
    } else {
      return aux(x_hi) + ("0".repeat(pad) + lo);
    }
  }

  function discard_sign(x) {
    return [
            2147483647 & x[0],
            x[1]
          ];
  }
  /* No side effect */

  function int_of_base(param) {
    switch (param) {
      case /* Oct */0 :
          return 8;
      case /* Hex */1 :
          return 16;
      case /* Dec */2 :
          return 10;
      
    }
  }

  function lowercase(c) {
    if (c >= /* 'A' */65 && c <= /* 'Z' */90 || c >= /* '\192' */192 && c <= /* '\214' */214 || c >= /* '\216' */216 && c <= /* '\222' */222) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }

  function parse_format(fmt) {
    var len = fmt.length;
    if (len > 31) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "format_int: format too long",
            Error: new Error()
          };
    }
    var f = {
      justify: "+",
      signstyle: "-",
      filter: " ",
      alternate: false,
      base: /* Dec */2,
      signedconv: false,
      width: 0,
      uppercase: false,
      sign: 1,
      prec: -1,
      conv: "f"
    };
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= len) {
        return f;
      }
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c) {
              case 88 :
                  f.base = /* Hex */1;
                  f.uppercase = true;
                  _i = i + 1 | 0;
                  continue ;
              case 101 :
              case 102 :
              case 103 :
                  exit = 5;
                  break;
              case 100 :
              case 105 :
                  exit = 4;
                  break;
              case 111 :
                  f.base = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
              case 117 :
                  f.base = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
              case 89 :
              case 90 :
              case 91 :
              case 92 :
              case 93 :
              case 94 :
              case 95 :
              case 96 :
              case 97 :
              case 98 :
              case 99 :
              case 104 :
              case 106 :
              case 107 :
              case 108 :
              case 109 :
              case 110 :
              case 112 :
              case 113 :
              case 114 :
              case 115 :
              case 116 :
              case 118 :
              case 119 :
                  exit = 1;
                  break;
              case 120 :
                  f.base = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
              
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f.signedconv = true;
          f.uppercase = true;
          f.conv = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
        }
      } else {
        switch (c) {
          case 35 :
              f.alternate = true;
              _i = i + 1 | 0;
              continue ;
          case 32 :
          case 43 :
              exit = 2;
              break;
          case 45 :
              f.justify = "-";
              _i = i + 1 | 0;
              continue ;
          case 46 :
              f.prec = 0;
              var j = i + 1 | 0;
              while((function(j){
                  return function () {
                    var w = fmt.charCodeAt(j) - /* '0' */48 | 0;
                    return w >= 0 && w <= 9;
                  }
                  }(j))()) {
                f.prec = (Math.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - /* '0' */48 | 0;
                j = j + 1 | 0;
              }            _i = j;
              continue ;
          case 33 :
          case 34 :
          case 36 :
          case 37 :
          case 38 :
          case 39 :
          case 40 :
          case 41 :
          case 42 :
          case 44 :
          case 47 :
              exit = 1;
              break;
          case 48 :
              f.filter = "0";
              _i = i + 1 | 0;
              continue ;
          case 49 :
          case 50 :
          case 51 :
          case 52 :
          case 53 :
          case 54 :
          case 55 :
          case 56 :
          case 57 :
              exit = 3;
              break;
          default:
            exit = 1;
        }
      }
      switch (exit) {
        case 1 :
            _i = i + 1 | 0;
            continue ;
        case 2 :
            f.signstyle = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        case 3 :
            f.width = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* '0' */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j$1))()) {
              f.width = (Math.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - /* '0' */48 | 0;
              j$1 = j$1 + 1 | 0;
            }          _i = j$1;
            continue ;
        case 4 :
            f.signedconv = true;
            f.base = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
        case 5 :
            f.signedconv = true;
            f.conv = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        
      }
    }}

  function finish_formatting(config, rawbuffer) {
    var justify = config.justify;
    var signstyle = config.signstyle;
    var filter = config.filter;
    var alternate = config.alternate;
    var base = config.base;
    var signedconv = config.signedconv;
    var width = config.width;
    var uppercase = config.uppercase;
    var sign = config.sign;
    var len = rawbuffer.length;
    if (signedconv && (sign < 0 || signstyle !== "-")) {
      len = len + 1 | 0;
    }
    if (alternate) {
      if (base === /* Oct */0) {
        len = len + 1 | 0;
      } else if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    }
    var buffer = "";
    if (justify === "+" && filter === " ") {
      for(var _for = len; _for < width; ++_for){
        buffer = buffer + filter;
      }
    }
    if (signedconv) {
      if (sign < 0) {
        buffer = buffer + "-";
      } else if (signstyle !== "-") {
        buffer = buffer + signstyle;
      }
      
    }
    if (alternate && base === /* Oct */0) {
      buffer = buffer + "0";
    }
    if (alternate && base === /* Hex */1) {
      buffer = buffer + "0x";
    }
    if (justify === "+" && filter === "0") {
      for(var _for$1 = len; _for$1 < width; ++_for$1){
        buffer = buffer + filter;
      }
    }
    buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
    if (justify === "-") {
      for(var _for$2 = len; _for$2 < width; ++_for$2){
        buffer = buffer + " ";
      }
    }
    return buffer;
  }

  function caml_format_int(fmt, i) {
    if (fmt === "%d") {
      return String(i);
    }
    var f = parse_format(fmt);
    var i$1 = i < 0 ? (
        f.signedconv ? (f.sign = -1, (-i >>> 0)) : (i >>> 0)
      ) : i;
    var s = i$1.toString(int_of_base(f.base));
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      if (n > 0) {
        s = "0".repeat(n) + s;
      }
      
    }
    return finish_formatting(f, s);
  }

  function dec_of_pos_int64(x) {
    if (!lt(x, zero)) {
      return to_string(x);
    }
    var wbase = /* @__PURE__ */mk(10, 0);
    var y = discard_sign(x);
    var match = div_mod(y, wbase);
    var match$1 = div_mod(add$1(/* @__PURE__ */mk(8, 0), match[1]), wbase);
    var quotient = add$1(add$1(/* @__PURE__ */mk(-858993460, 214748364), match[0]), match$1[0]);
    return to_string(quotient) + "0123456789"[to_int32(match$1[1])];
  }

  function oct_of_int64(x) {
    var s = "";
    var wbase = /* @__PURE__ */mk(8, 0);
    var cvtbl = "01234567";
    if (lt(x, zero)) {
      var y = discard_sign(x);
      var match = div_mod(y, wbase);
      var quotient = add$1(/* @__PURE__ */mk(0, 268435456), match[0]);
      var modulus = match[1];
      s = cvtbl[to_int32(modulus)] + s;
      while(neq(quotient, zero)) {
        var match$1 = div_mod(quotient, wbase);
        quotient = match$1[0];
        modulus = match$1[1];
        s = cvtbl[to_int32(modulus)] + s;
      }  } else {
      var match$2 = div_mod(x, wbase);
      var quotient$1 = match$2[0];
      var modulus$1 = match$2[1];
      s = cvtbl[to_int32(modulus$1)] + s;
      while(neq(quotient$1, zero)) {
        var match$3 = div_mod(quotient$1, wbase);
        quotient$1 = match$3[0];
        modulus$1 = match$3[1];
        s = cvtbl[to_int32(modulus$1)] + s;
      }  }
    return s;
  }

  function caml_int64_format(fmt, x) {
    if (fmt === "%d") {
      return to_string(x);
    }
    var f = parse_format(fmt);
    var x$1 = f.signedconv && lt(x, zero) ? (f.sign = -1, neg(x)) : x;
    var match = f.base;
    var s;
    switch (match) {
      case /* Oct */0 :
          s = oct_of_int64(x$1);
          break;
      case /* Hex */1 :
          s = to_hex(x$1);
          break;
      case /* Dec */2 :
          s = dec_of_pos_int64(x$1);
          break;
      
    }
    var fill_s;
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      fill_s = n > 0 ? "0".repeat(n) + s : s;
    } else {
      fill_s = s;
    }
    return finish_formatting(f, fill_s);
  }

  function caml_format_float(fmt, x) {
    var f = parse_format(fmt);
    var prec = f.prec < 0 ? 6 : f.prec;
    var x$1 = x < 0 ? (f.sign = -1, -x) : x;
    var s = "";
    if (isNaN(x$1)) {
      s = "nan";
      f.filter = " ";
    } else if (isFinite(x$1)) {
      var match = f.conv;
      switch (match) {
        case "e" :
            s = x$1.toExponential(prec);
            var i = s.length;
            if (s[i - 3 | 0] === "e") {
              s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
            }
            break;
        case "f" :
            s = x$1.toFixed(prec);
            break;
        case "g" :
            var prec$1 = prec !== 0 ? prec : 1;
            s = x$1.toExponential(prec$1 - 1 | 0);
            var j = s.indexOf("e");
            var exp = Number(s.slice(j + 1 | 0)) | 0;
            if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
              var i$1 = j - 1 | 0;
              while(s[i$1] === "0") {
                i$1 = i$1 - 1 | 0;
              }            if (s[i$1] === ".") {
                i$1 = i$1 - 1 | 0;
              }
              s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
              var i$2 = s.length;
              if (s[i$2 - 3 | 0] === "e") {
                s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
              }
              
            } else {
              var p = prec$1;
              if (exp < 0) {
                p = p - (exp + 1 | 0) | 0;
                s = x$1.toFixed(p);
              } else {
                while((function () {
                        s = x$1.toFixed(p);
                        return s.length > (prec$1 + 1 | 0);
                      })()) {
                  p = p - 1 | 0;
                }            }
              if (p !== 0) {
                var k = s.length - 1 | 0;
                while(s[k] === "0") {
                  k = k - 1 | 0;
                }              if (s[k] === ".") {
                  k = k - 1 | 0;
                }
                s = s.slice(0, k + 1 | 0);
              }
              
            }
            break;
          
      }
    } else {
      s = "inf";
      f.filter = " ";
    }
    return finish_formatting(f, s);
  }

  var caml_hexstring_of_float = (function(x,prec,style){
    if (!isFinite(x)) {
      if (isNaN(x)) return "nan";
      return x > 0 ? "infinity":"-infinity";
    }
    var sign = (x==0 && 1/x == -Infinity)?1:(x>=0)?0:1;
    if(sign) x = -x;
    var exp = 0;
    if (x == 0) ;
    else if (x < 1) {
      while (x < 1 && exp > -1022)  { x *= 2; exp--; }
    } else {
      while (x >= 2) { x /= 2; exp++; }
    }
    var exp_sign = exp < 0 ? '' : '+';
    var sign_str = '';
    if (sign) sign_str = '-';
    else {
      switch(style){
      case 43 /* '+' */: sign_str = '+'; break;
      case 32 /* ' ' */: sign_str = ' '; break;
      }
    }
    if (prec >= 0 && prec < 13) {
      /* If a precision is given, and is small, round mantissa accordingly */
        var cst = Math.pow(2,prec * 4);
        x = Math.round(x * cst) / cst;
    }
    var x_str = x.toString(16);
    if(prec >= 0){
        var idx = x_str.indexOf('.');
      if(idx<0) {
        x_str += '.' +  '0'.repeat(prec);
      }
      else {
        var size = idx+1+prec;
        if(x_str.length < size)
          x_str += '0'.repeat(size - x_str.length);
        else
          x_str = x_str.substr(0,size);
      }
    }
    return  (sign_str + '0x' + x_str + 'p' + exp_sign + exp.toString(10));
  });

  var caml_nativeint_format = caml_format_int;

  var caml_int32_format = caml_format_int;
  /* No side effect */

  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }

  var min_int = -2147483648;

  function classify_float(x) {
    if (isFinite(x)) {
      if (Math.abs(x) >= 2.22507385850720138e-308) {
        return /* FP_normal */0;
      } else if (x !== 0) {
        return /* FP_subnormal */1;
      } else {
        return /* FP_zero */2;
      }
    } else if (isNaN(x)) {
      return /* FP_nan */4;
    } else {
      return /* FP_infinite */3;
    }
  }

  function string_of_bool(b) {
    if (b) {
      return "true";
    } else {
      return "false";
    }
  }

  function $at(l1, l2) {
    if (l1) {
      return {
              hd: l1.hd,
              tl: $at(l1.tl, l2)
            };
    } else {
      return l2;
    }
  }

  var max_int = 2147483647;
  /* No side effect */

  function create$1(n) {
    var n$1 = n < 1 ? 1 : n;
    var s = caml_create_bytes(n$1);
    return {
            buffer: s,
            position: 0,
            length: n$1,
            initial_buffer: s
          };
  }

  function contents(b) {
    return sub_string(b.buffer, 0, b.position);
  }

  function resize(b, more) {
    var len = b.length;
    var new_len = len;
    while((b.position + more | 0) > new_len) {
      new_len = (new_len << 1);
    }  var new_buffer = caml_create_bytes(new_len);
    blit$1(b.buffer, 0, new_buffer, 0, b.position);
    b.buffer = new_buffer;
    b.length = new_len;
    
  }

  function add_char(b, c) {
    var pos = b.position;
    if (pos >= b.length) {
      resize(b, 1);
    }
    b.buffer[pos] = c;
    b.position = pos + 1 | 0;
    
  }

  function add_string(b, s) {
    var len = s.length;
    var new_position = b.position + len | 0;
    if (new_position > b.length) {
      resize(b, len);
    }
    blit_string(s, 0, b.buffer, b.position, len);
    b.position = new_position;
    
  }
  /* No side effect */

  var for_in = (function(o,foo){
          for (var x in o) { foo(x); }});

  function caml_equal(a, b) {
    if (a === b) {
      return true;
    }
    var a_type = typeof a;
    if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
      return false;
    }
    var b_type = typeof b;
    if (a_type === "function" || b_type === "function") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "equal: functional value",
            Error: new Error()
          };
    }
    if (b_type === "number" || b_type === "undefined" || b === null) {
      return false;
    }
    var tag_a = a.TAG | 0;
    var tag_b = b.TAG | 0;
    if (tag_a === 248) {
      return a[1] === b[1];
    }
    if (tag_a === 251) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "equal: abstract value",
            Error: new Error()
          };
    }
    if (tag_a !== tag_b) {
      return false;
    }
    var len_a = a.length | 0;
    var len_b = b.length | 0;
    if (len_a === len_b) {
      if (Array.isArray(a)) {
        var _i = 0;
        while(true) {
          var i = _i;
          if (i === len_a) {
            return true;
          }
          if (!caml_equal(a[i], b[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue ;
        }    } else if ((a instanceof Date && b instanceof Date)) {
        return !(a > b || a < b);
      } else {
        var result = {
          contents: true
        };
        var do_key_a = function (key) {
          if (!b.hasOwnProperty(key)) {
            result.contents = false;
            return ;
          }
          
        };
        var do_key_b = function (key) {
          if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
            result.contents = false;
            return ;
          }
          
        };
        for_in(a, do_key_a);
        if (result.contents) {
          for_in(b, do_key_b);
        }
        return result.contents;
      }
    } else {
      return false;
    }
  }

  function caml_notequal(a, b) {
    return !caml_equal(a, b);
  }
  /* No side effect */

  function erase_rel(rest) {
    if (typeof rest === "number") {
      return /* End_of_fmtty */0;
    }
    switch (rest.TAG | 0) {
      case /* Char_ty */0 :
          return {
                  TAG: /* Char_ty */0,
                  _0: erase_rel(rest._0)
                };
      case /* String_ty */1 :
          return {
                  TAG: /* String_ty */1,
                  _0: erase_rel(rest._0)
                };
      case /* Int_ty */2 :
          return {
                  TAG: /* Int_ty */2,
                  _0: erase_rel(rest._0)
                };
      case /* Int32_ty */3 :
          return {
                  TAG: /* Int32_ty */3,
                  _0: erase_rel(rest._0)
                };
      case /* Nativeint_ty */4 :
          return {
                  TAG: /* Nativeint_ty */4,
                  _0: erase_rel(rest._0)
                };
      case /* Int64_ty */5 :
          return {
                  TAG: /* Int64_ty */5,
                  _0: erase_rel(rest._0)
                };
      case /* Float_ty */6 :
          return {
                  TAG: /* Float_ty */6,
                  _0: erase_rel(rest._0)
                };
      case /* Bool_ty */7 :
          return {
                  TAG: /* Bool_ty */7,
                  _0: erase_rel(rest._0)
                };
      case /* Format_arg_ty */8 :
          return {
                  TAG: /* Format_arg_ty */8,
                  _0: rest._0,
                  _1: erase_rel(rest._1)
                };
      case /* Format_subst_ty */9 :
          var ty1 = rest._0;
          return {
                  TAG: /* Format_subst_ty */9,
                  _0: ty1,
                  _1: ty1,
                  _2: erase_rel(rest._2)
                };
      case /* Alpha_ty */10 :
          return {
                  TAG: /* Alpha_ty */10,
                  _0: erase_rel(rest._0)
                };
      case /* Theta_ty */11 :
          return {
                  TAG: /* Theta_ty */11,
                  _0: erase_rel(rest._0)
                };
      case /* Any_ty */12 :
          return {
                  TAG: /* Any_ty */12,
                  _0: erase_rel(rest._0)
                };
      case /* Reader_ty */13 :
          return {
                  TAG: /* Reader_ty */13,
                  _0: erase_rel(rest._0)
                };
      case /* Ignored_reader_ty */14 :
          return {
                  TAG: /* Ignored_reader_ty */14,
                  _0: erase_rel(rest._0)
                };
      
    }
  }

  function concat_fmtty(fmtty1, fmtty2) {
    if (typeof fmtty1 === "number") {
      return fmtty2;
    }
    switch (fmtty1.TAG | 0) {
      case /* Char_ty */0 :
          return {
                  TAG: /* Char_ty */0,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* String_ty */1 :
          return {
                  TAG: /* String_ty */1,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Int_ty */2 :
          return {
                  TAG: /* Int_ty */2,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Int32_ty */3 :
          return {
                  TAG: /* Int32_ty */3,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Nativeint_ty */4 :
          return {
                  TAG: /* Nativeint_ty */4,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Int64_ty */5 :
          return {
                  TAG: /* Int64_ty */5,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Float_ty */6 :
          return {
                  TAG: /* Float_ty */6,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Bool_ty */7 :
          return {
                  TAG: /* Bool_ty */7,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Format_arg_ty */8 :
          return {
                  TAG: /* Format_arg_ty */8,
                  _0: fmtty1._0,
                  _1: concat_fmtty(fmtty1._1, fmtty2)
                };
      case /* Format_subst_ty */9 :
          return {
                  TAG: /* Format_subst_ty */9,
                  _0: fmtty1._0,
                  _1: fmtty1._1,
                  _2: concat_fmtty(fmtty1._2, fmtty2)
                };
      case /* Alpha_ty */10 :
          return {
                  TAG: /* Alpha_ty */10,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Theta_ty */11 :
          return {
                  TAG: /* Theta_ty */11,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Any_ty */12 :
          return {
                  TAG: /* Any_ty */12,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Reader_ty */13 :
          return {
                  TAG: /* Reader_ty */13,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      case /* Ignored_reader_ty */14 :
          return {
                  TAG: /* Ignored_reader_ty */14,
                  _0: concat_fmtty(fmtty1._0, fmtty2)
                };
      
    }
  }

  function concat_fmt(fmt1, fmt2) {
    if (typeof fmt1 === "number") {
      return fmt2;
    }
    switch (fmt1.TAG | 0) {
      case /* Char */0 :
          return {
                  TAG: /* Char */0,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* Caml_char */1 :
          return {
                  TAG: /* Caml_char */1,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* String */2 :
          return {
                  TAG: /* String */2,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Caml_string */3 :
          return {
                  TAG: /* Caml_string */3,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Int */4 :
          return {
                  TAG: /* Int */4,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: fmt1._2,
                  _3: concat_fmt(fmt1._3, fmt2)
                };
      case /* Int32 */5 :
          return {
                  TAG: /* Int32 */5,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: fmt1._2,
                  _3: concat_fmt(fmt1._3, fmt2)
                };
      case /* Nativeint */6 :
          return {
                  TAG: /* Nativeint */6,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: fmt1._2,
                  _3: concat_fmt(fmt1._3, fmt2)
                };
      case /* Int64 */7 :
          return {
                  TAG: /* Int64 */7,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: fmt1._2,
                  _3: concat_fmt(fmt1._3, fmt2)
                };
      case /* Float */8 :
          return {
                  TAG: /* Float */8,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: fmt1._2,
                  _3: concat_fmt(fmt1._3, fmt2)
                };
      case /* Bool */9 :
          return {
                  TAG: /* Bool */9,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Flush */10 :
          return {
                  TAG: /* Flush */10,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* String_literal */11 :
          return {
                  TAG: /* String_literal */11,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Char_literal */12 :
          return {
                  TAG: /* Char_literal */12,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Format_arg */13 :
          return {
                  TAG: /* Format_arg */13,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: concat_fmt(fmt1._2, fmt2)
                };
      case /* Format_subst */14 :
          return {
                  TAG: /* Format_subst */14,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: concat_fmt(fmt1._2, fmt2)
                };
      case /* Alpha */15 :
          return {
                  TAG: /* Alpha */15,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* Theta */16 :
          return {
                  TAG: /* Theta */16,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* Formatting_lit */17 :
          return {
                  TAG: /* Formatting_lit */17,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Formatting_gen */18 :
          return {
                  TAG: /* Formatting_gen */18,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Reader */19 :
          return {
                  TAG: /* Reader */19,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* Scan_char_set */20 :
          return {
                  TAG: /* Scan_char_set */20,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: concat_fmt(fmt1._2, fmt2)
                };
      case /* Scan_get_counter */21 :
          return {
                  TAG: /* Scan_get_counter */21,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Scan_next_char */22 :
          return {
                  TAG: /* Scan_next_char */22,
                  _0: concat_fmt(fmt1._0, fmt2)
                };
      case /* Ignored_param */23 :
          return {
                  TAG: /* Ignored_param */23,
                  _0: fmt1._0,
                  _1: concat_fmt(fmt1._1, fmt2)
                };
      case /* Custom */24 :
          return {
                  TAG: /* Custom */24,
                  _0: fmt1._0,
                  _1: fmt1._1,
                  _2: concat_fmt(fmt1._2, fmt2)
                };
      
    }
  }
  /* No side effect */

  function buffer_check_size(buf, overhead) {
    var len = buf.bytes.length;
    var min_len = buf.ind + overhead | 0;
    if (min_len <= len) {
      return ;
    }
    var new_len = caml_int_max((len << 1), min_len);
    var new_str = caml_create_bytes(new_len);
    blit$1(buf.bytes, 0, new_str, 0, len);
    buf.bytes = new_str;
    
  }

  function buffer_add_char(buf, c) {
    buffer_check_size(buf, 1);
    set(buf.bytes, buf.ind, c);
    buf.ind = buf.ind + 1 | 0;
    
  }

  function buffer_add_string(buf, s) {
    var str_len = s.length;
    buffer_check_size(buf, str_len);
    blit(s, 0, buf.bytes, buf.ind, str_len);
    buf.ind = buf.ind + str_len | 0;
    
  }

  function buffer_contents(buf) {
    return sub_string(buf.bytes, 0, buf.ind);
  }

  function char_of_fconv(fconv) {
    switch (fconv) {
      case /* Float_f */0 :
      case /* Float_pf */1 :
      case /* Float_sf */2 :
          return /* 'f' */102;
      case /* Float_e */3 :
      case /* Float_pe */4 :
      case /* Float_se */5 :
          return /* 'e' */101;
      case /* Float_E */6 :
      case /* Float_pE */7 :
      case /* Float_sE */8 :
          return /* 'E' */69;
      case /* Float_g */9 :
      case /* Float_pg */10 :
      case /* Float_sg */11 :
          return /* 'g' */103;
      case /* Float_G */12 :
      case /* Float_pG */13 :
      case /* Float_sG */14 :
          return /* 'G' */71;
      case /* Float_F */15 :
          return /* 'F' */70;
      case /* Float_h */16 :
      case /* Float_ph */17 :
      case /* Float_sh */18 :
          return /* 'h' */104;
      case /* Float_H */19 :
      case /* Float_pH */20 :
      case /* Float_sH */21 :
          return /* 'H' */72;
      
    }
  }

  function bprint_fconv_flag(buf, fconv) {
    switch (fconv) {
      case /* Float_f */0 :
      case /* Float_e */3 :
      case /* Float_E */6 :
      case /* Float_g */9 :
      case /* Float_G */12 :
      case /* Float_F */15 :
      case /* Float_h */16 :
      case /* Float_H */19 :
          return ;
      case /* Float_pf */1 :
      case /* Float_pe */4 :
      case /* Float_pE */7 :
      case /* Float_pg */10 :
      case /* Float_pG */13 :
      case /* Float_ph */17 :
      case /* Float_pH */20 :
          return buffer_add_char(buf, /* '+' */43);
      case /* Float_sf */2 :
      case /* Float_se */5 :
      case /* Float_sE */8 :
      case /* Float_sg */11 :
      case /* Float_sG */14 :
      case /* Float_sh */18 :
      case /* Float_sH */21 :
          return buffer_add_char(buf, /* ' ' */32);
      
    }
  }

  function string_of_formatting_lit(formatting_lit) {
    if (typeof formatting_lit === "number") {
      switch (formatting_lit) {
        case /* Close_box */0 :
            return "@]";
        case /* Close_tag */1 :
            return "@}";
        case /* FFlush */2 :
            return "@?";
        case /* Force_newline */3 :
            return "@\n";
        case /* Flush_newline */4 :
            return "@.";
        case /* Escaped_at */5 :
            return "@@";
        case /* Escaped_percent */6 :
            return "@%";
        
      }
    } else {
      switch (formatting_lit.TAG | 0) {
        case /* Break */0 :
        case /* Magic_size */1 :
            return formatting_lit._0;
        case /* Scan_indic */2 :
            return "@" + make(1, formatting_lit._0);
        
      }
    }
  }

  function bprint_fmtty(buf, _fmtty) {
    while(true) {
      var fmtty = _fmtty;
      if (typeof fmtty === "number") {
        return ;
      }
      switch (fmtty.TAG | 0) {
        case /* Char_ty */0 :
            buffer_add_string(buf, "%c");
            _fmtty = fmtty._0;
            continue ;
        case /* String_ty */1 :
            buffer_add_string(buf, "%s");
            _fmtty = fmtty._0;
            continue ;
        case /* Int_ty */2 :
            buffer_add_string(buf, "%i");
            _fmtty = fmtty._0;
            continue ;
        case /* Int32_ty */3 :
            buffer_add_string(buf, "%li");
            _fmtty = fmtty._0;
            continue ;
        case /* Nativeint_ty */4 :
            buffer_add_string(buf, "%ni");
            _fmtty = fmtty._0;
            continue ;
        case /* Int64_ty */5 :
            buffer_add_string(buf, "%Li");
            _fmtty = fmtty._0;
            continue ;
        case /* Float_ty */6 :
            buffer_add_string(buf, "%f");
            _fmtty = fmtty._0;
            continue ;
        case /* Bool_ty */7 :
            buffer_add_string(buf, "%B");
            _fmtty = fmtty._0;
            continue ;
        case /* Format_arg_ty */8 :
            buffer_add_string(buf, "%{");
            bprint_fmtty(buf, fmtty._0);
            buffer_add_string(buf, "%}");
            _fmtty = fmtty._1;
            continue ;
        case /* Format_subst_ty */9 :
            buffer_add_string(buf, "%(");
            bprint_fmtty(buf, fmtty._0);
            buffer_add_string(buf, "%)");
            _fmtty = fmtty._2;
            continue ;
        case /* Alpha_ty */10 :
            buffer_add_string(buf, "%a");
            _fmtty = fmtty._0;
            continue ;
        case /* Theta_ty */11 :
            buffer_add_string(buf, "%t");
            _fmtty = fmtty._0;
            continue ;
        case /* Any_ty */12 :
            buffer_add_string(buf, "%?");
            _fmtty = fmtty._0;
            continue ;
        case /* Reader_ty */13 :
            buffer_add_string(buf, "%r");
            _fmtty = fmtty._0;
            continue ;
        case /* Ignored_reader_ty */14 :
            buffer_add_string(buf, "%_r");
            _fmtty = fmtty._0;
            continue ;
        
      }
    }}

  function symm(rest) {
    if (typeof rest === "number") {
      return /* End_of_fmtty */0;
    }
    switch (rest.TAG | 0) {
      case /* Char_ty */0 :
          return {
                  TAG: /* Char_ty */0,
                  _0: symm(rest._0)
                };
      case /* String_ty */1 :
          return {
                  TAG: /* String_ty */1,
                  _0: symm(rest._0)
                };
      case /* Int_ty */2 :
          return {
                  TAG: /* Int_ty */2,
                  _0: symm(rest._0)
                };
      case /* Int32_ty */3 :
          return {
                  TAG: /* Int32_ty */3,
                  _0: symm(rest._0)
                };
      case /* Nativeint_ty */4 :
          return {
                  TAG: /* Nativeint_ty */4,
                  _0: symm(rest._0)
                };
      case /* Int64_ty */5 :
          return {
                  TAG: /* Int64_ty */5,
                  _0: symm(rest._0)
                };
      case /* Float_ty */6 :
          return {
                  TAG: /* Float_ty */6,
                  _0: symm(rest._0)
                };
      case /* Bool_ty */7 :
          return {
                  TAG: /* Bool_ty */7,
                  _0: symm(rest._0)
                };
      case /* Format_arg_ty */8 :
          return {
                  TAG: /* Format_arg_ty */8,
                  _0: rest._0,
                  _1: symm(rest._1)
                };
      case /* Format_subst_ty */9 :
          return {
                  TAG: /* Format_subst_ty */9,
                  _0: rest._1,
                  _1: rest._0,
                  _2: symm(rest._2)
                };
      case /* Alpha_ty */10 :
          return {
                  TAG: /* Alpha_ty */10,
                  _0: symm(rest._0)
                };
      case /* Theta_ty */11 :
          return {
                  TAG: /* Theta_ty */11,
                  _0: symm(rest._0)
                };
      case /* Any_ty */12 :
          return {
                  TAG: /* Any_ty */12,
                  _0: symm(rest._0)
                };
      case /* Reader_ty */13 :
          return {
                  TAG: /* Reader_ty */13,
                  _0: symm(rest._0)
                };
      case /* Ignored_reader_ty */14 :
          return {
                  TAG: /* Ignored_reader_ty */14,
                  _0: symm(rest._0)
                };
      
    }
  }

  function fmtty_rel_det(rest) {
    if (typeof rest === "number") {
      return [
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                }),
              (function (param) {
                  return /* Refl */0;
                })
            ];
    }
    switch (rest.TAG | 0) {
      case /* Char_ty */0 :
          var match = fmtty_rel_det(rest._0);
          var af = match[1];
          var fa = match[0];
          return [
                  (function (param) {
                      _1(fa, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match[2],
                  match[3]
                ];
      case /* String_ty */1 :
          var match$1 = fmtty_rel_det(rest._0);
          var af$1 = match$1[1];
          var fa$1 = match$1[0];
          return [
                  (function (param) {
                      _1(fa$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$1[2],
                  match$1[3]
                ];
      case /* Int_ty */2 :
          var match$2 = fmtty_rel_det(rest._0);
          var af$2 = match$2[1];
          var fa$2 = match$2[0];
          return [
                  (function (param) {
                      _1(fa$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$2[2],
                  match$2[3]
                ];
      case /* Int32_ty */3 :
          var match$3 = fmtty_rel_det(rest._0);
          var af$3 = match$3[1];
          var fa$3 = match$3[0];
          return [
                  (function (param) {
                      _1(fa$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$3[2],
                  match$3[3]
                ];
      case /* Nativeint_ty */4 :
          var match$4 = fmtty_rel_det(rest._0);
          var af$4 = match$4[1];
          var fa$4 = match$4[0];
          return [
                  (function (param) {
                      _1(fa$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$4[2],
                  match$4[3]
                ];
      case /* Int64_ty */5 :
          var match$5 = fmtty_rel_det(rest._0);
          var af$5 = match$5[1];
          var fa$5 = match$5[0];
          return [
                  (function (param) {
                      _1(fa$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$5[2],
                  match$5[3]
                ];
      case /* Float_ty */6 :
          var match$6 = fmtty_rel_det(rest._0);
          var af$6 = match$6[1];
          var fa$6 = match$6[0];
          return [
                  (function (param) {
                      _1(fa$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$6[2],
                  match$6[3]
                ];
      case /* Bool_ty */7 :
          var match$7 = fmtty_rel_det(rest._0);
          var af$7 = match$7[1];
          var fa$7 = match$7[0];
          return [
                  (function (param) {
                      _1(fa$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$7[2],
                  match$7[3]
                ];
      case /* Format_arg_ty */8 :
          var match$8 = fmtty_rel_det(rest._1);
          var af$8 = match$8[1];
          var fa$8 = match$8[0];
          return [
                  (function (param) {
                      _1(fa$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$8[2],
                  match$8[3]
                ];
      case /* Format_subst_ty */9 :
          var match$9 = fmtty_rel_det(rest._2);
          var de = match$9[3];
          var ed = match$9[2];
          var af$9 = match$9[1];
          var fa$9 = match$9[0];
          var ty = trans(symm(rest._0), rest._1);
          var match$10 = fmtty_rel_det(ty);
          var jd = match$10[3];
          var dj = match$10[2];
          var ga = match$10[1];
          var ag = match$10[0];
          return [
                  (function (param) {
                      _1(fa$9, /* Refl */0);
                      _1(ag, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ga, /* Refl */0);
                      _1(af$9, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed, /* Refl */0);
                      _1(dj, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(jd, /* Refl */0);
                      _1(de, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case /* Alpha_ty */10 :
          var match$11 = fmtty_rel_det(rest._0);
          var af$10 = match$11[1];
          var fa$10 = match$11[0];
          return [
                  (function (param) {
                      _1(fa$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$11[2],
                  match$11[3]
                ];
      case /* Theta_ty */11 :
          var match$12 = fmtty_rel_det(rest._0);
          var af$11 = match$12[1];
          var fa$11 = match$12[0];
          return [
                  (function (param) {
                      _1(fa$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$12[2],
                  match$12[3]
                ];
      case /* Any_ty */12 :
          var match$13 = fmtty_rel_det(rest._0);
          var af$12 = match$13[1];
          var fa$12 = match$13[0];
          return [
                  (function (param) {
                      _1(fa$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$13[2],
                  match$13[3]
                ];
      case /* Reader_ty */13 :
          var match$14 = fmtty_rel_det(rest._0);
          var de$1 = match$14[3];
          var ed$1 = match$14[2];
          var af$13 = match$14[1];
          var fa$13 = match$14[0];
          return [
                  (function (param) {
                      _1(fa$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(de$1, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case /* Ignored_reader_ty */14 :
          var match$15 = fmtty_rel_det(rest._0);
          var de$2 = match$15[3];
          var ed$2 = match$15[2];
          var af$14 = match$15[1];
          var fa$14 = match$15[0];
          return [
                  (function (param) {
                      _1(fa$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(af$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(ed$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function (param) {
                      _1(de$2, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      
    }
  }

  function trans(ty1, ty2) {
    var exit = 0;
    if (typeof ty1 === "number") {
      if (typeof ty2 === "number") {
        return /* End_of_fmtty */0;
      }
      switch (ty2.TAG | 0) {
        case /* Format_arg_ty */8 :
            exit = 6;
            break;
        case /* Format_subst_ty */9 :
            exit = 7;
            break;
        case /* Alpha_ty */10 :
            exit = 1;
            break;
        case /* Theta_ty */11 :
            exit = 2;
            break;
        case /* Any_ty */12 :
            exit = 3;
            break;
        case /* Reader_ty */13 :
            exit = 4;
            break;
        case /* Ignored_reader_ty */14 :
            exit = 5;
            break;
        default:
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  846,
                  23
                ],
                Error: new Error()
              };
      }
    } else {
      switch (ty1.TAG | 0) {
        case /* Char_ty */0 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Char_ty */0 :
                    return {
                            TAG: /* Char_ty */0,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* String_ty */1 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* String_ty */1 :
                    return {
                            TAG: /* String_ty */1,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int_ty */2 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Int_ty */2 :
                    return {
                            TAG: /* Int_ty */2,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int32_ty */3 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Int32_ty */3 :
                    return {
                            TAG: /* Int32_ty */3,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Nativeint_ty */4 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Nativeint_ty */4 :
                    return {
                            TAG: /* Nativeint_ty */4,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Int64_ty */5 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Int64_ty */5 :
                    return {
                            TAG: /* Int64_ty */5,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Float_ty */6 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Float_ty */6 :
                    return {
                            TAG: /* Float_ty */6,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Bool_ty */7 :
            if (typeof ty2 === "number") {
              exit = 8;
            } else {
              switch (ty2.TAG | 0) {
                case /* Bool_ty */7 :
                    return {
                            TAG: /* Bool_ty */7,
                            _0: trans(ty1._0, ty2._0)
                          };
                case /* Format_arg_ty */8 :
                    exit = 6;
                    break;
                case /* Format_subst_ty */9 :
                    exit = 7;
                    break;
                case /* Alpha_ty */10 :
                    exit = 1;
                    break;
                case /* Theta_ty */11 :
                    exit = 2;
                    break;
                case /* Any_ty */12 :
                    exit = 3;
                    break;
                case /* Reader_ty */13 :
                    exit = 4;
                    break;
                case /* Ignored_reader_ty */14 :
                    exit = 5;
                    break;
                
              }
            }
            break;
        case /* Format_arg_ty */8 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      832,
                      26
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Format_arg_ty */8 :
                  return {
                          TAG: /* Format_arg_ty */8,
                          _0: trans(ty1._0, ty2._0),
                          _1: trans(ty1._1, ty2._1)
                        };
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  exit = 5;
                  break;
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        832,
                        26
                      ],
                      Error: new Error()
                    };
            }
            break;
        case /* Format_subst_ty */9 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      842,
                      28
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Format_arg_ty */8 :
                  exit = 6;
                  break;
              case /* Format_subst_ty */9 :
                  var ty = trans(symm(ty1._1), ty2._0);
                  var match = fmtty_rel_det(ty);
                  _1(match[1], /* Refl */0);
                  _1(match[3], /* Refl */0);
                  return {
                          TAG: /* Format_subst_ty */9,
                          _0: ty1._0,
                          _1: ty2._1,
                          _2: trans(ty1._2, ty2._2)
                        };
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  exit = 5;
                  break;
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        842,
                        28
                      ],
                      Error: new Error()
                    };
            }
            break;
        case /* Alpha_ty */10 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      810,
                      21
                    ],
                    Error: new Error()
                  };
            }
            if (ty2.TAG === /* Alpha_ty */10) {
              return {
                      TAG: /* Alpha_ty */10,
                      _0: trans(ty1._0, ty2._0)
                    };
            }
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "camlinternalFormat.ml",
                    810,
                    21
                  ],
                  Error: new Error()
                };
        case /* Theta_ty */11 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      814,
                      21
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  return {
                          TAG: /* Theta_ty */11,
                          _0: trans(ty1._0, ty2._0)
                        };
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        814,
                        21
                      ],
                      Error: new Error()
                    };
            }
            break;
        case /* Any_ty */12 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      818,
                      19
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  return {
                          TAG: /* Any_ty */12,
                          _0: trans(ty1._0, ty2._0)
                        };
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        818,
                        19
                      ],
                      Error: new Error()
                    };
            }
            break;
        case /* Reader_ty */13 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      822,
                      22
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  return {
                          TAG: /* Reader_ty */13,
                          _0: trans(ty1._0, ty2._0)
                        };
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        822,
                        22
                      ],
                      Error: new Error()
                    };
            }
            break;
        case /* Ignored_reader_ty */14 :
            if (typeof ty2 === "number") {
              throw {
                    RE_EXN_ID: "Assert_failure",
                    _1: [
                      "camlinternalFormat.ml",
                      827,
                      30
                    ],
                    Error: new Error()
                  };
            }
            switch (ty2.TAG | 0) {
              case /* Alpha_ty */10 :
                  exit = 1;
                  break;
              case /* Theta_ty */11 :
                  exit = 2;
                  break;
              case /* Any_ty */12 :
                  exit = 3;
                  break;
              case /* Reader_ty */13 :
                  exit = 4;
                  break;
              case /* Ignored_reader_ty */14 :
                  return {
                          TAG: /* Ignored_reader_ty */14,
                          _0: trans(ty1._0, ty2._0)
                        };
              default:
                throw {
                      RE_EXN_ID: "Assert_failure",
                      _1: [
                        "camlinternalFormat.ml",
                        827,
                        30
                      ],
                      Error: new Error()
                    };
            }
            break;
        
      }
    }
    switch (exit) {
      case 1 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  811,
                  21
                ],
                Error: new Error()
              };
      case 2 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  815,
                  21
                ],
                Error: new Error()
              };
      case 3 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  819,
                  19
                ],
                Error: new Error()
              };
      case 4 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  823,
                  22
                ],
                Error: new Error()
              };
      case 5 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  828,
                  30
                ],
                Error: new Error()
              };
      case 6 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  833,
                  26
                ],
                Error: new Error()
              };
      case 7 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  843,
                  28
                ],
                Error: new Error()
              };
      case 8 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  847,
                  23
                ],
                Error: new Error()
              };
      
    }
  }

  var Type_mismatch = /* @__PURE__ */create$2("CamlinternalFormat.Type_mismatch");

  function type_padding(pad, fmtty) {
    if (typeof pad === "number") {
      return /* Padding_fmtty_EBB */{
              _0: /* No_padding */0,
              _1: fmtty
            };
    }
    if (pad.TAG === /* Lit_padding */0) {
      return /* Padding_fmtty_EBB */{
              _0: {
                TAG: /* Lit_padding */0,
                _0: pad._0,
                _1: pad._1
              },
              _1: fmtty
            };
    }
    if (typeof fmtty === "number") {
      throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
    }
    if (fmtty.TAG === /* Int_ty */2) {
      return /* Padding_fmtty_EBB */{
              _0: {
                TAG: /* Arg_padding */1,
                _0: pad._0
              },
              _1: fmtty._0
            };
    }
    throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
  }

  function type_padprec(pad, prec, fmtty) {
    var match = type_padding(pad, fmtty);
    if (typeof prec !== "number") {
      return /* Padprec_fmtty_EBB */{
              _0: match._0,
              _1: /* Lit_precision */{
                _0: prec._0
              },
              _2: match._1
            };
    }
    if (prec === 0) {
      return /* Padprec_fmtty_EBB */{
              _0: match._0,
              _1: /* No_precision */0,
              _2: match._1
            };
    }
    var rest = match._1;
    if (typeof rest === "number") {
      throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
    }
    if (rest.TAG === /* Int_ty */2) {
      return /* Padprec_fmtty_EBB */{
              _0: match._0,
              _1: /* Arg_precision */1,
              _2: rest._0
            };
    }
    throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
  }

  function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
    if (typeof sub_fmtty === "number") {
      return /* Fmtty_fmt_EBB */{
              _0: /* End_of_fmtty */0,
              _1: type_format_gen(fmt, fmtty)
            };
    }
    switch (sub_fmtty.TAG | 0) {
      case /* Char_ty */0 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Char_ty */0) {
            var match = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Char_ty */0,
                      _0: match._0
                    },
                    _1: match._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* String_ty */1 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* String_ty */1) {
            var match$1 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* String_ty */1,
                      _0: match$1._0
                    },
                    _1: match$1._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int_ty */2 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Int_ty */2) {
            var match$2 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Int_ty */2,
                      _0: match$2._0
                    },
                    _1: match$2._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int32_ty */3 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Int32_ty */3) {
            var match$3 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Int32_ty */3,
                      _0: match$3._0
                    },
                    _1: match$3._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Nativeint_ty */4 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Nativeint_ty */4) {
            var match$4 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Nativeint_ty */4,
                      _0: match$4._0
                    },
                    _1: match$4._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int64_ty */5 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Int64_ty */5) {
            var match$5 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Int64_ty */5,
                      _0: match$5._0
                    },
                    _1: match$5._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Float_ty */6 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Float_ty */6) {
            var match$6 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Float_ty */6,
                      _0: match$6._0
                    },
                    _1: match$6._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Bool_ty */7 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Bool_ty */7) {
            var match$7 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Bool_ty */7,
                      _0: match$7._0
                    },
                    _1: match$7._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Format_arg_ty */8 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Format_arg_ty */8) {
            var sub2_fmtty$prime = fmtty._0;
            if (caml_notequal(/* Fmtty_EBB */{
                    _0: sub_fmtty._0
                  }, /* Fmtty_EBB */{
                    _0: sub2_fmtty$prime
                  })) {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            var match$8 = type_ignored_format_substitution(sub_fmtty._1, fmt, fmtty._1);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Format_arg_ty */8,
                      _0: sub2_fmtty$prime,
                      _1: match$8._0
                    },
                    _1: match$8._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Format_subst_ty */9 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Format_subst_ty */9) {
            var sub2_fmtty$prime$1 = fmtty._1;
            var sub1_fmtty$prime = fmtty._0;
            if (caml_notequal(/* Fmtty_EBB */{
                    _0: erase_rel(sub_fmtty._0)
                  }, /* Fmtty_EBB */{
                    _0: erase_rel(sub1_fmtty$prime)
                  })) {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            if (caml_notequal(/* Fmtty_EBB */{
                    _0: erase_rel(sub_fmtty._1)
                  }, /* Fmtty_EBB */{
                    _0: erase_rel(sub2_fmtty$prime$1)
                  })) {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
            var match$9 = fmtty_rel_det(sub_fmtty$prime);
            _1(match$9[1], /* Refl */0);
            _1(match$9[3], /* Refl */0);
            var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty._2), fmt, fmtty._2);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Format_subst_ty */9,
                      _0: sub1_fmtty$prime,
                      _1: sub2_fmtty$prime$1,
                      _2: symm(match$10._0)
                    },
                    _1: match$10._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Alpha_ty */10 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Alpha_ty */10) {
            var match$11 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Alpha_ty */10,
                      _0: match$11._0
                    },
                    _1: match$11._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Theta_ty */11 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Theta_ty */11) {
            var match$12 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Theta_ty */11,
                      _0: match$12._0
                    },
                    _1: match$12._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Any_ty */12 :
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Reader_ty */13 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Reader_ty */13) {
            var match$13 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Reader_ty */13,
                      _0: match$13._0
                    },
                    _1: match$13._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Ignored_reader_ty */14 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Ignored_reader_ty */14) {
            var match$14 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
            return /* Fmtty_fmt_EBB */{
                    _0: {
                      TAG: /* Ignored_reader_ty */14,
                      _0: match$14._0
                    },
                    _1: match$14._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      
    }
  }

  function type_format_gen(fmt, fmtty) {
    if (typeof fmt === "number") {
      return /* Fmt_fmtty_EBB */{
              _0: /* End_of_format */0,
              _1: fmtty
            };
    }
    switch (fmt.TAG | 0) {
      case /* Char */0 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Char_ty */0) {
            var match = type_format_gen(fmt._0, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Char */0,
                      _0: match._0
                    },
                    _1: match._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Caml_char */1 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Char_ty */0) {
            var match$1 = type_format_gen(fmt._0, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Caml_char */1,
                      _0: match$1._0
                    },
                    _1: match$1._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* String */2 :
          var match$2 = type_padding(fmt._0, fmtty);
          var fmtty_rest = match$2._1;
          if (typeof fmtty_rest === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest.TAG === /* String_ty */1) {
            var match$3 = type_format_gen(fmt._1, fmtty_rest._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* String */2,
                      _0: match$2._0,
                      _1: match$3._0
                    },
                    _1: match$3._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Caml_string */3 :
          var match$4 = type_padding(fmt._0, fmtty);
          var fmtty_rest$1 = match$4._1;
          if (typeof fmtty_rest$1 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$1.TAG === /* String_ty */1) {
            var match$5 = type_format_gen(fmt._1, fmtty_rest$1._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Caml_string */3,
                      _0: match$4._0,
                      _1: match$5._0
                    },
                    _1: match$5._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int */4 :
          var match$6 = type_padprec(fmt._1, fmt._2, fmtty);
          var fmtty_rest$2 = match$6._2;
          if (typeof fmtty_rest$2 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$2.TAG === /* Int_ty */2) {
            var match$7 = type_format_gen(fmt._3, fmtty_rest$2._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Int */4,
                      _0: fmt._0,
                      _1: match$6._0,
                      _2: match$6._1,
                      _3: match$7._0
                    },
                    _1: match$7._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int32 */5 :
          var match$8 = type_padprec(fmt._1, fmt._2, fmtty);
          var fmtty_rest$3 = match$8._2;
          if (typeof fmtty_rest$3 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$3.TAG === /* Int32_ty */3) {
            var match$9 = type_format_gen(fmt._3, fmtty_rest$3._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Int32 */5,
                      _0: fmt._0,
                      _1: match$8._0,
                      _2: match$8._1,
                      _3: match$9._0
                    },
                    _1: match$9._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Nativeint */6 :
          var match$10 = type_padprec(fmt._1, fmt._2, fmtty);
          var fmtty_rest$4 = match$10._2;
          if (typeof fmtty_rest$4 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$4.TAG === /* Nativeint_ty */4) {
            var match$11 = type_format_gen(fmt._3, fmtty_rest$4._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Nativeint */6,
                      _0: fmt._0,
                      _1: match$10._0,
                      _2: match$10._1,
                      _3: match$11._0
                    },
                    _1: match$11._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Int64 */7 :
          var match$12 = type_padprec(fmt._1, fmt._2, fmtty);
          var fmtty_rest$5 = match$12._2;
          if (typeof fmtty_rest$5 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$5.TAG === /* Int64_ty */5) {
            var match$13 = type_format_gen(fmt._3, fmtty_rest$5._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Int64 */7,
                      _0: fmt._0,
                      _1: match$12._0,
                      _2: match$12._1,
                      _3: match$13._0
                    },
                    _1: match$13._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Float */8 :
          var match$14 = type_padprec(fmt._1, fmt._2, fmtty);
          var fmtty_rest$6 = match$14._2;
          if (typeof fmtty_rest$6 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$6.TAG === /* Float_ty */6) {
            var match$15 = type_format_gen(fmt._3, fmtty_rest$6._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Float */8,
                      _0: fmt._0,
                      _1: match$14._0,
                      _2: match$14._1,
                      _3: match$15._0
                    },
                    _1: match$15._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Bool */9 :
          var match$16 = type_padding(fmt._0, fmtty);
          var fmtty_rest$7 = match$16._1;
          if (typeof fmtty_rest$7 === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty_rest$7.TAG === /* Bool_ty */7) {
            var match$17 = type_format_gen(fmt._1, fmtty_rest$7._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Bool */9,
                      _0: match$16._0,
                      _1: match$17._0
                    },
                    _1: match$17._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Flush */10 :
          var match$18 = type_format_gen(fmt._0, fmtty);
          return /* Fmt_fmtty_EBB */{
                  _0: {
                    TAG: /* Flush */10,
                    _0: match$18._0
                  },
                  _1: match$18._1
                };
      case /* String_literal */11 :
          var match$19 = type_format_gen(fmt._1, fmtty);
          return /* Fmt_fmtty_EBB */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: fmt._0,
                    _1: match$19._0
                  },
                  _1: match$19._1
                };
      case /* Char_literal */12 :
          var match$20 = type_format_gen(fmt._1, fmtty);
          return /* Fmt_fmtty_EBB */{
                  _0: {
                    TAG: /* Char_literal */12,
                    _0: fmt._0,
                    _1: match$20._0
                  },
                  _1: match$20._1
                };
      case /* Format_arg */13 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Format_arg_ty */8) {
            var sub_fmtty$prime = fmtty._0;
            if (caml_notequal(/* Fmtty_EBB */{
                    _0: fmt._1
                  }, /* Fmtty_EBB */{
                    _0: sub_fmtty$prime
                  })) {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            var match$21 = type_format_gen(fmt._2, fmtty._1);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Format_arg */13,
                      _0: fmt._0,
                      _1: sub_fmtty$prime,
                      _2: match$21._0
                    },
                    _1: match$21._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Format_subst */14 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Format_subst_ty */9) {
            var sub_fmtty1 = fmtty._0;
            if (caml_notequal(/* Fmtty_EBB */{
                    _0: erase_rel(fmt._1)
                  }, /* Fmtty_EBB */{
                    _0: erase_rel(sub_fmtty1)
                  })) {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            var match$22 = type_format_gen(fmt._2, erase_rel(fmtty._2));
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Format_subst */14,
                      _0: fmt._0,
                      _1: sub_fmtty1,
                      _2: match$22._0
                    },
                    _1: match$22._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Alpha */15 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Alpha_ty */10) {
            var match$23 = type_format_gen(fmt._0, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Alpha */15,
                      _0: match$23._0
                    },
                    _1: match$23._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Theta */16 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Theta_ty */11) {
            var match$24 = type_format_gen(fmt._0, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Theta */16,
                      _0: match$24._0
                    },
                    _1: match$24._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Formatting_lit */17 :
          var match$25 = type_format_gen(fmt._1, fmtty);
          return /* Fmt_fmtty_EBB */{
                  _0: {
                    TAG: /* Formatting_lit */17,
                    _0: fmt._0,
                    _1: match$25._0
                  },
                  _1: match$25._1
                };
      case /* Formatting_gen */18 :
          var formatting_gen = fmt._0;
          var fmt0 = fmt._1;
          if (formatting_gen.TAG === /* Open_tag */0) {
            var match$26 = formatting_gen._0;
            var match$27 = type_format_gen(match$26._0, fmtty);
            var match$28 = type_format_gen(fmt0, match$27._1);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Formatting_gen */18,
                      _0: {
                        TAG: /* Open_tag */0,
                        _0: /* Format */{
                          _0: match$27._0,
                          _1: match$26._1
                        }
                      },
                      _1: match$28._0
                    },
                    _1: match$28._1
                  };
          }
          var match$29 = formatting_gen._0;
          var match$30 = type_format_gen(match$29._0, fmtty);
          var match$31 = type_format_gen(fmt0, match$30._1);
          return /* Fmt_fmtty_EBB */{
                  _0: {
                    TAG: /* Formatting_gen */18,
                    _0: {
                      TAG: /* Open_box */1,
                      _0: /* Format */{
                        _0: match$30._0,
                        _1: match$29._1
                      }
                    },
                    _1: match$31._0
                  },
                  _1: match$31._1
                };
      case /* Reader */19 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Reader_ty */13) {
            var match$32 = type_format_gen(fmt._0, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Reader */19,
                      _0: match$32._0
                    },
                    _1: match$32._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Scan_char_set */20 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* String_ty */1) {
            var match$33 = type_format_gen(fmt._2, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Scan_char_set */20,
                      _0: fmt._0,
                      _1: fmt._1,
                      _2: match$33._0
                    },
                    _1: match$33._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Scan_get_counter */21 :
          if (typeof fmtty === "number") {
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          }
          if (fmtty.TAG === /* Int_ty */2) {
            var match$34 = type_format_gen(fmt._1, fmtty._0);
            return /* Fmt_fmtty_EBB */{
                    _0: {
                      TAG: /* Scan_get_counter */21,
                      _0: fmt._0,
                      _1: match$34._0
                    },
                    _1: match$34._1
                  };
          }
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      case /* Ignored_param */23 :
          var ign = fmt._0;
          var fmt$1 = fmt._1;
          if (typeof ign === "number") {
            if (ign !== /* Ignored_reader */2) {
              return type_ignored_param_one(ign, fmt$1, fmtty);
            }
            if (typeof fmtty === "number") {
              throw {
                    RE_EXN_ID: Type_mismatch,
                    Error: new Error()
                  };
            }
            if (fmtty.TAG === /* Ignored_reader_ty */14) {
              var match$35 = type_format_gen(fmt$1, fmtty._0);
              return /* Fmt_fmtty_EBB */{
                      _0: {
                        TAG: /* Ignored_param */23,
                        _0: /* Ignored_reader */2,
                        _1: match$35._0
                      },
                      _1: match$35._1
                    };
            }
            throw {
                  RE_EXN_ID: Type_mismatch,
                  Error: new Error()
                };
          } else {
            switch (ign.TAG | 0) {
              case /* Ignored_format_arg */8 :
                  return type_ignored_param_one({
                              TAG: /* Ignored_format_arg */8,
                              _0: ign._0,
                              _1: ign._1
                            }, fmt$1, fmtty);
              case /* Ignored_format_subst */9 :
                  var match$36 = type_ignored_format_substitution(ign._1, fmt$1, fmtty);
                  var match$37 = match$36._1;
                  return /* Fmt_fmtty_EBB */{
                          _0: {
                            TAG: /* Ignored_param */23,
                            _0: {
                              TAG: /* Ignored_format_subst */9,
                              _0: ign._0,
                              _1: match$36._0
                            },
                            _1: match$37._0
                          },
                          _1: match$37._1
                        };
              default:
                return type_ignored_param_one(ign, fmt$1, fmtty);
            }
          }
      case /* Scan_next_char */22 :
      case /* Custom */24 :
          throw {
                RE_EXN_ID: Type_mismatch,
                Error: new Error()
              };
      
    }
  }

  function type_ignored_param_one(ign, fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    return /* Fmt_fmtty_EBB */{
            _0: {
              TAG: /* Ignored_param */23,
              _0: ign,
              _1: match._0
            },
            _1: match._1
          };
  }

  function type_format(fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    if (typeof match._1 === "number") {
      return match._0;
    }
    throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
  }

  function recast(fmt, fmtty) {
    return type_format(fmt, erase_rel(symm(fmtty)));
  }

  function fix_padding(padty, width, str) {
    var len = str.length;
    var width$1 = abs(width);
    var padty$1 = width < 0 ? /* Left */0 : padty;
    if (width$1 <= len) {
      return str;
    }
    var res = make$1(width$1, padty$1 === /* Zeros */2 ? /* '0' */48 : /* ' ' */32);
    switch (padty$1) {
      case /* Left */0 :
          blit(str, 0, res, 0, len);
          break;
      case /* Right */1 :
          blit(str, 0, res, width$1 - len | 0, len);
          break;
      case /* Zeros */2 :
          if (len > 0 && (get$1(str, 0) === /* '+' */43 || get$1(str, 0) === /* '-' */45 || get$1(str, 0) === /* ' ' */32)) {
            set(res, 0, get$1(str, 0));
            blit(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
          } else if (len > 1 && get$1(str, 0) === /* '0' */48 && (get$1(str, 1) === /* 'x' */120 || get$1(str, 1) === /* 'X' */88)) {
            set(res, 1, get$1(str, 1));
            blit(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
          } else {
            blit(str, 0, res, width$1 - len | 0, len);
          }
          break;
      
    }
    return bytes_to_string(res);
  }

  function fix_int_precision(prec, str) {
    var prec$1 = abs(prec);
    var len = str.length;
    var c = get$1(str, 0);
    var exit = 0;
    if (c >= 58) {
      if (c >= 71) {
        if (c > 102 || c < 97) {
          return str;
        }
        exit = 2;
      } else {
        if (c < 65) {
          return str;
        }
        exit = 2;
      }
    } else if (c !== 32) {
      if (c < 43) {
        return str;
      }
      switch (c) {
        case 43 :
        case 45 :
            exit = 1;
            break;
        case 44 :
        case 46 :
        case 47 :
            return str;
        case 48 :
            if ((prec$1 + 2 | 0) > len && len > 1 && (get$1(str, 1) === /* 'x' */120 || get$1(str, 1) === /* 'X' */88)) {
              var res = make$1(prec$1 + 2 | 0, /* '0' */48);
              set(res, 1, get$1(str, 1));
              blit(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
              return bytes_to_string(res);
            }
            exit = 2;
            break;
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            exit = 2;
            break;
        
      }
    } else {
      exit = 1;
    }
    switch (exit) {
      case 1 :
          if ((prec$1 + 1 | 0) <= len) {
            return str;
          }
          var res$1 = make$1(prec$1 + 1 | 0, /* '0' */48);
          set(res$1, 0, c);
          blit(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
          return bytes_to_string(res$1);
      case 2 :
          if (prec$1 <= len) {
            return str;
          }
          var res$2 = make$1(prec$1, /* '0' */48);
          blit(str, 0, res$2, prec$1 - len | 0, len);
          return bytes_to_string(res$2);
      
    }
  }

  function string_to_caml_string(str) {
    var str$1 = escaped(str);
    var l = str$1.length;
    var res = make$1(l + 2 | 0, /* '"' */34);
    caml_blit_string(str$1, 0, res, 1, l);
    return bytes_to_string(res);
  }

  function format_of_iconv(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%d";
      case /* Int_pd */1 :
          return "%+d";
      case /* Int_sd */2 :
          return "% d";
      case /* Int_i */3 :
          return "%i";
      case /* Int_pi */4 :
          return "%+i";
      case /* Int_si */5 :
          return "% i";
      case /* Int_x */6 :
          return "%x";
      case /* Int_Cx */7 :
          return "%#x";
      case /* Int_X */8 :
          return "%X";
      case /* Int_CX */9 :
          return "%#X";
      case /* Int_o */10 :
          return "%o";
      case /* Int_Co */11 :
          return "%#o";
      case /* Int_u */12 :
          return "%u";
      
    }
  }

  function format_of_iconvL(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%Ld";
      case /* Int_pd */1 :
          return "%+Ld";
      case /* Int_sd */2 :
          return "% Ld";
      case /* Int_i */3 :
          return "%Li";
      case /* Int_pi */4 :
          return "%+Li";
      case /* Int_si */5 :
          return "% Li";
      case /* Int_x */6 :
          return "%Lx";
      case /* Int_Cx */7 :
          return "%#Lx";
      case /* Int_X */8 :
          return "%LX";
      case /* Int_CX */9 :
          return "%#LX";
      case /* Int_o */10 :
          return "%Lo";
      case /* Int_Co */11 :
          return "%#Lo";
      case /* Int_u */12 :
          return "%Lu";
      
    }
  }

  function format_of_iconvl(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%ld";
      case /* Int_pd */1 :
          return "%+ld";
      case /* Int_sd */2 :
          return "% ld";
      case /* Int_i */3 :
          return "%li";
      case /* Int_pi */4 :
          return "%+li";
      case /* Int_si */5 :
          return "% li";
      case /* Int_x */6 :
          return "%lx";
      case /* Int_Cx */7 :
          return "%#lx";
      case /* Int_X */8 :
          return "%lX";
      case /* Int_CX */9 :
          return "%#lX";
      case /* Int_o */10 :
          return "%lo";
      case /* Int_Co */11 :
          return "%#lo";
      case /* Int_u */12 :
          return "%lu";
      
    }
  }

  function format_of_iconvn(param) {
    switch (param) {
      case /* Int_d */0 :
          return "%nd";
      case /* Int_pd */1 :
          return "%+nd";
      case /* Int_sd */2 :
          return "% nd";
      case /* Int_i */3 :
          return "%ni";
      case /* Int_pi */4 :
          return "%+ni";
      case /* Int_si */5 :
          return "% ni";
      case /* Int_x */6 :
          return "%nx";
      case /* Int_Cx */7 :
          return "%#nx";
      case /* Int_X */8 :
          return "%nX";
      case /* Int_CX */9 :
          return "%#nX";
      case /* Int_o */10 :
          return "%no";
      case /* Int_Co */11 :
          return "%#no";
      case /* Int_u */12 :
          return "%nu";
      
    }
  }

  function format_of_fconv(fconv, prec) {
    if (fconv === /* Float_F */15) {
      return "%.12g";
    }
    var prec$1 = abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    buffer_add_char(buf, /* '%' */37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, /* '.' */46);
    buffer_add_string(buf, String(prec$1));
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }

  function convert_int(iconv, n) {
    return caml_format_int(format_of_iconv(iconv), n);
  }

  function convert_int32(iconv, n) {
    return caml_int32_format(format_of_iconvl(iconv), n);
  }

  function convert_nativeint(iconv, n) {
    return caml_nativeint_format(format_of_iconvn(iconv), n);
  }

  function convert_int64(iconv, n) {
    return caml_int64_format(format_of_iconvL(iconv), n);
  }

  function convert_float(fconv, prec, x) {
    if (fconv >= 16) {
      var sign;
      if (fconv >= 17) {
        switch (fconv) {
          case /* Float_H */19 :
              sign = /* '-' */45;
              break;
          case /* Float_ph */17 :
          case /* Float_pH */20 :
              sign = /* '+' */43;
              break;
          case /* Float_sh */18 :
          case /* Float_sH */21 :
              sign = /* ' ' */32;
              break;
          
        }
      } else {
        sign = /* '-' */45;
      }
      var str = caml_hexstring_of_float(x, prec, sign);
      if (fconv >= 19) {
        return bytes_to_string(uppercase_ascii(bytes_of_string(str)));
      } else {
        return str;
      }
    }
    var str$1 = caml_format_float(format_of_fconv(fconv, prec), x);
    if (fconv !== /* Float_F */15) {
      return str$1;
    }
    var len = str$1.length;
    var is_valid = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        var match = get$1(str$1, i);
        if (match > 69 || match < 46) {
          if (match === 101) {
            return true;
          }
          _i = i + 1 | 0;
          continue ;
        }
        if (match > 68 || match < 47) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }  };
    var match = classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str$1;
      } else {
        return str$1 + ".";
      }
    } else if (x < 0.0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }

  function format_caml_char(c) {
    var str = escaped$2(c);
    var l = str.length;
    var res = make$1(l + 2 | 0, /* '\'' */39);
    caml_blit_string(str, 0, res, 1, l);
    return bytes_to_string(res);
  }

  function string_of_fmtty(fmtty) {
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    bprint_fmtty(buf, fmtty);
    return buffer_contents(buf);
  }

  function make_printf(_k, o, _acc, _fmt) {
    while(true) {
      var fmt = _fmt;
      var acc = _acc;
      var k = _k;
      if (typeof fmt === "number") {
        return _2(k, o, acc);
      }
      switch (fmt.TAG | 0) {
        case /* Char */0 :
            var rest = fmt._0;
            return (function(k,acc,rest){
            return function (c) {
              var new_acc = {
                TAG: /* Acc_data_char */5,
                _0: acc,
                _1: c
              };
              return make_printf(k, o, new_acc, rest);
            }
            }(k,acc,rest));
        case /* Caml_char */1 :
            var rest$1 = fmt._0;
            return (function(k,acc,rest$1){
            return function (c) {
              var new_acc_1 = format_caml_char(c);
              var new_acc = {
                TAG: /* Acc_data_string */4,
                _0: acc,
                _1: new_acc_1
              };
              return make_printf(k, o, new_acc, rest$1);
            }
            }(k,acc,rest$1));
        case /* String */2 :
            return make_padding(k, o, acc, fmt._1, fmt._0, (function (str) {
                          return str;
                        }));
        case /* Caml_string */3 :
            return make_padding(k, o, acc, fmt._1, fmt._0, string_to_caml_string);
        case /* Int */4 :
            return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int, fmt._0);
        case /* Int32 */5 :
            return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int32, fmt._0);
        case /* Nativeint */6 :
            return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_nativeint, fmt._0);
        case /* Int64 */7 :
            return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int64, fmt._0);
        case /* Float */8 :
            var fmt$1 = fmt._3;
            var pad = fmt._1;
            var prec = fmt._2;
            var fconv = fmt._0;
            if (typeof pad === "number") {
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k,acc,fmt$1,fconv){
                  return function (p, x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k, o, {
                                TAG: /* Acc_data_string */4,
                                _0: acc,
                                _1: str
                              }, fmt$1);
                  }
                  }(k,acc,fmt$1,fconv));
                } else {
                  return (function(k,acc,fmt$1,fconv){
                  return function (x) {
                    var str = convert_float(fconv, -6, x);
                    return make_printf(k, o, {
                                TAG: /* Acc_data_string */4,
                                _0: acc,
                                _1: str
                              }, fmt$1);
                  }
                  }(k,acc,fmt$1,fconv));
                }
              }
              var p = prec._0;
              return (function(k,acc,fmt$1,fconv,p){
              return function (x) {
                var str = convert_float(fconv, p, x);
                return make_printf(k, o, {
                            TAG: /* Acc_data_string */4,
                            _0: acc,
                            _1: str
                          }, fmt$1);
              }
              }(k,acc,fmt$1,fconv,p));
            }
            if (pad.TAG === /* Lit_padding */0) {
              var w = pad._1;
              var padty = pad._0;
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k,acc,fmt$1,fconv,padty,w){
                  return function (p, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p, x));
                    return make_printf(k, o, {
                                TAG: /* Acc_data_string */4,
                                _0: acc,
                                _1: str
                              }, fmt$1);
                  }
                  }(k,acc,fmt$1,fconv,padty,w));
                } else {
                  return (function(k,acc,fmt$1,fconv,padty,w){
                  return function (x) {
                    var str = convert_float(fconv, -6, x);
                    var str$prime = fix_padding(padty, w, str);
                    return make_printf(k, o, {
                                TAG: /* Acc_data_string */4,
                                _0: acc,
                                _1: str$prime
                              }, fmt$1);
                  }
                  }(k,acc,fmt$1,fconv,padty,w));
                }
              }
              var p$1 = prec._0;
              return (function(k,acc,fmt$1,fconv,padty,w,p$1){
              return function (x) {
                var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                return make_printf(k, o, {
                            TAG: /* Acc_data_string */4,
                            _0: acc,
                            _1: str
                          }, fmt$1);
              }
              }(k,acc,fmt$1,fconv,padty,w,p$1));
            }
            var padty$1 = pad._0;
            if (typeof prec === "number") {
              if (prec !== 0) {
                return (function(k,acc,fmt$1,fconv,padty$1){
                return function (w, p, x) {
                  var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                  return make_printf(k, o, {
                              TAG: /* Acc_data_string */4,
                              _0: acc,
                              _1: str
                            }, fmt$1);
                }
                }(k,acc,fmt$1,fconv,padty$1));
              } else {
                return (function(k,acc,fmt$1,fconv,padty$1){
                return function (w, x) {
                  var str = convert_float(fconv, -6, x);
                  var str$prime = fix_padding(padty$1, w, str);
                  return make_printf(k, o, {
                              TAG: /* Acc_data_string */4,
                              _0: acc,
                              _1: str$prime
                            }, fmt$1);
                }
                }(k,acc,fmt$1,fconv,padty$1));
              }
            }
            var p$2 = prec._0;
            return (function(k,acc,fmt$1,fconv,padty$1,p$2){
            return function (w, x) {
              var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
              return make_printf(k, o, {
                          TAG: /* Acc_data_string */4,
                          _0: acc,
                          _1: str
                        }, fmt$1);
            }
            }(k,acc,fmt$1,fconv,padty$1,p$2));
        case /* Bool */9 :
            return make_padding(k, o, acc, fmt._1, fmt._0, string_of_bool);
        case /* Flush */10 :
            _fmt = fmt._0;
            _acc = {
              TAG: /* Acc_flush */7,
              _0: acc
            };
            continue ;
        case /* String_literal */11 :
            _fmt = fmt._1;
            _acc = {
              TAG: /* Acc_string_literal */2,
              _0: acc,
              _1: fmt._0
            };
            continue ;
        case /* Char_literal */12 :
            _fmt = fmt._1;
            _acc = {
              TAG: /* Acc_char_literal */3,
              _0: acc,
              _1: fmt._0
            };
            continue ;
        case /* Format_arg */13 :
            var rest$2 = fmt._2;
            var ty = string_of_fmtty(fmt._1);
            return (function(k,acc,rest$2,ty){
            return function (str) {
              return make_printf(k, o, {
                          TAG: /* Acc_data_string */4,
                          _0: acc,
                          _1: ty
                        }, rest$2);
            }
            }(k,acc,rest$2,ty));
        case /* Format_subst */14 :
            var rest$3 = fmt._2;
            var fmtty = fmt._1;
            return (function(k,acc,fmtty,rest$3){
            return function (param) {
              return make_printf(k, o, acc, concat_fmt(recast(param._0, fmtty), rest$3));
            }
            }(k,acc,fmtty,rest$3));
        case /* Alpha */15 :
            var rest$4 = fmt._0;
            return (function(k,acc,rest$4){
            return function (f, x) {
              return make_printf(k, o, {
                          TAG: /* Acc_delay */6,
                          _0: acc,
                          _1: (function (o) {
                              return _2(f, o, x);
                            })
                        }, rest$4);
            }
            }(k,acc,rest$4));
        case /* Theta */16 :
            var rest$5 = fmt._0;
            return (function(k,acc,rest$5){
            return function (f) {
              return make_printf(k, o, {
                          TAG: /* Acc_delay */6,
                          _0: acc,
                          _1: f
                        }, rest$5);
            }
            }(k,acc,rest$5));
        case /* Formatting_lit */17 :
            _fmt = fmt._1;
            _acc = {
              TAG: /* Acc_formatting_lit */0,
              _0: acc,
              _1: fmt._0
            };
            continue ;
        case /* Formatting_gen */18 :
            var match = fmt._0;
            if (match.TAG === /* Open_tag */0) {
              var rest$6 = fmt._1;
              var k$prime = (function(k,acc,rest$6){
              return function k$prime(koc, kacc) {
                return make_printf(k, koc, {
                            TAG: /* Acc_formatting_gen */1,
                            _0: acc,
                            _1: {
                              TAG: /* Acc_open_tag */0,
                              _0: kacc
                            }
                          }, rest$6);
              }
              }(k,acc,rest$6));
              _fmt = match._0._0;
              _acc = /* End_of_acc */0;
              _k = k$prime;
              continue ;
            }
            var rest$7 = fmt._1;
            var k$prime$1 = (function(k,acc,rest$7){
            return function k$prime$1(koc, kacc) {
              return make_printf(k, koc, {
                          TAG: /* Acc_formatting_gen */1,
                          _0: acc,
                          _1: {
                            TAG: /* Acc_open_box */1,
                            _0: kacc
                          }
                        }, rest$7);
            }
            }(k,acc,rest$7));
            _fmt = match._0._0;
            _acc = /* End_of_acc */0;
            _k = k$prime$1;
            continue ;
        case /* Reader */19 :
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "camlinternalFormat.ml",
                    1525,
                    4
                  ],
                  Error: new Error()
                };
        case /* Scan_char_set */20 :
            var rest$8 = fmt._2;
            var new_acc = {
              TAG: /* Acc_invalid_arg */8,
              _0: acc,
              _1: "Printf: bad conversion %["
            };
            return (function(k,rest$8,new_acc){
            return function (param) {
              return make_printf(k, o, new_acc, rest$8);
            }
            }(k,rest$8,new_acc));
        case /* Scan_get_counter */21 :
            var rest$9 = fmt._1;
            return (function(k,acc,rest$9){
            return function (n) {
              var new_acc_1 = caml_format_int("%u", n);
              var new_acc = {
                TAG: /* Acc_data_string */4,
                _0: acc,
                _1: new_acc_1
              };
              return make_printf(k, o, new_acc, rest$9);
            }
            }(k,acc,rest$9));
        case /* Scan_next_char */22 :
            var rest$10 = fmt._0;
            return (function(k,acc,rest$10){
            return function (c) {
              var new_acc = {
                TAG: /* Acc_data_char */5,
                _0: acc,
                _1: c
              };
              return make_printf(k, o, new_acc, rest$10);
            }
            }(k,acc,rest$10));
        case /* Ignored_param */23 :
            return make_ignored_param(k, o, acc, fmt._0, fmt._1);
        case /* Custom */24 :
            return make_custom(k, o, acc, fmt._2, fmt._0, _1(fmt._1, undefined));
        
      }
    }}

  function make_ignored_param(k, o, acc, ign, fmt) {
    if (typeof ign !== "number") {
      if (ign.TAG === /* Ignored_format_subst */9) {
        return make_from_fmtty(k, o, acc, ign._1, fmt);
      } else {
        return make_invalid_arg(k, o, acc, fmt);
      }
    }
    if (ign !== /* Ignored_reader */2) {
      return make_invalid_arg(k, o, acc, fmt);
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            1593,
            39
          ],
          Error: new Error()
        };
  }

  function make_from_fmtty(k, o, acc, fmtty, fmt) {
    if (typeof fmtty === "number") {
      return make_invalid_arg(k, o, acc, fmt);
    }
    switch (fmtty.TAG | 0) {
      case /* Char_ty */0 :
          var rest = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest, fmt);
          };
      case /* String_ty */1 :
          var rest$1 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$1, fmt);
          };
      case /* Int_ty */2 :
          var rest$2 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$2, fmt);
          };
      case /* Int32_ty */3 :
          var rest$3 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$3, fmt);
          };
      case /* Nativeint_ty */4 :
          var rest$4 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$4, fmt);
          };
      case /* Int64_ty */5 :
          var rest$5 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$5, fmt);
          };
      case /* Float_ty */6 :
          var rest$6 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$6, fmt);
          };
      case /* Bool_ty */7 :
          var rest$7 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$7, fmt);
          };
      case /* Format_arg_ty */8 :
          var rest$8 = fmtty._1;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$8, fmt);
          };
      case /* Format_subst_ty */9 :
          var rest$9 = fmtty._2;
          var ty = trans(symm(fmtty._0), fmtty._1);
          return function (param) {
            return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
          };
      case /* Alpha_ty */10 :
          var rest$10 = fmtty._0;
          return function (param, param$1) {
            return make_from_fmtty(k, o, acc, rest$10, fmt);
          };
      case /* Theta_ty */11 :
          var rest$11 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$11, fmt);
          };
      case /* Any_ty */12 :
          var rest$12 = fmtty._0;
          return function (param) {
            return make_from_fmtty(k, o, acc, rest$12, fmt);
          };
      case /* Reader_ty */13 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  1616,
                  31
                ],
                Error: new Error()
              };
      case /* Ignored_reader_ty */14 :
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  1617,
                  31
                ],
                Error: new Error()
              };
      
    }
  }

  function make_invalid_arg(k, o, acc, fmt) {
    return make_printf(k, o, {
                TAG: /* Acc_invalid_arg */8,
                _0: acc,
                _1: "Printf: bad conversion %_"
              }, fmt);
  }

  function make_padding(k, o, acc, fmt, pad, trans) {
    if (typeof pad === "number") {
      return function (x) {
        var new_acc_1 = _1(trans, x);
        var new_acc = {
          TAG: /* Acc_data_string */4,
          _0: acc,
          _1: new_acc_1
        };
        return make_printf(k, o, new_acc, fmt);
      };
    }
    if (pad.TAG === /* Lit_padding */0) {
      var width = pad._1;
      var padty = pad._0;
      return function (x) {
        var new_acc_1 = fix_padding(padty, width, _1(trans, x));
        var new_acc = {
          TAG: /* Acc_data_string */4,
          _0: acc,
          _1: new_acc_1
        };
        return make_printf(k, o, new_acc, fmt);
      };
    }
    var padty$1 = pad._0;
    return function (w, x) {
      var new_acc_1 = fix_padding(padty$1, w, _1(trans, x));
      var new_acc = {
        TAG: /* Acc_data_string */4,
        _0: acc,
        _1: new_acc_1
      };
      return make_printf(k, o, new_acc, fmt);
    };
  }

  function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
    if (typeof pad === "number") {
      if (typeof prec === "number") {
        if (prec !== 0) {
          return function (p, x) {
            var str = fix_int_precision(p, _2(trans, iconv, x));
            return make_printf(k, o, {
                        TAG: /* Acc_data_string */4,
                        _0: acc,
                        _1: str
                      }, fmt);
          };
        } else {
          return function (x) {
            var str = _2(trans, iconv, x);
            return make_printf(k, o, {
                        TAG: /* Acc_data_string */4,
                        _0: acc,
                        _1: str
                      }, fmt);
          };
        }
      }
      var p = prec._0;
      return function (x) {
        var str = fix_int_precision(p, _2(trans, iconv, x));
        return make_printf(k, o, {
                    TAG: /* Acc_data_string */4,
                    _0: acc,
                    _1: str
                  }, fmt);
      };
    }
    if (pad.TAG === /* Lit_padding */0) {
      var w = pad._1;
      var padty = pad._0;
      if (typeof prec === "number") {
        if (prec !== 0) {
          return function (p, x) {
            var str = fix_padding(padty, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, {
                        TAG: /* Acc_data_string */4,
                        _0: acc,
                        _1: str
                      }, fmt);
          };
        } else {
          return function (x) {
            var str = fix_padding(padty, w, _2(trans, iconv, x));
            return make_printf(k, o, {
                        TAG: /* Acc_data_string */4,
                        _0: acc,
                        _1: str
                      }, fmt);
          };
        }
      }
      var p$1 = prec._0;
      return function (x) {
        var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans, iconv, x)));
        return make_printf(k, o, {
                    TAG: /* Acc_data_string */4,
                    _0: acc,
                    _1: str
                  }, fmt);
      };
    }
    var padty$1 = pad._0;
    if (typeof prec === "number") {
      if (prec !== 0) {
        return function (w, p, x) {
          var str = fix_padding(padty$1, w, fix_int_precision(p, _2(trans, iconv, x)));
          return make_printf(k, o, {
                      TAG: /* Acc_data_string */4,
                      _0: acc,
                      _1: str
                    }, fmt);
        };
      } else {
        return function (w, x) {
          var str = fix_padding(padty$1, w, _2(trans, iconv, x));
          return make_printf(k, o, {
                      TAG: /* Acc_data_string */4,
                      _0: acc,
                      _1: str
                    }, fmt);
        };
      }
    }
    var p$2 = prec._0;
    return function (w, x) {
      var str = fix_padding(padty$1, w, fix_int_precision(p$2, _2(trans, iconv, x)));
      return make_printf(k, o, {
                  TAG: /* Acc_data_string */4,
                  _0: acc,
                  _1: str
                }, fmt);
    };
  }

  function make_custom(k, o, acc, rest, arity, f) {
    if (!arity) {
      return make_printf(k, o, {
                  TAG: /* Acc_data_string */4,
                  _0: acc,
                  _1: f
                }, rest);
    }
    var arity$1 = arity._0;
    return function (x) {
      return make_custom(k, o, acc, rest, arity$1, _1(f, x));
    };
  }

  function strput_acc(b, _acc) {
    while(true) {
      var acc = _acc;
      var exit = 0;
      if (typeof acc === "number") {
        return ;
      }
      switch (acc.TAG | 0) {
        case /* Acc_formatting_lit */0 :
            var s = string_of_formatting_lit(acc._1);
            strput_acc(b, acc._0);
            return add_string(b, s);
        case /* Acc_formatting_gen */1 :
            var acc$prime = acc._1;
            var p = acc._0;
            if (acc$prime.TAG === /* Acc_open_tag */0) {
              strput_acc(b, p);
              add_string(b, "@{");
              _acc = acc$prime._0;
              continue ;
            }
            strput_acc(b, p);
            add_string(b, "@[");
            _acc = acc$prime._0;
            continue ;
        case /* Acc_string_literal */2 :
        case /* Acc_data_string */4 :
            exit = 1;
            break;
        case /* Acc_char_literal */3 :
        case /* Acc_data_char */5 :
            exit = 2;
            break;
        case /* Acc_delay */6 :
            strput_acc(b, acc._0);
            return add_string(b, _1(acc._1, undefined));
        case /* Acc_flush */7 :
            _acc = acc._0;
            continue ;
        case /* Acc_invalid_arg */8 :
            strput_acc(b, acc._0);
            throw {
                  RE_EXN_ID: "Invalid_argument",
                  _1: acc._1,
                  Error: new Error()
                };
        
      }
      switch (exit) {
        case 1 :
            strput_acc(b, acc._0);
            return add_string(b, acc._1);
        case 2 :
            strput_acc(b, acc._0);
            return add_char(b, acc._1);
        
      }
    }}
  /* No side effect */

  function ksprintf(k, param) {
    var k$prime = function (param, acc) {
      var buf = create$1(64);
      strput_acc(buf, acc);
      return _1(k, contents(buf));
    };
    return make_printf(k$prime, undefined, /* End_of_acc */0, param._0);
  }

  function sprintf(fmt) {
    return ksprintf((function (s) {
                  return s;
                }), fmt);
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function setStyle(n, key, value) {
    n.style[key] = value;
    
  }

  function setStyleProperty(n, priorityOpt, key, value) {
    var priority = priorityOpt !== undefined ? priorityOpt : false;
    var style = n.style;
    var _valid = style.setProperty;
    if (_valid !== undefined) {
      return style.setProperty(key, value, priority ? "important" : null);
    } else {
      return setStyle(n, key, value);
    }
  }

  function insertBefore(n, child, refNode) {
    return n.insertBefore(child, refNode);
  }

  function setAttributeNsOptional(n, namespace, key, value) {
    if (namespace === "") {
      return n.setAttribute(key, value);
    } else {
      return n.setAttributeNS(namespace, key, value);
    }
  }

  function removeAttributeNsOptional(n, namespace, key) {
    if (namespace === "") {
      return n.removeAttribute(key);
    } else {
      return n.removeAttributeNS(namespace, key);
    }
  }

  function addEventListener(n, typ, listener, options) {
    return n.addEventListener(typ, listener, options);
  }

  function removeEventListener(n, typ, listener, options) {
    return n.removeEventListener(typ, listener, options);
  }

  function remove_polyfill(param) {
    return (// remove polyfill
    (function() {
      if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        };
      }  }()));
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function requestAnimationFrame_polyfill(param) {
    return (// requestAnimationFrame polyfill
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }()));
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function polyfills(param) {
    remove_polyfill();
    requestAnimationFrame_polyfill();
    
  }
  /* No side effect */

  function rev_append(_l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      if (!l1) {
        return l2;
      }
      _l2 = {
        hd: l1.hd,
        tl: l2
      };
      _l1 = l1.tl;
      continue ;
    }}

  function rev(l) {
    return rev_append(l, /* [] */0);
  }

  function map$3(f, param) {
    if (!param) {
      return /* [] */0;
    }
    var r = _1(f, param.hd);
    return {
            hd: r,
            tl: map$3(f, param.tl)
          };
  }

  function iter$1(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      _1(f, param.hd);
      _param = param.tl;
      continue ;
    }}

  function fold_left(f, _accu, _l) {
    while(true) {
      var l = _l;
      var accu = _accu;
      if (!l) {
        return accu;
      }
      _l = l.tl;
      _accu = _2(f, accu, l.hd);
      continue ;
    }}

  function fold_right$1(f, l, accu) {
    if (l) {
      return _2(f, l.hd, fold_right$1(f, l.tl, accu));
    } else {
      return accu;
    }
  }

  function fold_left2(f, _accu, _l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      var accu = _accu;
      if (l1) {
        if (l2) {
          _l2 = l2.tl;
          _l1 = l1.tl;
          _accu = _3(f, accu, l1.hd, l2.hd);
          continue ;
        }
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "List.fold_left2",
              Error: new Error()
            };
      }
      if (l2) {
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "List.fold_left2",
              Error: new Error()
            };
      }
      return accu;
    }}

  function find_all(p) {
    return function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (!param$1) {
          return rev_append(accu, /* [] */0);
        }
        var l = param$1.tl;
        var x = param$1.hd;
        if (_1(p, x)) {
          _param = l;
          _accu = {
            hd: x,
            tl: accu
          };
          continue ;
        }
        _param = l;
        continue ;
      }  };
  }

  var append = $at;

  var filter$1 = find_all;
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function createElementNsOptional(namespace, tagName) {
    if (namespace === "") {
      return document.createElement(tagName);
    } else {
      return document.createElementNS(namespace, tagName);
    }
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function fullnode(namespace, tagName, key, unique, props, vdoms) {
    return {
            TAG: /* Node */2,
            _0: namespace,
            _1: tagName,
            _2: key,
            _3: unique,
            _4: props,
            _5: vdoms
          };
  }

  function onMsg(name, msg) {
    return {
            TAG: /* Event */3,
            _0: name,
            _1: {
              TAG: /* EventHandlerMsg */1,
              _0: msg
            },
            _2: {
              contents: undefined
            }
          };
  }

  function renderToHtmlString(_s) {
    while(true) {
      var s = _s;
      switch (s.TAG | 0) {
        case /* CommentNode */0 :
            return "<!-- " + (s._0 + " -->");
        case /* Text */1 :
            return s._0;
        case /* Node */2 :
            var tagName = s._1;
            var namespace = s._0;
            return concat$1("", {
                        hd: "<",
                        tl: {
                          hd: namespace,
                          tl: {
                            hd: namespace === "" ? "" : ":",
                            tl: {
                              hd: tagName,
                              tl: {
                                hd: concat$1("", map$3((function (p) {
                                            if (typeof p === "number") {
                                              return "";
                                            }
                                            switch (p.TAG | 0) {
                                              case /* RawProp */0 :
                                                  return concat$1("", {
                                                              hd: " ",
                                                              tl: {
                                                                hd: p._0,
                                                                tl: {
                                                                  hd: "=\"",
                                                                  tl: {
                                                                    hd: p._1,
                                                                    tl: {
                                                                      hd: "\"",
                                                                      tl: /* [] */0
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            });
                                              case /* Attribute */1 :
                                                  return concat$1("", {
                                                              hd: " ",
                                                              tl: {
                                                                hd: p._1,
                                                                tl: {
                                                                  hd: "=\"",
                                                                  tl: {
                                                                    hd: p._2,
                                                                    tl: {
                                                                      hd: "\"",
                                                                      tl: /* [] */0
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            });
                                              case /* Data */2 :
                                                  return concat$1("", {
                                                              hd: " data-",
                                                              tl: {
                                                                hd: p._0,
                                                                tl: {
                                                                  hd: "=\"",
                                                                  tl: {
                                                                    hd: p._1,
                                                                    tl: {
                                                                      hd: "\"",
                                                                      tl: /* [] */0
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            });
                                              case /* Event */3 :
                                                  return "";
                                              case /* Style */4 :
                                                  return concat$1("", {
                                                              hd: " style=\"",
                                                              tl: {
                                                                hd: concat$1(";", map$3((function (param) {
                                                                            return concat$1("", {
                                                                                        hd: param[0],
                                                                                        tl: {
                                                                                          hd: ":",
                                                                                          tl: {
                                                                                            hd: param[1],
                                                                                            tl: {
                                                                                              hd: ";",
                                                                                              tl: /* [] */0
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      });
                                                                          }), p._0)),
                                                                tl: {
                                                                  hd: "\"",
                                                                  tl: /* [] */0
                                                                }
                                                              }
                                                            });
                                              
                                            }
                                          }), s._4)),
                                tl: {
                                  hd: ">",
                                  tl: {
                                    hd: concat$1("", map$3(renderToHtmlString, s._5)),
                                    tl: {
                                      hd: "</",
                                      tl: {
                                        hd: tagName,
                                        tl: {
                                          hd: ">",
                                          tl: /* [] */0
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      });
        case /* LazyGen */3 :
            _s = _1(s._1, undefined);
            continue ;
        case /* Tagger */4 :
            _s = s._1;
            continue ;
        
      }
    }}

  function eventHandler(callbacks, cb) {
    return function (ev) {
      var msg = _1(cb.contents, ev);
      if (msg !== undefined) {
        return _1(callbacks.contents.enqueue, valFromOption(msg));
      }
      
    };
  }

  function eventHandler_GetCB(msg) {
    if (msg.TAG === /* EventHandlerCallback */0) {
      return msg._1;
    }
    var msg$1 = msg._0;
    return function (_ev) {
      return some(msg$1);
    };
  }

  function compareEventHandlerTypes(left, msg) {
    if (msg.TAG === /* EventHandlerCallback */0) {
      if (left.TAG === /* EventHandlerCallback */0) {
        return msg._0 === left._0;
      } else {
        return false;
      }
    } else if (left.TAG === /* EventHandlerCallback */0 || !caml_equal(msg._0, left._0)) {
      return false;
    } else {
      return true;
    }
  }

  function eventHandler_Register(callbacks, elem, name, handlerType) {
    var cb = {
      contents: eventHandler_GetCB(handlerType)
    };
    var handler = eventHandler(callbacks, cb);
    addEventListener(elem, name, handler, false);
    return {
            handler: handler,
            cb: cb
          };
  }

  function eventHandler_Unregister(elem, name, cache) {
    if (cache !== undefined) {
      removeEventListener(elem, name, cache.handler, false);
      return ;
    }
    
  }

  function eventHandler_Mutate(callbacks, elem, oldName, newName, oldHandlerType, newHandlerType, oldCache, newCache) {
    var oldcache = oldCache.contents;
    if (oldcache === undefined) {
      newCache.contents = eventHandler_Register(callbacks, elem, newName, newHandlerType);
      return ;
    }
    if (oldName === newName) {
      newCache.contents = oldCache.contents;
      if (compareEventHandlerTypes(oldHandlerType, newHandlerType)) {
        return ;
      }
      var cb = eventHandler_GetCB(newHandlerType);
      oldcache.cb.contents = cb;
      return ;
    }
    oldCache.contents = eventHandler_Unregister(elem, oldName, oldCache.contents);
    newCache.contents = eventHandler_Register(callbacks, elem, newName, newHandlerType);
    
  }

  function patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, _idx, s) {
    if (typeof s === "number") {
      return ;
    }
    switch (s.TAG | 0) {
      case /* RawProp */0 :
          elem[s._0] = s._1;
          return ;
      case /* Attribute */1 :
          return setAttributeNsOptional(elem, s._0, s._1, s._2);
      case /* Data */2 :
          console.log([
                "TODO:  Add Data Unhandled",
                s._0,
                s._1
              ]);
          throw {
                RE_EXN_ID: "Failure",
                _1: "TODO:  Add Data Unhandled",
                Error: new Error()
              };
      case /* Event */3 :
          s._2.contents = eventHandler_Register(callbacks, elem, s._0, s._1);
          return ;
      case /* Style */4 :
          return fold_left((function (param, param$1) {
                        return setStyleProperty(elem, undefined, param$1[0], param$1[1]);
                      }), undefined, s._0);
      
    }
  }

  function patchVNodesOnElems_PropertiesApply_Remove(_callbacks, elem, _idx, s) {
    if (typeof s === "number") {
      return ;
    }
    switch (s.TAG | 0) {
      case /* RawProp */0 :
          elem[s._0] = undefined;
          return ;
      case /* Attribute */1 :
          return removeAttributeNsOptional(elem, s._0, s._1);
      case /* Data */2 :
          console.log([
                "TODO:  Remove Data Unhandled",
                s._0,
                s._1
              ]);
          throw {
                RE_EXN_ID: "Failure",
                _1: "TODO:  Remove Data Unhandled",
                Error: new Error()
              };
      case /* Event */3 :
          var cache = s._2;
          cache.contents = eventHandler_Unregister(elem, s._0, cache.contents);
          return ;
      case /* Style */4 :
          return fold_left((function (param, param$1) {
                        return setStyleProperty(elem, undefined, param$1[0], null);
                      }), undefined, s._0);
      
    }
  }

  function patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, oldProp, newProp) {
    patchVNodesOnElems_PropertiesApply_Remove(callbacks, elem, idx, oldProp);
    patchVNodesOnElems_PropertiesApply_Add(callbacks, elem, idx, newProp);
    
  }

  function patchVNodesOnElems_PropertiesApply_Mutate(_callbacks, elem, _idx, oldProp, _newProp) {
    if (typeof _newProp === "number") {
      throw {
            RE_EXN_ID: "Failure",
            _1: "This should never be called as all entries through NoProp are gated.",
            Error: new Error()
          };
    }
    switch (_newProp.TAG | 0) {
      case /* RawProp */0 :
          elem[_newProp._0] = _newProp._1;
          return ;
      case /* Attribute */1 :
          return setAttributeNsOptional(elem, _newProp._0, _newProp._1, _newProp._2);
      case /* Data */2 :
          console.log([
                "TODO:  Mutate Data Unhandled",
                _newProp._0,
                _newProp._1
              ]);
          throw {
                RE_EXN_ID: "Failure",
                _1: "TODO:  Mutate Data Unhandled",
                Error: new Error()
              };
      case /* Event */3 :
          throw {
                RE_EXN_ID: "Failure",
                _1: "This will never be called because it is gated",
                Error: new Error()
              };
      case /* Style */4 :
          if (typeof oldProp === "number") {
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!",
                  Error: new Error()
                };
          }
          if (oldProp.TAG === /* Style */4) {
            return fold_left2((function (param, param$1, param$2) {
                          var nv = param$2[1];
                          var nk = param$2[0];
                          var ok = param$1[0];
                          if (ok === nk) {
                            if (param$1[1] === nv) {
                              return ;
                            } else {
                              return setStyleProperty(elem, undefined, nk, nv);
                            }
                          } else {
                            setStyleProperty(elem, undefined, ok, null);
                            return setStyleProperty(elem, undefined, nk, nv);
                          }
                        }), undefined, oldProp._0, _newProp._0);
          }
          throw {
                RE_EXN_ID: "Failure",
                _1: "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!",
                Error: new Error()
              };
      
    }
  }

  function patchVNodesOnElems_PropertiesApply(callbacks, elem, _idx, _oldProperties, _newProperties) {
    while(true) {
      var newProperties = _newProperties;
      var oldProperties = _oldProperties;
      var idx = _idx;
      if (!oldProperties) {
        if (newProperties) {
          return false;
        } else {
          return true;
        }
      }
      var _oldProp = oldProperties.hd;
      if (!newProperties) {
        return false;
      }
      if (typeof _oldProp === "number") {
        if (typeof newProperties.hd === "number") {
          _newProperties = newProperties.tl;
          _oldProperties = oldProperties.tl;
          _idx = idx + 1 | 0;
          continue ;
        }
        
      } else {
        switch (_oldProp.TAG | 0) {
          case /* RawProp */0 :
              var newProp = newProperties.hd;
              if (typeof newProp !== "number" && newProp.TAG === /* RawProp */0) {
                if (_oldProp._0 === newProp._0 && _oldProp._1 === newProp._1) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp);
                }
                _newProperties = newProperties.tl;
                _oldProperties = oldProperties.tl;
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Attribute */1 :
              var newProp$1 = newProperties.hd;
              if (typeof newProp$1 !== "number" && newProp$1.TAG === /* Attribute */1) {
                if (_oldProp._0 === newProp$1._0 && _oldProp._1 === newProp$1._1 && _oldProp._2 === newProp$1._2) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$1);
                }
                _newProperties = newProperties.tl;
                _oldProperties = oldProperties.tl;
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Data */2 :
              var newProp$2 = newProperties.hd;
              if (typeof newProp$2 !== "number" && newProp$2.TAG === /* Data */2) {
                if (_oldProp._0 === newProp$2._0 && _oldProp._1 === newProp$2._1) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$2);
                }
                _newProperties = newProperties.tl;
                _oldProperties = oldProperties.tl;
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Event */3 :
              var _newProp = newProperties.hd;
              if (typeof _newProp !== "number" && _newProp.TAG === /* Event */3) {
                eventHandler_Mutate(callbacks, elem, _oldProp._0, _newProp._0, _oldProp._1, _newProp._1, _oldProp._2, _newProp._2);
                _newProperties = newProperties.tl;
                _oldProperties = oldProperties.tl;
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          case /* Style */4 :
              var newProp$3 = newProperties.hd;
              if (typeof newProp$3 !== "number" && newProp$3.TAG === /* Style */4) {
                if (caml_equal(_oldProp._0, newProp$3._0)) ; else {
                  patchVNodesOnElems_PropertiesApply_Mutate(callbacks, elem, idx, _oldProp, newProp$3);
                }
                _newProperties = newProperties.tl;
                _oldProperties = oldProperties.tl;
                _idx = idx + 1 | 0;
                continue ;
              }
              break;
          
        }
      }
      patchVNodesOnElems_PropertiesApply_RemoveAdd(callbacks, elem, idx, _oldProp, newProperties.hd);
      _newProperties = newProperties.tl;
      _oldProperties = oldProperties.tl;
      _idx = idx + 1 | 0;
      continue ;
    }}

  function patchVNodesOnElems_Properties(callbacks, elem, oldProperties, newProperties) {
    return patchVNodesOnElems_PropertiesApply(callbacks, elem, 0, oldProperties, newProperties);
  }

  function patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, param) {
    if (param.TAG === /* Node */2) {
      var newProperties = param._4;
      var oldChild = get$2(elems, idx);
      var newChild = createElementNsOptional(param._0, param._1);
      var match = patchVNodesOnElems_Properties(callbacks, newChild, map$3((function (param) {
                  return /* NoProp */0;
                }), newProperties), newProperties);
      if (match) {
        var childChildren = newChild.childNodes;
        patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, param._5);
        insertBefore(elem, newChild, oldChild);
        elem.removeChild(oldChild);
        return ;
      }
      throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "vdom.ml",
              343,
              13
            ],
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Failure",
          _1: "Node replacement should never be passed anything but a node itself",
          Error: new Error()
        };
  }

  function patchVNodesOnElems_CreateElement(_callbacks, _s) {
    while(true) {
      var s = _s;
      var callbacks = _callbacks;
      switch (s.TAG | 0) {
        case /* CommentNode */0 :
            var text = s._0;
            return document.createComment(text);
        case /* Text */1 :
            var text$1 = s._0;
            return document.createTextNode(text$1);
        case /* Node */2 :
            var newProperties = s._4;
            var newChild = createElementNsOptional(s._0, s._1);
            var match = patchVNodesOnElems_Properties(callbacks, newChild, map$3((function (param) {
                        return /* NoProp */0;
                      }), newProperties), newProperties);
            if (match) {
              var childChildren = newChild.childNodes;
              patchVNodesOnElems(callbacks, newChild, childChildren, 0, /* [] */0, s._5);
              return newChild;
            }
            throw {
                  RE_EXN_ID: "Match_failure",
                  _1: [
                    "vdom.ml",
                    368,
                    11
                  ],
                  Error: new Error()
                };
        case /* LazyGen */3 :
            var vdom = _1(s._1, undefined);
            s._2.contents = vdom;
            _s = vdom;
            continue ;
        case /* Tagger */4 :
            _s = s._1;
            _callbacks = _1(s._0, callbacks);
            continue ;
        
      }
    }}

  function patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode) {
    if (oldNode.TAG === /* Node */2) {
      if (newNode.TAG === /* Node */2) {
        if (oldNode._3 !== newNode._3 || oldNode._1 !== newNode._1) {
          return patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        var child = get$2(elems, idx);
        var childChildren = child.childNodes;
        if (patchVNodesOnElems_Properties(callbacks, child, oldNode._4, newNode._4)) ; else {
          console.log("VDom:  Failed swapping properties because the property list length changed, use `noProp` to swap properties instead, not by altering the list structure.  This is a massive inefficiency until this issue is resolved.");
          patchVNodesOnElems_ReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        return patchVNodesOnElems(callbacks, child, childChildren, 0, oldNode._5, newNode._5);
      }
      throw {
            RE_EXN_ID: "Failure",
            _1: "Non-node passed to patchVNodesOnElems_MutateNode",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Failure",
          _1: "Non-node passed to patchVNodesOnElems_MutateNode",
          Error: new Error()
        };
  }

  function patchVNodesOnElems(callbacks, elem, elems, _idx, _oldVNodes, _newVNodes) {
    while(true) {
      var newVNodes = _newVNodes;
      var oldVNodes = _oldVNodes;
      var idx = _idx;
      if (oldVNodes) {
        var oldNode = oldVNodes.hd;
        switch (oldNode.TAG | 0) {
          case /* CommentNode */0 :
              if (newVNodes) {
                var newS = newVNodes.hd;
                if (newS.TAG === /* CommentNode */0 && oldNode._0 === newS._0) {
                  _newVNodes = newVNodes.tl;
                  _oldVNodes = oldVNodes.tl;
                  _idx = idx + 1 | 0;
                  continue ;
                }
                
              }
              break;
          case /* Text */1 :
              if (newVNodes) {
                var newText = newVNodes.hd;
                if (newText.TAG === /* Text */1) {
                  var newText$1 = newText._0;
                  if (oldNode._0 !== newText$1) {
                    var child = get$2(elems, idx);
                    child.nodeValue = newText$1;
                  }
                  _newVNodes = newVNodes.tl;
                  _oldVNodes = oldVNodes.tl;
                  _idx = idx + 1 | 0;
                  continue ;
                }
                
              }
              break;
          case /* Node */2 :
              if (newVNodes) {
                var newNode = newVNodes.hd;
                if (newNode.TAG === /* Node */2) {
                  var newRest = newVNodes.tl;
                  var newKey = newNode._2;
                  var newTagName = newNode._1;
                  var newNamespace = newNode._0;
                  var oldRest = oldVNodes.tl;
                  var oldKey = oldNode._2;
                  var oldTagName = oldNode._1;
                  var oldNamespace = oldNode._0;
                  if (oldKey === newKey && oldKey !== "") {
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  if (oldKey === "" || newKey === "") {
                    patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  var exit = 0;
                  var exit$1 = 0;
                  if (oldRest) {
                    var match = oldRest.hd;
                    if (match.TAG === /* Node */2) {
                      var olderRest = oldRest.tl;
                      var olderKey = match._2;
                      var olderTagName = match._1;
                      var olderNamespace = match._0;
                      var exit$2 = 0;
                      if (newRest) {
                        var match$1 = newRest.hd;
                        if (match$1.TAG === /* Node */2) {
                          if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey && oldNamespace === match$1._0 && oldTagName === match$1._1 && oldKey === match$1._2) {
                            var firstChild = get$2(elems, idx);
                            var secondChild = get$2(elems, idx + 1 | 0);
                            elem.removeChild(secondChild);
                            insertBefore(elem, secondChild, firstChild);
                            _newVNodes = newRest.tl;
                            _oldVNodes = olderRest;
                            _idx = idx + 2 | 0;
                            continue ;
                          }
                          exit$2 = 4;
                        } else {
                          exit$2 = 4;
                        }
                      } else {
                        exit$2 = 4;
                      }
                      if (exit$2 === 4) {
                        if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey) {
                          var oldChild = get$2(elems, idx);
                          elem.removeChild(oldChild);
                          _newVNodes = newRest;
                          _oldVNodes = olderRest;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$1 = 3;
                      }
                      
                    } else {
                      exit$1 = 3;
                    }
                  } else {
                    exit$1 = 3;
                  }
                  if (exit$1 === 3) {
                    if (newRest) {
                      var match$2 = newRest.hd;
                      if (match$2.TAG === /* Node */2) {
                        if (oldNamespace === match$2._0 && oldTagName === match$2._1 && oldKey === match$2._2) {
                          var oldChild$1 = get$2(elems, idx);
                          var newChild = patchVNodesOnElems_CreateElement(callbacks, newNode);
                          insertBefore(elem, newChild, oldChild$1);
                          _newVNodes = newRest;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit = 2;
                      } else {
                        exit = 2;
                      }
                    } else {
                      exit = 2;
                    }
                  }
                  if (exit === 2) {
                    patchVNodesOnElems_MutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                    _newVNodes = newRest;
                    _oldVNodes = oldRest;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  
                }
                
              }
              break;
          case /* LazyGen */3 :
              if (newVNodes) {
                var match$3 = newVNodes.hd;
                if (match$3.TAG === /* LazyGen */3) {
                  var newRest$1 = newVNodes.tl;
                  var newCache = match$3._2;
                  var newGen = match$3._1;
                  var newKey$1 = match$3._0;
                  var oldRest$1 = oldVNodes.tl;
                  var oldCache = oldNode._2;
                  var oldKey$1 = oldNode._0;
                  if (oldKey$1 === newKey$1) {
                    newCache.contents = oldCache.contents;
                    _newVNodes = newRest$1;
                    _oldVNodes = oldRest$1;
                    _idx = idx + 1 | 0;
                    continue ;
                  }
                  var exit$3 = 0;
                  var exit$4 = 0;
                  if (oldRest$1) {
                    var match$4 = oldRest$1.hd;
                    if (match$4.TAG === /* LazyGen */3) {
                      var olderRest$1 = oldRest$1.tl;
                      var olderKey$1 = match$4._0;
                      var exit$5 = 0;
                      if (newRest$1) {
                        var match$5 = newRest$1.hd;
                        if (match$5.TAG === /* LazyGen */3) {
                          if (olderKey$1 === newKey$1 && oldKey$1 === match$5._0) {
                            var firstChild$1 = get$2(elems, idx);
                            var secondChild$1 = get$2(elems, idx + 1 | 0);
                            elem.removeChild(secondChild$1);
                            insertBefore(elem, secondChild$1, firstChild$1);
                            _newVNodes = newRest$1.tl;
                            _oldVNodes = olderRest$1;
                            _idx = idx + 2 | 0;
                            continue ;
                          }
                          exit$5 = 4;
                        } else {
                          exit$5 = 4;
                        }
                      } else {
                        exit$5 = 4;
                      }
                      if (exit$5 === 4) {
                        if (olderKey$1 === newKey$1) {
                          var oldChild$2 = get$2(elems, idx);
                          elem.removeChild(oldChild$2);
                          var oldVdom = match$4._2.contents;
                          newCache.contents = oldVdom;
                          _newVNodes = newRest$1;
                          _oldVNodes = olderRest$1;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$4 = 3;
                      }
                      
                    } else {
                      exit$4 = 3;
                    }
                  } else {
                    exit$4 = 3;
                  }
                  if (exit$4 === 3) {
                    if (newRest$1) {
                      var match$6 = newRest$1.hd;
                      if (match$6.TAG === /* LazyGen */3) {
                        if (match$6._0 === oldKey$1) {
                          var oldChild$3 = get$2(elems, idx);
                          var newVdom = _1(newGen, undefined);
                          newCache.contents = newVdom;
                          var newChild$1 = patchVNodesOnElems_CreateElement(callbacks, newVdom);
                          insertBefore(elem, newChild$1, oldChild$3);
                          _newVNodes = newRest$1;
                          _idx = idx + 1 | 0;
                          continue ;
                        }
                        exit$3 = 2;
                      } else {
                        exit$3 = 2;
                      }
                    } else {
                      exit$3 = 2;
                    }
                  }
                  if (exit$3 === 2) {
                    var oldVdom$1 = oldCache.contents;
                    var newVdom$1 = _1(newGen, undefined);
                    newCache.contents = newVdom$1;
                    _newVNodes = {
                      hd: newVdom$1,
                      tl: newRest$1
                    };
                    _oldVNodes = {
                      hd: oldVdom$1,
                      tl: oldRest$1
                    };
                    continue ;
                  }
                  
                }
                
              }
              break;
          case /* Tagger */4 :
              _oldVNodes = {
                hd: oldNode._1,
                tl: oldVNodes.tl
              };
              continue ;
          
        }
        var oldRest$2 = oldVNodes.tl;
        if (newVNodes) {
          var newNode$1 = newVNodes.hd;
          if (newNode$1.TAG === /* Tagger */4) {
            patchVNodesOnElems(_1(newNode$1._0, callbacks), elem, elems, idx, {
                  hd: oldNode,
                  tl: /* [] */0
                }, {
                  hd: newNode$1._1,
                  tl: /* [] */0
                });
            _newVNodes = newVNodes.tl;
            _oldVNodes = oldRest$2;
            _idx = idx + 1 | 0;
            continue ;
          }
          var oldChild$4 = get$2(elems, idx);
          var newChild$2 = patchVNodesOnElems_CreateElement(callbacks, newNode$1);
          insertBefore(elem, newChild$2, oldChild$4);
          elem.removeChild(oldChild$4);
          _newVNodes = newVNodes.tl;
          _oldVNodes = oldRest$2;
          _idx = idx + 1 | 0;
          continue ;
        }
        var child$1 = get$2(elems, idx);
        elem.removeChild(child$1);
        _newVNodes = /* [] */0;
        _oldVNodes = oldRest$2;
        continue ;
      }
      if (!newVNodes) {
        return ;
      }
      var newChild$3 = patchVNodesOnElems_CreateElement(callbacks, newVNodes.hd);
      elem.appendChild(newChild$3);
      _newVNodes = newVNodes.tl;
      _oldVNodes = /* [] */0;
      _idx = idx + 1 | 0;
      continue ;
    }}

  function patchVNodesIntoElement(callbacks, elem, oldVNodes, newVNodes) {
    var elems = elem.childNodes;
    patchVNodesOnElems(callbacks, elem, elems, 0, oldVNodes, newVNodes);
    return newVNodes;
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function run$1(_callbacks, _cmds) {
    while(true) {
      var cmds = _cmds;
      var callbacks = _callbacks;
      if (typeof cmds === "number") {
        return ;
      }
      switch (cmds.TAG | 0) {
        case /* Mapper */0 :
            var subCallbacks = _1(cmds._0, callbacks);
            _cmds = cmds._1;
            _callbacks = subCallbacks;
            continue ;
        case /* Batch */1 :
            return fold_left((function(callbacks){
                      return function (param, cmd) {
                        return run$1(callbacks, cmd);
                      }
                      }(callbacks)), undefined, cmds._0);
        case /* EnqueueCall */2 :
            return _1(cmds._0, callbacks);
        
      }
    }}
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function run(oldCallbacks, newCallbacks, oldSub, newSub) {
    var enable = function (_callbacks, _subs) {
      while(true) {
        var subs = _subs;
        var callbacks = _callbacks;
        if (typeof subs === "number") {
          return ;
        }
        switch (subs.TAG | 0) {
          case /* Batch */0 :
              var subs$1 = subs._0;
              if (subs$1) {
                return iter$1((function(callbacks){
                          return function (param) {
                            return enable(callbacks, param);
                          }
                          }(callbacks)), subs$1);
              } else {
                return ;
              }
          case /* Registration */1 :
              subs._2.contents = _1(subs._1, callbacks);
              return ;
          case /* Mapper */2 :
              var subCallbacks = _1(subs._0, callbacks);
              _subs = subs._1;
              _callbacks = subCallbacks;
              continue ;
          
        }
      }  };
    var disable = function (_callbacks, _subs) {
      while(true) {
        var subs = _subs;
        var callbacks = _callbacks;
        if (typeof subs === "number") {
          return ;
        }
        switch (subs.TAG | 0) {
          case /* Batch */0 :
              var subs$1 = subs._0;
              if (subs$1) {
                return iter$1((function(callbacks){
                          return function (param) {
                            return disable(callbacks, param);
                          }
                          }(callbacks)), subs$1);
              } else {
                return ;
              }
          case /* Registration */1 :
              var diCB = subs._2;
              var cb = diCB.contents;
              if (cb !== undefined) {
                diCB.contents = undefined;
                return _1(cb, undefined);
              } else {
                return ;
              }
          case /* Mapper */2 :
              var subCallbacks = _1(subs._0, callbacks);
              _subs = subs._1;
              _callbacks = subCallbacks;
              continue ;
          
        }
      }  };
    if (typeof oldSub === "number") {
      if (typeof newSub === "number") {
        return newSub;
      }
      
    } else {
      switch (oldSub.TAG | 0) {
        case /* Batch */0 :
            if (typeof newSub !== "number" && newSub.TAG === /* Batch */0) {
              var aux = function (_oldList, _newList) {
                while(true) {
                  var newList = _newList;
                  var oldList = _oldList;
                  if (oldList) {
                    var oldRest = oldList.tl;
                    var oldSubSub = oldList.hd;
                    if (newList) {
                      run(oldCallbacks, newCallbacks, oldSubSub, newList.hd);
                      _newList = newList.tl;
                      _oldList = oldRest;
                      continue ;
                    }
                    disable(oldCallbacks, oldSubSub);
                    _newList = /* [] */0;
                    _oldList = oldRest;
                    continue ;
                  }
                  if (!newList) {
                    return ;
                  }
                  enable(newCallbacks, newList.hd);
                  _newList = newList.tl;
                  _oldList = /* [] */0;
                  continue ;
                }            };
              aux(oldSub._0, newSub._0);
              return newSub;
            }
            break;
        case /* Registration */1 :
            if (typeof newSub !== "number" && newSub.TAG === /* Registration */1 && oldSub._0 === newSub._0) {
              newSub._2.contents = oldSub._2.contents;
              return newSub;
            }
            break;
        case /* Mapper */2 :
            if (typeof newSub !== "number" && newSub.TAG === /* Mapper */2) {
              var olderCallbacks = _1(oldSub._0, oldCallbacks);
              var newerCallbacks = _1(newSub._0, newCallbacks);
              run(olderCallbacks, newerCallbacks, oldSub._1, newSub._1);
              return newSub;
            }
            break;
        
      }
    }
    disable(oldCallbacks, oldSub);
    enable(newCallbacks, newSub);
    return newSub;
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function programStateWrapper(initModel, pump, shutdown) {
    var model = {
      contents: initModel
    };
    var callbacks = {
      contents: {
        enqueue: (function (_msg) {
            console.log("INVALID enqueue CALL!");
            
          }),
        on: (function (param) {
            
          })
      }
    };
    var pumperInterface = _1(pump, callbacks);
    var pending = {
      contents: undefined
    };
    var handler = function (msg) {
      var msgs = pending.contents;
      if (msgs !== undefined) {
        pending.contents = {
          hd: msg,
          tl: msgs
        };
        return ;
      }
      pending.contents = /* [] */0;
      var newModel = _2(pumperInterface.handleMsg, model.contents, msg);
      model.contents = newModel;
      var msgs$1 = pending.contents;
      if (msgs$1 !== undefined) {
        if (msgs$1) {
          pending.contents = undefined;
          return iter$1(handler, rev(msgs$1));
        } else {
          pending.contents = undefined;
          return ;
        }
      }
      throw {
            RE_EXN_ID: "Failure",
            _1: "INVALID message queue state, should never be None during message processing!",
            Error: new Error()
          };
    };
    var render_events = {
      contents: /* [] */0
    };
    var finalizedCBs_enqueue = handler;
    var finalizedCBs_on = function (msg) {
      if (typeof msg === "number") {
        return iter$1(handler, render_events.contents);
      }
      if (msg.TAG === /* AddRenderMsg */0) {
        render_events.contents = append(render_events.contents, {
              hd: msg._0,
              tl: /* [] */0
            });
        return ;
      }
      var msg$1 = msg._0;
      render_events.contents = filter$1(function (mg) {
              return msg$1 !== mg;
            })(render_events.contents);
      
    };
    var finalizedCBs = {
      enqueue: finalizedCBs_enqueue,
      on: finalizedCBs_on
    };
    callbacks.contents = finalizedCBs;
    var pi_requestShutdown = function (param) {
      callbacks.contents = {
        enqueue: (function (_msg) {
            console.log("INVALID message enqueued when shut down");
            
          }),
        on: (function (param) {
            
          })
      };
      var cmd = _1(shutdown, model.contents);
      _1(pumperInterface.shutdown, cmd);
      
    };
    var render_string = function (param) {
      return _1(pumperInterface.render_string, model.contents);
    };
    _1(pumperInterface.startup, undefined);
    return {
            pushMsg: handler,
            shutdown: pi_requestShutdown,
            getHtmlString: render_string
          };
  }

  function programLoop(update, view, subscriptions, initModel, initCmd, parentNode) {
    if (parentNode === undefined) {
      return function (callbacks) {
        var oldSub = {
          contents: /* NoSub */0
        };
        var handleSubscriptionChange = function (model) {
          var newSub = _1(subscriptions, model);
          oldSub.contents = run(callbacks, callbacks, oldSub.contents, newSub);
          
        };
        return {
                startup: (function (param) {
                    run$1(callbacks, initCmd);
                    handleSubscriptionChange(initModel);
                    
                  }),
                render_string: (function (model) {
                    return renderToHtmlString(_1(view, model));
                  }),
                handleMsg: (function (model, msg) {
                    var match = _2(update, model, msg);
                    var newModel = match[0];
                    run$1(callbacks, match[1]);
                    handleSubscriptionChange(newModel);
                    return newModel;
                  }),
                shutdown: (function (cmd) {
                    run$1(callbacks, cmd);
                    oldSub.contents = run(callbacks, callbacks, oldSub.contents, /* NoSub */0);
                    
                  })
              };
      };
    }
    var parentNode$1 = valFromOption(parentNode);
    return function (callbacks) {
      var priorRenderedVdom = {
        contents: /* [] */0
      };
      var latestModel = {
        contents: initModel
      };
      var nextFrameID = {
        contents: undefined
      };
      var doRender = function (_delta) {
        var _id = nextFrameID.contents;
        if (_id === undefined) {
          return ;
        }
        var newVdom_0 = _1(view, latestModel.contents);
        var newVdom = {
          hd: newVdom_0,
          tl: /* [] */0
        };
        var justRenderedVdom = patchVNodesIntoElement(callbacks, parentNode$1, priorRenderedVdom.contents, newVdom);
        priorRenderedVdom.contents = justRenderedVdom;
        _1(callbacks.contents.on, /* Render */0);
        nextFrameID.contents = undefined;
        
      };
      var scheduleRender = function (param) {
        var match = nextFrameID.contents;
        if (match !== undefined) {
          return ;
        }
        var id = window.requestAnimationFrame(doRender);
        nextFrameID.contents = id;
        
      };
      var clearPnode = function (param) {
        while(parentNode$1.childNodes.length > 0) {
          var firstChild = parentNode$1.firstChild;
          if (firstChild !== null) {
            parentNode$1.removeChild(firstChild);
          }
          
        }      
      };
      var oldSub = {
        contents: /* NoSub */0
      };
      var handleSubscriptionChange = function (model) {
        var newSub = _1(subscriptions, model);
        oldSub.contents = run(callbacks, callbacks, oldSub.contents, newSub);
        
      };
      var handlerStartup = function (param) {
        clearPnode();
        run$1(callbacks, initCmd);
        handleSubscriptionChange(latestModel.contents);
        nextFrameID.contents = -1;
        doRender();
        
      };
      var render_string = function (model) {
        return renderToHtmlString(_1(view, model));
      };
      var handler = function (model, msg) {
        var match = _2(update, model, msg);
        var newModel = match[0];
        latestModel.contents = newModel;
        run$1(callbacks, match[1]);
        scheduleRender();
        handleSubscriptionChange(newModel);
        return newModel;
      };
      var handlerShutdown = function (cmd) {
        nextFrameID.contents = undefined;
        run$1(callbacks, cmd);
        oldSub.contents = run(callbacks, callbacks, oldSub.contents, /* NoSub */0);
        priorRenderedVdom.contents = /* [] */0;
        clearPnode();
        
      };
      return {
              startup: handlerStartup,
              render_string: render_string,
              handleMsg: handler,
              shutdown: handlerShutdown
            };
    };
  }

  function program(param, pnode, flags) {
    polyfills();
    var match = _1(param.init, flags);
    var initModel = match[0];
    var opnode = (pnode == null) ? undefined : some(pnode);
    var pumpInterface = programLoop(param.update, param.view, param.subscriptions, initModel, match[1], opnode);
    return programStateWrapper(initModel, pumpInterface, param.shutdown);
  }

  function standardProgram(param, pnode, args) {
    return program({
                init: param.init,
                update: param.update,
                view: param.view,
                subscriptions: param.subscriptions,
                shutdown: (function (_model) {
                    return /* NoCmd */0;
                  })
              }, pnode, args);
  }

  function beginnerProgram(param, pnode, param$1) {
    var update = param.update;
    var model = param.model;
    return standardProgram({
                init: (function (param) {
                    return [
                            model,
                            /* NoCmd */0
                          ];
                  }),
                update: (function (model, msg) {
                    return [
                            _2(update, model, msg),
                            /* NoCmd */0
                          ];
                  }),
                view: param.view,
                subscriptions: (function (_model) {
                    return /* NoSub */0;
                  })
              }, pnode, undefined);
  }
  /* No side effect */

  function map$2(f, a) {
    var l = a.length;
    if (l === 0) {
      return [];
    }
    var r = caml_make_vect(l, _1(f, a[0]));
    for(var i = 1; i < l; ++i){
      r[i] = _1(f, a[i]);
    }
    return r;
  }

  function to_list(a) {
    var _i = a.length - 1 | 0;
    var _res = /* [] */0;
    while(true) {
      var res = _res;
      var i = _i;
      if (i < 0) {
        return res;
      }
      _res = {
        hd: a[i],
        tl: res
      };
      _i = i - 1 | 0;
      continue ;
    }}

  function fold_right(f, a, x) {
    var r = x;
    for(var i = a.length - 1 | 0; i >= 0; --i){
      r = _2(f, a[i], r);
    }
    return r;
  }
  /* No side effect */

  function get(dict, k) {
    if ((k in dict)) {
      return some(dict[k]);
    }
    
  }
  /* No side effect */

  function classify$1(x) {
    var ty = typeof x;
    if (ty === "string") {
      return {
              TAG: /* JSONString */0,
              _0: x
            };
    } else if (ty === "number") {
      return {
              TAG: /* JSONNumber */1,
              _0: x
            };
    } else if (ty === "boolean") {
      if (x === true) {
        return /* JSONTrue */1;
      } else {
        return /* JSONFalse */0;
      }
    } else if (x === null) {
      return /* JSONNull */2;
    } else if (Array.isArray(x)) {
      return {
              TAG: /* JSONArray */3,
              _0: x
            };
    } else {
      return {
              TAG: /* JSONObject */2,
              _0: x
            };
    }
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  var classify = classify$1;
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function error(e) {
    if (e.TAG === /* Ok */0) {
      return ;
    } else {
      return some(e._0);
    }
  }

  function first(fst, e) {
    if (e.TAG === /* Ok */0) {
      return fst;
    } else {
      return e;
    }
  }

  function error_of_first(fst, e) {
    if (e.TAG === /* Ok */0) {
      return error(fst);
    } else {
      return some(e._0);
    }
  }
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function height(param) {
    if (param) {
      return param.h;
    } else {
      return 0;
    }
  }

  function create(l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return /* Node */{
            l: l,
            v: x,
            d: d,
            r: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }

  function singleton(x, d) {
    return /* Node */{
            l: /* Empty */0,
            v: x,
            d: d,
            r: /* Empty */0,
            h: 1
          };
  }

  function bal(l, x, d, r) {
    var hl = l ? l.h : 0;
    var hr = r ? r.h : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l.r;
        var ld = l.d;
        var lv = l.v;
        var ll = l.l;
        if (height(ll) >= height(lr)) {
          return create(ll, lv, ld, create(lr, x, d, r));
        }
        if (lr) {
          return create(create(ll, lv, ld, lr.l), lr.v, lr.d, create(lr.r, x, d, r));
        }
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "Map.bal",
              Error: new Error()
            };
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    if (hr <= (hl + 2 | 0)) {
      return /* Node */{
              l: l,
              v: x,
              d: d,
              r: r,
              h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            };
    }
    if (r) {
      var rr = r.r;
      var rd = r.d;
      var rv = r.v;
      var rl = r.l;
      if (height(rr) >= height(rl)) {
        return create(create(l, x, d, rl), rv, rd, rr);
      }
      if (rl) {
        return create(create(l, x, d, rl.l), rl.v, rl.d, create(rl.r, rv, rd, rr));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }

  function is_empty(param) {
    if (param) {
      return false;
    } else {
      return true;
    }
  }

  function add(x, data, m) {
    if (!m) {
      return /* Node */{
              l: /* Empty */0,
              v: x,
              d: data,
              r: /* Empty */0,
              h: 1
            };
    }
    var r = m.r;
    var d = m.d;
    var v = m.v;
    var l = m.l;
    var c = caml_string_compare(x, v);
    if (c === 0) {
      if (d === data) {
        return m;
      } else {
        return /* Node */{
                l: l,
                v: x,
                d: data,
                r: r,
                h: m.h
              };
      }
    }
    if (c < 0) {
      var ll = add(x, data, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = add(x, data, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }

  function find(x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = caml_string_compare(x, param.v);
        if (c === 0) {
          return param.d;
        }
        _param = c < 0 ? param.l : param.r;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }}

  function find_first(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param.v;
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param.d;
          var _param$1 = param.l;
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return [
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1.v;
            if (_1(f, v$1)) {
              _param$1 = param$1.l;
              _d0 = param$1.d;
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1.r;
            continue ;
          }      }
        _param = param.r;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }}

  function find_first_opt(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param.v;
      if (_1(f, v)) {
        var _v0 = v;
        var _d0 = param.d;
        var _param$1 = param.l;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return [
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (_1(f, v$1)) {
            _param$1 = param$1.l;
            _d0 = param$1.d;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.r;
          continue ;
        }    }
      _param = param.r;
      continue ;
    }}

  function find_last(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param.v;
        if (_1(f, v)) {
          var _v0 = v;
          var _d0 = param.d;
          var _param$1 = param.r;
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return [
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1.v;
            if (_1(f, v$1)) {
              _param$1 = param$1.r;
              _d0 = param$1.d;
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1.l;
            continue ;
          }      }
        _param = param.l;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }}

  function find_last_opt(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param.v;
      if (_1(f, v)) {
        var _v0 = v;
        var _d0 = param.d;
        var _param$1 = param.r;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return [
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (_1(f, v$1)) {
            _param$1 = param$1.r;
            _d0 = param$1.d;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.l;
          continue ;
        }    }
      _param = param.l;
      continue ;
    }}

  function find_opt(x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var c = caml_string_compare(x, param.v);
      if (c === 0) {
        return some(param.d);
      }
      _param = c < 0 ? param.l : param.r;
      continue ;
    }}

  function mem(x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      var c = caml_string_compare(x, param.v);
      if (c === 0) {
        return true;
      }
      _param = c < 0 ? param.l : param.r;
      continue ;
    }}

  function min_binding(_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param.l;
        if (!l) {
          return [
                  param.v,
                  param.d
                ];
        }
        _param = l;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }}

  function min_binding_opt(_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var l = param.l;
      if (!l) {
        return [
                param.v,
                param.d
              ];
      }
      _param = l;
      continue ;
    }}

  function max_binding(_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param.r;
        if (!r) {
          return [
                  param.v,
                  param.d
                ];
        }
        _param = r;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }}

  function max_binding_opt(_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var r = param.r;
      if (!r) {
        return [
                param.v,
                param.d
              ];
      }
      _param = r;
      continue ;
    }}

  function remove_min_binding(param) {
    if (param) {
      var l = param.l;
      if (l) {
        return bal(remove_min_binding(l), param.v, param.d, param.r);
      } else {
        return param.r;
      }
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.remove_min_elt",
          Error: new Error()
        };
  }

  function merge(t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return bal(t1, match[0], match[1], remove_min_binding(t2));
  }

  function remove(x, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m.r;
    var d = m.d;
    var v = m.v;
    var l = m.l;
    var c = caml_string_compare(x, v);
    if (c === 0) {
      return merge(l, r);
    }
    if (c < 0) {
      var ll = remove(x, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = remove(x, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }

  function update$1(x, f, m) {
    if (m) {
      var r = m.r;
      var d = m.d;
      var v = m.v;
      var l = m.l;
      var c = caml_string_compare(x, v);
      if (c === 0) {
        var data = _1(f, some(d));
        if (data === undefined) {
          return merge(l, r);
        }
        var data$1 = valFromOption(data);
        if (d === data$1) {
          return m;
        } else {
          return /* Node */{
                  l: l,
                  v: x,
                  d: data$1,
                  r: r,
                  h: m.h
                };
        }
      }
      if (c < 0) {
        var ll = update$1(x, f, l);
        if (l === ll) {
          return m;
        } else {
          return bal(ll, v, d, r);
        }
      }
      var rr = update$1(x, f, r);
      if (r === rr) {
        return m;
      } else {
        return bal(l, v, d, rr);
      }
    }
    var data$2 = _1(f, undefined);
    if (data$2 !== undefined) {
      return /* Node */{
              l: /* Empty */0,
              v: x,
              d: valFromOption(data$2),
              r: /* Empty */0,
              h: 1
            };
    } else {
      return /* Empty */0;
    }
  }

  function iter(f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      iter(f, param.l);
      _2(f, param.v, param.d);
      _param = param.r;
      continue ;
    }}

  function map(f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var l$prime = map(f, param.l);
    var d$prime = _1(f, param.d);
    var r$prime = map(f, param.r);
    return /* Node */{
            l: l$prime,
            v: param.v,
            d: d$prime,
            r: r$prime,
            h: param.h
          };
  }

  function mapi(f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var v = param.v;
    var l$prime = mapi(f, param.l);
    var d$prime = _2(f, v, param.d);
    var r$prime = mapi(f, param.r);
    return /* Node */{
            l: l$prime,
            v: v,
            d: d$prime,
            r: r$prime,
            h: param.h
          };
  }

  function fold(f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (!m) {
        return accu;
      }
      _accu = _3(f, m.v, m.d, fold(f, m.l, accu));
      _m = m.r;
      continue ;
    }}

  function for_all(p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return true;
      }
      if (!_2(p, param.v, param.d)) {
        return false;
      }
      if (!for_all(p, param.l)) {
        return false;
      }
      _param = param.r;
      continue ;
    }}

  function exists(p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (_2(p, param.v, param.d)) {
        return true;
      }
      if (exists(p, param.l)) {
        return true;
      }
      _param = param.r;
      continue ;
    }}

  function add_min_binding(k, x, param) {
    if (param) {
      return bal(add_min_binding(k, x, param.l), param.v, param.d, param.r);
    } else {
      return singleton(k, x);
    }
  }

  function add_max_binding(k, x, param) {
    if (param) {
      return bal(param.l, param.v, param.d, add_max_binding(k, x, param.r));
    } else {
      return singleton(k, x);
    }
  }

  function join(l, v, d, r) {
    if (!l) {
      return add_min_binding(v, d, r);
    }
    if (!r) {
      return add_max_binding(v, d, l);
    }
    var rh = r.h;
    var lh = l.h;
    if (lh > (rh + 2 | 0)) {
      return bal(l.l, l.v, l.d, join(l.r, v, d, r));
    } else if (rh > (lh + 2 | 0)) {
      return bal(join(l, v, d, r.l), r.v, r.d, r.r);
    } else {
      return create(l, v, d, r);
    }
  }

  function concat(t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return join(t1, match[0], match[1], remove_min_binding(t2));
  }

  function concat_or_join(t1, v, d, t2) {
    if (d !== undefined) {
      return join(t1, v, valFromOption(d), t2);
    } else {
      return concat(t1, t2);
    }
  }

  function split(x, param) {
    if (!param) {
      return [
              /* Empty */0,
              undefined,
              /* Empty */0
            ];
    }
    var r = param.r;
    var d = param.d;
    var v = param.v;
    var l = param.l;
    var c = caml_string_compare(x, v);
    if (c === 0) {
      return [
              l,
              some(d),
              r
            ];
    }
    if (c < 0) {
      var match = split(x, l);
      return [
              match[0],
              match[1],
              join(match[2], v, d, r)
            ];
    }
    var match$1 = split(x, r);
    return [
            join(l, v, d, match$1[0]),
            match$1[1],
            match$1[2]
          ];
  }

  function merge$1(f, s1, s2) {
    if (s1) {
      var v1 = s1.v;
      if (s1.h >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge$1(f, s1.l, match[0]), v1, _3(f, v1, some(s1.d), match[1]), merge$1(f, s1.r, match[2]));
      }
      
    } else if (!s2) {
      return /* Empty */0;
    }
    if (s2) {
      var v2 = s2.v;
      var match$1 = split(v2, s1);
      return concat_or_join(merge$1(f, match$1[0], s2.l), v2, _3(f, v2, match$1[1], some(s2.d)), merge$1(f, match$1[2], s2.r));
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "map.ml",
            393,
            10
          ],
          Error: new Error()
        };
  }

  function union(f, s1, s2) {
    if (!s1) {
      return s2;
    }
    if (!s2) {
      return s1;
    }
    var d2 = s2.d;
    var v2 = s2.v;
    var d1 = s1.d;
    var v1 = s1.v;
    if (s1.h >= s2.h) {
      var match = split(v1, s2);
      var d2$1 = match[1];
      var l = union(f, s1.l, match[0]);
      var r = union(f, s1.r, match[2]);
      if (d2$1 !== undefined) {
        return concat_or_join(l, v1, _3(f, v1, d1, valFromOption(d2$1)), r);
      } else {
        return join(l, v1, d1, r);
      }
    }
    var match$1 = split(v2, s1);
    var d1$1 = match$1[1];
    var l$1 = union(f, match$1[0], s2.l);
    var r$1 = union(f, match$1[2], s2.r);
    if (d1$1 !== undefined) {
      return concat_or_join(l$1, v2, _3(f, v2, valFromOption(d1$1), d2), r$1);
    } else {
      return join(l$1, v2, d2, r$1);
    }
  }

  function filter(p, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m.r;
    var d = m.d;
    var v = m.v;
    var l = m.l;
    var l$prime = filter(p, l);
    var pvd = _2(p, v, d);
    var r$prime = filter(p, r);
    if (pvd) {
      if (l === l$prime && r === r$prime) {
        return m;
      } else {
        return join(l$prime, v, d, r$prime);
      }
    } else {
      return concat(l$prime, r$prime);
    }
  }

  function partition(p, param) {
    if (!param) {
      return [
              /* Empty */0,
              /* Empty */0
            ];
    }
    var d = param.d;
    var v = param.v;
    var match = partition(p, param.l);
    var lf = match[1];
    var lt = match[0];
    var pvd = _2(p, v, d);
    var match$1 = partition(p, param.r);
    var rf = match$1[1];
    var rt = match$1[0];
    if (pvd) {
      return [
              join(lt, v, d, rt),
              concat(lf, rf)
            ];
    } else {
      return [
              concat(lt, rt),
              join(lf, v, d, rf)
            ];
    }
  }

  function cons_enum(_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (!m) {
        return e;
      }
      _e = /* More */{
        _0: m.v,
        _1: m.d,
        _2: m.r,
        _3: e
      };
      _m = m.l;
      continue ;
    }}

  function compare(cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return -1;
        } else {
          return 0;
        }
      }
      if (!e2) {
        return 1;
      }
      var c = caml_string_compare(e1._0, e2._0);
      if (c !== 0) {
        return c;
      }
      var c$1 = _2(cmp, e1._1, e2._1);
      if (c$1 !== 0) {
        return c$1;
      }
      _e2 = cons_enum(e2._2, e2._3);
      _e1 = cons_enum(e1._2, e1._3);
      continue ;
    }}

  function equal(cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return false;
        } else {
          return true;
        }
      }
      if (!e2) {
        return false;
      }
      if (caml_string_compare(e1._0, e2._0) !== 0) {
        return false;
      }
      if (!_2(cmp, e1._1, e2._1)) {
        return false;
      }
      _e2 = cons_enum(e2._2, e2._3);
      _e1 = cons_enum(e1._2, e1._3);
      continue ;
    }}

  function cardinal(param) {
    if (param) {
      return (cardinal(param.l) + 1 | 0) + cardinal(param.r) | 0;
    } else {
      return 0;
    }
  }

  function bindings_aux(_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (!param) {
        return accu;
      }
      _param = param.l;
      _accu = {
        hd: [
          param.v,
          param.d
        ],
        tl: bindings_aux(accu, param.r)
      };
      continue ;
    }}

  function bindings(s) {
    return bindings_aux(/* [] */0, s);
  }

  var ObjectDict = {
    empty: /* Empty */0,
    is_empty: is_empty,
    mem: mem,
    add: add,
    update: update$1,
    singleton: singleton,
    remove: remove,
    merge: merge$1,
    union: union,
    compare: compare,
    equal: equal,
    iter: iter,
    fold: fold,
    for_all: for_all,
    exists: exists,
    filter: filter,
    partition: partition,
    cardinal: cardinal,
    bindings: bindings,
    min_binding: min_binding,
    min_binding_opt: min_binding_opt,
    max_binding: max_binding,
    max_binding_opt: max_binding_opt,
    choose: min_binding,
    choose_opt: min_binding_opt,
    split: split,
    find: find,
    find_opt: find_opt,
    find_first: find_first,
    find_first_opt: find_first_opt,
    find_last: find_last,
    find_last_opt: find_last_opt,
    map: map,
    mapi: mapi
  };

  var ParseFail = /* @__PURE__ */create$2("Tea_json.Decoder.ParseFail");

  var string = /* Decoder */{
    _0: (function (value) {
        var s = classify(value);
        if (typeof s === "number" || s.TAG !== /* JSONString */0) {
          return {
                  TAG: /* Error */1,
                  _0: "Non-string value"
                };
        } else {
          return {
                  TAG: /* Ok */0,
                  _0: s._0
                };
        }
      })
  };

  var $$int = /* Decoder */{
    _0: (function (value) {
        var n = classify(value);
        if (typeof n === "number") {
          return {
                  TAG: /* Error */1,
                  _0: "Non-int value"
                };
        }
        if (n.TAG !== /* JSONNumber */1) {
          return {
                  TAG: /* Error */1,
                  _0: "Non-int value"
                };
        }
        var n$1 = n._0;
        if (n$1 > min_int && n$1 < max_int) {
          return {
                  TAG: /* Ok */0,
                  _0: n$1 | 0
                };
        } else {
          return {
                  TAG: /* Error */1,
                  _0: "number out of int range"
                };
        }
      })
  };

  var $$float = /* Decoder */{
    _0: (function (value) {
        var n = classify(value);
        if (typeof n === "number" || n.TAG !== /* JSONNumber */1) {
          return {
                  TAG: /* Error */1,
                  _0: "Non-float-value"
                };
        } else {
          return {
                  TAG: /* Ok */0,
                  _0: n._0
                };
        }
      })
  };

  var bool = /* Decoder */{
    _0: (function (value) {
        var match = classify(value);
        if (typeof match !== "number") {
          return {
                  TAG: /* Error */1,
                  _0: "Non-boolean value"
                };
        }
        switch (match) {
          case /* JSONFalse */0 :
              return {
                      TAG: /* Ok */0,
                      _0: false
                    };
          case /* JSONTrue */1 :
              return {
                      TAG: /* Ok */0,
                      _0: true
                    };
          case /* JSONNull */2 :
              return {
                      TAG: /* Error */1,
                      _0: "Non-boolean value"
                    };
          
        }
      })
  };

  function $$null(v) {
    return /* Decoder */{
            _0: (function (value) {
                var match = classify(value);
                if (typeof match === "number" && match >= 2) {
                  return {
                          TAG: /* Ok */0,
                          _0: v
                        };
                } else {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-null value"
                        };
                }
              })
          };
  }

  function list(decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var a = classify(value);
                if (typeof a === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-list value"
                        };
                }
                if (a.TAG !== /* JSONArray */3) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-list value"
                        };
                }
                var parse = function (v) {
                  var r = _1(decoder$1, v);
                  if (r.TAG === /* Ok */0) {
                    return r._0;
                  }
                  throw {
                        RE_EXN_ID: ParseFail,
                        _1: r._0,
                        Error: new Error()
                      };
                };
                try {
                  return {
                          TAG: /* Ok */0,
                          _0: map$3(parse, to_list(a._0))
                        };
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e.RE_EXN_ID === ParseFail) {
                    return {
                            TAG: /* Error */1,
                            _0: "list -> " + e._1
                          };
                  }
                  throw e;
                }
              })
          };
  }

  function array(decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var a = classify(value);
                if (typeof a === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-array value"
                        };
                }
                if (a.TAG !== /* JSONArray */3) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-array value"
                        };
                }
                var parse = function (v) {
                  var r = _1(decoder$1, v);
                  if (r.TAG === /* Ok */0) {
                    return r._0;
                  }
                  throw {
                        RE_EXN_ID: ParseFail,
                        _1: r._0,
                        Error: new Error()
                      };
                };
                try {
                  return {
                          TAG: /* Ok */0,
                          _0: map$2(parse, a._0)
                        };
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e.RE_EXN_ID === ParseFail) {
                    return {
                            TAG: /* Error */1,
                            _0: "array -> " + e._1
                          };
                  }
                  throw e;
                }
              })
          };
  }

  function keyValuePairs(decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var o = classify(value);
                if (typeof o === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-keyValuePair value"
                        };
                }
                if (o.TAG !== /* JSONObject */2) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-keyValuePair value"
                        };
                }
                var o$1 = o._0;
                var keys = Object.keys(o$1);
                var parse = function (k, l) {
                  var v = get(o$1, k);
                  if (v !== undefined) {
                    var r = _1(decoder$1, valFromOption(v));
                    if (r.TAG === /* Ok */0) {
                      return {
                              hd: [
                                k,
                                r._0
                              ],
                              tl: l
                            };
                    }
                    throw {
                          RE_EXN_ID: ParseFail,
                          _1: r._0,
                          Error: new Error()
                        };
                  }
                  throw {
                        RE_EXN_ID: ParseFail,
                        _1: "Key is undefined: " + k,
                        Error: new Error()
                      };
                };
                try {
                  return {
                          TAG: /* Ok */0,
                          _0: fold_right(parse, keys, /* [] */0)
                        };
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e.RE_EXN_ID === ParseFail) {
                    return {
                            TAG: /* Error */1,
                            _0: "Invalid keyValuePair parsing: " + e._1
                          };
                  }
                  throw e;
                }
              })
          };
  }

  function dict(decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var o = classify(value);
                if (typeof o === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-dict value"
                        };
                }
                if (o.TAG !== /* JSONObject */2) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-dict value"
                        };
                }
                var o$1 = o._0;
                var keys = Object.keys(o$1);
                var parse = function (k, d) {
                  var v = get(o$1, k);
                  if (v !== undefined) {
                    var r = _1(decoder$1, valFromOption(v));
                    if (r.TAG === /* Ok */0) {
                      return add(k, r._0, d);
                    }
                    throw {
                          RE_EXN_ID: ParseFail,
                          _1: r._0,
                          Error: new Error()
                        };
                  }
                  throw {
                        RE_EXN_ID: ParseFail,
                        _1: "Key is undefined: " + k,
                        Error: new Error()
                      };
                };
                try {
                  return {
                          TAG: /* Ok */0,
                          _0: fold_right(parse, keys, /* Empty */0)
                        };
                }
                catch (raw_e){
                  var e = internalToOCamlException(raw_e);
                  if (e.RE_EXN_ID === ParseFail) {
                    return {
                            TAG: /* Error */1,
                            _0: "Invalid dict parsing: " + e._1
                          };
                  }
                  throw e;
                }
              })
          };
  }

  function field(key, decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var o = classify(value);
                if (typeof o === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-fieldable value"
                        };
                }
                if (o.TAG !== /* JSONObject */2) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-fieldable value"
                        };
                }
                var v = get(o._0, key);
                if (v === undefined) {
                  return {
                          TAG: /* Error */1,
                          _0: "Field Value is undefined: " + key
                        };
                }
                var o$1 = _1(decoder$1, valFromOption(v));
                if (o$1.TAG === /* Ok */0) {
                  return o$1;
                } else {
                  return {
                          TAG: /* Error */1,
                          _0: "field `" + (key + ("` -> " + o$1._0))
                        };
                }
              })
          };
  }

  function at(fields, dec) {
    return fold_right$1(field, fields, dec);
  }

  function index(idx, decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var a = classify(value);
                if (typeof a === "number") {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-array value"
                        };
                }
                if (a.TAG !== /* JSONArray */3) {
                  return {
                          TAG: /* Error */1,
                          _0: "Non-array value"
                        };
                }
                var a$1 = a._0;
                if (idx < 0 || idx > a$1.length) {
                  return {
                          TAG: /* Error */1,
                          _0: "Array index out of range: " + String(idx)
                        };
                } else {
                  return _1(decoder$1, get$2(a$1, idx));
                }
              })
          };
  }

  function maybe(decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var r = _1(decoder$1, value);
                if (r.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: some(r._0)
                        };
                } else {
                  return {
                          TAG: /* Ok */0,
                          _0: undefined
                        };
                }
              })
          };
  }

  function oneOf(decoders) {
    return /* Decoder */{
            _0: (function (value) {
                var parse = function (v, _param) {
                  while(true) {
                    var param = _param;
                    if (!param) {
                      return {
                              TAG: /* Error */1,
                              _0: "No one-of's matched"
                            };
                    }
                    var rest = param.tl;
                    try {
                      var ok = _1(param.hd._0, v);
                      if (ok.TAG === /* Ok */0) {
                        return ok;
                      } else {
                        return parse(v, rest);
                      }
                    }
                    catch (exn){
                      _param = rest;
                      continue ;
                    }
                  }              };
                return parse(value, decoders);
              })
          };
  }

  function map$1(mapper, decoder1) {
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var v1 = _1(decoder1$1, value);
                if (v1.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _1(mapper, v1._0)
                        };
                } else {
                  return {
                          TAG: /* Error */1,
                          _0: "map " + v1._0
                        };
                }
              })
          };
  }

  function map2(mapper, decoder1, decoder2) {
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _2(mapper, match._0, match$1._0)
                        };
                }
                var e = error_of_first(match, match$1);
                if (e !== undefined) {
                  return {
                          TAG: /* Error */1,
                          _0: "map2 -> " + e
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map3(mapper, decoder1, decoder2, decoder3) {
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _3(mapper, match._0, match$1._0, match$2._0)
                        };
                }
                var e = first(match$2, first(match$1, match));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map3 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map4(mapper, decoder1, decoder2, decoder3, decoder4) {
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0 && match$3.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _4(mapper, match._0, match$1._0, match$2._0, match$3._0)
                        };
                }
                var e = first(match$3, first(match$2, first(match$1, match)));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map4 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map5(mapper, decoder1, decoder2, decoder3, decoder4, decoder5) {
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0 && match$3.TAG === /* Ok */0 && match$4.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _5(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0)
                        };
                }
                var e = first(match$4, first(match$3, first(match$2, first(match$1, match))));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map5 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map6(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6) {
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0 && match$3.TAG === /* Ok */0 && match$4.TAG === /* Ok */0 && match$5.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _6(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0)
                        };
                }
                var e = first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map6 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map7(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7) {
    var decoder7$1 = decoder7._0;
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                var match$6 = _1(decoder7$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0 && match$3.TAG === /* Ok */0 && match$4.TAG === /* Ok */0 && match$5.TAG === /* Ok */0 && match$6.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _7(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0, match$6._0)
                        };
                }
                var e = first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match))))));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map7 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function map8(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7, decoder8) {
    var decoder8$1 = decoder8._0;
    var decoder7$1 = decoder7._0;
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return /* Decoder */{
            _0: (function (value) {
                var match = _1(decoder1$1, value);
                var match$1 = _1(decoder2$1, value);
                var match$2 = _1(decoder3$1, value);
                var match$3 = _1(decoder4$1, value);
                var match$4 = _1(decoder5$1, value);
                var match$5 = _1(decoder6$1, value);
                var match$6 = _1(decoder7$1, value);
                var match$7 = _1(decoder8$1, value);
                if (match.TAG === /* Ok */0 && match$1.TAG === /* Ok */0 && match$2.TAG === /* Ok */0 && match$3.TAG === /* Ok */0 && match$4.TAG === /* Ok */0 && match$5.TAG === /* Ok */0 && match$6.TAG === /* Ok */0 && match$7.TAG === /* Ok */0) {
                  return {
                          TAG: /* Ok */0,
                          _0: _8(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0, match$6._0, match$7._0)
                        };
                }
                var e = first(match$7, first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))))));
                if (e.TAG !== /* Ok */0) {
                  return {
                          TAG: /* Error */1,
                          _0: "map8 -> " + e._0
                        };
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Impossible case",
                      Error: new Error()
                    };
              })
          };
  }

  function succeed(v) {
    return /* Decoder */{
            _0: (function (_value) {
                return {
                        TAG: /* Ok */0,
                        _0: v
                      };
              })
          };
  }

  function fail(e) {
    return /* Decoder */{
            _0: (function (_value) {
                return {
                        TAG: /* Error */1,
                        _0: e
                      };
              })
          };
  }

  var value = /* Decoder */{
    _0: (function (value) {
        return {
                TAG: /* Ok */0,
                _0: value
              };
      })
  };

  function andThen(func, decoder) {
    var decoder$1 = decoder._0;
    return /* Decoder */{
            _0: (function (value) {
                var r = _1(decoder$1, value);
                if (r.TAG !== /* Ok */0) {
                  return r;
                }
                var andThenDecoder = _1(func, r._0);
                return _1(andThenDecoder._0, value);
              })
          };
  }

  function lazy_(func) {
    return andThen(func, /* Decoder */{
                _0: (function (_value) {
                    return {
                            TAG: /* Ok */0,
                            _0: undefined
                          };
                  })
              });
  }

  function nullable(decoder) {
    return oneOf({
                hd: $$null(undefined),
                tl: {
                  hd: map$1((function (v) {
                          return some(v);
                        }), decoder),
                  tl: /* [] */0
                }
              });
  }

  function decodeValue(decoder, value) {
    try {
      return _1(decoder._0, value);
    }
    catch (raw_e){
      var e = internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === ParseFail) {
        return {
                TAG: /* Error */1,
                _0: e._1
              };
      } else {
        return {
                TAG: /* Error */1,
                _0: "Unknown JSON parsing error"
              };
      }
    }
  }

  function decodeEvent(decoder, value) {
    try {
      return _1(decoder._0, value);
    }
    catch (raw_e){
      var e = internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === ParseFail) {
        return {
                TAG: /* Error */1,
                _0: e._1
              };
      } else {
        return {
                TAG: /* Error */1,
                _0: "Unknown JSON parsing error"
              };
      }
    }
  }

  function decodeString(decoder, string) {
    try {
      var value = JSON.parse(string);
      return decodeValue(decoder, value);
    }
    catch (exn){
      return {
              TAG: /* Error */1,
              _0: "Invalid JSON string"
            };
    }
  }

  var Decoder = {
    ObjectDict: ObjectDict,
    ParseFail: ParseFail,
    string: string,
    $$int: $$int,
    $$float: $$float,
    bool: bool,
    $$null: $$null,
    list: list,
    array: array,
    keyValuePairs: keyValuePairs,
    dict: dict,
    field: field,
    at: at,
    index: index,
    maybe: maybe,
    oneOf: oneOf,
    map: map$1,
    map2: map2,
    map3: map3,
    map4: map4,
    map5: map5,
    map6: map6,
    map7: map7,
    map8: map8,
    succeed: succeed,
    fail: fail,
    value: value,
    andThen: andThen,
    lazy_: lazy_,
    nullable: nullable,
    decodeValue: decodeValue,
    decodeEvent: decodeEvent,
    decodeString: decodeString
  };
  /* No side effect */

  // Generated by ReScript, PLEASE EDIT WITH CARE

  function text(str) {
    return {
            TAG: /* Text */1,
            _0: str
          };
  }

  function div(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "div", key, unique, props, nodes);
  }

  function p(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "p", key, unique, props, nodes);
  }

  function button(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== undefined ? keyOpt : "";
    var unique = uniqueOpt !== undefined ? uniqueOpt : "";
    return fullnode("", "button", key, unique, props, nodes);
  }

  function onClick(msg) {
    return onMsg("click", msg);
  }

  Decoder.at({
        hd: "target",
        tl: {
          hd: "value",
          tl: /* [] */0
        }
      }, Decoder.string);

  Decoder.at({
        hd: "target",
        tl: {
          hd: "checked",
          tl: /* [] */0
        }
      }, Decoder.bool);

  Decoder.field("keyCode", Decoder.$$int);
  /* targetValue Not a pure module */

  var model = {
    moves: 1,
    turn: /* White */1
  };

  function update(model, param) {
    var match = model.turn;
    var turn = match ? /* Black */0 : /* White */1;
    var moves = model.moves + 1 | 0;
    return {
            moves: moves,
            turn: turn
          };
  }

  function view(model) {
    var match = model.turn;
    return div(undefined, undefined, /* [] */0, {
                hd: p(undefined, undefined, /* [] */0, {
                      hd: text(_2(sprintf(/* Format */{
                                    _0: {
                                      TAG: /* String_literal */11,
                                      _0: "Move ",
                                      _1: {
                                        TAG: /* Int */4,
                                        _0: /* Int_d */0,
                                        _1: /* No_padding */0,
                                        _2: /* No_precision */0,
                                        _3: {
                                          TAG: /* String_literal */11,
                                          _0: ".  It is ",
                                          _1: {
                                            TAG: /* String */2,
                                            _0: /* No_padding */0,
                                            _1: {
                                              TAG: /* String_literal */11,
                                              _0: "'s move.",
                                              _1: /* End_of_format */0
                                            }
                                          }
                                        }
                                      }
                                    },
                                    _1: "Move %d.  It is %s's move."
                                  }), model.moves, match ? "White" : "Black")),
                      tl: /* [] */0
                    }),
                tl: {
                  hd: p(undefined, undefined, /* [] */0, {
                        hd: button(undefined, undefined, {
                              hd: onClick(/* Move */0),
                              tl: /* [] */0
                            }, {
                              hd: text("Make a move!"),
                              tl: /* [] */0
                            }),
                        tl: /* [] */0
                      }),
                  tl: /* [] */0
                }
              });
  }

  var partial_arg = {
    model: model,
    update: update,
    view: view
  };

  function main(param, param$1) {
    return beginnerProgram(partial_arg, param);
  }
  /* Tea_html Not a pure module */

  exports.main = main;
  exports.model = model;
  exports.update = update;
  exports.view = view;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
