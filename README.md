# Pinky_Breast_Cancer_Detection

Breast cancer is a disease characterized by uncontrolled growth of cancer cells inside the breast. It can affect both men and women but is more common in women. It can spread to other parts of the body through blood or lymph vessels, a process known as metastasis. The causes of breast cancer are not fully understood, but factors such as hormones, lifestyle, environment, and genetic mutations play a role. Early detection greatly improves the chances of treatment success.

## Our Main Goal
Our main goal in the project is to help patients get immediate answers regarding the probability of getting breast cancer according to a mammographic image, instead of waiting a long time for a doctor's appointment, using the CNN model, and also, offer important information and recommended professionals.

## Process
We've trained a CNN model with a dataset that contains mammography images of benign, malignant breast cells. For representing the results of the model process, we developed a website using the Flask framework based on Python programing language which supports Machine-learning functionalities such as Tensorflow, Keras, Numpy, OpenCV, and Matplotlib. We chose to store the data of the users in MySQL database and for the frontend part, we have used JavaScript, CSS, and HTML technologies.

## How Do I Run The Code?
1. Install Anaconda
2. Create a new enviorment for the project - open the Anaconda Powershell, and run the following command:
```bash
$ conda create --name pinky python=3.10
```
3. Install MySql - this is the DB we used to work with in our project.
4. Open MySQL Workbench , and run the following command:
```bash
$ create database pinkycare
```
Execute the command and validate: click "Schemas" -> check a schema named "pinkycare" was created
5. Go back to Anaconda powershell prompt, and reach the project folder, then install dependencies:
```bash
pip install tensorflow flask flask_sqlalchemy flask_sslify pymysql flask_cors mysqlclient
```
After the installations were successfuly done running, you're able to run the project:
```bash
Python My_App.py
```
