import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Load Model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../models/plant_village_model_v2.h5")
MODEL = tf.keras.models.load_model(MODEL_PATH)
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


# Load Image
img = Image.open(r"training/test/2 - early.jpg").convert("RGB")
img = img.resize((256, 256))
img = np.array(img) / 255.0
img_batch = np.expand_dims(img, axis=0)

# Predict
predictions = MODEL.predict(img_batch)
print("Predictions:", predictions)
print("Predicted Class:", CLASS_NAMES[np.argmax(predictions[0])])
