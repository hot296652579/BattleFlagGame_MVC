/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2023-12-18 20:37:25
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-21 16:07:55
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\GameUI\StartView.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Button, Component, Node } from 'cc';
import { BaseView } from '../../MVC/View/BaseView';
import { Defines } from '../../Common/Defines';
import { GameApp } from '../../GameApp';
import { LoadingModel } from '../Loading/LoadingModel';
import { LoadingController } from '../Loading/LoadingController';
import { ControllerType } from '../../ControllerType';
const { ccclass, property } = _decorator;

@ccclass('StartView')
export class StartView extends BaseView {

    InitUI(): void {
        this.Find('startBtn').on(Button.EventType.CLICK, this.onClickStartBtn, this);
        this.Find('setBtn').on(Button.EventType.CLICK, this.onClickSetBtn, this);
    }

    onClickStartBtn() {
        GameApp.Instance._ViewMgr.Close(this.ViewId);
        let loadingModel: LoadingModel = new LoadingModel(new LoadingController());
        loadingModel.SceneName = "Map";
        loadingModel.callback = (args: any) => {
            console.log('startView界面 callback()执行 args:', args);
        }

        this.Controller.ApplyControllerFunc(ControllerType.Loading, Defines.OpenLoadingView, loadingModel);
    }

    onClickSetBtn() {
        this.ApplyFunc(Defines.OpenSetView);
    }
}


