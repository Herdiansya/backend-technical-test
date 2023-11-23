# backend-technical-test
Keputusan saya untuk menggunakan desain tersebut karena saya dulu pernah melihat seseorang sedang mengerjakan projek yg sama yaitu membuat Restful untuk keperluan login, register, dll
Disini saya menggunakan flask, flask-cors, flask-sqlalchemy, werkzeug dan html, css, javascript untuk frontendnya dan sqlite sebagai databasenya.
Tantangan yang saya hadapi adalah tentang masalah autentikasi token yang masih belum faham dan penulisan syntax yng sering lupa dan harus lihat Documentasi.


Di bawah ini adalah link video orangnya yang membuat saya terpikirkan ide desain
https://youtu.be/857p1srA1Yw?si=3hvgb4iklvD32kvK, 
https://youtu.be/L8tl7Sgbe2M?si=0c0u8UJaq66Onl71


# Cara menjalankan aplikasi
1. Download repo ini / file zipnya
2. Ekstrak dan buka filenya di VS Code
3. Setelah dibuka akan ada error atau garis bawah warna kuning itu kita disuruh buat environment variable baru
4. Setelah selesai membuat virtual environtment, masuk kedalamnya dan install beberapa dependencies
5. Dependencies yang harus diinstall
   1. flask
   2. flask-cors
   3. flask-sqlalchemy
   4. Flask-JWT-Extended
   5. werkzeug
6. Setelah diinstll Set the FLASK_APP virtual environment
7. cara set "set FLASK_APP=app.py"
8. lalu tinggal kita jalankan caranya dengan ketik "flask run"
