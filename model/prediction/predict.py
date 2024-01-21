#Predict on one sentence
def preprocess_text(text, tokenizer, max_length):
    # Convert text to sequence
    sequence = tokenizer.texts_to_sequences([text])
    # Pad the sequence
    padded_sequence = pad_sequences(sequence, maxlen=max_length, padding='post')
    return padded_sequence

# Example sentence
sentence = "Your example sentence"

# Preprocess the sentence
preprocessed_sentence = preprocess_text(sentence, tokenizer, max_length)

# Predict the emotion of the sentence
sentence_prediction = model.predict(preprocessed_sentence)

# Convert prediction to label
sentence_pred_label = sentence_prediction.argmax(axis=1)
sentence_pred_class_name = label_encoder.inverse_transform(sentence_pred_label)

print(f"Predicted emotion: {sentence_pred_class_name[0]}")