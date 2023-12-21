/*
 * @Author: superJavan
 * @Date: 2023-12-13 15:57:28
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-21 16:04:24
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\GameScene.ts
 */
import { _decorator, Component, Node } from 'cc';
import { GameApp } from './GameApp';
import { ControllerType } from './ControllerType';
import { GameUIController } from './Module/GameUIController';
import { GameController } from './Module/Game/GameController';
import { LoadingController } from './Module/Loading/LoadingController';
const { ccclass, property } = _decorator;

@ccclass('GameScene')
export class GameScene extends Component {
    start() {
        GameApp.Instance.Init();

        this.RegisterModule();//注册游戏中的控制器
        this.InitModule();
    }

    private RegisterModule() {
        GameApp.Instance._ControllerMgr.Register(ControllerType.GameUI, new GameUIController());
        GameApp.Instance._ControllerMgr.Register(ControllerType.Game, new GameController());
        GameApp.Instance._ControllerMgr.Register(ControllerType.Loading, new LoadingController());
    }

    private InitModule() {
        GameApp.Instance._ControllerMgr.InitAllModules();
    }

    update(deltaTime: number) {
        GameApp.Instance.Update(deltaTime);
    }
}


