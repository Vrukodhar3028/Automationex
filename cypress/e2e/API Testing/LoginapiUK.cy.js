describe('Login test', () => {
    beforeEach(() => {
    })
    const databody = {

        loginId: "rajeshukcross10@mailinator.com",
        loginSecret: "simple99",
        dateOfBirth: "1991-07-25",
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


    it("Login testi",()=>{
        cy.request({
            method: 'POST',
            retryOnStatusCodeFailure: true,
            url: 'https://www-qa1.unibet.co.uk/login-api/v3/methods/password',
            body: databody
       
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.kafSessionData).to.have.property("sessionId")
            expect(response.body.customerData).to.have.property("customerId")
            expect(response.body.customerData.customerId).to.eq(117498997)
        })

    })
})