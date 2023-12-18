/*
 * @Author: superJavan
 * @Date: 2023-12-13 16:00:14
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-16 11:23:29
 * @Description: 控制器基类
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\Controller\BaseController.ts
 */

import { ControllerType } from "../../ControllerType";
import { GameApp } from "../../GameApp";
import { BaseModel } from "../Model/BaseModel";
import { IBaseView } from "../View/IBaseView";

export class BaseController {
    private message: { [eventName: string]: ((...args: any[]) => void)[] };
    protected model: BaseModel;

    constructor() {
        this.message = {};
    }

    public Init() {

    }

    public OnLoadView(view: IBaseView) {

    }

    public OpenView(view: IBaseView) {
    }

    public CloseView(view: IBaseView) {
    }

    public Destroy() {
        this.RemoveMuduleEvent();
        this.RemoveGlobalEvent();
    }

    /**
     * @description: 注册本模块事件
     * @param {string} eventName
     * @param {function} callback
     * @return {*}
     */
    public RegisterFunc(eventName: string, callback: (...args: any[]) => void): void {
        if (this.message[eventName]) {
            this.message[eventName].push(callback);
        } else {
            this.message[eventName] = [callback];
        }
    }

    public UnRegister(eventName: string) {
        if (this.message[eventName]) {
            this.message[eventName] = null;
            delete this.message[eventName];
        }
    }

    /**
     * @description: 触发本模块事件
     * @param {string} eventName
     * @param {array} args
     * @return {*}
     */
    public ApplyFunc(eventName: string, ...args: any[]): void {
        let callbacks = this.message[eventName];
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
        else {
            console.error('触发本模块事件 error eventName:' + eventName);
        }
    }

    /**
     * @description: 跨模块触发事件 
     * @return {*}
     */
    public ApplyControllerFunc(type: ControllerType, eventName: string, ...args: any[]) {
        GameApp.Instance._ControllerMgr.ApplyFunc(Number(type), eventName, ...args);
    }

    public SetModel(model: BaseModel) {
        this.model = model;
    }

    public GetModel(): BaseModel | undefined {
        return this.model;
    }

    public GetModelInstance<T extends BaseModel>(): T | undefined {
        return this.model as T;
    }

    public GetControllerModel(controllerKey: number) {
        return GameApp.Instance._ControllerMgr.GetControllerModel(controllerKey);
    }

    //初始化模块事件
    public InitModuleEvent() {
    }

    public RemoveMuduleEvent() {
    }

    //初始化全局事件
    public InitGlobalEvent() {
    }

    public RemoveGlobalEvent() {
    }

}