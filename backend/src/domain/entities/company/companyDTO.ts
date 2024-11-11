
export class CompanyDTO{
    nameCompany: string
    readonly CNPJ: number

    constructor(nameCompany: string, CNPJ: number){
        this.nameCompany = nameCompany
        this.CNPJ = CNPJ
    }
}