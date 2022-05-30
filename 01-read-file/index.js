// // 1. Импортировать необходимые для выполнения задания модули:
// const path = require('path');
// const fs = require('fs');

// // 2. Создать новый ReadStream из файла text.txt.
// const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
// // 3.1 Направить поток чтения в стандартный поток вывода.
// let data = '';

// stream.on('data', (chunk) => (data += chunk));
// stream.on('end', () => console.log(data));
// stream.on('error', (error) =>
//   console.log('Error', `Документ не найден (${error.message})`)
// );

// 3.2 Еще один вариант реализации(читает фаил целиком, если большой фаил это забъет оперативную память)
// fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// 3.3 Еще один вариант реализации(http://imnotgenius.com/)
// var stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

// stream.on('readable', function () {
//   var data = stream.read();
//   if (data != null) console.log(data);
// });

// stream.on('end', function () {
//   console.log('THE END');
// });
// stream.on('error', function (err) {
//   if (err.code == 'ENOENT') {
//     console.log('Файл не найден');
//   } else {
//     console.error(err);
//   }
// });

// 3.3 Вариант из лекции
const path = require('path');
const fs = require('fs');
const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile);
stream.pipe(process.stdout); // метод pipe соединяет chunks последовательно
