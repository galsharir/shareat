import uuid
"""
sets up a constants file for this app.
Don't share it with anyone!
"""

flask_app_secret = uuid.uuid4()

#see if the constants file already exists
try:
    open('constants.py', 'r')
except IOError, e:
#it does not exist, write a new one
    with open('constants.py', 'w') as constants_file:
        constants_file.write("CONSUMER_ID = 1426\n" \
            "CONSUMER_SECRET = \"Ehhfq2BbvJuW8FseuCgfFVVS8Gtpxnm4\"\n" \
            "APP_SECRET = \"%s\"\n" % flask_app_secret)
