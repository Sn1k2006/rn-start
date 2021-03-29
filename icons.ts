import jimp from 'jimp';
import path from 'path';

const sizes = {
  'mipmap-hdpi': 72,
  'mipmap-mdpi': 48,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};
const sizesIos = [40, 58, 60, 80, 87, 120, 180, 1024, 512];

const androidIconsPath = path.resolve(
  path.join('android', 'app', 'src', 'main', 'res'),
);
const iosIconsPath = path.resolve(path.join('ios', 'icons'));

const file = path.resolve(path.join('src', 'icon', '1536.png'));

jimp
  .read(file)
  .then(() => {
    Object.entries(sizes).forEach(async ([folder, size]: [string, number]) => {
      const image = await jimp.read(file);
      image.resize(size, size);
      image.write(`${androidIconsPath}/${folder}/ic_launcher.png`);
      image.circle();
      image.write(`${androidIconsPath}/${folder}/ic_launcher_round.png`);
    });
    sizesIos.forEach(async (size: number) => {
      const image = await jimp.read(file);
      image.resize(size, size);
      image.write(`${iosIconsPath}/size_${size}.png`);
    });

    console.log('SUCCESS: ICONS GENERATED');
  })
  .catch(() => {
    console.log('ERROR: ENTRY FILE NOT FOUND');
  });
