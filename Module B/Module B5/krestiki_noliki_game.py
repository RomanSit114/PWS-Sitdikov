print('Добро пожаловать в игру "крестики-нолики"!')
print('Вывод изначального поля')

field = [['-']*3 for i in range(3)]
def print_field(foo):
    print('  0 1 2')
    for i in range(len(field)): #Вывод игрового поля
        print(str(i), *field[i])

def input_data(foo, gamer): # Ввод данных пользователя с проверкой
    while True:
        coordinates = input(f'Сейчас ходит игрок {gamer} .Введите Ваши координаты в поле: ').split()
        if len(coordinates)!= 2:
            print('Введите 2 координаты')
            continue
        if not(coordinates[0].isdigit() and coordinates[1].isdigit()):
            print('Неверный тип данных. Введите числа')
            continue
        x, y = map(int, coordinates)
        if not(x>=0 and x<3 and y>=0 and y<3):
            print('Ваши координаты вне диапазона. Введите цифры от 0 до 2 включительно')
            continue
        if foo[x][y]!='-':
            print('Данная ячейка занята. Введите другие координаты')
            continue
        break
    return x, y

def check_winner(foo, gamer): #проверка на то, что комбинация является выигрышной
    win_coordinates = (((0, 0), (0, 1), (0, 2)), ((1, 0), (1, 1), (1, 2)), ((2, 0), (2, 1), (2, 2)),
                       ((0, 0), (1, 0), (2, 0)), ((0, 1), (1, 1), (2, 1)), ((0, 2), (1, 2), (2, 2)),
                       ((0, 0), (1, 1), (2, 2)), ((0, 2), (1, 1), (2, 0)))
    for cord in win_coordinates:
        check_list = []
        for c in cord:
            check_list.append(foo[c[0]][c[1]])
        if check_list == [gamer, gamer, gamer]:
            return True
    return False

def game(field): #запуск игры
    step_number = 0 #счетчик ходов
    while True:
        if step_number % 2 == 0:
            gamer = 'x'
        else:
            gamer = '0'
        print_field(field)
        if step_number < 9:
            x, y = input_data(field, gamer)
            field[x][y] = gamer
        elif step_number == 9:
            print('Игра закончена. Ничья')
            break

        if check_winner(field, gamer):
            print_field(field)
            print(f"Игра закончена. Выйграл игрок {gamer}")
            break
        step_number += 1

game(field)
