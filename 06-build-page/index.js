const path = require('path');
const fs = require('fs');

const projectFolderDist = path.join(__dirname, 'project-dist');

fs.promises.mkdir(projectFolderDist, { recursive: true });

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  let indexHtml = data;
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    if (err) throw err;
    for (let file of files) {
      fs.readFile(
        path.join(__dirname, 'components', file),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          let fileName = path.parse(file).name;
          let re = `{{${fileName}}}`;
          let dataChange = data;
          indexHtml = indexHtml.replace(re, dataChange);
          fs.writeFile(
            path.join(projectFolderDist, 'index.html'),
            indexHtml,
            (err) => {
              if (err) throw err;
            }
          );
        }
      );
    }
  });
});

// 6. Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
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
        path.join(projectFolderDist, 'style.css')
      );
      // 4. Запись прочитанных данных и 5. Запись стилей в файл bundle.css
      input.on('data', (chunk) => output.write((text += `${chunk}\n`)));
      input.on('error', (error) => console.log('Error', error.message));
    }
  }
});

// 7. Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist

function copyFiles(name = 'assets') {
  let dest;
  let src;
  if (name === 'assets') {
    dest = path.join(projectFolderDist, name);
    src = path.join(__dirname);
  } else {
    dest = path.join(projectFolderDist, 'assets', name);
    src = path.join(__dirname, 'assets');
  }
  fs.promises.mkdir(dest, { recursive: true });
  try {
    fs.readdir(path.join(src, name), (err, files) => {
      if (err) throw err;
      for (let file of files) {
        fs.stat(path.join(src, name, file), function (err, stats) {
          if (err) throw err;

          // 5. Проверка объекта на то, что он является файлом
          if (stats.isFile()) {
            fs.promises.copyFile(
              path.join(src, name, file),
              path.join(dest, file)
            );
          } else {
            const folderName = path.parse(file).name;
            copyFiles(folderName);
          }
        });
      }
      fileDelete(files, dest);
    });
  } catch (err) {
    console.log(err);
  }
}
copyFiles();

function fileDelete(files, dest) {
  try {
    fs.readdir(path.join(dest), (err, filesCopy) => {
      if (err) throw err;
      filesCopy.forEach((i) => {
        fs.stat(path.join(dest, i), function (err, stats) {
          if (err) throw err;

          if (files.indexOf(i) === -1) {
            if (stats.isFile()) {
              fs.unlink(path.join(dest, i), (err) => {
                if (err) throw err;
              });
            } else {
              fs.rmdir(path.join(dest, i), (err) => {
                if (err) throw err;
              });
            }
          }
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}
