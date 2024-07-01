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

test.describe('form layouts page', () => {
    test.beforeEach(async ({ page,}, testInfo) => {
        const pm = new PageManager(page)
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click() 
        }
        await pm.navigateTo().formLayoutPage()
        

    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', { delay: 500 })

        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')


    })

    test('radio buttons', async ({ page }, testInfo) => {
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click() 
        }
        const usingTheGridEmailForm = page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridEmailForm.getByLabel('Option 1').check({ force: true })
        const radioStatus = usingTheGridEmailForm.getByLabel('Option 1').isChecked()
        expect(radioStatus).toBeTruthy()

        await usingTheGridEmailForm.getByLabel('Option 2').check({ force: true })
        expect(await usingTheGridEmailForm.getByLabel('Option 1').isChecked()).toBeFalsy()
        expect(await usingTheGridEmailForm.getByLabel('Option 2').isChecked()).toBeTruthy()

    })

})

test('checkboxes', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().toastrPage()

    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    const allBoxes = await page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }

})

test('lists and dropdowns', async ({ page }, testInfo) => {
    if(testInfo.project.name == 'mobile'){
        test.skip()
    }
    
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    const optionList = page.locator('nb-option-list nb-option')
    expect(optionList).toContainText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({ hasText: 'Cosmic' }).click()
    const header = page.locator('nb-layout-header')
    expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color !== "corporate")
            await dropDownMenu.click()
    }


})

test('tooltips', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().tooltipPage()

    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    const tooltipCard = await page.locator('nb-card', { hasText: 'top' })
    await tooltipCard.getByRole('button', { name: 'Top' }).hover()
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})

test('tables & data', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().smartTablePage()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')


})

test('web table', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().smartTablePage()

    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    //get row by any test in row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //get row by based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    //test filter of the table
    const ages = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == "200") {
                expect(await page.locator('table').textContent()).toContain('No data found')
                await argosScreenshot(page, "No data found")

            } else {
                expect(cellValue).toEqual(age)
            }

        }

    }

})

test('date picker', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().datePickerPage()

    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    const date = new Date()
    date.setDate(date.getDate() + 1)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()

    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)

})

test('sliders', async ({ page }) => {
    //update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    //mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.move(x, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')


})

test('dialogs', async ({ page }, testInfo) => {
    const pm = new PageManager(page)
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click() 
    }
    await pm.navigateTo().dialogPage()

    await page.getByRole('button', {name:'Enter Name'}).click()
    await page.locator('nb-card').getByRole('button', {name:'Cancel'}).click({force:true})
    await expect (page.locator('nb-card', { hasText: 'Return Result From Dialog' }).getByRole('listitem')).not.toBeVisible()
    await page.getByRole('button', {name:'Enter Name'}).click()
    const name = 'Maayan'
    await page.locator('nb-card').getByPlaceholder('Name').fill(name)
    await page.locator('nb-card').getByRole('button', {name:'Submit'}).click({force:true})
    await expect (page.locator('nb-card', { hasText: 'Return Result From Dialog' }).getByRole('listitem')).toHaveText(name)
})


test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutPage().submitUSingTheGridFormWithCardenialsAndSelectOption('test@test.com', '1020304050', 'Option 1')
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(4)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(5,10)
})




test('testing with argos ci', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await argosScreenshot(page, "formLayout Page")
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "datePicker Page")
 
})