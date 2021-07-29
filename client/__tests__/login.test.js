const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../login.html'), 'utf8');
describe('dashboard.html elements', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = homeHtml.toString();
  });
  test('There is a head', () => {
    let head = document.querySelector('head');
    expect(head).toBeTruthy();
  });
  test('There is a body', () => {
    let body = document.querySelector('body');
    expect(body).toBeTruthy();
  });
  test('There is a h1', () => {
    let h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
  });
  test('There is no Navbar', () => {
    let navBar = document.querySelector('nav');
    expect(navBar).toBeFalsy();
  });
  test('There is a div', () => {
    let div = document.querySelector('div');
    expect(div).toBeTruthy();
  });
  test('There is a Favicon', () => {
    let favicon = document.querySelector("link[rel = 'icon']");
    expect(favicon).toBeTruthy();
  });
  test('The favicon has an image', () => {
    let favicon = document.querySelector("link[rel = 'icon']");
    let faviconImage = favicon.getAttribute('href');
    expect(faviconImage).not.toBe('#');
  });
});
