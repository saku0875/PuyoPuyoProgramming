class GameImage {
    static puyoImageList = null; // puyoImageList = 読み込んだぷよ画像の要素たちを保管する配列

    static initialize() {
        // ぷよ画像を準備する
        GameImage.puyoImageList = []; // 空の配列を用意
        for (let i = 0; i < Config.puyoColorMax; i++) {
            const image = document.getElementById("puyo_" + (i + 1));
            image.removeAttribute('id'); // id属性を排除
            image.width = Config.puyoImageWidth;
            image.height = Config.puyoImageHeight;
            GameImage.puyoImageList[i] = image;
        }
    }

    // ぷよ画像を複製して返す
    static getPuyoImage(color) {
        const image = GameImage.puyoImageList[color - 1].cloneNode(true);
        return image;
    }
}