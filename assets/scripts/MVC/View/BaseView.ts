/*
 * @Author: superJavan
 * @Date: 2023-12-13 17:10:28
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-19 22:19:23
 * @Description:视图基类
 * @FilePath: \BattleFlagGameStude\assets\scripts\MVC\View\BaseView.ts
 */
import { IBaseView } from "./IBaseView";
import { BaseController } from "../Controller/BaseController";
import { _decorator, Component, Node, Canvas } from 'cc';
import { ViewType } from "../../ViewType";
const { ccclass, property } = _decorator;

@ccclass('BaseView')
export class BaseView extends Component implements IBaseView {
    @property
    Controller: BaseController = null!;

    @property
    ViewId: ViewType = null!;

    protected mCachesGos: Map<string, Node> = new Map<string, Node>(); // Cache objects map
    private _isInit: boolean = false;

    start(): void {
        this.onStart();
    }

    protected onStart() {

    }

    public ApplyControllerFunc(controllerKey: number, eventName: string, ...args: any[]): void {
        if (this.Controller) {
            this.Controller.ApplyControllerFunc(controllerKey, eventName, args);
        }
    }

    IsInit(): boolean {
        return this._isInit;
    }
    IsShow(): boolean {
        return this.node.active
    }

    InitData() {
        this._isInit = true;
        // Initialization code here
    }

    public Close(...args: any[]): void {
        this.SetVisible(false);
    }

    public DestroyView(): void {
        this.Controller = null;
        this.node.destroy();
    }

    public InitUI(): void {
        // UI initialization code here
    }
    public IsOpen(): boolean {
        return this.node.active;
    }

    public Open(...args: any[]): void {
        // Open logic here
    }

    public SetVisible(value: boolean): void {
        this.node.active = value;
    }

    /**
     * @description: 触发本视图控制器事件
     * @param {string} eventName
     * @param {function} args
     * @return
     */
    public ApplyFunc(eventName: string, ...args: any[]): void {
        if (this.Controller) {
            this.Controller.ApplyFunc(eventName, args);
        }
    }

    public Find(res: string): Node {
        if (this.mCachesGos.has(res)) {
            return this.mCachesGos.get(res);
        }

        const node = this.node.getChildByPath(res);
        if (node) {
            this.mCachesGos.set(res, node);
            return node;
        }

        return null;
    }

    public FindComponent<T extends Component>(res: string, type: { new(): T }): T {
        const node = this.Find(res);
        return node ? node.getComponent(type) : null;
    }


}