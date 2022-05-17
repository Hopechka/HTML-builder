// 1. Импорт всех требуемых модулей
const fs = require('fs');
const path = require('path');

// 2. Чтение содержимого папки secret-folder
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  (err, files) => {
    if (err) {
      console.log(new Error(`Не верная директория: ${err}`));
    }
    // 3. Получение данных о каждом объекте который содержит папка secret-folder
    for (let file of files) {
      fs.stat(
        path.join(__dirname, 'secret-folder', file),
        function (err, stats) {
          if (err) throw err;
          // 5. Проверка объекта на то, что он является файлом
          if (stats.isFile()) {
            let size = `${stats['size']}b`;
            if (stats['size'] > 1000) {
              size = `${stats['size'] / 1000}kb`;
            }
            // 6. Вывод данных о файле в консоль
            console.log(
              `${path.parse(file).name} - ${path
                .extname(file)
                .slice(1)} - ${size}`
            );
          }
        }
      );
    }
  },
  true
);
