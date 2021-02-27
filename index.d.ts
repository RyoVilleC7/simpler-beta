interface options {
    observation?: boolean;
}
export default class Simpler {
    private _body;
    private _pageName;
    pathMap: any;
    constructor(options: options);
    private init;
    createPathMap(map: string[]): void;
    start(): void;
}
export {};
