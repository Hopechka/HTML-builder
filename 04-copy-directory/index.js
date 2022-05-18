// 1. Импорт всех требуемых модулей
const path = require('path');
const fs = require('fs');

// 2. Создание папки files-copy в случае если она ещё не существует
// { recursive: true } - помогает избежать ошибок, в случаях когда директория уже создана
fs.promises.mkdir(path.join(__dirname, 'files-copy'), {
  recursive: true,
});
const dest = path.join(__dirname, 'files-copy');
console.log(dest);

// 3. Чтение содержимого папки files
try {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;
    for (let file of files) {
      // 4. Копирование файлов из папки files в папку files-copy
      fs.promises.copyFile(
        path.join(__dirname, 'files', file),
        path.join(dest, file)
      );
    }
  });
} catch (err) {
  console.log(err);
}
