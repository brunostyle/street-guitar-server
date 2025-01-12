import { validateJWT } from "../../middlewares";

export class DashboardValidate {
    public getStats = () => ([
        validateJWT
    ])
}