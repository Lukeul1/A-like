import csv
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

# Read the names from the dataset
names_file = '/home/lukeul/sam-e/names.csv'  # Replace with the path to the names dataset
names = set()
with open(names_file, 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        names.add(row[0].lower())

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
        and word.lower() not in names  # Exclude names from the dataset
    ):
        singular_word = WordNetLemmatizer().lemmatize(word)
        if singular_word not in filtered_words:
            filtered_words.append(singular_word)
            if len(filtered_words) == 5000:
                break

# Remove words with fewer than 5 characters
filtered_words = [word for word in filtered_words if len(word) >= 5]

# Write the words to a text file
output_file = '/home/lukeul/sam-e/common_words.txt'  # Replace with the desired file path
# Write the words to a text file with a comma in front of each word
with open(output_file, 'w') as file:
    file.write(','.join(f'"{word}"' for word in filtered_words))

# Calculate the word count
word_count = len(filtered_words)
print(f"Total number of words in the file: {word_count}")

