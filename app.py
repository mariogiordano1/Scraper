from flask import Flask, request
import re
import telegram
from telegram.files.sticker import Sticker
from telebot.credentials import bot_token, bot_user_name,URL

global bot 
global TOKEN
TOKEN = bot_token
bot = telegram.Bot(token = TOKEN)

app = Flask(__name__)

@app.route('/{}'.format(TOKEN), methods=['POST'])
def respond():

    update = telegram.Update.de_json(request.get_json(force = True), bot)
    chat_id = update.message.chat.id
    msg_id = update.message.message_id

    text = update.message.text.encode('utf-8').decode()

    if text == "/start":
        bot_welcome = "welcome to bot, This is a test platform"
        bot.sendMessage(chat_id=chat_id, text=bot_welcome, reply_to_message_id=msg_id)

    else:
       try:
           text = re.sub(r"\W", "_", text)
           bot_msg = "This is a Debug Test : Tribucinio al Timonale"
           bot.sendMessage(chat_id=chat_id, text = bot_msg, reply_to_message_id=msg_id)
       except Exception:
           # if things went wrong
           bot.sendMessage(chat_id=chat_id, text="There was a problem in the name you used, please enter different name", reply_to_message_id=msg_id)
    return 'ok'

@app.route('/setwebhook', methods=['GET', 'POST'])
def set_webhook():
    # we use the bot object to link the bot to our app which live
    # in the link provided by URL
    s = bot.setWebhook('{URL}{HOOK}'.format(URL=URL, HOOK=TOKEN))
    # something to let us know things work
    if s:
        return "webhook setup ok"
    else:
        return "webhook setup failed"
    
@app.route('/')
def index():
    return '.'
if __name__ == '__main__':
    # note the threaded arg which allow
    # your app to have more than one thread
    app.run(threaded=True)