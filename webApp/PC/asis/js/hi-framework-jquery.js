(function(){
hi = {};
hi.framework = {};
hi.framework.config = {};
hi.framework.core = {};
hi.framework.data = {};
hi.framework.database = {};
hi.framework.exception = {};
hi.framework.ext = {};
hi.framework.message = {};
hi.framework.storage = {};
hi.framework.util = {};
hi.framework.jquery = {};
hi.framework.mvc = {};
hi.framework.pagination = {};
hi.framework.template = {};
}());
(function(){
hi.framework.config.Config = new function() {
}();
hi.framework.config.Config.logLevel = "ERROR";
hi.framework.config.Config.serverURL = "/DH.json";
hi.framework.config.Config.xecureJsonServerURL = "/DH.xec";
hi.framework.config.Config.sessServerURL = "/SDH.json";
hi.framework.config.Config.sessXecureJsonServerURL = "/SDH.xec";
hi.framework.config.Config.downloadURL = "/DH.download";
hi.framework.config.Config.submitURL = "/service.do";
hi.framework.config.Config.simpleServiceURL = "/service.do";
hi.framework.config.Config.serverTimeout = 180000;
hi.framework.config.Config.mapURL = "http://maps.googleapis.com/maps/api/staticmap?";
}());
(function(){
hi.framework.core.Log = new function() {
  if (window.console === undefined) 
  {
    console = {log: function() {
}, dir: function() {
}};
  }
}();
hi.framework.core.Log.DEBUG = 1000;
hi.framework.core.Log.INFO = 2000;
hi.framework.core.Log.WARN = 3000;
hi.framework.core.Log.ERROR = 4000;
hi.framework.core.Log.FATAL = 5000;
hi.framework.core.Log.isDebugEnabled = function() {
  if (hi.framework.core.Log.getLogLevel(hi.framework.config.Config.logLevel) <= hi.framework.core.Log.getLogLevel("DEBUG")) 
  {
    return true;
  } else {
    return false;
  }
};
hi.framework.core.Log.isInfoEnabled = function() {
  if (hi.framework.core.Log.getLogLevel(hi.framework.config.Config.logLevel) <= hi.framework.core.Log.getLogLevel("INFO")) 
  {
    return true;
  } else {
    return false;
  }
};
hi.framework.core.Log.isWarnEnabled = function() {
  if (hi.framework.core.Log.getLogLevel(hi.framework.config.Config.logLevel) <= hi.framework.core.Log.getLogLevel("WARN")) 
  {
    return true;
  } else {
    return false;
  }
};
hi.framework.core.Log.isFatalEnabled = function() {
  if (hi.framework.core.Log.getLogLevel(hi.framework.config.Config.logLevel) <= hi.framework.core.Log.getLogLevel("FATAL")) 
  {
    return true;
  } else {
    return false;
  }
};
hi.framework.core.Log.isErrorEnabled = function() {
  if (hi.framework.core.Log.getLogLevel(hi.framework.config.Config.logLevel) <= hi.framework.core.Log.getLogLevel("ERROR")) 
  {
    return true;
  } else {
    return false;
  }
};
hi.framework.core.Log.getLogLevel = function(strLevel) {
  if (strLevel == "DEBUG") 
  {
    return hi.framework.core.Log.DEBUG;
  } else if (strLevel == "INFO") 
  {
    return hi.framework.core.Log.INFO;
  } else if (strLevel == "WARN") 
  {
    return hi.framework.core.Log.WARN;
  } else if (strLevel == "ERROR") 
  {
    return hi.framework.core.Log.ERROR;
  } else if (strLevel == "FATAL") 
  {
    return hi.framework.core.Log.FATAL;
  } else {
    hi.framework.core.Log.DEBUG = 1000;
  }
};
}());
(function(){
hi.framework.core.Map = function() {
  this.map = new Object();
};
hi.framework.core.Map.prototype = {put: function(key, value) {
  this.map[key] = value;
}, get: function(key) {
  return this.map[key];
}, containsKey: function(key) {
  return key in this.map;
}, containsValue: function(value) {
  for (var prop in this.map) 
    {
      if (this.map[prop] == value) 
      return true;
    }
  return false;
}, isEmpty: function(key) {
  return (this.size() == 0);
}, clear: function() {
  for (var prop in this.map) 
    {
      delete this.map[prop];
    }
}, remove: function(key) {
  delete this.map[key];
}, keys: function() {
  var keys = new Array();
  for (var prop in this.map) 
    {
      keys.push(prop);
    }
  return keys;
}, values: function() {
  var values = new Array();
  for (var prop in this.map) 
    {
      values.push(this.map[prop]);
    }
  return values;
}, size: function() {
  var count = 0;
  for (count in this.map) 
    {
    }
  return count;
}, toString: function() {
  var str = "{";
  var keys = this.keys();
  for (var i = 0; i < keys.length; i++) 
    {
      if (i != 0) 
      {
        str += ",";
      }
      str += '"';
      str += keys[i];
      str += '"';
      str += ":";
      if (this.get(keys[i])) 
      {
        str += '"';
        str += this.get(keys[i]);
        str += '"';
      } else {
        str += "null";
      }
    }
  str += "}";
  return str;
}};
}());
(function(){
hi.framework.core.UserInfo = new function() {
}();
hi.framework.core.UserInfo.userId = null;
hi.framework.core.UserInfo.userName = null;
hi.framework.core.UserInfo.clientIp = null;
hi.framework.core.UserInfo.osType = null;
hi.framework.core.UserInfo.browserType = null;
hi.framework.core.UserInfo.deviceId = null;
hi.framework.core.UserInfo.sessionKey = null;
hi.framework.core.UserInfo.setUserId = function(userid) {
  hi.framework.core.UserInfo.userId = userid;
};
hi.framework.core.UserInfo.getUserId = function() {
  return hi.framework.core.UserInfo.userId;
};
hi.framework.core.UserInfo.setUserName = function(username) {
  hi.framework.core.UserInfo.userName = username;
};
hi.framework.core.UserInfo.getUserName = function() {
  return hi.framework.core.UserInfo.userName;
};
hi.framework.core.UserInfo.setClientIp = function(clientip) {
  hi.framework.core.UserInfo.clientIp = clientip;
};
hi.framework.core.UserInfo.getClientIp = function() {
  return hi.framework.core.UserInfo.clientIp;
};
hi.framework.core.UserInfo.setOsType = function(ostype) {
  hi.framework.core.UserInfo.osType = ostype;
};
hi.framework.core.UserInfo.getOsType = function() {
  return hi.framework.core.UserInfo.osType;
};
hi.framework.core.UserInfo.setBrowserType = function(browsertype) {
  hi.framework.core.UserInfo.browserType = browsertype;
};
hi.framework.core.UserInfo.getBrowserType = function() {
  return hi.framework.core.UserInfo.browserType;
};
hi.framework.core.UserInfo.setDeviceId = function(deviceid) {
  hi.framework.core.UserInfo.deviceId = deviceid;
};
hi.framework.core.UserInfo.getDeviceId = function() {
  return hi.framework.core.UserInfo.deviceId;
};
hi.framework.core.UserInfo.setSessionKey = function(sessionkey) {
  hi.framework.core.UserInfo.sessionKey = sessionkey;
};
hi.framework.core.UserInfo.getSessionKey = function() {
  return hi.framework.core.UserInfo.sessionKey;
};
hi.framework.core.UserInfo.toString = function() {
  return "[" + "\n\tuserId : " + hi.framework.core.UserInfo.userId + "\n\tuserName : " + hi.framework.core.UserInfo.userName + "\n\tclientIp : " + hi.framework.core.UserInfo.clientIp + "\n\tdeviceId : " + hi.framework.core.UserInfo.deviceId + "\n\tosType : " + hi.framework.core.UserInfo.osType + "\n\tbrowserType : " + hi.framework.core.UserInfo.browserType + "\n\tsessionKey : " + hi.framework.core.UserInfo.sessionKey + "\n]";
};
}());
(function(){
hi.framework.data.MobileHeader = function(params) {
  var params = params || {};
  this.userId = params.userId && params.userId != "undefined" ? params.userId : "";
  this.tranId = params.tranId && params.tranId != "undefined" ? params.tranId : "";
  this.gId = params.gId && params.gId != "undefined" ? params.gId : "";
  this.channelId = params.channelId && params.channelId != "undefined" ? params.channelId : "";
  this.clientIp = params.clientIp && params.clientIp != "undefined" ? params.clientIp : "";
  this.menuId = params.menuId && params.menuId != "undefined" ? params.menuId : "";
  this.responseCode = params.reponseCode && params.reponseCode != "undefined" ? params.reponseCode : "";
  this.responseMessage = params.responseMessage && params.responseMessage != "undefined" ? params.responseMessage : "";
  this.messageEnabled = params.messageEnabled && params.messageEnabled != "undefined" ? params.messageEnabled : "";
  this.deviceId = params.deviceId && params.deviceId != "undefined" ? params.deviceId : "";
  this.osId = params.osId && params.osId != "undefined" ? params.osId : "";
  this.osType = params.osType && params.osType != "undefined" ? params.osType : "";
  this.applicationVersion = params.applicationVersion && params.applicationVersion != "undefined" ? params.applicationVersion : "";
  this.applicationId = params.applicationId && params.applicationId != "undefined" ? params.applicationId : "";
  this.networkType = params.networkType && params.networkType != "undefined" ? params.networkType : "";
  this.phoneNumber = params.phoneNumber && params.phoneNumber != "undefined" ? params.phoneNumber : "";
  this.compressYn = params.compressYn && params.compressYn != "undefined" ? params.compressYn : "";
  this.sessionKey = params.sessionKey && params.sessionKey != "undefined" ? params.sessionKey : "";
};
}());
(function(){
hi.framework.database.WebSqlDatabase = function() {
  this.dbName = null;
  this.dbVersion = null;
  this.dbDescript = null;
  this.dbSize = null;
  this.cb = null;
  this.db = null;
};
hi.framework.database.WebSqlDatabase.prototype = {prepareDB: function(dbN, dbD, dbS, dbC) {
  this.dbName = dbN;
  this.dbVersion = "1.0";
  this.dbDescript = dbD;
  this.dbSize = dbS ? dbS : (1 * 1024 * 1024);
  this.cb = dbC;
  try {
    if (this.cb) 
    {
      this.db = openDatabase(this.dbName, this.dbVersion, this.dbDescript, this.dbSize, this.cb);
    } else {
      this.db = openDatabase(this.dbName, this.dbVersion, this.dbDescript, this.dbSize);
    }
  }  catch (err) {
  hi.framework.message.MessageUtils.showMessage("HIF10005");
  if (hi.framework.core.Log.isDebugEnabled()) 
  {
    console.log(err);
  }
  throw new hi.framework.exception.HiException("HIF10005");
}
}, execute: function(sql, param, cb) {
  this.checkOpenDB();
  if (sql.trim().toUpperCase().indexOf("SELECT") == 0) 
  {
    this.executeQuery(sql, param, cb);
  } else {
    this.executeUpdate(sql, param, cb);
  }
}, executeQuery: function(sql, param, cb) {
  this.checkOpenDB();
  var failCB = this.failQuery;
  this.db.readTransaction(function(tx) {
  tx.executeSql(sql, param, cb, failCB);
});
}, executeUpdate: function(sql, param, cb) {
  this.checkOpenDB();
  var failCB = this.failQuery;
  this.db.transaction(function(tx) {
  tx.executeSql(sql, param, cb, failCB);
});
}, checkOpenDB: function() {
  if (!this.db) 
  {
    hi.framework.message.MessageUtils.showMessage("HIF10004");
    throw new hi.framework.exception.HiException("HIF10004");
  }
}, failQuery: function(tx, err) {
  hi.framework.message.MessageUtils.showMessage("HIF10006", err.message);
  throw new hi.framework.exception.HiException("HIF10006", err.message);
}};
}());
(function(){
hi.framework.exception.HiException = function(msgId, params) {
  this.msgId = msgId;
  this.message = hi.framework.message.MessageUtils.getMessage(msgId, params);
  this.name = "FrameworkExcetion";
};
hi.framework.exception.HiException.prototype = {toString: function() {
  return this.name + " [ MessageID : " + this.msgId + ", Message : " + this.message + " ]";
}};
}());
(function(){
hi.framework.ext.GeoLocation = function() {
  this.watchID = null;
};
hi.framework.ext.GeoLocation.prototype = {toggleGeoLocation: function(onCB, offCB, failCB, options) {
  if (this.watchID) 
  {
    this.clearWatch();
    offCB();
  } else {
    this.watchID = navigator.geolocation.watchPosition(onCB, failCB ? failCB : this.failGEO, options);
  }
}, clearWatch: function() {
  if (this.watchID !== null) 
  {
    navigator.geolocation.clearWatch(this.watchID);
    this.watchID = null;
  }
}, getCurrentPosition: function(successCB, failCB) {
  navigator.geolocation.getCurrentPosition(successCB, failCB ? failCB : this.failGEO);
}, failGEO: function(error) {
  if (hi.framework.core.Log.isDebugEnabled()) 
  {
    console.log(error.message);
  }
  hi.framework.message.MessageUtils.showMessage("HIF90005", error.code);
}};
}());
(function(){
hi.framework.message.MessageUtils = new function() {
}();
hi.framework.message.MessageUtils.msgMap = new hi.framework.core.Map();
hi.framework.message.MessageUtils.msgParamRegExp = /\$\{[0-9]\}/m;
hi.framework.message.MessageUtils.showMessage = function(msgId, params) {
  var pa = new Array();
  pa.push(params);
  alert(hi.framework.message.MessageUtils.getMessage(msgId, pa));
};
hi.framework.message.MessageUtils.getMessage = function(msgId, params) {
  var pa = new Array();
  pa.push(params);
  var obj = hi.framework.message.MessageUtils.getObject(msgId, pa);
  return (obj.type ? "[" + obj.type + "] " : "") + obj.msg;
};
hi.framework.message.MessageUtils.getObject = function(msgId, params) {
  var msgObj = null;
  if (hi.framework.message.MessageUtils.msgMap.containsKey(msgId)) 
  {
    msgObj = hi.framework.message.MessageUtils.msgMap.get(msgId);
  } else {
    msgObj = eval(msgId);
    hi.framework.message.MessageUtils.msgMap.put(msgId, msgObj);
  }
  var parameters = new Array();
  parameters.push(params);
  var msg = msgObj.msg, i = 0;
  while (hi.framework.message.MessageUtils.msgParamRegExp.exec(msg)) 
    {
      msg = msg.replace(hi.framework.message.MessageUtils.msgParamRegExp, parameters[i++]);
    }
  msgObj.msg = msg;
  return msgObj;
};
HIF00000 = {type: "INFO", msg: "${0} \uc774(\uac00) \uc815\uc0c1\ucc98\ub9ac \ub418\uc5c8\uc2b5\ub2c8\ub2e4."};
HIF00001 = {type: "ERROR", msg: "${0} \ucc98\ub9ac\uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4."};
HIF00002 = {type: "ERROR", msg: "\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. [${0}]"};
HIF10003 = {type: "ERROR", msg: "\uc774\ubbf8 \uc800\uc7a5\ub41c \ub370\uc774\ud130 \uc785\ub2c8\ub2e4. key=[${0}]"};
HIF10004 = {type: "ERROR", msg: "DB\uc5d0 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4."};
HIF10005 = {type: "ERROR", msg: "DB \uc900\ube44\uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4."};
HIF10006 = {type: "ERROR", msg: "Query \uc2e4\ud589\uc774 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. : ${0}"};
HIF10007 = {type: "ERROR", msg: "\ud14c\uc774\ube14\uc774 \uc0dd\uc131\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. \ud14c\uc774\ube14\uc744 \uc0dd\uc131\ud55c \ud6c4\uc5d0 \uc0ac\uc6a9\uac00\ub2a5 \ud569\ub2c8\ub2e4. : ${0}"};
HIF10008 = {type: "ERROR", msg: "\uc774\ubbf8 \uc0dd\uc131\ub41c \ud14c\uc774\ube14 \uc785\ub2c8\ub2e4. : ${0}"};
HIF90001 = {type: "ERROR", msg: "\uc8fc\uc18c\ub85d \uc624\ub958 : ${0}"};
HIF90002 = {type: "ERROR", msg: "\ubc29\ud5a5\uacc4 \uc624\ub958 : ${0}"};
HIF90003 = {type: "ERROR", msg: "\uce74\uba54\ub77c \uc624\ub958 : ${0}"};
HIF90004 = {type: "ERROR", msg: "\uac00\uc18d\ub3c4\uacc4 \uc624\ub958 : ${0}"};
HIF90005 = {type: "ERROR", msg: "\uc704\uce58 \uc815\ubcf4 \ud655\uc778 \uc624\ub958 : ${0}"};
HIF90006 = {type: "ERROR", msg: "\ud1b5\uc2e0\uc911\uc5d0 \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4. (${0}, ${1})"};
HIF90007 = {type: "INFO", msg: "\ud30c\uc77c \uc5c5\ub85c\ub4dc\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \ucc98\ub9ac\ub410\uc2b5\ub2c8\ub2e4. \ud30c\uc77c\uba85 : ${0}"};
HIF90008 = {type: "INFO", msg: "\ud30c\uc77c \uc5c5\ub85c\ub4dc \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4."};
HIF90009 = {type: "INFO", msg: "\ud30c\uc77c \uc5c5\ub85c\ub4dc\uac00 \ucde8\uc18c\ub410\uc2b5\ub2c8\ub2e4."};
HIF90010 = {type: "INFO", msg: "\ud30c\uc77c \uc5c5\ub85c\ub4dc \uc124\uc815\uc774 \uc798\ubabb\ub410\uc2b5\ub2c8\ub2e4."};
}());
(function(){
hi.framework.storage.WebLocalStorage = function() {
  this.tableName = null;
};
hi.framework.storage.WebLocalStorage.prototype = {checkTable: function(table) {
  if (this.tableName == null || this.tableName == "undefined" || !this.existTable(table)) 
  {
    alert("\ud14c\uc774\ube14\uc774 \uc0dd\uc131\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
    throw new hi.framework.exception.HiException("HIF10007", table);
  }
}, open: function(table) {
  this.tableName = table;
  this.checkTable(table);
}, create: function(table) {
  this.tableName = table;
  if (this.existTable(table)) 
  {
    alert("\uc774\ubbf8 \uc0dd\uc131\ub41c \ud14c\uc774\ube14 \uc785\ub2c8\ub2e4. [" + this.tableName + "]");
    throw new hi.framework.exception.HiException("HIF10008", table);
  }
  try {
    localStorage.setItem(this.tableName, "");
  }  catch (err) {
  alert("\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. [" + err.code + "]");
  throw new hi.framework.exception.HiException("HIF0002", err.code);
}
}, existTable: function(table) {
  var t = localStorage.getItem(table);
  if (t != null && t != "undefined") 
  {
    return true;
  } else {
    return false;
  }
}, setItem: function(key, value) {
  this.checkTable(this.tableName);
  var k = this.tableName + "_" + key;
  var v = localStorage.getItem(this.tableName);
  var v2 = localStorage.getItem(k);
  if (v2 == null || v2 == "undefined") 
  {
    try {
      localStorage.setItem(this.tableName, v ? v + "," + k : k);
      localStorage.setItem(k, value);
    }    catch (err) {
  alert("\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. [" + err.code + "]");
  throw new hi.framework.exception.HiException("HIF0002", err.code);
}
  } else {
    alert("\uc774\ubbf8 \uc800\uc7a5\ub41c \ub370\uc774\ud130 \uc785\ub2c8\ub2e4. key=[" + key + "]");
    throw new hi.framework.exception.HiException("HIF0003", key);
  }
}, getItem: function(key) {
  this.checkTable(this.tableName);
  return localStorage.getItem(this.tableName + "_" + key);
}, removeItem: function(key) {
  this.checkTable(this.tableName);
  var val = localStorage.getItem(this.tableName);
  var newKeys = "";
  if (val) 
  {
    var k = this.tableName + "_" + key;
    var keys = val.split(",");
    for (var i = 0; i < keys.length; i++) 
      {
        if (keys[i] != k) 
        {
          newKeys = newKeys ? newKeys + "," + keys[i] : keys[i];
        }
      }
  }
  localStorage.removeItem(this.tableName + "_" + key);
  localStorage.setItem(this.tableName, newKeys);
}, clear: function() {
  this.checkTable(this.tableName);
  var val = localStorage.getItem(this.tableName);
  if (val) 
  {
    var keys = val.split(",");
    for (var i = 0; i < keys.length; i++) 
      {
        localStorage.removeItem(keys[i]);
      }
  }
  localStorage.removeItem(this.tableName);
}, size: function() {
  this.checkTable(this.tableName);
  var val = localStorage.getItem(this.tableName);
  if (val) 
  {
    var keys = val.split(",");
    return keys.length;
  } else {
    return 0;
  }
}, key: function(idx) {
  this.checkTable(this.tableName);
  var val = localStorage.getItem(this.tableName);
  if (val) 
  {
    var ks = val.split(",");
    for (var i = 0; i < ks.length; i++) 
      {
        if (ks[i] && i == idx) 
        {
          return ks[i].substring(ks[i].indexOf(this.tableName) + this.tableName.length + 1);
        }
      }
  }
}, keys: function() {
  this.checkTable(this.tableName);
  var keys = new Array();
  var val = localStorage.getItem(this.tableName);
  if (val) 
  {
    var ks = val.split(",");
    for (var i = 0; i < ks.length; i++) 
      {
        if (ks[i]) 
        {
          keys.push(ks[i].substring(ks[i].indexOf(this.tableName) + this.tableName.length + 1));
        }
      }
  }
  return keys;
}};
}());
(function(){
hi.framework.storage.WebSessionStorage = function() {
  this.tableName = null;
};
hi.framework.storage.WebSessionStorage.prototype = {checkTable: function(table) {
  if (this.tableName == null || this.tableName == "undefined" || !this.existTable(table)) 
  {
    alert("\ud14c\uc774\ube14\uc774 \uc0dd\uc131\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
    throw new hi.framework.exception.HiException("HIF10007", table);
  }
}, open: function(table) {
  this.tableName = table;
  this.checkTable(table);
}, create: function(table) {
  this.tableName = table;
  if (this.existTable(table)) 
  {
    alert("\uc774\ubbf8 \uc0dd\uc131\ub41c \ud14c\uc774\ube14 \uc785\ub2c8\ub2e4. [" + this.tableName + "]");
    throw new hi.framework.exception.HiException("HIF10008", table);
  }
  try {
    sessionStorage.setItem(this.tableName, "");
  }  catch (err) {
  alert("\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. [" + err.code + "]");
  throw new hi.framework.exception.HiException("HIF0002", err.code);
}
}, existTable: function(table) {
  var t = sessionStorage.getItem(table);
  if (t != null && t != "undefined") 
  {
    return true;
  } else {
    return false;
  }
}, setItem: function(key, value) {
  this.checkTable(this.tableName);
  var k = this.tableName + "_" + key;
  var v = sessionStorage.getItem(this.tableName);
  var v2 = sessionStorage.getItem(k);
  if (v2 == null || v2 == "undefined") 
  {
    try {
      sessionStorage.setItem(this.tableName, v ? v + "," + k : k);
      sessionStorage.setItem(k, value);
    }    catch (err) {
  alert("\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. [" + err.code + "]");
  throw new hi.framework.exception.HiException("HIF0002", err.code);
}
  } else {
    alert("\uc774\ubbf8 \uc800\uc7a5\ub41c \ub370\uc774\ud130 \uc785\ub2c8\ub2e4. key=[" + key + "]");
    throw new hi.framework.exception.HiException("HIF0003", key);
  }
}, getItem: function(key) {
  this.checkTable(this.tableName);
  return sessionStorage.getItem(this.tableName + "_" + key);
}, removeItem: function(key) {
  this.checkTable(this.tableName);
  var val = sessionStorage.getItem(this.tableName);
  var newKeys = "";
  if (val) 
  {
    var k = this.tableName + "_" + key;
    var keys = val.split(",");
    for (var i = 0; i < keys.length; i++) 
      {
        if (keys[i] != k) 
        {
          newKeys = newKeys ? newKeys + "," + keys[i] : keys[i];
        }
      }
  }
  sessionStorage.removeItem(this.tableName + "_" + key);
  sessionStorage.setItem(this.tableName, newKeys);
}, clear: function() {
  this.checkTable(this.tableName);
  var val = sessionStorage.getItem(this.tableName);
  if (val) 
  {
    var keys = val.split(",");
    for (var i = 0; i < keys.length; i++) 
      {
        sessionStorage.removeItem(keys[i]);
      }
  }
  sessionStorage.removeItem(this.tableName);
}, size: function() {
  this.checkTable(this.tableName);
  var val = sessionStorage.getItem(this.tableName);
  if (val) 
  {
    var keys = val.split(",");
    return keys.length;
  } else {
    return 0;
  }
}, key: function(idx) {
  this.checkTable(this.tableName);
  var val = sessionStorage.getItem(this.tableName);
  if (val) 
  {
    var ks = val.split(",");
    for (var i = 0; i < ks.length; i++) 
      {
        if (ks[i] && i == idx) 
        {
          return ks[i].substring(ks[i].indexOf(this.tableName) + this.tableName.length + 1);
        }
      }
  }
}, keys: function() {
  this.checkTable(this.tableName);
  var keys = new Array();
  var val = sessionStorage.getItem(this.tableName);
  if (val) 
  {
    var ks = val.split(",");
    for (var i = 0; i < ks.length; i++) 
      {
        if (ks[i]) 
        {
          keys.push(ks[i].substring(ks[i].indexOf(this.tableName) + this.tableName.length + 1));
        }
      }
  }
  return keys;
}};
}());
(function(){
hi.framework.util.FormatUtils = new function() {
}();
hi.framework.util.FormatUtils.commaFormat = function(value) {
  var result = value + "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(result)) 
    {
      result = result.replace(rgx, '$1' + ',' + '$2');
    }
  return result;
};
hi.framework.util.FormatUtils.currency = function(value, curr) {
  return curr + "" + hi.framework.util.FormatUtils.commaFormat(value);
};
}());
(function(){
hi.framework.util.JSONUtils = new function() {
}();
hi.framework.util.JSONUtils.parseXML = function(xmlString) {
  var jsonObject = xml2json.parser(xmlString);
  return jsonObject;
};
hi.framework.util.JSONUtils.parseString = function(jsonString) {
  try {
    var obj = JSON.parse(jsonString);
    return obj;
  }  catch (err) {
  alert(err);
}
};
hi.framework.util.JSONUtils.toString = function(obj, rootName) {
  if (obj instanceof hi.framework.core.Map) 
  {
    obj = obj.map;
  }
  var jsonString = JSON.stringify(obj);
  return rootName && rootName != "undefined" ? "{\"" + rootName + "\":" + jsonString + "}" : jsonString;
};
hi.framework.util.JSONUtils.toXML = function(obj, rootName) {
  var xmlString = "";
  for (var key in obj) 
    {
      if (obj.hasOwnProperty(key)) 
      {
        var val = obj[key], type = typeof val;
        if (val instanceof Array && type == "object") 
        {
          xmlString += hi.framework.util.JSONUtils.tag(key, false);
          for (var sub in val) 
            {
              xmlString += hi.framework.util.JSONUtils.toXML(val[sub]);
            }
          xmlString += hi.framework.util.JSONUtils.tag(key, true);
        } else if (val instanceof Object && type == "object") 
        {
          xmlString += hi.framework.util.JSONUtils.tag(key, false) + hi.framework.util.JSONUtils.toXML(val) + hi.framework.util.JSONUtils.tag(key, true);
        } else {
          xmlString += hi.framework.util.JSONUtils.tag(key, false) + val + hi.framework.util.JSONUtils.tag(key, true);
        }
      }
    }
  return rootName && rootName != "undefined" ? hi.framework.util.JSONUtils.tag(rootName, false) + xmlString + hi.framework.util.JSONUtils.tag(rootName, true) : xmlString;
};
hi.framework.util.JSONUtils.tag = function(name, isEnd) {
  return "<" + (isEnd ? "/" : "") + name + ">";
};
}());
(function(){
hi.framework.util.CommonUtils = new function() {
}();
hi.framework.util.CommonUtils.roundNumber = function(num, exponent) {
  if (exponent != 0 && !exponent) 
  {
    exponent = 3;
  }
  return Math.round(num * Math.pow(10, exponent)) / Math.pow(10, exponent);
};
hi.framework.util.CommonUtils.getHeaders = function(serviceId) {
  var headerModel = new hi.framework.data.MobileHeader({userId: hi.framework.core.UserInfo.getUserId(), deviceId: hi.framework.core.UserInfo.getDeviceId(), sessionKey: hi.framework.core.UserInfo.getSessionKey(), tranId: serviceId, channelId: hi.framework.util.CommonUtils.getChannelId()});
  return headerModel;
};
hi.framework.util.CommonUtils.getChannelId = function() {
  var url = document.location.href;
  var idx = url.indexOf("?");
  if (idx != null && idx !== undefined && idx > 0) 
  {
    url = url.substring(0, idx);
  }
  idx = url.lastIndexOf("/");
  if (idx != null && idx !== undefined && idx > 0) 
  {
    url = url.substring(idx + 1, url.length);
  }
  return url;
};
hi.framework.util.CommonUtils.getXMLHttpRequest = function() {
  var xmlHttp;
  if (window.XMLHttpRequest) 
  {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlHttp;
};
hi.framework.util.CommonUtils.searchParentObject = function(objSplit) {
  var obj = window;
  var item = null;
  for (var idx = 0; idx < objSplit.length - 1; idx++) 
    {
      item = objSplit[idx];
      if (item !== undefined) 
      {
        obj = obj[item];
        if (obj === undefined) 
        break;
      }
    }
  return obj;
};
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/gi, "");
};
}());
(function(){
hi.framework.jquery.HttpClient = new function() {
}();
hi.framework.jquery.HttpClient.doRequestAjax = function(tranId, options) {
	if (!options) {
	    alert("Parameter\uac00 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
	    return false;
	}
	if (!tranId)	{
		alert("TranId\uac00 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
		return false;
	}
	// xecure ���п� ���� ȣ���Լ� �б�
	if (options.xecure == false || options.tkformid == false) {
		if (hi.framework.core.Log.isDebugEnabled()) { 
			console.log("doRequestAjax -> xecureAjax");
		}
		//hi.framework.jquery.HttpClient.xecureAjax(tranId, options);
		hi.framework.jquery.HttpClient.ajax(tranId, options);
	} else {
		if (!options.formId) {
			if (hi.framework.core.Log.isDebugEnabled()) { 
				console.log("doRequestAjax -> ajax");
			}
			hi.framework.jquery.HttpClient.ajax(tranId, options);
		} else {
			if (window.FormData) {
				if (hi.framework.core.Log.isDebugEnabled()) { 
					console.log("ajax -> ajaxFormData");
				}
				hi.framework.jquery.HttpClient.ajaxFormData(tranId, options);
		    } else {
		    	if (hi.framework.core.Log.isDebugEnabled()) { 
		    		console.log("ajax -> ajaxForm");
		    	}
		    	hi.framework.jquery.HttpClient.ajaxForm(tranId, options);
		    }
	  	}
	}
};
hi.framework.jquery.HttpClient.ajax = function(tranId, options) {
	var callback = null;
	var headerJSON = null;
	var dataJSON = null;
	var timeout = null;
	var url = null;
	var data = null;
	
	if (!tranId) {
	    alert("TranId\uac00 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
	    return false;
	}
	
	if (!options.data) {
		data = {};		
	} else {
		callback = options.data;
	}
	
	if (!options.callback) {
		callback = {};
	} else {
		callback = options.callback;
	}
	
	if (!options.timeout) {
		if (hi.framework.config.Config.serverTimeout) {
		    timeout = hi.framework.config.Config.serverTimeout;			
		} 
	} else {
		timeout = options.timeout;
	}
	
	if (!options.url) {
		if (options.cert) {
			if (hi.framework.config.Config.sessServerURL) { 
				url = hi.framework.config.Config.sessServerURL;
			}						
		} else {
			if (hi.framework.config.Config.serverURL) { 
				url = hi.framework.config.Config.serverURL;
			}			
		}
	} else {
		url = options.url;
	}

	
	
	var headerModel = hi.framework.util.CommonUtils.getHeaders(tranId);
	headerJSON = hi.framework.util.JSONUtils.toString(headerModel);
	//dataJSON = hi.framework.jquery.HttpClient.getJsonStrFromParam(options.data);
	
	if (!options.formId) {
		dataJSON = hi.framework.jquery.HttpClient.getJsonStrFromParam(options.data);
	} else {
		dataJSON = JSON.stringify($('#' + options.formId).serializeJson());
	}
	
	if (hi.framework.core.Log.isDebugEnabled()) {
		console.log("requestData -> headerJSON : " + headerJSON);
		console.log("requestData -> dataJSON : " + dataJSON);
	}

	var ajaxdata;
	if (options.cert) {
		ajaxdata = {header: headerJSON, data: dataJSON, cert:options.cert};		
	} else {
		ajaxdata = {header: headerJSON, data: dataJSON};
	}
	$.ajax({url: url, timeout: timeout, type: "POST", dataType: "text", async: options.async, data: ajaxdata, 
		beforeSend: function(jqXHR, settings) {
			var flag = true;
			if (options.cors) {	
				$.support.cors = true;
			}
			if (callback.before) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.before");
				}
				flag = callback.before(jqXHR, settings);
			}
			if (flag != false) {
				hi.framework.jquery.HttpClient.startMask();
			}
			return flag;
		}, success: function(data, textStatus, jqXHR) {
			hi.framework.jquery.HttpClient.finishMask();
			var responseObj = hi.framework.util.JSONUtils.parseString(data);
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("responseData : " + data);
			}
			if (responseObj.header.responseCode == 'OK') {
				if (callback.success) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.success");
					}
					callback.success(responseObj);
				}
			} else {
				if (callback.failure) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.failure");
					}
					//���ܻ�Ȳ �߻��� ��ü���� ó��
					responseObj = hi.framework.jquery.HttpClient.transErrMsg(responseObj);
					callback.failure(responseObj);
				} else {
					alert(responseObj.header.responseMessage);
				}
			}
			
			if (callback.message) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.message");
				}
				callback.message(textStatus, responseObj);
			}
		}, error: function(jqXHR, textStatus, errorThrown) {
			hi.framework.jquery.HttpClient.finishMask();
			if (callback.error) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.error");
				}
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				if (textStatus == 'timeout') {
					document.location.href = '/bin/CO/CO/COCO0805G.jsp';
				} else if ( jqXHR.status == "0" ){
					//
				}else {
					alert("Error Code:[" + jqXHR.status + "] " + jqXHR.statusText);					
				}
			}
			$.unblockUI();
		}, complete: function(jqXHR, textStatus) {
			if (callback.complete) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.complete");
				}
				callback.complete(jqXHR, textStatus);
			}
		}});
};

