import pandas as pd
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow_hub as hub
from sklearn.preprocessing import OneHotEncoder
import numpy as np

def load_dataset(filename):
    df = pd.read_csv(filename)
    return df['Text'], df['Emotion']

def preprocess_text(texts, tokenizer, max_length):
    sequences = tokenizer.texts_to_sequences(texts)
    padded_sequences = pad_sequences(sequences, maxlen=max_length, padding='post')
    return padded_sequences

def preprocess_labels(labels, encoder):
    labels = np.array(labels).reshape(-1, 1)
    one_hot_labels = encoder.fit_transform(labels).toarray()
    return one_hot_labels

def preprocess_data(text_file, label_encoder, tokenizer, max_length=128):
    texts, labels = load_dataset(text_file)
    X = preprocess_text(texts, tokenizer, max_length)
    y = preprocess_labels(labels, label_encoder)
    return X, y


tokenizer = Tokenizer()
encoder = OneHotEncoder(sparse=False)
X_train, y_train = preprocess_data('path_to_train_dataset.csv', encoder, tokenizer)
X_test, y_test = preprocess_data('path_to_test_dataset.csv', encoder, tokenizer)
