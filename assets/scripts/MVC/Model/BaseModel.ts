/*
 * @Author: superJavan
 * @Date: 2023-12-13 16:00:26
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-21 16:08:34
 * @Description: 数据基类
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\Model\BaseModel.ts
 */
import { BaseController } from "../Controller/BaseController";

export class BaseModel {
    public baseController: BaseController;

    constructor(ctl: BaseController) {
        this.baseController = ctl;
    }
}