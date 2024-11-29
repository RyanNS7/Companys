import { companyRouter } from "./routes/companyRoutes";
import { employeeRouter } from "./routes/employeeRoutes";
import Express from "express";
import { groupRouter } from "./routes/groupRoutes";
import { taskRouter } from "./routes/taskRoutes";

const router = Express.Router()

router.use("/company", companyRouter)
router.use("/employee", employeeRouter)
router.use("/group", groupRouter)
router.use("/task", taskRouter)

export { router }