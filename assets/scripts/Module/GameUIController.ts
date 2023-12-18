/*
 * @Author: superJavan
 * @Date: 2023-12-16 16:33:41
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-18 10:01:46
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\GameUIController.ts
 */
import { GameApp } from "../GameApp";
import { BaseController } from "../MVC/Controller/BaseController";
import { ViewInfo } from "../ViewMgr";
import { ViewType } from "../ViewType";
import { Defines } from "../Common/Defines";
import { Game } from "cc";

export class GameUIController extends BaseController {

    constructor() {
        super();

        GameApp.Instance._ViewMgr.Register(ViewType.StartView, new ViewInfo(
            'StartView',
            GameApp.Instance._ViewMgr.canvasTf,
            this
        ))

        this.InitModuleEvent();
    }

    public override InitGlobalEvent(): void {

    }

    public override InitModuleEvent(): void {
        this.RegisterFunc(Defines.OpenStartView, this.openStartView);
    }

    private openStartView(...args: any[]) {
        GameApp.Instance._ViewMgr.Open(ViewType.StartView, args);
    }
}