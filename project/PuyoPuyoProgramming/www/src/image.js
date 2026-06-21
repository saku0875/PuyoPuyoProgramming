class GameImage {
    static puyoImageList = null; // puyoImageList = 読み込んだぷよ画像の要素たちを保管する配列
    static digitImageList = null;

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

        // スコアの数字画像を準備する
        GameImage.digitImageList = [];
        for (let i = 0; i < 10; i++) {
            const image = document.getElementById("font_" + i);
            image.removeAttribute('id');

            // 数字画像の高さをあらかじめそろえておく
            const width = image.width / image.height * Config.scoreHeight;
            image.width = width;
            image.height = Config.scoreHeight;

            GameImage.digitImageList[i] = image;
        }
    }

    // ぷよ画像を複製して返す
    static getPuyoImage(color) {
        const image = GameImage.puyoImageList[color - 1].cloneNode(true);
        return image;
    }

    // 数字画像を複製して返す
    static getDigitImage(digit) {
        const image = GameImage.digitImageList[digit].cloneNode(true);
        return image;
    }

    // 数字画像の横幅を返す
    static getDigitImageWidth() {
        return GameImage.digitImageList[0].width;
    }
}