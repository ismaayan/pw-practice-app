import { Page } from "@playwright/test"
import { NavigationPage } from "./navigationPage"
import { DatepickerPage } from "./datepickerPage"
import { FormLayoutsPage } from "./formLayoutsPage"

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage


    constructor(page: Page ){
        this.page = page

        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)

    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutPage(){
        return this.formLayoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}