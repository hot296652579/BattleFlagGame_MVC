/*
 * @Author: superJavan
 * @Date: 2023-12-21 13:58:46
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-21 16:12:53
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\Loading\LoadingController.ts
 */
import { director } from "cc";
import { Defines } from "../../Common/Defines";
import { GameApp } from "../../GameApp";
import { BaseController } from "../../MVC/Controller/BaseController";
import { ViewInfo } from "../../ViewMgr";
import { ViewType } from "../../ViewType";
import { LoadingModel } from "./LoadingModel";

export class LoadingController extends BaseController {
    constructor() {
        super();

        GameApp.Instance._ViewMgr.Register(ViewType.LoadingView, new ViewInfo(
            'LoadingView',
            GameApp.Instance._ViewMgr.canvasTf,
            this
        ))

        this.InitModuleEvent();
    }

    public override InitModuleEvent(): void {
        this.RegisterFunc(Defines.OpenLoadingView, this.loadSceneCallBack);
    }

    //加载场景ui回掉
    private loadSceneCallBack(...args: any[]) {
        let loadingModel: LoadingModel = args[0] as LoadingModel;
        let controller = loadingModel.baseController;
        controller.SetModel(loadingModel);

        GameApp.Instance._ViewMgr.Open(ViewType.LoadingView);
        //加载场景
        let SceneName = loadingModel.SceneName.toString();
        director.preloadScene(SceneName, (completedCount: number, totalCount: number) => {
            console.log('completedCount:' + completedCount);
        }, () => {
            director.loadScene(SceneName, this.onLoadedCallBack.bind(this));
        })
    }

    private onLoadedCallBack() {
        let model: LoadingModel = this.GetModelInstance<LoadingModel>();
        if (model.callback) {
            let SceneName = model.SceneName.toString();
            model.callback(SceneName);
        }
    }
}