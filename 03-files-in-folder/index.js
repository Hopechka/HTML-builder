// // 1. Импорт всех требуемых модулей
// const fs = require('fs');
// const path = require('path');
// const pathToFolder = path.join(__dirname, 'secret-folder');

// // 2. Чтение содержимого папки secret-folder
// fs.readdir(
//   pathToFolder,
//   (err, files) => {
//     if (err) {
//       console.log(new Error(`Не верная директория: ${err}`));
//     }
//     // 3. Получение данных о каждом объекте который содержит папка secret-folder
//     for (let file of files) {
//       fs.stat(path.join(pathToFolder, file), function (err, stats) {
//         if (err) throw err;
//         // 5. Проверка объекта на то, что он является файлом
//         if (stats.isFile()) {
//           let size = `${stats['size']}b`;
//           if (stats['size'] > 1024) {
//             size = `${stats['size'] / 1024}kb`;
//           }
//           // 6. Вывод данных о файле в консоль
//           console.log(
//             `${path.parse(file).name} - ${path
//               .extname(file)
//               .slice(1)} - ${size}`
//           );
//         }
//       });
//     }
//   },
//   true
// );
// в моем коде очень много callbacks, это похоже на callbacks hell,
// пример из лекции, как можно переделать в плоский код

const { readdir, stat } = require('fs/promises');
const path = require('path');

const getBasename = (pathToFile) => {
  return path.parse(pathToFile).name;
};

const getExtension = (pathToFile) => {
  const extension = path.extname(pathToFile);
  return extension.slice(1);
};

const getSize = (fileStats) => {
  return fileStats.size;
};

const readDirectory = async () => {
  const pathToFolder = path.join(__dirname, 'secret-folder');

  // trycatch конструкция помогает ловить ошибки
  try {
    // в const folderContent лежит Promise, работает конструкция async away
    const folderContent = await readdir(pathToFolder);
    folderContent.forEach(async (item) => {
      const pathToFile = path.join(pathToFolder, item);

      const itemStats = await stat(pathToFile);

      if (itemStats.isFile()) {
        const basename = getBasename(pathToFile);
        const extension = getExtension(pathToFile);
        const fileSize = getSize(itemStats);

        const output = `${basename} - ${extension} - ${fileSize}b`;
        console.log(output);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
};
readDirectory();
