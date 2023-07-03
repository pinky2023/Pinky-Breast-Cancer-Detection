#importing required libraries 
from flask import Flask,jsonify,render_template,request,session,redirect,url_for,flash
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from keras.models import model_from_json
import random
import os
from werkzeug.utils import secure_filename
import hashlib
import binascii
from flask_sslify import SSLify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy



 
### Loadeng our model ###
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights("model.h5")
print("Loaded model from disk")
 
loaded_model.compile(loss='binary_crossentropy', optimizer='rmsprop', metrics=['accuracy'])

### Class of Prediction ###

data_generation = ImageDataGenerator(rescale=1.0/255)

def save_and_get_pred_img(image) :
    defrance     = str(random.randint(1,100000))
    # file         = "D:\\breast_cancer\\Flask_model\\Flask_model\\Images" #change to eny dir
    file_path    = os.path.join("Images",defrance)
    os.mkdir(file_path)
    filename = secure_filename(image.filename)
    next_file_path =os.path.join(file_path,defrance)
    os.mkdir(next_file_path)
    UPLOAD_FOLDER = next_file_path
    my_wep_app.config['IMAGE_UPLOADS'] = UPLOAD_FOLDER
    image.save(os.path.join(my_wep_app.config["IMAGE_UPLOADS"], image.filename))
    return file_path 
 
class Api_service :

    def __init__(self,img_file_path):
        self.img_file_path = img_file_path

    def prediction_function(self) :
        predict_generation = data_generation.flow_from_directory( self.img_file_path,target_size=(25,25),batch_size=10
                                                                ,class_mode='categorical')
        prediction = loaded_model.predict_generator(predict_generation)
        has_cancer = round(prediction[0][1]*100,2)
        has_no_cancer= round(prediction[0][0]*100,2)
        return has_cancer,has_no_cancer 



def hash_pass(password):
    """Hash a password for storing."""

    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash)  # return bytes


def verify_pass(provided_password, stored_password):
    """Verify a stored password against one provided by user"""

    stored_password = stored_password.decode('ascii')
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password
 
### Creating our API & connected with HTML files ###
my_wep_app = Flask(__name__)
CORS(my_wep_app)
#Implementing the SSL/TLS security
sslify = SSLify(my_wep_app)
my_wep_app.secret_key = 'HealthPinkyCare001122'
# Flask app configuration
#mysql confinguration format: mysql://username:password@domain/database
my_wep_app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/pinkycare'
db = SQLAlchemy(my_wep_app)
# User model
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.LargeBinary)

    def __init__(self,firstname,lastname,email,password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
    
    def __repr__(self):
        return '<User %r>' % self.username

#Contacts model  
class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text())

    def __init__(self,name,phone,email,message):
        self.name = name
        self.phone = phone
        self.email = email
        self.message = message
    
    def __repr__(self):
        return '<Contact User %r>' % self.name
#Donation model 
class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    card = db.Column(db.String(16), nullable=False)
    cvv = db.Column(db.String(4), nullable=False)
    expiry_date = db.Column(db.String(5), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    
    def __init__(self,name,email,card,cvv,expiry_date,amount):
        self.name = name
        self.email = email
        self.card = card
        self.cvv = cvv
        self.expiry_date = expiry_date
        self.amount = amount

    def __repr__(self):
        return f'<Donation {self.id}>'

# Create the table
with my_wep_app.app_context():
    db.create_all()

#Route for the home page if logged in otherwise to the login/signup page    
@my_wep_app.route("/")
def home():
    if not session.get("email"):
        return render_template('landing.html')
    else:
        return render_template('index.html')
@my_wep_app.route("/result_page",methods=['GET', 'POST'])

# Route for the result page of brease cancer test
def result_page():
   if request.method == "POST":
        if request.files:
            image = request.files["img"]
            img_file_path = save_and_get_pred_img(image)
            predict_img =Api_service(img_file_path)
            has_cancer,has_no_cancer = predict_img.prediction_function()
   return render_template("result-detail.html",has_cancer=has_cancer,has_no_cancer=has_no_cancer) 

#Route for validating and logging in the user
@my_wep_app.route("/login",methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form['username']
        password = request.form['password']
        user = Users.query.filter_by(email=email).first()
        #Check for the password to match with the stored one
        if verify_pass(password, user.password):
            session["email"]=email
            return {'status':'pass'}
        else:
            return {'status':'fail'}

#Route to handle the signup process
@my_wep_app.route("/signup",methods=['POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = hash_pass(request.form['sign_pass'])
        # Check email exists
        user = Users.query.filter_by(email=email).first()
        if user:
            return {'status':'fail'}

        # else we can create the user
        user = Users(firstname=first_name,lastname=last_name, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        session["email"]=email
        return {'status':'pass'}

#Route for logout 
@my_wep_app.route("/logout")
def logout():
    session["email"] = None
    return redirect(url_for('home'))

#Route for changing password after verifiying the old password
@my_wep_app.route("/change_password",methods=['POST'])
def change_password():
    if request.method == 'POST':
        email = request.form['username']
        old_password = request.form['old_password']
        new_password = request.form['new_password']
        user = Users.query.filter_by(email=email).first()
        if user:
            if verify_pass(old_password, user.password):
                user.password = hash_pass(new_password)
                db.session.commit()
                return {'status':'pass'}
            else:
                return {'status':'fail'}
        # else we return the error
        return {'status':'fail'}

#route to access the password reset page    
@my_wep_app.route("/pass_reset",methods=['GET', 'POST'])
def pass_reset():
    return render_template('reset-password.html')
#route to access the donation page
@my_wep_app.route("/donation",methods=['GET', 'POST'])
def donation():
    if not session.get("email"):
        return render_template('donation.html',loggedIn=False)
    else:
        return render_template('donation.html',loggedIn=True)

#route to save the doner detials along with their cards details    
@my_wep_app.route("/save_donation",methods=["POST"])
def save_donation():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        card = request.form.get('card')
        cvv = request.form.get('cvv')
        expiry_date = request.form.get('expiry_date')
        amount = request.form.get('amount')
        #Creating a donation object
        donation_item = Donation(email=email, name=name, card=card, cvv=cvv, expiry_date=expiry_date, amount=amount)
        db.session.add(donation_item)
        db.session.commit()
        return {'status':'pass'}

#route to access the contact page  
@my_wep_app.route("/contact",methods=['GET', 'POST'])
def contact():
    if not session.get("email"):
        return render_template('contact.html',loggedIn=False)
    else:
        return render_template('contact.html',loggedIn=True)

#route to store the details of the contacts 
@my_wep_app.route("/save_contact",methods=['POST'])
def save_contact():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        phone = request.form['phone']
        message = request.form['message']
        contact = Contacts(name=name, phone=phone, email=email, message=message)
        db.session.add(contact)
        db.session.commit()        
        return {'status':'pass'}
#route to access the about page
@my_wep_app.route("/about",methods=['GET', 'POST'])
def about():
    if not session.get("email"):
        return render_template('about.html',loggedIn=False)
    else:
        return render_template('about.html',loggedIn=True)

#route to access the recommended professionals page 
@my_wep_app.route("/team",methods=['GET', 'POST'])
def team():
    if not session.get("email"):
        return render_template('team.html',loggedIn=False)
    else:
        return render_template('team.html',loggedIn=True)
    
#running the flask app in the development mode for production mode just remove the debug=True
my_wep_app.run(debug=True)

