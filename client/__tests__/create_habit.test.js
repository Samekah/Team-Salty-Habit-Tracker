const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../create_habits.html'), 'utf8');

describe('dashboard.html elements', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = homeHtml.toString();
    })
    test('There is a head', () => {
        let head = document.querySelector('head');
     expect(head).toBeTruthy();
    })
    test('There is a body', () => {
        let body = document.querySelector('body');
        expect(body).toBeTruthy();
    })
    test('There is a header', () => {
        let header = document.querySelector('header');
        expect(header).toBeTruthy();
    })
    test('There is a Navbar', () => {
        let navBar = document.querySelector('nav');
        expect(navBar).toBeTruthy();
    })
    test('There is a main', () => {
        let main = document.querySelector('main');
        expect(main).toBeTruthy();
    })
    test("There is a Favicon", () => {
        let favicon = document.querySelector("link[rel = 'icon']");
        expect(favicon).toBeTruthy();
    })
    test("The favicon has an image",() => {
        let favicon = document.querySelector("link[rel = 'icon']")
        let faviconImage = favicon.getAttribute("href");
        expect(faviconImage).not.toBe("#")
    })
})