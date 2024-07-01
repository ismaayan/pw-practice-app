import { Locator, Page } from "@playwright/test"

export class NavigationPage{

    readonly page: Page
    readonly formLayoutManuItem: Locator
    readonly datePickerManuItem: Locator
    readonly smartTableManuItem: Locator
    readonly toastrManuItem: Locator
    readonly tooltipManuItem: Locator
    readonly dialogManuItem: Locator


    constructor(page: Page ){
        this.page = page
        this.formLayoutManuItem = page.getByText('Form Layout')
        this.datePickerManuItem = page.getByText('Datepicker')
        this.smartTableManuItem = page.getByText('Smart Table')
        this.toastrManuItem = page.getByText('Toastr')
        this.tooltipManuItem = page.getByText('tooltip')
        this.dialogManuItem = page.getByText('Dialog')
    }

    async formLayoutPage(){
        await this.selectGroupManuItem('Forms')
        await this.formLayoutManuItem.click()

    }

    async datePickerPage(){
        await this.selectGroupManuItem('Forms')
        await this.datePickerManuItem.click()

    }

    async smartTablePage(){
        await this.selectGroupManuItem('Tables & Data')
        await this.smartTableManuItem.click()

    }

    async toastrPage(){
        await this.selectGroupManuItem('Modal & Overlays')
        await this.toastrManuItem.click()
    }

    async tooltipPage(){
        await this.selectGroupManuItem('Modal & Overlays')
        await this.tooltipManuItem.click()

    }
    async dialogPage(){
        await this.selectGroupManuItem('Modal & Overlays')
        await this.dialogManuItem.click()


    }

  

    private async selectGroupManuItem(groupItemTitle: string){
        const groupManuItem = this.page.getByTitle(groupItemTitle)
        const expendedState = await groupManuItem.getAttribute('aria-expanded')

            if(expendedState == 'false'){
                await groupManuItem.click()
            }
                

    }
}