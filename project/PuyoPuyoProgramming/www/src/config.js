class Config {
    static puyoImageWidth = 40; // ぷよ画像の幅
    static puyoImageHeight = 40; // ぷよ画像の高さ

    static stageCols = 6; // ステージの横の個数
    static stageRows = 12; // ステージの縦の個数
    static stageBackgroundColor = '#11213b'; // ステージの背景色
    static nextBackgroundColor = '#1176f173';
    static scoreBackgroundColor = '#24c0bb'

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
    static playerDownSpeed = 10;
    static playerMoveFrames = 10; //左右移動に消費するフレーム数
    static playerRotateFrames = 10;
    static scoreHeight = 33
    static comboBonusTable = [0, 0, 8, 16, 32, 64, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672];
    static pieceBonusTable = [0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10];
    static colorBonusTable = [0, 0, 3, 6, 12, 24];
    static zenkeshiBonus = 3600;
}