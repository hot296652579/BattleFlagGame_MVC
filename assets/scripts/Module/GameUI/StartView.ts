/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2023-12-18 20:37:25
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-19 22:17:39
 * @FilePath: /BattleFlagGame_MVC/assets/scripts/Module/GameUI/StartView.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { _decorator, Button, Component, Node } from 'cc';
import { BaseView } from '../../MVC/View/BaseView';
import { Defines } from '../../Common/Defines';
const { ccclass, property } = _decorator;

@ccclass('StartView')
export class StartView extends BaseView {

    onStart(): void {
        this.Find('startBtn').on(Button.EventType.CLICK, this.onClickStartBtn, this);
        this.Find('setBtn').on(Button.EventType.CLICK, this.onClickSetBtn, this);
    }

    onClickStartBtn() {

    }

    onClickSetBtn() {
        this.ApplyFunc(Defines.OpenSetView);
    }
}


