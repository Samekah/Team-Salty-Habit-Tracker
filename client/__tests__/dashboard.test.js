const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../dashboard.html'), 'utf8');
const dashboardHelpers = require('../assets/js/dashboard');


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

describe('dashboard helper fucntion', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = homeHtml.toString();
    })

    test("renderUsernameToDashboard displays the username in H1",() => {
        dashboardHelpers.renderUsernameToDashboard("raf")
        const newH1 = document.querySelector('#userInfo h1')
        expect(newH1).toBeTruthy();
        expect(newH1.textContent).toContain('raf');
    })

    test("renderHabitToDashboard renders habit to DOM",() => {
        let fakeData = [{
            id:1,
            habit:"drink water",
            history:[]
        }]
        dashboardHelpers.renderHabitToDashboard(fakeData)
        let updateButton = document.querySelector("#updateStreak-1")
        expect(updateButton).toBeTruthy();
        let streak = document.querySelector("#habitStreak-1")
        expect(streak.textContent).toBe("0");
    })

})