describe('Login test', () => {

    const databody = {
        loginId: "dzs6qjxd-1776857921506-kwp-devtools@deposit.test",
        loginSecret: "TestTest123!",
        dateOfBirth: "1981-12-13",
        brand: "unibet",
        captchaType: "INVISIBLE",
        channel: "web",
        client: "polopoly",
        clientVersion: "desktop",
        deviceDescription: "Chrome",
        deviceId: "6c1602f7-c1c6-4996-9e11-6fc566ecfaa5",
        deviceType: "DESKTOP",
        googleRecaptchaToken: "empty",
        jurisdiction: "UK",
        oauthClientId: "unibet_webapp"
    };

    function loginTest() {
        return cy.request({
            method: 'POST',
            url: 'https://www-qa1.unibet.co.uk/login-api/v3/methods/password',
            body: databody
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    }
    it("Deposit limit", () => {

        loginTest()
        cy.request({
            method: 'POST',
            url: 'https://www-qa1.unibet.co.uk/ndlim/secure/limits',
            body: {
                amount: 40000,
                originType: "CUSTOMER",
                periodType: "DAILY"
            }
        }).then((limitResponse) => {
            expect(limitResponse.status).to.equal(200)
        })

    })
})

