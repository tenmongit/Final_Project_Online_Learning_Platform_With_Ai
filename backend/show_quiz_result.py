import sqlite3

conn = sqlite3.connect(r'c:\Users\beyond\CascadeProjects\Final_Project_Online_Learning_Platform_With_Ai\instance\app.db')
cursor = conn.cursor()
for row in cursor.execute('SELECT * FROM quiz_result;'):
    print(row)
conn.close()