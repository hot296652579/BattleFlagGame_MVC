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
        this.SetModel(loadingModel);

        GameApp.Instance._ViewMgr.Open(ViewType.LoadingView);
        //加载场景 DOTO
    }

    private onLoadedCallBack() {

    }
}