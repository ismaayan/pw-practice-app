import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";


test.beforeEach(async ({ page }) => {
    await page.goto('/')


})
test('navigate to forms page', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    


})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutPage().submitUSingTheGridFormWithCardenialsAndSelectOption('test@test.com', '1020304050', 'Option 1')
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(1)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3,10)
})

test.only('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await argosScreenshot(page, "formLayout Page");
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "datePicker Page");
 
})