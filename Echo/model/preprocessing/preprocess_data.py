import pandas as pd
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import tensorflow_hub as hub
from sklearn.preprocessing import OneHotEncoder
import numpy as np

# Load datasets
train_df = pd.read_csv('/content/data_train.csv')
test_df = pd.read_csv('/content/data_test.csv')

# Tokenize text
vocab_size = 50000
tokenizer = Tokenizer(num_words=vocab_size, oov_token='<OOV>')
tokenizer.fit_on_texts(train_df['Text'])


# Convert texts to sequences
X_train = tokenizer.texts_to_sequences(train_df['Text'])
X_test = tokenizer.texts_to_sequences(test_df['Text'])

# Pad sequences
max_length = 50
X_train = pad_sequences(X_train, maxlen=max_length, padding='post')
X_test = pad_sequences(X_test, maxlen=max_length, padding='post')

# Encode labels
label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(train_df['Emotion'])
y_test = label_encoder.transform(test_df['Emotion'])

print(f"before: {X_train[:10]}")
# Split the original training data into new training data and validation data
X_train_new, X_val, y_train_new, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

print(f"after: {X_train_new[:10]}")
X_train[0].shape == X_train_new[0].shape


#Train

import tensorflow as tf

embedding_dim = 128

# Define the model
model = tf.keras.models.Sequential([
    tf.keras.layers.Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(64, return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.GRU(32)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.Dense(5, activation='softmax')  # 5 emotion classes
])

model.compile(loss='sparse_categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)

# Train the model
history =model.fit(X_train_new,
                   y_train_new,
                   epochs=10,
                   validation_data = (X_val, y_val),
                   callbacks=[early_stopping])

# To predict on the test set
model_pred_probs = model.predict(X_test)

model_pred_probs.shape, model_pred_probs[:10] # view the first 10

# Convert predictions to labels
test_pred_labels = model_pred_probs.argmax(axis=1)
test_pred_labels


test_pred_class_names = label_encoder.inverse_transform(test_pred_labels)