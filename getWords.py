import nltk

# Download the necessary resources from nltk
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

from nltk.corpus import wordnet as wn

# Get the 5,000 most common English words by frequency
common_words = wn.words(lang='eng')

# Filter the words to include only nouns, verbs, and adjectives
filtered_words = []
for word in common_words:
    synsets = wn.synsets(word)
    if any(synset.pos() in ['n', 'v', 'a'] for synset in synsets):
        filtered_words.append(word)

# Remove capitalized words and words with hyphens
filtered_words = [word for word in filtered_words if not word.isupper() and '-' not in word]

# Remove difficult-to-guess words
difficult_words = ['what', 'if', 'and']  # Add more words if needed
filtered_words = [word for word in filtered_words if word not in difficult_words]

# Select 5,000 random words from the filtered list
import random
random_words = random.sample(filtered_words, k=5000)

# Print the selected words
for word in random_words:
    print(word)