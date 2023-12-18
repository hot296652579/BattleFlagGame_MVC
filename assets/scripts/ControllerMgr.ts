/*
 * @Author: superJavan
 * @Date: 2023-12-14 14:03:11
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-16 17:50:15
 * @Description: 控制管理器
 * @FilePath: \BattleFlagGameStude\assets\scripts\ControllerMgr.ts
 */

import { ControllerType } from "./ControllerType";
import { BaseController } from "./MVC/Controller/BaseController";
import { BaseModel } from "./MVC/Model/BaseModel";

export class ControllerMgr {
    private _modules: Map<number, BaseController>;

    constructor() {
        this._modules = new Map<number, BaseController>();
    }

    public Register(type: ControllerType, ctl: BaseController) {
        this._Register(Number(type), ctl);
    }

    private _Register(controllerKey: number, ctl: BaseController) {
        if (!this._modules.has(controllerKey)) {
            this._modules.set(controllerKey, ctl);
        }
    }

    public UnRegister(controllerKey: number) {
        if (this._modules.get(controllerKey)) {
            this._modules.delete(controllerKey);
        }
    }

    public InitAllModules() {
        for (const [key, value] of this._modules) {
            if (!value)
                return

            value.Init();
        }
    }

    public Clear() {
        this._modules.clear();
    }

    public ClearAllModule() {
        for (const key of this._modules.keys()) {
            let controller = this._modules.get(key);
            if (controller)
                controller.Destroy();

            this._modules.delete(key);
        }
        this._modules.clear();
    }

    /**
     * @description: 跨控制器触发事件
     * @return {*}
     */
    public ApplyFunc(controllerKey: number, eventName: string, ...args: any[]) {
        if (this._modules.has(controllerKey)) {
            let controller = this._modules.get(controllerKey);
            controller.ApplyFunc(eventName, ...args);
        }
    }

    /**
     * @description: 获取控制器的Model数据
     * @param {number} controllerKey
     * @return {BaseModel}
     */
    public GetControllerModel(controllerKey: number): BaseModel | undefined {
        if (this._modules.get(controllerKey)) {
            return this._modules[controllerKey].GetModel();
        }
        return null;
    }
}