"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js"); // ES6 + reflect-metadata
// zone.js
require("zone.js/dist/zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/async-test");
require("zone.js/dist/jasmine-patch");
// TestBed initialization
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
var context = require.context('./app', true, /\.spec\.ts$/);
context.keys().map(context);
//# sourceMappingURL=main.spec.js.map