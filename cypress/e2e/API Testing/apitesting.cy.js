describe('Products list', () => {
    beforeEach(() => {
    })

    it('Product list', () => {
        cy.request({
            method: 'GET',
            retryOnStatusCodeFailure: true,
            url: 'https://automationexercise.com/api/productsList'
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    })


    it('Product list fail', () => {
        cy.request({
            method: 'POST',
            retryOnStatusCodeFailure: true,
            url: 'https://automationexercise.com/api/productsList'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('responseCode', 405)
            expect(response.body).to.contain('message', 'This request method is not supported.')
        })
    })


    it('Brands list', () => {
        cy.request({
            method: 'GET',
            retryOnStatusCodeFailure: true,
            url: 'https://automationexercise.com/api/brandsList'
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('should verify user login successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: {
        email: 'testing2@mail.com',
        password: 'Benten@10'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain('User exists!');
    })
  })
})