hi.framework.jquery.HttpClient.xecureAjax = function(tranId, options) {
	var callback = null;
	var headerJSON = null;
	var dataJSON = null;
	var timeout = null;
	var url = null;
	var data = null;
	
	if (!tranId) {
	    alert("TranId\uac00 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
	    return false;
	}
	
	// TK ����
	if (options.tkformid) {
		if (!makeEncData(document.getElementById(options.tkformid))) {			
			alert('E2E ��ȣȭ�� �����߽��ϴ�.');
			return;
		}
	}
	
	if (!options.data) {
		data = {};		
	} else {
		callback = options.data;
	}
	
	if (!options.callback) {
		callback = {};
	} else {
		callback = options.callback;
	}
	
	if (!options.timeout) {
		if (hi.framework.config.Config.serverTimeout) {
		    timeout = hi.framework.config.Config.serverTimeout;			
		} 
	} else {
		timeout = options.timeout;
	}
	// BlockEnc ����(Xecure ������ȣ�Լ�)
	
	if (!options.url) {
		if (options.cert) {
			if (hi.framework.config.Config.sessXecureJsonServerURL) {
				url = hi.framework.config.Config.sessXecureJsonServerURL + '?q=' + encodeURIComponent(BlockEnc('', 'GET')) + '&charset=UTF-8';
			}					
		} else {
			if (hi.framework.config.Config.xecureJsonServerURL) {
				url = hi.framework.config.Config.xecureJsonServerURL + '?q=' + encodeURIComponent(BlockEnc('', 'GET')) + '&charset=UTF-8';
			}			
		}	
	} else {
		// QueryString �и�
		var qs, path; 
		if (options.url.indexOf('?') > -1 ) {
			path = options.url.substring(0, options.url.indexOf('?'));
			qs = options.url.substring(options.url.indexOf('?') + 1, options.url.length );
		} else {
			qs = '';
			path = options.url;			
		}

		url = path  + '?q=' + encodeURIComponent(BlockEnc(qs, 'GET')) + '&charset=UTF-8';
	}
	
	var headerModel = hi.framework.util.CommonUtils.getHeaders(tranId);
	headerJSON = hi.framework.util.JSONUtils.toString(headerModel);
	
	if (!options.formId) {
		dataJSON = hi.framework.jquery.HttpClient.getJsonStrFromParam(options.data);
	} else {
		dataJSON = JSON.stringify($('#' + options.formId).serializeJson());
	}
	
	if (hi.framework.core.Log.isDebugEnabled()) {
		console.log("requestData -> headerJSON : " + headerJSON);
		console.log("requestData -> dataJSON : " + dataJSON);
	}
 	
	var certfiled = '';
	if (options.cert) {
		certfiled = '&cert=' + options.cert; 
	}
	
	// TransKey ó���κ� �ּ�
	/*
	if (options.tkformid) {
		
		// TouchEnKey
		// E2E �ʵ� ����
		var hidKeyData = $('#' + options.tkformid).find('input[name=hid_key_data]').val();
		var hidEncData = $('#' + options.tkformid).find('input[name=hid_enc_data]').val();

		// ���Ϻ�ȣȭ �ʵ� ġȯ
		if (options.tkchgname && typeof(hidEncData) != 'undefined') {
			hidEncData = hidEncData.replace('E2E_' + options.tkchgname, 'E2E_tkval1');
		} 

		var tkString = ''; 
		if (typeof(hidKeyData) != 'undefined') {
			tkString = '&hid_key_data=' + encodeURIComponent(hidKeyData) + '&hid_enc_data=' + encodeURIComponent(hidEncData);			
		}
		
		if (hi.framework.core.Log.isDebugEnabled()) {
			console.log("touchEnString : " + tkString);
		}		
		
		// Transkey
		var transkeyStr = '';
		var tkInfo = hi.framework.jquery.HttpClient.getTranskeyInfo(options.tkformid);
		if (typeof (tkInfo) != 'undefined' &&  tkInfo.transkeyUuid && tkInfo.transkeyNames) {

			transkeyStr += '&transkeyUuid=' + tkInfo.transkeyUuid;
			if (!options.tkchgname) {	// Transkey �Ϲ� ó��
				$.each(tkInfo.transkeyInfo, function(idx,val) {				
					transkeyStr += '&transkey_' + val.name + '=' + val.hidden;
					transkeyStr += '&transkey_HM_' + val.name + '=' + val.hmac;
				});
				transkeyStr += '&transkeyNames=' + tkInfo.transkeyNames;				
			} else {	// Transkey ���� ��ȣȭ ó��

				$.each(tkInfo.transkeyInfo, function(idx,val) {	
					if (options.tkchgname  == val.name) {
						transkeyStr += '&transkey_' + val.name + '=' + val.hidden;
						transkeyStr += '&transkey_HM_' + val.name + '=' + val.hmac;
						transkeyStr += '&transkeyNames=' + val.name;
						
						return false;
					}
				});
				
				transkeyStr += '&transkeyDecName=' + 'tkval1';
			}
			
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("transkeyJson ->  : " + transkeyStr);
			}		
		}
		data = encodeURIComponent(BlockEnc('header=' + headerJSON + '&data='  + dataJSON + certfiled + tkString + transkeyStr , "POST"));			
	} else {
		data = encodeURIComponent(BlockEnc('header=' + headerJSON + '&data='  + dataJSON + certfiled , "POST"));		
	}
	*/
	
	$.ajax({url: url, timeout: timeout, type: "POST", dataType: "text", async: options.async, data: 'p=' + data, 
		beforeSend: function(jqXHR, settings) {
			var flag = true;
			if (options.cors) {	
				$.support.cors = true;
			}
			if (callback.before) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.before");
				}
				flag = callback.before(jqXHR, settings);
			}
			if (flag != false) {
				hi.framework.jquery.HttpClient.startMask();
			}
			return flag;
		}, success: function(data, textStatus, jqXHR) {
			hi.framework.jquery.HttpClient.finishMask();
			var responseObj = hi.framework.util.JSONUtils.parseString(BlockDec(data));
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("responseData : " + JSON.stringify(responseObj));
			}
			if (responseObj.header.responseCode == 'OK') {
				if (callback.success) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.success");
					}
					callback.success(responseObj);
				}
			} else {
				if (callback.failure) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.failure");
					}
					callback.failure(responseObj);
				} else {
					alert(responseObj.header.responseMessage);
				}
			}
			
			if (callback.message) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.message");
				}
				callback.message(textStatus, responseObj);
			}
		}, error: function(jqXHR, textStatus, errorThrown) {
			hi.framework.jquery.HttpClient.finishMask();
			if (callback.error) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.error");
				}
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				if (textStatus == 'timeout') {
					document.location.href = '/bin/CO/CO/COCO0805G.jsp';
				} else if ( jqXHR.status == "0" ){
					//
				} else {
					alert("Error Code:[" + jqXHR.status + "] " + jqXHR.statusText);					
				}
			}
			$.unblockUI();
		}, complete: function(jqXHR, textStatus) {
			if (callback.complete) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.complete");
				}
				callback.complete(jqXHR, textStatus);
			}
		}});
};
hi.framework.jquery.HttpClient.ajaxForm = function(tranId, options) {
	var dataType = null;
	var formObj = null;
	var callback = null;
	var headerJSON = null;
	var dataJSON = null;
	var timeout = null;
	var url = null;
	
	if (options.data) {
		dataType = "object";
	}
	
	if (!options.callback) {
		callback = {};
	} else {
		callback = options.callback;
	}

	formObj = $('#' + options.formId);
	if (!formObj) {
		alert("Form Object\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
		return false;
	} else {
		if (!dataType) {
		    dataType = "form";			
		}
	}
	
	var headerModel = hi.framework.util.CommonUtils.getHeaders(tranId);
	headerJSON = hi.framework.util.JSONUtils.toString(headerModel);
	if (dataType == "form") {
		// �迭ó���� ���ؼ� �߰� 2015.11.30
		if(options.arrayFlag){
			dataJSON = JSON.stringify(formObj.serializeJson());
		}else{
			var formEle = formObj.serializeArray();
			var dataMap = new hi.framework.core.Map();
			for (var i in formEle) {
				dataMap.put(formEle[i].name, formEle[i].value);			
			}
			dataJSON = hi.framework.util.JSONUtils.toString(dataMap);
		}
	}
	
	if (dataType == "object") {
		dataJSON = hi.framework.jquery.HttpClient.getJsonStrFromParam(options.data);
	}
	
	if (hi.framework.core.Log.isDebugEnabled()) {
		console.log("requestData -> headerJSON : " + headerJSON);
		console.log("requestData -> dataJSON : " + dataJSON);
	}
	
	if (!options.timeout) {
		if (hi.framework.config.Config.serverTimeout) {
		    timeout = hi.framework.config.Config.serverTimeout;			
		} 
	} else {
		timeout = options.timeout;
	}
	
	if (!options.url) {
		if (options.cert) {
			if (hi.framework.config.Config.sessServerURL) {
				url = hi.framework.config.Config.sessServerURL;			
			}					
		} else {
			if (hi.framework.config.Config.serverURL) {
				url = hi.framework.config.Config.serverURL;			
			}			
		}
	} else {
		url = options.url;
	}
	
	var submitData;
	if (options.cert) {
		submitData = {header: headerJSON, data: dataJSON, cert:options.cert};		
	} else {
		submitData = {header: headerJSON, data: dataJSON};
	}
	var submitOptions = {dataType: 'json', type:'POST', url: url, timeout: timeout, async:options.async, data: submitData
		, beforeSend: function(jqXHR, settings) {
			var flag = true;
			if (options.cors) {
				$.support.cors = true;
			}
			if (callback.before) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.before");
				}
				flag = callback.before(jqXHR, settings);
			}
			if (flag != false) {
				  hi.framework.jquery.HttpClient.startMask();			
			} 
			return flag;
		}
		, success: function(responseText, statusText, xhr, $form) {
			hi.framework.jquery.HttpClient.finishMask();
			var responseObj = responseText;
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("responseData : " + JSON.stringify(responseText));
			}
			if (responseObj.header.responseCode == 'OK') {
				if (callback && callback.success) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.success");
					}
					callback.success(responseObj);
				}
			} else {
				if (callback && callback.failure) {
					if (hi.framework.core.Log.isDebugEnabled()) {
						console.log("callback->callback.failure");
					}
					callback.failure(responseObj);
				}
			}
			if (callback && callback.message) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.message");
				}
				callback.message(statusText, responseObj);
			}
		}
		, error: function(jqXHR, textStatus, errorThrown) {
			hi.framework.jquery.HttpClient.finishMask();
			if (callback.error) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.error");
				}
				callback.error(jqXHR, textStatus, errorThrown);
			} else {
				if (textStatus == 'timeout') {
					document.location.href = '/bin/CO/CO/COCO0805G.jsp';
				} else if ( jqXHR.status == "0" ){
					//
				} else {
					alert("Error Code:[" + jqXHR.status + "] " + jqXHR.statusText);					
				}
			}
			$.unblockUI();
		}
		, complete: function(jqXHR, textStatus) {
			if (callback.complete) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.complete");
				}
				callback.complete(jqXHR, textStatus);
			}
		}};
	formObj.ajaxSubmit(submitOptions);
	return false;
};
hi.framework.jquery.HttpClient.ajaxFormData = function(tranId, options) {
	var dataType = null;
	var formObj = null;
	var callback = null;
	var headerJSON = null;
	var dataJSON = null;
	var timeout = 0;
	var url = null;
	
	if (options.data) {
		dataType = "object";
	}
	
	if (!options.callback) {
		callback = {};	
	}  else {
		callback = options.callback;
	}
	
	formObj = $('#' + options.formId);
	if (!formObj) {
		alert("Form Object\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
		return false;
	} else {
		if (!dataType) dataType = "form";
	}
	
	var headerModel = hi.framework.util.CommonUtils.getHeaders(tranId);
	headerJSON = hi.framework.util.JSONUtils.toString(headerModel);
	if (dataType == "form") {
		// �迭ó���� ���ؼ� �߰� 2015.11.30
		if(options.arrayFlag){
			dataJSON = JSON.stringify(formObj.serializeJson());
		}else{
			var formEle = formObj.serializeArray();
			var dataMap = new hi.framework.core.Map();
			for (var i in formEle) { 
				dataMap.put(formEle[i].name, formEle[i].value);
			}
			dataJSON = hi.framework.util.JSONUtils.toString(dataMap);
		}
	}
	if (dataType == "object") {
		dataJSON = hi.framework.jquery.HttpClient.getJsonStrFromParam(options.data);
	}
	if (hi.framework.core.Log.isDebugEnabled()) {
		console.log("requestData -> headerJSON : " + headerJSON);
		console.log("requestData -> dataJSON : " + dataJSON);
	}
	
	if (!options.timeout) {
		if (hi.framework.config.Config.serverTimeout) {
			timeout = hi.framework.config.Config.serverTimeout;
		}
	} else {
		timeout = options.timeout;
	}
	
	if (!options.url) {
		if (options.cert) {
			if (hi.framework.config.Config.sessServerURL) {
			    url = hi.framework.config.Config.sessServerURL;			
			} 			
		} else {
			if (hi.framework.config.Config.serverURL) {
			    url = hi.framework.config.Config.serverURL;			
			}			
		}
	} else {
		url = options.url;
	}
	
	var fd = new FormData();
	var files = $('#' + options.formId + ' input[type=file]');
	if (files) {
		for (var i = 0; i < files.length; i++) {
			var item = files[i];
			fd.append(item.name, item.files[0]);
		}
	}
	fd.append("header", headerJSON);
	fd.append("data", dataJSON);
	if (options.cert) {
		fd.append("cert", options.cert);		
	}
	
	var loadstartFn = function(evt) {
		var flag = true;
		if (callback.before) {
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("callback->callback.before");
			}
			flag = callback.before(evt);
		}
		if (flag != false) {
			  hi.framework.jquery.HttpClient.startMask();			
		}
		return flag;
	};

	var completeFn = function(evt) {
		hi.framework.jquery.HttpClient.finishMask();
		if (hi.framework.core.Log.isDebugEnabled()) {
			console.log("responseData : " + evt.target.responseText);
		}
		var responseObj = hi.framework.util.JSONUtils.parseString(evt.target.responseText);
		if (responseObj.header.responseCode == 'OK') {
			if (callback.success) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.success");
				}
				callback.success(responseObj);
			}
		} else {
			if (callback.failure) {
				if (hi.framework.core.Log.isDebugEnabled()) {
					console.log("callback->callback.failure");
				}
				callback.failure(responseObj);
			}
		}
		if (callback.message) {
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("callback->callback.message");
			}
			callback.message(evt.target.status, responseObj);
		}
	};

	var errorFn = function(evt) {
		hi.framework.jquery.HttpClient.finishMask();
		if (evt.target.status == 'timeout') {
			document.location.href = '/bin/CO/CO/COCO0805G.jsp';
		} else if( evt.target.status == "0") {
			//
		} else {
			alert("Error Code:[" + evt.target.status + "] " + evt.target.statusText);		
		}
		$.unblockUI();		
	};
	
	var cancelFn = function(evt) {
		hi.framework.jquery.HttpClient.finishMask();
		if( evt.target.status == "0") {
			//
		} else {
			alert("Error Code:[" + evt.target.status + "] " + evt.target.statusText);		
		}
	};
	
	var completeEndFn = function(evt) {
		if (callback.complete) {
			if (hi.framework.core.Log.isDebugEnabled()) {
				console.log("callback->callback.complete");
			}
			callback.complete(evt);
		}
	};

	var xhr = hi.framework.util.CommonUtils.getXMLHttpRequest({timeout: timeout});
	xhr.addEventListener("loadstart", loadstartFn, false);
	xhr.addEventListener("load", completeFn, false);
	xhr.addEventListener("error", errorFn, false);
	xhr.addEventListener("abort", cancelFn, false);
	xhr.addEventListener("loadend", completeEndFn, false); 
	if (!options.async) {
		xhr.open("POST", url, false);	  
	} else {
		xhr.open("POST", url);	  
	}
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send(fd);
};
hi.framework.jquery.HttpClient.doRequestForm = function(tranId, formId, view, options, mId) {
	try {
		var fwFrm = document.getElementById(formId);
   
		if (!fwFrm){
			alert("Form ID\uac00 Null\uc785\ub2c8\ub2e4.");
			return false;
		}
		var fwDiv = null;
		fwDiv = document.getElementById(formId + "_fwDiv");
		if (!fwDiv) {
			fwDiv = document.createElement("div");
			fwDiv.id = formId + "_fwDiv";
			fwDiv.style.display = "none";
			fwDiv.style.visibility = "hidden";
			fwFrm.appendChild(fwDiv);
		}
		if (!options) {
			options = {};
		}
		// �ε���
		if(options.loadingbar != false) {
			$.blockUI({
				fadeIn:0,
				fadeOut:0,
				ignoreIfBlocked:true						
			});
		}
		// Xecure ����ɰ��  form,method = 'POST' ����
		if (options.xecure != false) {
			fwFrm.method = 'POST';
		}

		if (!options.action) {
			if (!hi.framework.config.Config.submitURL) {
				alert("hi.framework.config.Config.simpleServiceURL \uc815\ubcf4\uac00 \uc815\uc758\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
				return false;
			}       
			
			if (typeof(mId) == 'undefined' || mId == null || mId == '') {
				mId = hi.framework.jquery.HttpClient.getMenuId(tranId, view);
			}
			if (mId == '') {
				alert('�ش�Ǵ� ���񽺰� �����ϴ�.');
				return false;
			}
			if (fwFrm.method == 'get') {    	   
				fwDiv.innerHTML = "<input type=\"hidden\" name=\"m\" value=\"" + mId + "\"/>";    	   
			} else {
				fwFrm.action = hi.framework.config.Config.submitURL + "?m=" + mId;
			}
		} else {
			fwFrm.action = options.action;
		}
		if (options.query) {
			fwFrm.action = fwFrm.action + options.query;
		}
		if (options.target) {
			fwFrm.target = options.target;
		}
		/*
		// TK ����		
		if (options.tkformid) {
			if (!makeEncData(document.getElementById(options.tkformid))) {
			      alert('E2E ��ȣȭ�� �����߽��ϴ�.');
			      return;
			}
			
			// Transkey
			var tkInfo = hi.framework.jquery.HttpClient.getTranskeyInfo(options.tkformid);
			if (typeof tkInfo != 'undefined' &&  tkInfo.transkeyUuid && tkInfo.transkeyNames) {
				
				var tkHtml = '';
				$.each(tkInfo.transkeyInfo, function(idx,val) {				
					tkHtml += '<input type="hidden" name="transkey_' + val.name + '" id="transkey_' + val.name + '" value="' + val.hidden +'" />';
					tkHtml += '<input type="hidden" name="transkey_HM_' + val.name + '" id="transkey_HM_' + val.name + '" value="' + val.hmac +'"  />';					
				});
				
				tkHtml += '<input type="hidden" name="transkeyNames" id="transkeyNames" value="' + tkInfo.transkeyNames +'"  />';
				tkHtml += '<input type="hidden" name="transkeyUuid" id="transkeyUuid" value="' + tkInfo.transkeyUuid +'"  />';	
				
				$('#' + formId).prepend(tkHtml);
			}
		}

		// Xecure ���뿩�ο� ���� submit ���� 
		if (options.xecure != false) {
			var asesskey = XecureWeb.GenerateRandom(16, 0);
			XecureSubmit(fwFrm, asesskey);			
		} else {
			fwFrm.submit();
		}
		*/
		
		fwFrm.submit();
		
	}  catch (err) {
		$.unblockUI();
		throw Error("FormSubmit \ucc98\ub9ac \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4 > " + err.message);
	}
};
hi.framework.jquery.HttpClient.doRequestXecureLink = function(url) {
	var aTag = document.createElement("a");
	aTag.href = url;
	XecureLink(aTag);
};
hi.framework.jquery.HttpClient.doRequestLink = function(tranId, query, view, options, mId) {
	try {
		var action = null;
		if (!options) {
			options = {};
		}
		
		// �ε���
		if(options.loadingbar != false){
			$.blockUI();
		 }
		
		if (!options.action) {
			if (!hi.framework.config.Config.simpleServiceURL) {
				alert("hi.framework.config.Config.simpleServiceURL \uc815\ubcf4\uac00 \uc815\uc758\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
				return false;
			}
			action = hi.framework.config.Config.simpleServiceURL;
		} else {
			action = options.action;
		}

		if (typeof(mId) == 'undefined' || mId == null || mId == '') {
			mId = hi.framework.jquery.HttpClient.getMenuId(tranId, view);
		}
		if (mId == '') {
			alert('�ش�Ǵ� ���񽺰� �����ϴ�.');
			return false;
		}
		
		var href = action + "?m=" + mId + (typeof(query) == 'string' && query.trim().length > 0 ? '&' + query : '');
		// Xecure ����
		if (options.xecure != false) {
			var aTag = document.createElement("a");
			aTag.href = href;
			XecureLink(aTag);
		} else {
			document.location.href = href;		
		}

	}  catch (err) {
		$.unblockUI();		
		throw Error("doRequestLink \ucc98\ub9ac \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4 > " + err.message);
	}
};
hi.framework.jquery.HttpClient.doRequestDownload = function(storedName, clientFileName, contentType) {
  if (!storedName) 
  alert("\uc11c\ubc84 \ud30c\uc77c\uba85\uc774 \uc785\ub825\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");
  if (!clientFileName) 
  clientFileName = "";
  if (!contentType) 
  contentType = "";
  document.location.href = hi.framework.config.Config.downloadURL + "?fileName=" + storedName + "&clientFileName=" + clientFileName + "&attachmentContentType=" + contentType;
};
hi.framework.jquery.HttpClient.getJsonStrFromParam = function(params) {
  if (params) 
  {
    if (params instanceof hi.framework.core.Map) 
    {
      return params.toString();
    } else if (params instanceof Object) 
    {
      return hi.framework.util.JSONUtils.toString(params);
    } else {
      throw new TypeError("\uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 Data \ud615\uc2dd\uc785\ub2c8\ub2e4.");
    }
  }
};

hi.framework.jquery.HttpClient.getNOSDecValue = function(frmId, eleId) {
	//�ߺ� ���� ���� �߰� ��
	var decval = '';
	if ($('#' + frmId).length == 0 || $('#' + eleId).length == 0) {
		  if (hi.framework.core.Log.isDebugEnabled()) {
			  console.log('�ش��ϴ� FORM/ELEMENT�� �����ϴ�.');
		  }
		return '';
	}
	/*
	if((checkWebOS.lnx || checkWebOS.mac) && !$("#" + frmId + " input[name='Tk_" + eleId + "_checkbox']").is(":checked")){
		decval = $("#" + frmId + " #" + eleId).val();
		return decval;
	}
	*/
	var E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson(frmId)));
	
	
	/****************************************************************** 
	 * �ӽ÷� �迭�� ���� �ϴ� �κ�  start
	 ******************************************************************/
//	var arr_tmp = JSON.parse(decodeURIComponent(E2E_PARAM));
//	
//	for(var x in arr_tmp){
//		if(arr_tmp[x] instanceof Array){
//			var arr = arr_tmp[x];
//			arr_tmp[x] = arr[0];
//		}
//	}
//	
//	E2E_PARAM = encodeURIComponent(JSON.stringify(arr_tmp));
	/****************************************************************** 
	 * �ӽ÷� �迭�� ���� �ϴ� �κ�  end
	 ******************************************************************/
	
	// ���Ϻ�ȣȭ �ʵ� ġȯ
	hi.framework.jquery.HttpClient.ajax('DHCO0150M01S',{
		  //data:{tkval1:''}
		  data:{E2EParams : E2E_PARAM, E2EField : eleId}
        , tkformid:frmId
        , tkchgname:eleId
		, loadingbar:false
		, async:false
		, callback:{
				success:function(result) {
					decval = result.data.tkval1;
					
				}
		}});
	
	
		if(decval == null && $("#" + eleId ).length > 0){
			decval = $("#" + eleId ).val();
		}
	
	return decval;
};
hi.framework.jquery.HttpClient.getTKDecValue = function(frmId, eleId) {
	var decval = '';
	if ($('#' + frmId).length == 0 || $('#' + eleId).length == 0) {
		  if (hi.framework.core.Log.isDebugEnabled()) {
			  console.log('�ش��ϴ� FORM/ELEMENT�� �����ϴ�.');
		  }
		return '';
	}
	if((checkWebOS.lnx || checkWebOS.mac) && !$("#" + frmId + " input[name='Tk_" + eleId + "_checkbox']").is(":checked")){
		decval = $("#" + frmId + " #" + eleId).val();
		return decval;
	}
	hi.framework.jquery.HttpClient.xecureAjax('DHCO0150M01S',{
		  data:{tkval1:''}
        , tkformid:frmId
        , tkchgname:eleId
		, loadingbar:false
		, async:false
		, callback:{
				success:function(result) {
					decval = result.data.tkval1;
				}
		}});
	
	return decval;
};
hi.framework.jquery.HttpClient.getMenuId = function(tranId, view) {
	var menuid  = '';
	/*
	if (typeof(_menuJson) != 'undefined') {
		$.each(_menuJson, function(idx, obj) {
			if (obj.tranId == tranId && obj.view == view) {
				menuid = obj.menuId;
				console.log('menuJson:' + menuid);
				return false;
			}
		});
	}
	
	if (menuid && menuid.length > 0) {
		return menuid;
	}
	*/

	hi.framework.jquery.HttpClient.ajax('DHCO0350M03S', {
		data:{tranId:tranId,view:view}
	  , loadingbar:false
	  , xecure:false
	  , async:false
	  , callback:{
		  success:function(result) {
			  menuid = result.data.svcMenuId;
		  }
	  	}  
	});
	
	return menuid;
};

