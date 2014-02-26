// Generated by CoffeeScript 1.6.3
(function() {
  angular.module('ProtocolTest', []).controller('ProtocolController', function($scope) {
    var controller, log, reconnect;
    $scope.protocol = 4;
    $scope.script = "//js.leapmotion.com/leap-0.4.1.min.js";
    $scope.scripts = ["//js.leapmotion.com/0.2.0-beta1/leap.min.js", "//js.leapmotion.com/0.2.0-beta2/leap.min.js", "//js.leapmotion.com/0.2.0-beta3/leap.min.js", "//js.leapmotion.com/0.2.0-beta4/leap.min.js", "//js.leapmotion.com/0.2.0-beta5/leap.min.js", "//js.leapmotion.com/0.2.0-beta6/leap.min.js", "//js.leapmotion.com/0.2.0/leap.min.js", "//js.leapmotion.com/0.2.1/leap.min.js", "//js.leapmotion.com/0.2.2/leap.min.js", "//js.leapmotion.com/0.3.0-beta1/leap.min.js", "//js.leapmotion.com/0.3.0-beta2/leap.min.js", "//js.leapmotion.com/0.3.0-beta3/leap.min.js", "//js.leapmotion.com/0.3.0/leap.min.js", "//js.leapmotion.com/leap-0.4.0.min.js", "//js.leapmotion.com/leap-0.4.1.min.js"];
    $scope.log = [];
    $scope.safeApply = function(fn) {
      var phase;
      phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof fn === 'function')) {
          return fn();
        }
      } else {
        return this.$apply(fn);
      }
    };
    log = function(message, options) {
      if (options == null) {
        options = {};
      }
      $scope.log.push({
        message: message,
        date: Date.now(),
        "class": options["class"]
      });
      return $scope.safeApply();
    };
    $scope.$watch('protocol', function(newVal, oldVal) {
      if (window.Leap) {
        return reconnect();
      }
    });
    $scope.saveCustomScriptURL = function() {
      console.log('save custom url');
      $scope.showCustomScriptInput = false;
      if ($scope.customScriptURL.length > 0) {
        $scope.scripts.push($scope.customScriptURL);
        return $scope.script = $scope.customScriptURL;
      }
    };
    $scope.$watch('script', function(newVal, oldVal) {
      var script;
      if (newVal === 'other') {
        $scope.showCustomScriptInput = true;
        return;
      }
      script = document.createElement('script');
      document.body.appendChild(script);
      script.type = 'text/javascript';
      script.src = newVal;
      script.onload = reconnect;
      return script.onerror = function(e) {
        return log("Error loading " + newVal, {
          "class": 'italic'
        });
      };
    });
    controller = void 0;
    reconnect = function() {
      if (controller) {
        controller.disconnect();
        controller.removeAllListeners('blur');
        controller.removeAllListeners('focus');
        controller = null;
      }
      log("connected " + $scope.script + ", protocol v" + $scope.protocol, {
        "class": 'italic'
      });
      controller = new Leap.Controller();
      controller.connection.opts.requestProtocolVersion = $scope.protocol;
      controller.on('connect', function() {
        return log('connect');
      });
      controller.on('deviceConnected', function() {
        return log('deviceConnected');
      });
      controller.on('deviceDisconnected', function() {
        return log('deviceDisconnected');
      });
      controller.on('ready', function() {
        return log('ready');
      });
      controller.on('focus', function() {
        return log('focus');
      });
      controller.on('blur', function() {
        return log('blur');
      });
      controller.on('deviceStreaming', function(e) {
        return log("deviceStreaming");
      });
      controller.on('streamingStarted', function(e) {
        return log("streamingStarted");
      });
      controller.on('streamingStopped', function(e) {
        return log("streamingStopped");
      });
      controller.on('deviceStopped', function(e) {
        return log("deviceStopped");
      });
      controller.on('deviceAttached', function(e) {
        return log("deviceAttached");
      });
      controller.on('deviceRemoved', function(e) {
        return log("deviceRemoved");
      });
      return controller.connect();
    };
    return window.onerror = function(message, url, linenumber) {
      return log(message, {
        "class": 'italic'
      });
    };
  });

}).call(this);
