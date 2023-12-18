/*
 * @Author: superJavan
 * @Date: 2023-12-13 16:00:26
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-15 16:33:35
 * @Description: 数据基类
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\Model\BaseModel.ts
 */
import { BaseController } from "../Controller/BaseController";

export class BaseModel {
    private baseController: BaseController;

    constructor(ctl: BaseController) {
        this.baseController = ctl;
    }
}