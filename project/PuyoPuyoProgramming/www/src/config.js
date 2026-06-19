class Config {
    static puyoImageWidth = 40; // ぷよ画像の幅
    static puyoImageHeight = 40; // ぷよ画像の高さ

    static stageCols = 6; // ステージの横の個数
    static stageRows = 12; // ステージの縦の個数
    static stageBackgroundColor = '#11213b'; // ステージの背景色

    // 初期状態のステージ
    static initialBoard = [
        [0, 1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5, 0],
        [2, 3, 4, 5, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 2, 0],
        [0, 4, 5, 5, 2, 0],
        [0, 4, 5, 5, 2, 0],
        [0, 4, 3, 3, 3, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 2, 2],
        [0, 0, 2, 2, 0, 0],
        [4, 4, 0, 0, 5, 5],
    ];

    static puyoColorMax = 5;
    static fallingSpeed = 6;
    static erasePuyoCount = 4;
    static eraseAnimationFrames = 30;
}