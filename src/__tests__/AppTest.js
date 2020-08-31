const Application = require("spectron").Application;
const electronPath = require("electron");
const path = require("path");

const electron = require('electron')
const spectronMenuAddon = require('spectron-menu-addon-v2')

const menuAddon = new spectronMenuAddon.SpectronMenuAddon()

let app;

beforeAll(() => {
  app = menuAddon.createApplication({ args: [path.join(__dirname, '..')], path: electron.toString() })

  return app.start();
}, 15000);

afterAll(function () {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test("メニューのLearn Moreをクリック", async function () {
  menuAddon.clickMenu('Help', 'Learn More')
});

test("メニューのLearn Moreの状態をチェック", async function () {
  const menuStatus = await menuAddon.getMenuItem('Help', 'Learn More')
  console.log(menuStatus)
  expect(menuStatus.checked).toEqual(false)
  expect(menuStatus.enabled).toEqual(true)
  expect(menuStatus.label).toEqual('Learn More')
  expect(menuStatus.visible).toEqual(true)
});
