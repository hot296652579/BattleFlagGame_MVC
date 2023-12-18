/*
 * @Author: superJavan
 * @Date: 2023-12-14 15:06:41
 * @LastEditors: superJavan
 * @LastEditTime: 2023-12-15 13:56:42
 * @Description: 泛型单例
 * @FilePath: \BattleFlagGameStude\assets\scripts\Base\Singleton.ts
 */
export class Singleton {
    private static _instance: any = null;

    public constructor() { }// 私有构造函数，防止外部直接实例化  

    public static getInstance<T>(): T {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
}