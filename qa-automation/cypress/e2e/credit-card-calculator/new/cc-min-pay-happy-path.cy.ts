// import { statSectionTest } from "../../helper/section-test-helpers";
// import { enterMinimumPaymentForCreditCard } from "./minimum-payment-function";

// describe('minimum payment happy path', () => {

//     enterMinimumPaymentForCreditCard();

//     beforeEach(() => {
//         cy.getDataTestId('minimum-payment-mode').as('mode');
//     });

//     before(() => {
//         cy.get('div[role=tab]').eq(1).click();    
//     });

//     it('minimum payment mode should exist', () => {
//         cy.get('@mode').should('exist');
//     });

//     it('total principal and interest section should exist', () => {
//         cy.get('@mode').getDataTestId('total-principal-interest').should('exist');
//     });

//     statSectionTest('cc-summary-tab', 'total-principal-interest',
//         'Total Principal & Interest Minium Payment Only',
//         '$21,979.18',
//         '10,000.00 balance + 11,979.18 interest');

//     it('minimum payment interest should exist', () => {
//         cy.get('@mode').getDataTestId('minimum-payment-interest').should('exist');
//     });

//     statSectionTest('cc-summary-tab','minimum-payment-interest',
//         'Minimum Payment Interest',
//         '$11,979.18',
//         'You Will Pay 119.79% In Interest.');

//     it('time to pay off debt', () => {
//         cy.getDataTestId('time-card-min-pay-section').getDataTestId('time-to-pay-debt-section').should('exist');
//     });

//     it('credit card are devil section should exist', () => {
//         cy.getDataTestId('time-card-min-pay-section').getDataTestId('min-payment-trap').should('exist');
//     });
// });