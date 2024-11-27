
export class CompanyDTO{
    nameCompany: string
    readonly CNPJ: bigint

    constructor(nameCompany: string, CNPJ: bigint){
        this.nameCompany = nameCompany
        this.CNPJ = CNPJ
    }
}