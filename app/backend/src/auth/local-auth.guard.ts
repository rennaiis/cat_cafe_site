import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard('local'){
    async canActivate(context: ExecutionContext){
        let res = await super.canActivate(context)
        res = Boolean(res)
        const req = context.switchToHttp().getRequest();
        await super.logIn(req);
        return res;
    }
}