const URL = 'https://webservices.cinq.com.br/pessoas/apontamento';

const clockIn = (day, start, end) => {
  cy.visit(URL);

  cy.get('input[id="activityDate"]').click();

  cy.get('.day')
    .not('.old')
    .contains(new RegExp('^' + day + '$', 'g'))
    .click();

  cy.get('#startTime').type(start);
  cy.get('#endTime').type(end);
  cy.get('#description').type('Desenvolvimento');
  cy.get('#formApontamento').submit();
};

const WEEK_DAYS = [];

context('clock in spec', () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.viewport(1024, 768);
  });

  it('perform clock in', () => {
    cy.contains('Fazer Login com e-mail Dextra').click();

    for (const day of WEEK_DAYS) {
      clockIn(day, '08:00', '12:00');
      clockIn(day, '13:00', '17:00');
    }
  });
});
