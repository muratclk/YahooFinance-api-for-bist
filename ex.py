import pandas as pd

df = pd.read_excel('sirketler.xls', engine='xlrd')
code_column = df['Code']

codes = code_column.tolist()

with open('veriler.txt', 'w') as file:
    # Her bir kodu dosyaya yaz
    for code in codes:
        file.write(code + '\n')