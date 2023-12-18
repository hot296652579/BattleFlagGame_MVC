/*
 * @Author: superJavan
 * @Date: 2023-12-13 15:57:12
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-16 16:31:56
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\GameApp.ts
 */

import { View, _decorator } from "cc";
import { ControllerMgr } from "./ControllerMgr"
import { Singleton } from "./Base/Singleton";
import { ViewMgr } from "./ViewMgr";

export class GameApp extends Singleton {
    static get Instance() {
        return super.getInstance<GameApp>();
    }

    public _ControllerMgr: ControllerMgr;
    public _ViewMgr: ViewMgr;

    Init(): void {
        this._ControllerMgr = new ControllerMgr();
        this._ViewMgr = new ViewMgr();
    }

    Update(dt: number) {
    }
}


