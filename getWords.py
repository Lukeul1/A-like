import nltk
import re

# Download the necessary resources from nltk
nltk.download('stopwords')
nltk.download('brown')

from nltk.corpus import stopwords
from nltk.corpus import brown
from collections import Counter

# Get the most common English words from the Brown corpus
common_words = [word.lower() for word, _ in Counter(brown.words()).most_common()]

# Remove function words using stopwords from nltk
function_words = set(stopwords.words('english'))
filtered_words = [word for word in common_words if word not in function_words and re.match('^[a-zA-Z]+$', word) and len(word) > 4]

# Select the top 5000 most common words
top_5000_words = filtered_words[:5000]

# Write the words to a text file
file_path = '/home/lukeul/top_5000_words.txt'  # Replace with the desired file path
with open(file_path, 'w') as file:
    file.write('\n'.join(top_5000_words))