// �������� ��ȯó��
hi.framework.jquery.HttpClient.transErrMsg = function(responseObj) {
	var orgMessage = responseObj.header.responseMessage;
	var transMessage = "";
	var tranId = responseObj.header.tranId;

	hi.framework.jquery.HttpClient.ajax('DHCO0400M03S', {
		data:{ifId:tranId,exctMsg:orgMessage}
	  , loadingbar:false
	  , xecure:false
	  , async:false
	  , callback:{
		  success:function(result) {
			  if(result.data.altMsg != null && result.data.altMsg != '') {
				  transMessage = result.data.altMsg;
			  }else {
				  transMessage = orgMessage;
			  }
		  }
	  	}  
	});
	
	responseObj.header.responseMessage = transMessage;
	
	console.log("[hi-framework-jquery transErrMsg] responseObj 2="+responseObj.header.responseMessage);
	return responseObj;
};

hi.framework.jquery.HttpClient.startMask = function() {
};
hi.framework.jquery.HttpClient.finishMask = function() {
};
hi.framework.jquery.HttpClient.setMask = function(maskFn) {
  if (maskFn) 
  {
    if (maskFn.start) 
    hi.framework.jquery.HttpClient.startMask = maskFn.start;
    if (maskFn.finish) 
    hi.framework.jquery.HttpClient.finishMask = maskFn.finish;
  }
};
}());
(function(){
hi.framework.mvc.Application = new function() {
}();
hi.framework.mvc.Application.init = function() {
  $(document).ready(function() {
  if (hi.framework.core.Log.isDebugEnabled()) 
  {
    console.log("hi.framework.mvc.Config.dataAttrName : " + hi.framework.mvc.Config.dataAttrName);
    console.log("hi.framework.mvc.Config.dynamicBinding : " + hi.framework.mvc.Config.dynamicBinding);
  }
  $(document).on('change', '[' + hi.framework.mvc.Config.dataAttrName + ']', function() {
  if (hi.framework.mvc.Config.dynamicBinding == true) 
  {
    hi.framework.mvc.View.bindModel(this);
  }
});
});
};
hi.framework.mvc.Application.load = function(jsPath, rootContext) {
  if (hi.framework.core.Log.isDebugEnabled()) 
  {
    console.log("################# Application.load");
  }
  var models;
  var controllers;
  if (!jsPath.models) 
  models = []; else if (jsPath.models instanceof Array) 
  models = jsPath.models; else models = [jsPath.models];
  if (!rootContext) 
  {
    rootContext = "";
  }
  var path = null;
  for (i = 0 , ln = models.length; i < ln; i++) 
    {
      path = models[i] + '.js';
      $('body').after('<script src="' + rootContext + '/app/model/' + path + '"></' + 'script>');
    }
  if (!jsPath.controllers) 
  controllers = []; else if (jsPath.controllers instanceof Array) 
  controllers = jsPath.controllers; else controllers = [jsPath.controllers];
  for (i = 0 , ln = controllers.length; i < ln; i++) 
    {
      path = controllers[i] + '.js';
      $('body').after('<script src="' + rootContext + '/app/controller/' + path + '"></' + 'script>');
    }
};
}());
(function(){
hi.framework.mvc.Config = new function() {
}();
(hi.framework.mvc.Config = function() {
  hi.framework.mvc.Config.dataAttrName = 'data-ref';
  hi.framework.mvc.Config.dynamicBinding = true;
})();
}());
(function(){
hi.framework.mvc.Model = new function() {
}();
hi.framework.mvc.Model.bindItemSet = function(selectEle) {
  if (selectEle) 
  {
    var select = $(selectEle);
    var dataItemLabel = select.attr("data-item-label");
    var dataItemValue = select.attr("data-item-value");
    var dataItemSet = select.attr("data-item-set");
    if (dataItemSet && dataItemLabel && dataItemValue) 
    {
      select.empty();
      var optionDatas = eval(dataItemSet);
      if (optionDatas) 
      {
        for (var j = 0; j < optionDatas.length; j++) 
          {
            var label = eval(dataItemSet + "[" + j + "]." + dataItemLabel);
            var value = eval(dataItemSet + "[" + j + "]." + dataItemValue);
            if (j == 0) 
            select.append("<option value='" + value + "' selected>" + label + "</option>"); else select.append("<option value='" + value + "'>" + label + "</option>");
          }
      }
    }
  }
};
hi.framework.mvc.Model.toItemSet = function() {
  var selects = $("select[data-item-set][data-item-label][data-item-value]");
  if (selects) 
  {
    for (var i = 0; i < selects.length; i++) 
      hi.framework.mvc.Model.bindItemSet(selects[i]);
  }
};
hi.framework.mvc.Model.toPartItemSet = function(partModel) {
  if (partModel) 
  {
    var selects = $("select[data-item-set][data-item-label][data-item-value][" + hi.framework.mvc.Config.dataAttrName + "]");
    if (selects) 
    {
      for (var i = 0; i < selects.length; i++) 
        {
          var dataAttrValue = $(selects[i]).attr(hi.framework.mvc.Config.dataAttrName);
          if (dataAttrValue && dataAttrValue.indexOf(partModel) == 0) 
          hi.framework.mvc.Model.bindItemSet(selects[i]);
        }
    }
  }
};
hi.framework.mvc.Model.toSingleItemSet = function(singleModel) {
  if (singleModel) 
  {
    var selects = $("select[data-item-set][data-item-label][data-item-value][" + hi.framework.mvc.Config.dataAttrName + "='" + singleModel + "']");
    if (selects) 
    {
      for (var i = 0; i < selects.length; i++) 
        {
          var dataAttrValue = $(selects[i]).attr(hi.framework.mvc.Config.dataAttrName);
          if (dataAttrValue) 
          hi.framework.mvc.Model.bindItemSet(selects[i]);
        }
    }
  }
};
hi.framework.mvc.Model.toView = function() {
  hi.framework.mvc.Model.toItemSet();
  var dataEles = null;
  dataEles = $('body > * [' + hi.framework.mvc.Config.dataAttrName + ']');
  if (dataEles) 
  {
    for (var i = 0; i < dataEles.length; i++) 
      {
        hi.framework.mvc.Model.bindView(dataEles[i]);
      }
  }
};
hi.framework.mvc.Model.toPartView = function(partModel) {
  if (partModel) 
  {
    hi.framework.mvc.Model.toPartItemSet(partModel);
    var dataEles = null;
    dataEles = $('body > * [' + hi.framework.mvc.Config.dataAttrName + ']');
    if (dataEles) 
    {
      for (var i = 0; i < dataEles.length; i++) 
        {
          var dataAttrValue = $(dataEles[i]).attr(hi.framework.mvc.Config.dataAttrName);
          if (dataAttrValue && dataAttrValue.indexOf(partModel) == 0) 
          hi.framework.mvc.Model.bindView(dataEles[i]);
        }
    }
  }
};
hi.framework.mvc.Model.toSingleView = function(singleModel) {
  if (singleModel) 
  {
    hi.framework.mvc.Model.toSingleItemSet(singleModel);
    var dataEles = null;
    dataEles = $("body > * [" + hi.framework.mvc.Config.dataAttrName + "='" + singleModel + "']");
    if (dataEles) 
    {
      for (var i = 0; i < dataEles.length; i++) 
        {
          hi.framework.mvc.Model.bindView(dataEles[i]);
        }
    }
  }
};
hi.framework.mvc.Model.bindView = function(inputEle) {
  if (inputEle) 
  {
    var dataAttr = $(inputEle).attr(hi.framework.mvc.Config.dataAttrName);
    if (dataAttr) 
    {
      var attrValue = null;
      try {
        attrValue = eval(dataAttr);
        hi.framework.mvc.Model.converter(inputEle, attrValue);
      }      catch (e) {
  hi.framework.mvc.Model.converter(inputEle, undefined);
}
      if (hi.framework.core.Log.isDebugEnabled()) 
      console.log(' binding ModeltoView [' + dataAttr + '] : ' + attrValue);
    }
  }
};
hi.framework.mvc.Model.converter = function(inputEle, dataProperty) {
  var ctl = $(inputEle);
  try {
    if (ctl.is('input[type=radio]')) 
    {
      if (ctl.is('[value=' + dataProperty + ']')) 
      ctl.attr('checked', true); else ctl.attr('checked', false);
    } else if (ctl.is('input[type=checkbox]')) 
    {
      if (ctl.is('[value=' + dataProperty + ']')) 
      ctl.attr('checked', true); else ctl.attr('checked', false);
    } else if (ctl.is('select')) 
    {
      ctl.val(dataProperty).val(dataProperty).attr('selected', true);
    } else if (ctl.is('label')) 
    {
      ctl.text(dataProperty);
    } else {
      ctl.val(dataProperty);
    }
  }  catch (err) {
  console.log(err.message);
}
};
hi.framework.mvc.Model.createNS = function(namespace) {
  var nsparts = namespace.split(".");
  var parent = window;
  if (nsparts[0] === "window") 
  {
    nsparts = nsparts.slice(1);
  }
  for (var i = 0; i < nsparts.length; i++) 
    {
      var partname = nsparts[i];
      if (typeof parent[partname] === "undefined") 
      {
        parent[partname] = {};
      }
      parent = parent[partname];
    }
  return parent;
};
hi.framework.mvc.Model.copyObject = function(fromObj) {
  return JSON.parse(JSON.stringify(fromObj));
};
}());
(function(){
hi.framework.mvc.View = new function() {
}();
hi.framework.mvc.View.toModel = function() {
  var dataAttrs = null;
  dataAttrs = $('body > * [' + hi.framework.mvc.Config.dataAttrName + ']');
  if (dataAttrs) 
  {
    for (var i = 0; i < dataAttrs.length; i++) 
      {
        hi.framework.mvc.View.bindModel(dataAttrs[i]);
      }
  }
};
hi.framework.mvc.View.toPartModel = function(partModel) {
  if (partModel) 
  {
    var dataEles = null;
    dataEles = $('body > * [' + hi.framework.mvc.Config.dataAttrName + ']');
    if (dataEles) 
    {
      for (var i = 0; i < dataEles.length; i++) 
        {
          var dataAttrValue = $(dataEles[i]).attr(hi.framework.mvc.Config.dataAttrName);
          if (dataAttrValue && dataAttrValue.indexOf(partModel) == 0) 
          hi.framework.mvc.View.bindModel(dataEles[i]);
        }
    }
  }
};
hi.framework.mvc.Model.toSingleModel = function(singleModel) {
  if (singleModel) 
  {
    var dataEles = null;
    dataEles = $("body > * [" + hi.framework.mvc.Config.dataAttrName + "='" + singleModel + "']");
    if (dataEles) 
    {
      for (var i = 0; i < dataEles.length; i++) 
        {
          hi.framework.mvc.View.bindModel(dataEles[i]);
        }
    }
  }
};
hi.framework.mvc.View.bindModel = function(inputEle) {
  var dataAttr = $(inputEle).attr(hi.framework.mvc.Config.dataAttrName);
  if (dataAttr) 
  {
    hi.framework.mvc.View.converter(inputEle, dataAttr);
  }
};
hi.framework.mvc.View.converter = function(inputEle, dataAttr) {
  var ctl = $(inputEle);
  try {
    if (!ctl.is(':disabled')) 
    {
      if (ctl.is('input[type=checkbox]')) 
      {
        if (ctl.is(':checked') == true) 
        {
          hi.framework.mvc.View.eval(dataAttr, ctl.val());
        } else {
          hi.framework.mvc.View.eval(dataAttr, '');
        }
      } else if (ctl.is('input[type=radio]')) 
      {
        var radioCtls = $('input[type=radio][' + hi.framework.mvc.Config.dataAttrName + '="' + dataAttr + '"]');
        for (var i = 0; i < radioCtls.length; i++) 
          {
            var radioCtl = $(radioCtls[i]);
            if (radioCtl.is(':checked') == true) 
            {
              hi.framework.mvc.View.eval(dataAttr, radioCtl.val());
              break;
            } else {
              hi.framework.mvc.View.eval(dataAttr, null);
            }
          }
      } else {
        hi.framework.mvc.View.eval(dataAttr, ctl.val());
      }
    } else {
      hi.framework.mvc.View.eval(dataAttr, '');
    }
    if (hi.framework.core.Log.isDebugEnabled()) 
    console.log('binding ViewToModel [' + dataAttr + '] : ' + eval(dataAttr));
  }  catch (err) {
  console.log("[" + dataAttr + "] " + err.message);
}
};
hi.framework.mvc.View.eval = function(refData, val) {
  refData = refData.replace(/\[/g, '.').replace(/\]/g, '');
  var refArray = refData.split('.');
  var obj = null;
  var tmpObj = null;
  if (refArray.length > 1) 
  {
    var length = refArray.length;
    for (var i = 0; i < refArray.length; i++) 
      {
        if (i == 0) 
        {
          tmpObj = window[refArray[0]];
          if (!tmpObj) 
          {
            window[refArray[0]] = new Object();
            tmpObj = window[refArray[0]];
          }
        } else {
          tmpObj = obj[refArray[i]];
          if (!tmpObj) 
          {
            obj[refArray[i]] = new Object();
            tmpObj = obj[refArray[i]];
          }
        }
        obj = tmpObj;
        if (!obj) 
        break;
        if (i == (length - 2)) 
        {
          obj[refArray[i + 1]] = val;
          break;
        }
      }
  } else if (refArray.length == 1) 
  {
    window[refArray[0]] = val;
  }
};
}());
(function(){
	hi.framework.pagination.PageNavigator = function(pageVO, divID, onClickCB, options) {
	  this.pageVO = pageVO;
	  this.divID = divID;
	  this.onClickCB = onClickCB;
	  if (options) 
	  {
	    this.currPageStyleClass = options.currPageStyleClass ? options.currPageStyleClass : "";
	    this.otherPageStyleClass = options.otherPageStyleClass ? options.otherPageStyleClass : "";
	    this.firstImg = options.firstImg ? options.firstImg : "https://direct.hi.co.kr/images/common/btn_paging_first.png";
      this.prevImg = options.prevImg ? options.prevImg : "https://direct.hi.co.kr/images/common/btn_paging_prev.png";
      this.nextImg = options.nextImg ? options.nextImg : "https://direct.hi.co.kr/images/common/btn_paging_next.png";
      this.lastImg = options.lastImg ? options.lastImg : "https://direct.hi.co.kr/images/common/btn_paging_last.png";
	    this.pageFirstStyleClass = options.pageFirstStyleClass ? options.pageFirstStyleClass : "";
	    this.pagePreviousStyleClass = options.pagePreviousStyleClass ? options.pagePreviousStyleClass : "";
	    this.pageNextStyleClass = options.pageNextStyleClass ? options.pageNextStyleClass : "";
	    this.pageLastStyleClass = options.pageLastStyleClass ? options.pageLastStyleClass : "";
	    this.pageFirstUnLinkStyleClass = options.pageFirstUnLinkStyleClass ? options.pageFirstUnLinkStyleClass : "";
	    this.pagePreviousUnLinkStyleClass = options.pagePreviousUnLinkStyleClass ? options.pagePreviousUnLinkStyleClass : "";
	    this.pageNextUnLinkStyleClass = options.pageNextUnLinkStyleClass ? options.pageNextUnLinkStyleClass : "";
	    this.pageLastUnLinkStyleClass = options.pageLastUnLinkStyleClass ? options.pageLastUnLinkStyleClass : "";
	    this.usePageUnit = options.usePageUnit ? options.usePageUnit : true;
	  } else {
	    this.currPageStyleClass = "";
	    this.otherPageStyleClass = "";
	    this.firstImg = "";
	    this.prevImg = "";
	    this.nextImg = "";
	    this.lastImg = "";
	    this.pageFirstStyleClass = "";
	    this.pagePreviousStyleClass = "";
	    this.pageNextStyleClass = "";
	    this.pageLastStyleClass = "";
	    this.pageFirstUnLinkStyleClass = "";
	    this.pagePreviousUnLinkStyleClass = "";
	    this.pageNextUnLinkStyleClass = "";
	    this.pageLastUnLinkStyleClass = "";
	    this.usePageUnit = true;
	  }
	};
	hi.framework.pagination.PageNavigator.prototype = {showNavigation: function() {
	  var codes = "";
	  if (this.pageVO.hasPreviousPageUnit()) 
	  {
	    if (this.usePageUnit) 
	    {
	      codes = this.appendCodes(codes, this.getFullLink("처음", 1, "btn", this.firstImg));
	    } else {
	      codes = this.appendCodes(codes, this.getFullLink("처음", 1, "btn", this.firstImg));
	    }
	  } else {
	   // codes = this.appendCodes(codes, this.getFullLink("ó��",1, "btn", this.firstImg));
	  }
	  if (this.pageVO.hasPreviousPage()) 
	  {
	    codes = this.appendCodes(codes, this.getFullLink("이전", this.pageVO.getPreviousPage(), "btn", this.prevImg));
	  } else {
	    //codes = this.appendCodes(codes, this.getUnlinkedTag("����", "btn", this.prevImg));
	  }
	  if (this.pageVO.totalRowCount <= 0) 
	  {
	    codes = this.appendCodes(codes, "<a href=\"#none\">1</a>");
	  } else {
	    for (var i = this.pageVO.beginUnitPage; i <= this.pageVO.getEndListPage(); i++) 
	      {
	        if (i == this.pageVO.currentPage) 
	        {
	          codes = this.appendCodes(codes, "<a class=\"" + this.currPageStyleClass + "\">" + i + "</a>");
	        } else {
	          codes = this.appendCodes(codes, "<a  id='page" + i + "' " + "href=\"" + this.getLinkContens(i) + "\">" + i + "</a>");
	        }
	      }
	  }
	  if (this.pageVO.hasNextPage()) 
	  {	
		 //console.log("this.pageVO.getNextPage():"+this.pageVO.getNextPage());
	    codes = this.appendCodes(codes, this.getFullLink("다음", this.pageVO.getNextPage(), "btn", this.nextImg));
	  } else {
	    //codes = this.appendCodes(codes, this.getUnlinkedTag("����","btn", this.nextImg));
	  }
	  if (this.pageVO.hasNextPageUnit()) 
	  {
	    if (this.usePageUnit) 
	    {
	      codes = this.appendCodes(codes, this.getFullLink("마지막", this.pageVO.getPageOfNextPageUnit(), "btn", this.lastImg));
	    } else {
	      codes = this.appendCodes(codes, this.getFullLink("마지막", this.pageVO.maxPage, "btn", this.lastImg));
	    }
	  } else {
		  //codes = this.appendCodes(codes, this.getFullLink("������", this.pageVO.maxPage, "btn", this.lastImg));
	    //codes = this.appendCodes(codes, this.getUnlinkedTag("������","btn", this.lastImg));
	  }
	  $("#" + this.divID).html(codes);
	}, appendCodes: function(codes, part) {
	  return codes + part + "\n";
	}, getUnlinkedTag: function(id, styleClassName, imagePath) {
	  if (imagePath) 
	  {
		  return "<a href=\"#none\" class=\""+styleClassName+"\" title=\""+id+"\"><img src=\""+imagePath+"\" alt=\""+id+"\" /></a>";
	  } else {
	    return "<label for=\"" + id + "\">" + this.getTextTag(id, styleClassName, "") + "</label>";
	  }
	}, getFullLink: function(id, pageIndexValue, styleClassName, imagePath) {
	  var onClick = this.getLinkContens(pageIndexValue);
	  if (imagePath) 
	  {
	    return "<a href=\""+onClick+"\" class=\""+styleClassName+"\" title=\""+id+"\"><img src=\""+imagePath+"\" alt=\""+id+"\" /></a>";
	  } else {
		  return "<label for=\"" + id + "\">" + this.getTextTag(id, styleClassName, "") + "</label>";
	  }
	}, getLinkContens: function(pageIndexValue) {
	  return "javascript:" + this.onClickCB + "(" + pageIndexValue + ");";
	}, getTextTag: function(id, styleClassName, onClick) {
	  var textTag = "<a href=\"#\" style=\"text-decoration:none\" id=\"" + id + "\"";
	  if (styleClassName) 
	  {
	    textTag = textTag + " class=\"" + styleClassName + "\"";
	  }
	  if (onClick) 
	  {
	    textTag = textTag + " onclick=\"" + onClick + "\"";
	  }
	  if ("previousPageUnit" == id) 
	  {
	    textTag = textTag + ">&lt;&lt;</a>";
	  } else if ("previousPage" == id) 
	  {
	    textTag = textTag + ">&lt;</a>";
	  } else if ("nextPage" == id) 
	  {
	    textTag = textTag + ">&gt;</a>";
	  } else if ("nextPageUnit" == id) 
	  {
	    textTag = textTag + ">&gt;&gt;</a>";
	  }
	  return textTag;
	}, getImgTag: function(id, imagePath, styleClassName, onClick) {
	  var imgTag = "<img id=\"" + id + "\"";
	  if (imagePath) 
	  {
	    imgTag = imgTag + " src=\"" + imagePath + "\"";
	  }
	  if (styleClassName) 
	  {
	    imgTag = imgTag + " class=\"" + styleClassName + "\"";
	  }
	  if (onClick) 
	  {
	    imgTag = imgTag + " onclick=\"" + onClick + "\"";
	  }
	  imgTag = imgTag + "/>";
	  return imgTag;
	}};
	}());
	(function(){
	hi.framework.pagination.PageVO = function(params) {
	  this.currentPage = params.currentPage ? params.currentPage : 1;
	  this.totalRowCount = params.totalRowCount ? params.totalRowCount : 0;
	  this.pageUnit = params.pageUnit ? params.pageUnit : 10;
	  this.pageSize = params.pageSize ? params.pageSize : 10;
	  this.requestRowCount = 500;
	  this.maxPage = params.maxPage && params.maxPage > 0 ? params.maxPage : Math.floor(this.pageSize == 0 ? this.totalRowCount : (this.totalRowCount - 1) / this.pageSize + 1, 0);
	  this.beginUnitPage = params.beginUnitPage && params.beginUnitPage > 0 ? params.beginUnitPage : Math.floor(((this.currentPage - 1) / this.pageUnit)) * this.pageUnit + 1;
	  this.endUnitPage = params.endUnitPage && params.endUnitPage > 0 ? params.endUnitPage : this.beginUnitPage + (this.pageUnit - 1);
	};
	hi.framework.pagination.PageVO.prototype = {hasNextPage: function() {
		return (this.currentPage < this.maxPage && Math.ceil(this.maxPage / this.pageUnit) > Math.ceil(this.currentPage / this.pageUnit) );
	  //return (this.currentPage < this.maxPage && this.maxPage> this.pageUnit);
	}, hasPreviousPage: function() {
	  return (this.currentPage > 1 && this.currentPage >  this.pageUnit);
	}, getNextPage: function() {
		//console.log("beginUnitPage:"+ this.beginUnitPage);
		//console.log("currentPage:"+ this.currentPage);	
		//console.log("totalRowCount:"+ this.totalRowCount);	
	  return eval(this.endUnitPage) + 1;
	}, getPreviousPage: function() {
	  return eval(this.beginUnitPage) - eval(this.pageSize);
	}, hasNextPageUnit: function() {
	  return this.endUnitPage < this.maxPage;
	}, hasPreviousPageUnit: function() {
	  return this.currentPage >= this.pageUnit + 1;
	}, getStartOfNextPageUnit: function() {
	  return this.endUnitPage + 1;
	}, getStartOfPreviousPageUnit: function() {
	  return this.beginUnitPage - 1;
	}, getPageOfNextPageUnit: function() {
		return this.maxPage;
	  //return (parseInt(this.currentPage) + parseInt(this.pageUnit) < this.maxPage) ? this.currentPage + this.pageUnit : this.maxPage;
	}, getPageOfPreviousPageUnit: function() {
	  return (this.currentPage - this.pageUnit > 1) ? this.currentPage - this.pageUnit : 1;
	}, getBeginUnitPage: function() {
	  return this.beginUnitPage;
	}, getEndListPage: function() {
	  return (this.endUnitPage > this.maxPage) ? this.maxPage : this.endUnitPage;
	}};
	}());
