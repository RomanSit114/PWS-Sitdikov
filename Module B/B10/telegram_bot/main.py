import telebot

from config import *
from extensions import Converter, APIException

bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=['start', 'help'])
def start(message: telebot.types.Message):
    text = "Чтобы начать работу введите комманду боту в следующем формате:\n<имя валюты>  \
<в какую валюту перевести>  \
<количество переводимой валюты>\nУвидеть список всех доступных валют: /values"
    bot.send_message(message.chat.id, text)


@bot.message_handler(commands=['values'])
def values(message: telebot.types.Message):
    text = 'Доступные валюты:\n'
    for i in exchanges.keys():
        text = '\n'.join((text, i))
    bot.reply_to(message, text)

@bot.message_handler(content_types=['text'])
def converter(message: telebot.types.Message):
    try:
        base, sym, amount = message.text.split()
    except ValueError as e:
        bot.reply_to(message, "Неверное количество параметров!")

    try:
        new_price = Converter.get_price(base, sym, amount)
        bot.reply_to(message, f"Цена {amount} {base} в {sym} : {new_price}")
    except APIException as e:
        bot.reply_to(message, f"Ошибка в команде:\n{e}")


bot.polling()
