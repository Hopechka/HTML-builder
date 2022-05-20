// 1. Импорт всех требуемых модулей
const path = require('path');
const fs = require('fs');

const stylesDest = path.join(__dirname, 'styles');
// 2. Чтение содержимого папки styles

fs.readdir(stylesDest, (err, files) => {
  if (err) throw err;
  let text = '';
  for (let file of files) {
    // 3. Проверка является ли объект файлом и имеет ли файл нужное расширение
    if (path.extname(file) === '.css') {
      // 4. Чтение файла стилей
      const input = fs.createReadStream(path.join(stylesDest, file), 'utf-8');
      const output = fs.createWriteStream(
        path.join(__dirname, 'project-dist', 'bundle.css')
      );
      // 4. Запись прочитанных данных и 5. Запись стилей в файл bundle.css
      input.on('data', (chunk) => output.write((text += `${chunk}\n`)));
      input.on('error', (error) => console.log('Error', error.message));
    }
  }
});
