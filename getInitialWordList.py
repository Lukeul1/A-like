import nltk
import re
from nltk.corpus import stopwords
from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer
from collections import Counter

# Download the necessary resources from nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('brown')

from nltk.corpus import brown

# Get the most common English words from the Brown corpus
common_words = [word.lower() for word, _ in Counter(brown.words()).most_common()]

# Remove function words using stopwords from nltk
function_words = set(stopwords.words('english'))

# Filter out names of geographical locations (countries, cities) and select words with at least 6 synonyms and at least 5 letters
filtered_words = []
for word in common_words:
    synsets = wordnet.synsets(word)
    if (
        word.lower() not in function_words
        and re.match('^[a-zA-Z]{5,}$', word)  # Adjusted criteria: Filter words with at least 5 letters
        and len(synsets) >= 6  # Filter words with at least 6 synonyms
        and not any(synset.lexname().startswith('country') or synset.lexname().startswith('city') for synset in synsets)  # Filter out geographical locations
    ):
        singular_word = WordNetLemmatizer().lemmatize(word)
        if singular_word not in filtered_words:
            filtered_words.append(singular_word)
            if len(filtered_words) == 5000:
                break

# Write the words to a text file
file_path = '/home/lukeul/sam-e/top_5000_words.txt'  # Replace with the desired file path
with open(file_path, 'w') as file:
    file.write('\n'.join(filtered_words))

# Calculate the word count
word_count = len(filtered_words)
print(f"Total number of words in the file: {word_count}")
