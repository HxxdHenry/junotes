from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
import logging

# Replace these with your actual bot token and channel IDs
TOKEN = '7429408074:AAFrYhNhhF9rXq_CPXDV45r4ZcghzdroinY'
CONTRIBUTE_CHANNEL = '-1002198841198'  # Contributions Channel ID
REQUEST_CHANNEL = '-1002314202667'     # Requests Channel ID
SUGGEST_CHANNEL = '-1002271090572'     # Suggestions Channel ID

# Set up logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

def start(update: Update, context: CallbackContext):
    update.message.reply_text(
        'Please choose an option:\n'
        '/request - Request something\n'
        '/suggest - Suggest something\n'
        '/contribute - Contribute a file and reason'
    )

def request(update: Update, context: CallbackContext):
    update.message.reply_text('Please provide your request.')

def suggest(update: Update, context: CallbackContext):
    update.message.reply_text('Please provide your suggestion.')

def contribute(update: Update, context: CallbackContext):
    update.message.reply_text('Please send the file you want to contribute.')

def handle_document(update: Update, context: CallbackContext):
    user = update.message.from_user
    file_id = update.message.document.file_id
    username = user.username or "Unknown"
    user_id = user.id

    context.user_data['file_id'] = file_id
    context.user_data['user'] = username
    context.user_data['user_chat_id'] = update.message.chat_id

    # Request roll number
    update.message.reply_text('Please provide your roll number.')

    # Store file and reason in user_data to be used later
    context.user_data['pending_contribution'] = True

def handle_message(update: Update, context: CallbackContext):
    user = update.message.from_user
    text = update.message.text
    chat_id = update.message.chat_id

    if 'pending_contribution' in context.user_data:
        # Handle roll number
        roll_no = text
        file_id = context.user_data.get('file_id')
        username = context.user_data.get('user')

        # Request reason for contribution
        update.message.reply_text('Please provide a reason for your contribution.')

        # Store roll number in user_data for later use
        context.user_data['roll_no'] = roll_no
        context.user_data['pending_contribution'] = False
        context.user_data['awaiting_reason'] = True

    elif 'awaiting_reason' in context.user_data:
        # Handle reason
        reason = text
        file_id = context.user_data.get('file_id')
        roll_no = context.user_data.get('roll_no')
        username = context.user_data.get('user')

        # Send contribution details to the contributions channel
        context.bot.send_document(
            chat_id=CONTRIBUTE_CHANNEL,
            document=file_id,
            caption=f"File uploaded by @{username} (Roll No: {roll_no})\nReason: {reason}"
        )
        
        # Notify user and reset state
        update.message.reply_text('Thank you for your contribution!\n'
                                  'You can now choose one of the following options:\n'
                                  '/request - Request something\n'
                                  '/suggest - Suggest something\n'
                                  '/contribute - Contribute a file and reason')
        context.user_data.clear()

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler('start', start))
    dp.add_handler(CommandHandler('request', request))
    dp.add_handler(CommandHandler('suggest', suggest))
    dp.add_handler(CommandHandler('contribute', contribute))

    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))
    dp.add_handler(MessageHandler(Filters.document, handle_document))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