(function(){
hi.framework.template.Template = new function() {
  this.tplTagRegExp = /\{\{[a-zA-Z0-9]*\}\}/gi;
}();
hi.framework.template.Template.render = function(templateCode, mappingData, showID) {
  var codes = "";
  for (var i = 0; i < mappingData.length; i++) 
    {
      var rowData = mappingData[i];
      var tmpStr = templateCode.replace(this.tplTagRegExp, function($1) {
  var tag = $1.substring(2, $1.length - 2);
  var data = rowData[tag];
  if (data) 
  {
    return data;
  } else {
    return "";
  }
});
      codes += tmpStr;
    }
  $("#" + showID).append(codes);
};
}());
$.fn.serializeJson = function() {
	var arr = this.serializeArray();
	var obj = {};
	$.each(arr, function() {
		if (obj[this.name]) {
			if (!obj[this.name].push) {
				obj[this.name] = [obj[this.name]];
			}
			obj[this.name].push(this.value || '');
		} else {
			obj[this.name] = this.value || '';
		}
	});
	
	return obj;
};
hi.framework.jquery.HttpClient.getTranskeyInfo = function(tkformid) {
	
	if (typeof (tkformid) == 'undefined' || tkformid == '') {
		return;
	}
	
	var $tkForm = $('#' + tkformid);
	$tkForm.find('input[name^=transkey]').each(function(idx, val) {
		$(this).remove();
	});
	
	var transkeyNames = '';
	var transKeyInfoArr = new Array();		
	$tkForm.find('span[id$="_tk_btn"] > label > input:checkbox').each(function() {
		if ($(this).is(':checked')) {
			var obj = document.getElementById($(this).attr('id').replace('Tk_', '').replace('_checkbox', ''));
			var encObj = tk.inputFillEncData(obj);		
			transKeyInfoArr.push({'name':obj.name, 'hidden':encObj.hidden, 'hmac':encObj.hmac});		
			
			if (transkeyNames.length == 0) {
				transkeyNames = obj.name;
			} else {
				transkeyNames += '%TK%' + obj.name; 
			}
		}		
	});

	if (transKeyInfoArr.length > 0) {
		return {'transkeyUuid':tk.transkeyUuid, 'transkeyInfo':transKeyInfoArr, 'transkeyNames':transkeyNames};
	} else {
		return;
	}

};