/*
 * @Author: superJavan
 * @Date: 2023-12-13 16:00:33
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-18 16:59:05
 * @Description: 视图接口
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\View\IBaseView.ts
 */
import { BaseController } from "../Controller/BaseController";

export interface IBaseView {
    IsInit(): boolean;
    IsShow(): boolean;
    onInit();
    InitData();
    Open(...args: any[]);
    Close(...args: any[]);
    DestroyView();
    ApplyFunc(eventName: string, ...args: any[]);//触发本模块事件
    ApplyControllerFunc(controllerKey: number, eventName: string, ...args: any[]);//触发其他控制器模块事件
    SetVisible(value: boolean);

    ViewId?: number;
    BaseController?: BaseController;
}