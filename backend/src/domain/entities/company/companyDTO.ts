
export class CompanyDTO{
    nameCompany: string
    readonly CNPJ: string

    constructor(nameCompany: string, CNPJ: string){
        this.nameCompany = nameCompany
        this.CNPJ = CNPJ
    }
}