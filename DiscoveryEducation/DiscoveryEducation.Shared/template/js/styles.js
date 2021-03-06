﻿(function (WAT, Windows) {
    "use strict";

    // Private method declaration
    var setThemeColor, loadCustomStyleString, setupWrapperCssFile, addCustomWrapperStyles,
        getCustomCssFile, customCssFileLoadHandler, loadCustomCssFileString,
        logger = window.console,
        customStylesFromFile = "";

    // Public API
    var self = {

        start: function () {
            if (WAT.getModule("log")) {
                logger = WAT.getModule("log");
            }

            WAT.config.styles = (WAT.config.styles || {});

            setThemeColor();
            addCustomWrapperStyles();

            WAT.options.webView.addEventListener("MSWebViewDOMContentLoaded", loadCustomStyleString);

            if (WAT.config.styles.wrapperCssFile) {
                setupWrapperCssFile();
            }
            if (WAT.config.styles.customCssFiles) {
                getCustomCssFile();
            }
        }

    };

    // Private methods

    setThemeColor = function () {
        var link = WAT.wrapperDocHead.querySelector('link[rel=stylesheet][data-href="THEME-PLACEHOLDER"]');
        if (WAT.environment.isWindowsPhone) {
            link.href = "/css/ui-themed" + (WAT.config.styleTheme ? ".theme-" + WAT.config.styleTheme : "") + ".css";
        }
        else {
            link.href = "//Microsoft.WinJS.2.0/css/ui-" + (WAT.config.styleTheme || "light") + ".css";
        }
    };

    addCustomWrapperStyles = function () {
        if (WAT.config.styles.backButton) {
            if (WAT.config.styles.backButton.borderColor) {
                WAT.options.backButton.style.borderColor = WAT.config.styles.backButton.borderColor;
            }
            if (WAT.config.styles.backButton.color) {
                WAT.options.backButton.style.color = WAT.config.styles.backButton.color;
            }
        }
    },

    setupWrapperCssFile = function () {
        var newStyleSheet;

        if (!WAT.config.styles.wrapperCssFile) {
            return;
        }

        newStyleSheet = document.createElement("link");
        newStyleSheet.rel = "stylesheet";
        newStyleSheet.href = WAT.config.styles.wrapperCssFile;

        WAT.wrapperDocHead.appendChild(newStyleSheet);
    };

    loadCustomStyleString = function () {
        var i, l, hiddenEls, exec,
            scriptString = "",
            cssString = "";

        if (WAT.config.styles.setViewport === true) {
            cssString += "@-ms-viewport {";
        }
        if (WAT.config.styles.setViewport === true &&
            WAT.config.styles.targetWidth !== "") {
            cssString += "width:" + WAT.config.styles.targetWidth + ";";
        }
        if (WAT.config.styles.setViewport === true &&
            WAT.config.styles.targetHeight) {
            cssString += "height:" + WAT.config.styles.targetHeight + ";";
        }
        if (WAT.config.styles.setViewport === true) {
            cssString += "}";
        }
        if (WAT.config.styles.surpressTouchAction === true ||
            WAT.config.styles.suppressTouchAction === true) {
            cssString += "body{touch-action:none;}";
        }

        if (WAT.config.styles.hiddenElements && WAT.config.styles.hiddenElements !== "") {
            hiddenEls = WAT.config.styles.hiddenElements;
            var elements = "";
            for (i = 0; i < hiddenEls.length - 1; i++) {
                elements += hiddenEls[i] + ",";
            }
            elements += hiddenEls[hiddenEls.length - 1];
            cssString += elements + "{display:none !important;}";
        }

        //custom css string to add whatever you want
        if (WAT.config.styles.customCssString) {
            cssString += WAT.config.styles.customCssString;
        }

        scriptString += "var cssString = '" + cssString + "';" +
            "var styleEl = document.createElement('style');" +
            "document.body.appendChild(styleEl);" +
            "styleEl.innerHTML = cssString;";

        exec = WAT.options.webView.invokeScriptAsync("eval", scriptString);
        exec.start();
    };


    // Private functions
    function readCssAsync(filePath) {
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

    getCustomCssFile = function () {
        var webView = document.getElementById("main-view");
        webView.addEventListener("MSWebViewDOMContentLoaded", function () {
            for (var i = 0; i < WAT.config.styles.customCssFiles.length; i++) {
                var cssFile = WAT.config.styles.customCssFiles[i];
                if (!cssFile.match || webView.src.indexOf(cssFile.match) > -1) {
                    (function (file) {
                        readCssAsync("ms-appx://" + ((/^\//.test(file)) ? "" : "/") + file).then(function (css) {
                            var exec, scriptString;
                            logger.log("Loading custom css file from " + file);
                            scriptString = "var css = '" + css.replace(/\r\n/gm, " ") + "';" +
                                "var cssFileStyleEl = document.createElement('style');" +
                                "document.body.appendChild(cssFileStyleEl);" +
                                "cssFileStyleEl.innerHTML = css;";

                            exec = WAT.options.webView.invokeScriptAsync("eval", scriptString);
                            exec.start();
                        }, function (err) {
                            logger.error("Error getting custom css file", err);
                        });
                    })(cssFile.file);
                }
            }
        });
    };
    
    // Module Registration
    WAT.registerModule("styles", self);

})(window.WAT, window.Windows);