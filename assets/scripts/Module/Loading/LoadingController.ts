/*
 * @Author: superJavan
 * @Date: 2023-12-21 13:58:46
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-21 22:15:24
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\Loading\LoadingController.ts
 */
import { AssetManager, SceneAsset, director } from "cc";
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
        const loadingModel: LoadingModel = args[0] as LoadingModel;
        let controller = loadingModel.baseController
        controller.SetModel(loadingModel);

        GameApp.Instance._ViewMgr.Open(ViewType.LoadingView);

        director.preloadScene(
            loadingModel.SceneName.toString(),
            (completedCount: number, totalCount: number, item: AssetManager.RequestItem) => {
                // You can handle progress updates if needed
            },
            (error: Error, asset: SceneAsset) => {
                if (!error) {
                    //DOTO 因为注册时候没有上下文 所以无this 后期注册改成添加上下文
                    GameApp.Instance._ViewMgr.Close(ViewType.LoadingView);
                    controller.GetModelInstance<LoadingModel>().callback?.();
                } else {
                    console.error("Scene preload error:", error);
                }
            }
        );
    }
}