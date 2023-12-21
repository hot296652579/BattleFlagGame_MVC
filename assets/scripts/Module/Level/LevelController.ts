/*
 * @Author: superJavan
 * @Date: 2023-12-21 13:58:46
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-21 21:53:01
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\Loading\LoadingController.ts
 */
import { AssetManager, SceneAsset, View, director } from "cc";
import { Defines } from "../../Common/Defines";
import { GameApp } from "../../GameApp";
import { BaseController } from "../../MVC/Controller/BaseController";
import { ViewInfo } from "../../ViewMgr";
import { ViewType } from "../../ViewType";

export class LevelController extends BaseController {
    constructor() {
        super();

        GameApp.Instance._ViewMgr.Register(ViewType.SelectLevelView, new ViewInfo(
            'SelectLevelView',
            GameApp.Instance._ViewMgr.canvasTf,
            this
        ))

        this.InitModuleEvent();
    }

    public override InitModuleEvent(): void {
        this.RegisterFunc(Defines.OpenSelectLevelView, this.onOpenSelectLevelView);
    }

    private onOpenSelectLevelView(...args: any[]) {
        GameApp.Instance._ViewMgr.Open(ViewType.SelectLevelView, args);
    }
}