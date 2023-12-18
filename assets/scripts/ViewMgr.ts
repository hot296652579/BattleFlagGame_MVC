/*
 * @Author: superJavan
 * @Date: 2023-12-15 11:53:47
 * @LastEditors: super_javan 296652579@qq.com
 * @LastEditTime: 2023-12-18 20:53:33
 * @Description: 
 * @FilePath: \BattleFlagGameStude\assets\scripts\ViewMgr.ts
 */
import { Prefab, UITransform, View, assetManager, Node, find, instantiate, resources, Vec3 } from "cc";
import { IBaseView } from "./MVC/View/IBaseView";
import { BaseController } from "./MVC/Controller/BaseController";
import { ViewType } from "./ViewType";

export class ViewInfo {
    public PrefabName: string;
    public ParentTf: Node | undefined;
    public controller: BaseController;
    constructor(PrefabName: string, ParentTf: Node, controller: BaseController) {
        this.PrefabName = PrefabName;
        this.ParentTf = ParentTf;
        this.controller = controller;
    }

}

export class ViewMgr {

    public canvasTf: Node | undefined;
    public worldCanvasTf: Node | undefined;

    private _opens: Map<string, IBaseView>;
    private _viewCaches: Map<string, IBaseView>;
    private _views: Map<string, ViewInfo>;

    constructor() {
        this.canvasTf = find("Canvas/Root");
        this.worldCanvasTf = find("Canvas/WorldRoot");

        this._opens = new Map<string, IBaseView>();
        this._viewCaches = new Map<string, IBaseView>();
        this._views = new Map<string, ViewInfo>();
    }

    //注册视图
    public Register(type: ViewType, viewInfo: ViewInfo) {
        this._Register(type, viewInfo);
    }

    private _Register(key: ViewType, viewInfo: ViewInfo) {
        if (!this._views.has(key)) {
            this._views.set(key, viewInfo);
        }
    }

    //移除面板信息
    public UnRegister(key: ViewType) {
        if (this._views.has(key)) {
            this._views.delete(key);
        }
    }

    //移除面板
    public RemoveView(key: ViewType) {
        this._views.delete(key);
        this._viewCaches.delete(key);
        this._opens.delete(key);
    }

    //移除控制器中的面板视图
    public RemoveViewByController(ctl: BaseController) {
        for (const key of this._views.keys()) {
            if (this._views.has(key)) {
                if (this._views.get(key)) {
                    let viewInfo = this._views.get(key);
                    if (viewInfo.controller === ctl)
                        this.RemoveView(key as ViewType);
                }
            }
        }
    }

    public Open(type: ViewType, ...args: any[]) {
        this._Open(type, args);
    }

    //动态加载resources资源 添加到资源加载管理器 DOTO
    private resourceLoad(path: string) {
        return new Promise<any>((resolve, reject) => {
            resources.load(path, Prefab, (err, prefab) => {
                const newNode = instantiate(prefab);
                resolve(newNode);
            });
        })
    }

    private async _Open(key: ViewType, ...args: any[]) {
        let view: any = this.GetView(key);
        const viewInfo: ViewInfo = this._views.get(key);
        if (!view) {
            //不存在的视图 进行资源加载
            const type: string = key.toString();
            let prefabNode: Node = await this.resourceLoad(`prefabs/${viewInfo?.PrefabName}`);
            let ParentTf: Node = viewInfo.ParentTf;
            prefabNode.parent = ParentTf;
            view = prefabNode.addComponent(type);
            view.ViewId = key;
            view.controller = viewInfo?.controller;
            //添加到视图缓存
            this._viewCaches.set(key, view);
            viewInfo?.controller.OnLoadView(view);
        }

        if (!this._opens.has(key))
            return

        this._opens.set(key, view);
        //已经初始化
        if (view.IsInit()) {
            view.SetVisible(true);
            view.Open(args);
            viewInfo.controller.OpenView(view);
        } else {
            view.InitUI();
            view.InitData();
            view.Open(args);
            viewInfo.controller.OpenView(view);
        }
    }

    public GetView(key: ViewType): IBaseView {
        if (this._opens.get(key))
            return this._opens.get(key)

        if (this._viewCaches.get(key))
            return this._viewCaches.get(key)

        return null;
    }

    public IsOpen(key: ViewType): boolean {
        return this._opens.has(key);
    }

    public close(key: ViewType, ...args: any[]): void {
        //没有打开
        if (!this.IsOpen(key)) {
            return;
        }

        const view = this.GetView(key);
        if (view) {
            this._opens.delete(key);
            view.Close(args);
            this._views.get(key)?.controller.CloseView(view);
        }
    }
}