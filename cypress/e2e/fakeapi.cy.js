describe('API Testing - Categories Platzi Fake Store', () => {

  const baseUrl = 'https://api.escuelajs.co/api/v1'

  it('TC-API-01 - GET all categories', () => {
    cy.request('GET', `${baseUrl}/categories`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
      })
  })

  it('TC-API-02 - GET category by ID', () => {
    cy.request('GET', `${baseUrl}/categories/1`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.eq(1)
      })
  })

  it('TC-API-03 - GET category ID 2', () => {
    cy.request('GET', `${baseUrl}/categories/2`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.be.a('string')
      })
  })

  it('TC-API-04 - GET category ID 3', () => {
    cy.request('GET', `${baseUrl}/categories/3`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.eq(3)
      })
  })

  it('TC-API-05 - GET category invalid ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404])
      expect(response.body).to.exist
    })
  })

  it('TC-API-06 - GET categories dengan limit', () => {
    cy.request(
      'GET',
      `${baseUrl}/categories?offset=0&limit=5`
    ).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.at.most(5)
    })
  })

  it('TC-API-07 - POST create category', () => {
    const category = {
      name: `Cypress Category ${Date.now()}`,
      image: 'https://placehold.co/600x400'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: category
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body.name).to.eq(category.name)
    })
  })

  it('TC-API-08 - POST create category kedua', () => {
    const category = {
      name: `Automation Category ${Date.now()}`,
      image: 'https://placehold.co/600x400'
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/categories`,
      body: category
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name')
      expect(response.body.name).to.eq(category.name)
    })
  })

  it('TC-API-09 - PUT update category', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/categories/1`,
      body: {
        name: 'Updated Category',
        image: 'https://placehold.co/600x400'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.eq(1)
      expect(response.body.name).to.eq('Updated Category')
    })
  })

  it('TC-API-10 - PATCH update category', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/categories/1`,
      body: {
        name: 'Patch Category'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.eq(1)
      expect(response.body.name).to.eq('Patch Category')
    })
  })

  it('TC-API-11 - DELETE category', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/categories/1`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 204])
      expect(response.body).to.exist
    })
  })

  it('TC-API-12 - GET categories setelah delete', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/categories`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
    })
  })

})