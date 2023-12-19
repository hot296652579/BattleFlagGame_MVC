/*
 * @Author: superJavan
 * @Date: 2023-12-13 16:00:33
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-19 22:18:56
 * @Description: 视图接口
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\View\IBaseView.ts
 */
import { ViewType } from "../../ViewType";
import { BaseController } from "../Controller/BaseController";

export interface IBaseView {
    IsInit(): boolean;
    IsShow(): boolean;
    InitUI();
    InitData();
    Open(...args: any[]);
    Close(...args: any[]);
    DestroyView();
    ApplyFunc(eventName: string, ...args: any[]);//触发本模块事件
    ApplyControllerFunc(controllerKey: number, eventName: string, ...args: any[]);//触发其他控制器模块事件
    SetVisible(value: boolean);

    ViewId: ViewType;
    Controller: BaseController;
}