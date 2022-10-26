const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

const outputPath = './temp/output.png';
let path = process.argv[2];

let width = Number(process.argv[3]);
let height = Number(process.argv[4]);

function resize(path, width,height) {
    sharp(path).resize({width: width, height: height}).toFile(outputPath,(error)=>{
        if(error){
            console.log(error);
        }
        else {
            console.log('Image resized successfully');
            compress(outputPath,"./compressed/")
        }
    });
}

function compress(path, outputPath){
    compress_images(path, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
    fs.unlink(path, function (err) {
        if(err){
            console.log(err);
        }
    });
}
);
}

resize(path, width,height);