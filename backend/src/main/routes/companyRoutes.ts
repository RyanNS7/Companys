import { createCompanyController } from "../../adapters/controllers/company/createCompanyController";
import { createCompanyPositionController } from "../../adapters/controllers/company/createCompanyPositionController";
import { deleteCompanyController } from "../../adapters/controllers/company/deleteCompanyController";
import { findCompanyController } from "../../adapters/controllers/company/findCompanyController";
import { CompanyRepository } from "../../infra/implementations/companyRepository";
import Express, { Request, Response } from "express";

const companyRouter = Express.Router()

companyRouter.post("/create", async (req: Request, res: Response) => {
    const company = await new createCompanyController(new CompanyRepository).create(req)

    res.status(company.statusCode).json(company.body)
})

companyRouter.post("/createPosition", async (req: Request, res: Response) => {
    const company_position = await new createCompanyPositionController(new CompanyRepository).createServicePosition(req)

    res.status(company_position.statusCode).json(company_position.body)
})

companyRouter.delete("/delete", async (req: Request, res: Response) => {
    const company = await new deleteCompanyController(new CompanyRepository).delete(req)

    res.status(company.statusCode).json(company.body)
})

companyRouter.get("/find", async (req: Request, res: Response) => {
    const company = await new findCompanyController(new CompanyRepository).find(req)

    res.status(company.statusCode).json(company.body)
})

export { companyRouter }