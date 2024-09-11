from telegram import Update, InputFile
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
import os

# Bot token and channel ID
BOT_TOKEN = '7308651733:AAFWyXgAGZINtnOf7QeunfYi4_MWiGGJ3ag'
CHANNEL_ID = '-1002198841198'

# Create a directory to save files
if not os.path.exists('uploads'):
    os.makedirs('uploads')

def start(update: Update, context: CallbackContext):
    update.message.reply_text(
        'Welcome to the Contribution Bot! Please follow the instructions to submit your file.\n\n'
        '1. Send the file you want to contribute.\n'
        '2. Provide the required details in the format: stream, year, section, subject, type.\n'
        '3. Your roll number.\n'
        '4. Your submission will be reviewed and added to the scoreboard.'
    )

def handle_document(update: Update, context: CallbackContext):
    # Save the document
    file = update.message.document.get_file()
    file_path = os.path.join('uploads', update.message.document.file_name)
    file.download(file_path)

    # Process file and other data here
    user_data = context.user_data  # Store user data in the context for this chat

    # Respond to user
    update.message.reply_text('File received and saved. Thank you!')

    # Send file to channel
    context.bot.send_document(chat_id=CHANNEL_ID, document=open(file_path, 'rb'))

def handle_text(update: Update, context: CallbackContext):
    user_message = update.message.text.strip()
    
    if user_message.lower() in ['btech-cse', 'other streams']:  # Example for stream
        context.user_data['stream'] = user_message
        update.message.reply_text('Stream recorded. Now provide the year.')
    elif user_message.isdigit():  # Assuming year is a number
        context.user_data['year'] = user_message
        update.message.reply_text('Year recorded. Now provide the section.')
    elif user_message in ['1', '2', '3']:  # Example for section
        context.user_data['section'] = user_message
        update.message.reply_text('Section recorded. Now provide the subject.')
    elif user_message in ['subject1', 'subject2']:  # Example for subject
        context.user_data['subject'] = user_message
        update.message.reply_text('Subject recorded. Now provide the type.')
    elif user_message in ['notes', 'assignments']:  # Example for type
        context.user_data['type'] = user_message
        update.message.reply_text('Type recorded. Now provide your roll number.')
    elif user_message.isdigit():  # Assuming roll number is a number
        context.user_data['roll_no'] = user_message
        update.message.reply_text('Roll number recorded. Your submission will be reviewed and added to the scoreboard.')
        # Optionally, you can save the user data to a database or file here

def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler('start', start))
    dp.add_handler(MessageHandler(Filters.document, handle_document))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_text))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
