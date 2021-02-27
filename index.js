"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simpler {
    constructor(options) {
        console.log(`[message] - simpler.setup...🐧`);
        this.init(options);
    }
    // 初期化
    init(options) {
        // Body要素とpage-name属性を取得
        this._body = document.body;
        this._pageName = this._body.getAttribute("page-name");
        // pathMap用のオブジェクトを生成
        this.pathMap = new Object();
        // observationオプションがtrueの場合有効化
        if (options.observation) {
            console.log('[message] - starting observe.');
            // body要素の変更を監視
            const observer = new MutationObserver((mutations) => {
                // page-name属性が変更された場合のみ動作（このif文いらない気がするけど一応お守り）
                if (mutations[0].type === 'attributes') {
                    console.log('[message] - page-name属性の変更を検知しました、simplerを再起動します');
                    this._pageName = this._body.getAttribute("page-name");
                    this.start();
                }
            });
            // オブザーバの設定
            const config = {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ['page-name'] // page-name属性のみ検知
            };
            // body要素とオブザーバの設定を渡す
            observer.observe(this._body, config);
        }
    }
    // pageNameに応じた関数を格納
    createPathMap(map) {
        for (let i = 0; i < map.length; i++) {
            this.pathMap[map[i]] = "";
        }
        this.pathMap["common"] = "";
    }
    // DOM上のpageNameに該当する関数を動作させる
    start() {
        for (const key in this.pathMap) {
            if (key === this._pageName) {
                // 共通関数
                if (typeof this.pathMap["common"] === "function") {
                    console.log(`[message] - common.setup`);
                    this.pathMap["common"]();
                }
                // 格納された値が関数の場合のみ動作
                if (typeof this.pathMap[key] === "function") {
                    console.log(`[page] - ${key}.setup`);
                    this.pathMap[key]();
                }
                // 指定のpage-nameに該当したためループ離脱
                break;
            }
        }
        console.log('[message] - Setup is now complete!🎉');
    }
}
exports.default = Simpler;
