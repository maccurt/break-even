import { extraMonthlyPaySectionTest } from "../../helper/cc-monthly-payment-test";
import { creditCardScheduleExtraPayTest, creditCardScheduleMininumPayTest } from "../../helper/cc-schedule-test";
import { InterestSavedByPayingExtraTest } from "../../helper/interest-saved-test";
import { timeSavedExtraPayment } from "../../helper/time-saved-test";
import { enterExtraPaymentForCreditCard } from "../new/minimum-payment-function";

describe('credit card min pay page test', () => {

    beforeEach(() => {
        cy.getDataTestId('cc-compare-tab').as('parent');
    });
    enterExtraPaymentForCreditCard();    
    extraMonthlyPaySectionTest();        
    //Test
    creditCardScheduleExtraPayTest();
    creditCardScheduleMininumPayTest();

    it('minimum payment trap should NOT exist', () => {
        cy.get('@parent').getDataTestId('min-payment-trap').should('not.exist');
    });

    it('credit card are devil should exist', () => {
        cy.get('@parent').getDataTestId('credit-card-devil-section').should('exist');
    });

    InterestSavedByPayingExtraTest('cc-compare-tab');
    timeSavedExtraPayment('cc-compare-tab');

});