from colorama import Fore
from random import randint

class BoardException(Exception): # общий класс, включающий в себя все исключения
    pass

class BoardOutException(BoardException):
    def __str__(self):
        return "Вы пытаетесь выстрелить за доску!"

class BoardUsedException(BoardException):
    def __str__(self):
        return "Вы уже стреляли в эту клетку"

class BoardWrongShipException(BoardException): # Для нормального размещения кораблей
    pass

class Dot:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # __eq__() – для равенства ==
    def __eq__(self, other):# метод для сравнения двух объектов
        return self.x == other.x and self.y == other.y

    def __str__(self): # отвечает за вывод точек в консоль
        return f"Dot({self.x}, {self.y})"

class Ship:
    def __init__(self, bow, l, o):
        self.bow = bow # координата носа корабля
        self.l = l # длина корабля
        self.o = o # ориентация корабля
        self.lives = l

    @property
    def dots(self):
        ship_dots = [] # Здесь хранятся точки всего корабля
        for i in range(self.l):
            cur_x = self.bow.x
            cur_y = self.bow.y

            if self.o == 0: # Вертикальная ориентация корабля
                cur_x += i

            elif self.o == 1: # Горизонатльная ориентация корабля
                cur_y += i

            ship_dots.append(Dot(cur_x, cur_y))

        return ship_dots

    def shooten(self, shot):
        return shot in self.dots


class Board:
    def __init__(self, hid=False, size=6):
        self.size = size # размер доски
        self.hid = hid # показывать/не показывать поле

        self.count = 0 # число пораженных кораблей

        self.field = [["O"] * size for _ in range(size)] # создает сетку поля, в котором хранится текущее состояние доски

        self.busy = [] # занятые точки (корабли или куда уже стреляли)
        self.ships = [] # список кораблей доски

    def __str__(self): # __str__ - метод для печатания доски
        res = "" # сюда записана вся доска
        res += "  | 1 | 2 | 3 | 4 | 5 | 6 |"
        for i, row in enumerate(self.field):
            res += f"\n{i + 1} | " + " | ".join(row) + " |"

        if self.hid:
            res = res.replace("■", "O")
        return res

    def out(self, d): # функция, проверяющая выход координат за границу доски
        return not ((0 <= d.x < self.size) and (0 <= d.y < self.size))

    def contour(self, ship, verb=False): # добавление контура корабля
        near = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1), (0, 0), (0, 1),
            (1, -1), (1, 0), (1, 1)
        ]
        for d in ship.dots:
            for dx, dy in near:
                cur = Dot(d.x + dx, d.y + dy)
                # self.field[cur.x][cur.y] = "+" # для проверки контура
                if not (self.out(cur)) and cur not in self.busy:
                    if verb:
                        self.field[cur.x][cur.y] = "."
                    self.busy.append(cur)

    def add_ship(self, ship): # добавление корабля на поле
        for d in ship.dots:
            if self.out(d) or d in self.busy:
                raise BoardWrongShipException()
        for d in ship.dots:
            self.field[d.x][d.y] = "■"
            self.busy.append(d)

        self.ships.append(ship)
        self.contour(ship)

    # стрельба по доске
    def shot(self, d):
        if self.out(d):
            raise BoardOutException()

        if d in self.busy:
            raise BoardUsedException()

        self.busy.append(d)

        for ship in self.ships:
            if ship.shooten(d):
                ship.lives -= 1
                self.field[d.x][d.y] = "X"
                if ship.lives == 0:
                    self.count += 1
                    self.contour(ship, verb=True)
                    print("Корабль уничтожен!")
                    return False
                else:
                    print("Корабль ранен!")
                    return True

        self.field[d.x][d.y] = "."
        print("Мимо!")
        return False

    def begin(self): # очищаем список для след кораблей
        self.busy = []

    def defeat(self):
        return self.count == len(self.ships)

class Player:
    def __init__(self, board, enemy):
        self.board = board
        self.enemy = enemy

    def ask(self):
        raise NotImplementedError()

    def move(self):
        while True:
            try:
                target = self.ask() # спрашивает коорд для выстрела у польз
                repeat = self.enemy.shot(target)
                return repeat # если выстрел удачный
            except BoardException as e: # если выстрел не удачный
                print(e)


class AI(Player):
    def ask(self):
        d = Dot(randint(0, 5), randint(0, 5))
        print(f"Ход компьютера: {d.x + 1} {d.y + 1}")
        return d


class User(Player):
    def ask(self):
        while True:
            cords = input("Ваш ход: ").split()

            if len(cords) != 2:
                print(" Введите 2 координаты! ")
                continue

            x, y = cords

            if not (x.isdigit()) or not (y.isdigit()):
                print(" Введите числа! ")
                continue

            x, y = int(x), int(y)

            return Dot(x - 1, y - 1)


class Game:

    def __init__(self, size=6): # конструктор
        self.lens = [3, 2, 2, 1, 1, 1, 1]  # длины кораблей
        self.size = size
        pl = self.random_board()
        co = self.random_board()
        co.hid = True

        self.ai = AI(co, pl)
        self.us = User(pl, co)

    def try_board(self): # пытаемся расставить корабли на доску
        board = Board(size=self.size) # создаем доску
        attempts = 0
        for l in self.lens:
            while True:
                attempts += 1
                if attempts > 2000:
                    return None
                ship = Ship(Dot(randint(0, self.size), randint(0, self.size)), l, randint(0, 1))
                try:
                    board.add_ship(ship)
                    break
                except BoardWrongShipException:
                    pass

        board.begin() # очистка busy
        return board

    def random_board(self): # гарантированное создание доски
        board = None
        while board is None:
            board = self.try_board()
        return board

    def greet(self):
        print(Fore.BLUE + "-------------------")
        print("  Приветсвуем вас  ")
        print("      в игре       ")
        print("    морской бой    ")
        print("-------------------")
        print(" формат ввода: x y ")
        print(" x - номер строки  ")
        print(" y - номер столбца ")

    def print_boards(self):
        print("-" * 20)
        print(Fore.GREEN + "Доска пользователя:")
        print(self.us.board)
        print("-" * 20)
        print("Доска компьютера:")
        print(self.ai.board)
        print("-" * 20)

    def loop(self): # игровой цикл
        num = 0 # номер хода
        while True:
            self.print_boards()
            if num % 2 == 0:
                print("Ходит пользователь!")
                repeat = self.us.move()
            else:
                print("Ходит компьютер!")
                repeat = self.ai.move()
            if repeat:
                num -= 1

            if self.ai.board.defeat():
                self.print_boards()
                print("-" * 20)
                print(Fore.RED + "Пользователь выиграл!")
                break

            if self.us.board.defeat():
                self.print_boards()
                print("-" * 20)
                print(Fore.RED + "Компьютер выиграл!")
                break
            num += 1

    def start(self):
        self.greet()
        self.loop()

g = Game()
g.start()
