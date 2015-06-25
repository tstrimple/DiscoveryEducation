(function (WAT) {
    "use strict";

    var logger;

    // Public API
    var self = {
        start: function () {
            if (WAT.getModule("log")) {
                logger = WAT.getModule("log");
            }

            // when inner pages load, do these things...
            var webView = WAT.options.webView;
            WAT.options.webView.addEventListener("MSWebViewDOMContentLoaded", function() {
                WAT.config.customScript = (WAT.config.customScript || {});
                if (WAT.config.customScript.scriptFiles) {
                    for (var scriptIndex = 0; scriptIndex < WAT.config.customScript.scriptFiles.length; scriptIndex++) {
                        var scriptFile = WAT.config.customScript.scriptFiles[scriptIndex];
                        if (!scriptFile.match || webView.src.indexOf(scriptFile.match) > -1) {
                            (function(file) {
                                readScriptAsync("ms-appx:///" + file).then(function (script) {
                                    var asyncOp = WAT.options.webView.invokeScriptAsync("eval", script);
                                    asyncOp.oncomplete = function () {
                                        logger.log("Custom script " + file + " injected");
                                    };
                                    asyncOp.onerror = function (err) {
                                        logger.error("Error during injection of custom script " + file, err);
                                    };
                                    asyncOp.start();
                                }, function (err) {
                                    logger.error("Error during custom scripts injection", err);
                                });
                            })(scriptFile.file);
                        }
                    }
                } else {
                    logger.warn("No custom script defined");
                }
            });
        },
    };

    // Private functions
    function readScriptAsync(filePath) {
        var uri = new Windows.Foundation.Uri(filePath);
        var inputStream = null;
        var reader = null;
        var size;

        return Windows.Storage.StorageFile.getFileFromApplicationUriAsync(uri).then(function (script) {
            return script.openAsync(Windows.Storage.FileAccessMode.read);
        }).then(function (stream) {
            size = stream.size;
            inputStream = stream.getInputStreamAt(0);
            reader = new Windows.Storage.Streams.DataReader(inputStream);

            return reader.loadAsync(size);
        }).then(function () {
            var contents = reader.readString(size);
            return contents;
        });
    }

    // Module Registration
    WAT.registerModule("customScript", self);

})(window.WAT);