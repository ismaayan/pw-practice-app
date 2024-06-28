import { Page } from "@playwright/test"

export class FormLayoutsPage{

    readonly page: Page

    constructor(page: Page ){
        this.page = page

    }

    async submitUSingTheGridFormWithCardenialsAndSelectOption (email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole( 'radio', { name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()

    }

    /** This method will out the inline form with user details
     * 
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param remeberMe - true or flase if user session be saved
     */
    async submitInlineFormWithNameEmailAndCheckbox(name:string, email: string, rememberMe: Boolean){
        const usingInlineForm = this.page.locator('nb-card', { hasText: 'Inline Form' })
        await usingInlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await usingInlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if(rememberMe)
            await usingInlineForm.getByRole('checkbox').check({force:true})
        await usingInlineForm.getByRole('button').click()



    }

}
