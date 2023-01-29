import os
import tensorflow as tf
import numpy as np
from skimage import io

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()

# Loading the 8 different models
appleModel = tf.keras.models.load_model("./Models/apple.h5", compile=False)
cornModel = tf.keras.models.load_model("./Models/corn.h5", compile=False)
bellPepperModel = tf.keras.models.load_model(
    "./Models/bellPepper.h5", compile=False)
cherryModel = tf.keras.models.load_model("./Models/cherry.h5", compile=False)
grapeModel = tf.keras.models.load_model("./Models/grape.h5", compile=False)
peachModel = tf.keras.models.load_model("./Models/peach.h5", compile=False)
potatoModel = tf.keras.models.load_model("./Models/potato.h5", compile=False)
strawberryModel = tf.keras.models.load_model(
    "./Models/strawberry.h5", compile=False)
tomatoModel = tf.keras.models.load_model("./Models/tomato.h5", compile=False)
print('Model loaded. Check http://127.0.0.1:5000/')


# def model_predict(img_path, model):
#     img = image.load_img(img_path, grayscale=False, target_size=(256, 256))
#     show_img = image.load_img(img_path, grayscale=False, target_size=(256, 256))
#     x = image.img_to_array(img)
#     x = np.expand_dims(x, axis=0)
#     x = np.array(x, 'float32')
#     x /= 255
#     pred,confidence = model.predict(x)
#     return pred,confidence

# Classes for different plants
apple_class_names = ["Apple-Scab", "Apple-Black-rot",
                     "Cedar-Apple-Rust", "Apple-healthy"]
corn_class_names = ["Corn-cercospora-gray-leaf-spot",
                    "Corn-common-rust", "Corn-healthy", "Corn-northern-leaf-blight"]
bellPepper_class_names = ["bell-pepper-bacterial-spot", "bell-pepper-healthy"]
cherry_class_names = ["cherry-healthy", "cherry-powdery-mildew"]
grape_class_names = ["grape-black-rot",
                     "grape-black-measles", "grape-healthy", "grape-leaf-blight"]
peach_class_names = ["peach-bacterial-spot", "peach-healthy"]
potato_class_names = ["potato-early-blight"
                      , "potato-late-blight","potato-healthy"]
strawberry_class_names = ["strawberry-healthy", "strawberry-leaf-scorch"]
tomato_class_names = ["tomato-bacterial-spot", "tomato-early-blight", "tomato-healthy", "tomato-late-blight", "tomato-leaf-mold",
                      "tomato-septoria-leaf-spot", "tomato-spider-mites", "tomato-target-spot", "tomato-mosaic-virus", "tomato-yellow-leaf-curl-virus"]


def model_predict(img_path, model,class_names):
    img = tf.keras.preprocessing.image.load_img(
        img_path, grayscale=False, target_size=(256, 256))

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)

    predictions = model.predict(img_array)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)
    return predicted_class, confidence


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')
@app.route('/about', methods=['GET'])
def about():
    # Main page
    return render_template('about.html')
@app.route('/contact', methods=['GET'])
def contact():
    # Main page
    return render_template('contact.html')

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']
        plantName=request.form['plantName']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        #implementing switch casing for model
        if plantName.lower()=="apple":
            pred, confidence = model_predict(file_path, appleModel,apple_class_names)
        elif plantName.lower()=="corn":
            pred, confidence = model_predict(file_path, cornModel,corn_class_names)
        elif plantName.lower()=="bellpepper":
            pred, confidence = model_predict(file_path, bellPepperModel,bellPepper_class_names)
        elif plantName.lower()=="cherry":
            pred, confidence = model_predict(file_path, cherryModel,cherry_class_names)
        elif plantName.lower()=="grape":
            pred, confidence = model_predict(file_path, grapeModel,grape_class_names)
        elif plantName.lower()=="peach":
            pred, confidence = model_predict(file_path, peachModel,peach_class_names)
        elif plantName.lower()=="potato":
            pred, confidence = model_predict(file_path, potatoModel,potato_class_names)
        elif plantName.lower()=="strawberry":
            pred, confidence = model_predict(file_path, strawberryModel,strawberry_class_names)
        elif plantName.lower()=="tomato":
            pred, confidence = model_predict(file_path, tomatoModel,tomato_class_names)
        else:
            pred="Not Identified! Please choose a plant from given list"
            confidence= "100 %"

        # Make prediction
        print(pred, confidence)

        return {
            "prediction":pred,
            "confidence":confidence
        }
    return None


if __name__ == '__main__':
    # app.run(port=5002, debug=True)

    # Serve the app with gevent
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
    app.run(debug=False,host="0.0.0.0")
