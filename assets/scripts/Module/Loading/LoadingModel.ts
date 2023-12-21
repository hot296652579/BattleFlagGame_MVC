/*
 * @Author: super_javan 296652579@qq.com
 * @Date: 2023-12-20 22:22:19
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-21 15:29:58
 * @FilePath: \BattleFlagGameStude\assets\scripts\Module\Loading\LoadingModel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BaseController } from "../../MVC/Controller/BaseController";
import { BaseModel } from "../../MVC/Model/BaseModel";

export class LoadingModel extends BaseModel {

    public SceneName: String = null!;
    constructor(ctl: BaseController) {
        super(ctl);
    }

    public Init() {

    }

    //类似一个c# delegate委托方法
    public callback: (...args: any[]) => void = () => { };
}