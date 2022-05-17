// 1.Импорт всех требуемых модулей.
const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

// 2.Создание потока записи в текстовый файл
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

// 3.Вывод в консоль приветственного сообщения
stdout.write('Hello my friend!\nPut your text here:\n');

// 4.Ожидание ввода текста пользователем, с дальнейшей проверкой ввода на наличие ключевого слова exit

stdin.on('data', (data) => {
  const dataStringified = data.toString();
  if (dataStringified.trim().toLowerCase() === 'exit') {
    process.exit();
  }
  output.write(data); // 5. Запись текста в файл
  // 6. Ожидание дальнейшего ввода
});

//7. Реализация прощального сообщения при остановке процесса
process.on('exit', () => stdout.write('\nBye! Have a nice day!\n'));
process.on('SIGINT', () => {
  process.exit();
});
