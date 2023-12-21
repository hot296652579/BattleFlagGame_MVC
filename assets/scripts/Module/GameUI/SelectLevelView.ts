/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2023-12-18 20:37:25
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-21 21:59:01
 * @FilePath: /BattleFlagGame_MVC/assets/scripts/Module/GameUI/SelectLevelView.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Button, Component, Node } from 'cc';
import { BaseView } from '../../MVC/View/BaseView';
import { GameApp } from '../../GameApp';
import { LoadingModel } from '../Loading/LoadingModel';
import { LoadingController } from '../Loading/LoadingController';
import { ControllerType } from '../../ControllerType';
import { Defines } from '../../Common/Defines';
const { ccclass, property } = _decorator;

@ccclass('SelectLevelView')
export class SelectLevelView extends BaseView {

    onStart(): void {
        this.Find('closeBtn').on(Button.EventType.CLICK, this.onClickCloseBtn, this);
    }

    onClickCloseBtn() {
        GameApp.Instance._ViewMgr.Close(this.ViewId);
        let loadingModel: LoadingModel = new LoadingModel(new LoadingController());
        loadingModel.SceneName = "Main";
        loadingModel.callback = (args: any) => {
            this.Controller.ApplyControllerFunc(ControllerType.GameUI, Defines.OpenStartView);
        }

        this.Controller.ApplyControllerFunc(ControllerType.Loading, Defines.OpenLoadingView, loadingModel);
    }
}


