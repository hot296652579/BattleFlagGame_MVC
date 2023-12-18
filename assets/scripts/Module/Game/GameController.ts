/*
 * @Author: superJavan
 * @Date: 2023-12-16 16:34:10
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-16 17:00:18
 * @Description: 游戏主控制器
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\Game\GameController.ts
 */
import { Defines } from "../../Common/Defines";
import { ControllerType } from "../../ControllerType";
import { BaseController } from "../../MVC/Controller/BaseController";

export class GameController extends BaseController {

    constructor() {
        super();

        this.InitModuleEvent();
        this.InitGlobalEvent();
    }

    public override Init() {
        this.ApplyControllerFunc(ControllerType.GameUI, Defines.OpenStartView);
    }
}