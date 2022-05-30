// // 1. Импорт всех требуемых модулей
// const path = require('path');
// const fs = require('fs');

// // 2. Создание папки files-copy в случае если она ещё не существует
// // { recursive: true } - помогает избежать ошибок, в случаях когда директория уже создана
// const dest = path.join(__dirname, 'files-copy');
// fs.promises.mkdir(dest, { recursive: true });

// // 3. Чтение содержимого папки files
// try {
//   fs.readdir(path.join(__dirname, 'files'), (err, files) => {
//     if (err) throw err;
//     for (let file of files) {
//       // 4. Копирование файлов из папки files в папку files-copy
//       fs.promises.copyFile(
//         path.join(__dirname, 'files', file),
//         path.join(dest, file)
//       );
//     }
//     fileDeletion(files);
//   });
// } catch (err) {
//   console.log(err);
// }

// // Проверяю нужно ли удалить файл из скопированной папки,
// // если его удалили из основной
// function fileDeletion(files) {
//   try {
//     fs.readdir(path.join(dest), (err, filesCopy) => {
//       if (err) throw err;

//       filesCopy.forEach((i) => {
//         if (files.indexOf(i) === -1) {
//           fs.unlink(path.join(dest, i), (err) => {
//             if (err) throw err;
//           });
//         }
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// в моем коде использованы и callbacks и Promises, это не корректно, предпочтительно что-то одно(лучше Promises)
// для записи можно использовать:  createReadStream, createWriteStream и
// { pipeline } = require('stream/promises'); т.к. при большом потоке данных,  удобнее для большого кол-ва потоков
// copyFile тоже ОК, т.к. он тоже записывает частями
// пример из лекции ((( нет такого)))

// Пример с promises

const path = require('path');
const { rm, mkdir, readdir, copyFile } = require('fs/promises');

const dirPathIn = path.join(__dirname, 'files');
const dirPathOut = path.join(__dirname, 'files-copy');

(async () => {
  await rm(dirPathOut, { recursive: true, force: true });
  await mkdir(dirPathOut);
  const files = await readdir(dirPathIn, { withFileTypes: true });
  files
    .filter((file) => file.isFile())
    .forEach(async (file) => {
      await copyFile(
        path.join(dirPathIn, file.name),
        path.join(dirPathOut, file.name)
      );
    });
})();
