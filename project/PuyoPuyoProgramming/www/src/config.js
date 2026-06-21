class Config {
    static puyoImageWidth = 40; // ぷよ画像の幅
    static puyoImageHeight = 40; // ぷよ画像の高さ

    static stageCols = 6; // ステージの横の個数
    static stageRows = 12; // ステージの縦の個数
    static stageBackgroundColor = '#11213b'; // ステージの背景色

    // 初期状態のステージ
    static initialBoard = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    static puyoColorMax = 5;
    static fallingSpeed = 6;
    static erasePuyoCount = 4;
    static eraseAnimationFrames = 30;
    static zenkeshiDuration = 150;
    static playerFallingSpeed = 0.9;
    static playerLockDelayFrames = 20;
}