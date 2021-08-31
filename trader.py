from flask import Flask, render_template, redirect, url_for, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate
from flask_login import UserMixin
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
import os
import json

app= Flask(__name__)
app.config['SECRET_KEY'] = 'thisissecret'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'
app.config['SQLALCHEMY_BINDS'] = {'userlogin':'sqlite:///logindata.db',
                                  'closedposition' : 'sqlite:///closedposition.db',
                                  'maxprofit':'sqlite:///maxprofit.db'}

app.secret_key = os.urandom(30)




db = SQLAlchemy(app)

#Configure Flask Login
login = LoginManager()
login.init_app(app)    


class Orders(db.Model):
    SNo                 =  db.Column(db.Integer, primary_key=True)
    Order               =  db.Column(db.String(200),  unique=False,  nullable = True)
    Date                =  db.Column(db.String(30),  unique=False )
    Max_Profit          =  db.Column(db.Integer, unique=False,  nullable=True)
    Max_Loss            =  db.Column(db.Integer, unique=False,  nullable=True)
    Profit_Percentage   =  db.Column(db.Integer, unique=False,  nullable=True)
    
    
    def __repr__(self):
            return 'Order' + str(self.SNo)
            
            
            
            
    
    
    
class User(UserMixin, db.Model):
    __bind_key__ = 'userlogin'
    
    id      =  db.Column(db.Integer, primary_key=True)
    loginID = db.Column(db.String(50),unique=True,nullable=False)
    Password = db.Column(db.VARCHAR(50),unique=False,nullable=False)
    
    def __repr__(self):
            return 'User ' + str(self.loginID)
            
            
            
            
            
            

class Closedposition(db.Model):
    __bind_key__ = 'closedposition'
    
    SNo                 =  db.Column(db.Integer, primary_key=True)
    Order               =  db.Column(db.String(200),  unique=False,  nullable = True)
    Date                =  db.Column(db.String(30),  unique=False )
    Max_Profit          =  db.Column(db.Integer, unique=False,  nullable=True)
    Max_Loss            =  db.Column(db.Integer, unique=False,  nullable=True)
    Profit_Percentage   =  db.Column(db.Integer, unique=False,  nullable=True)   
     

    def __repr__(self):
            return 'ClosedOrder' + str(self.SNo)




class Profit(db.Model):
    __bind_key__ = 'maxprofit'
    
    SNo                 =  db.Column(db.Integer, primary_key=True)    
    Take_Profit          =  db.Column(db.Integer, unique=False,  nullable=False)


    def __repr__(self):
            return 'profit' + str(self.SNo)









@login.user_loader
def load_user(id):
    
    return User.query.get(id)
    






@app.route('/', methods = ['GET','POST'])
def signin():   
    
    if request.method == 'POST':
    
        username = request.form['username']
        password = request.form['password']
    
        logindata = User.query.all()
    
        for user in logindata:
    
            if user.loginID == username and user.Password == password:
                user_object = User.query.filter_by(loginID=username).first()
                print(user_object)
                login_user(user_object)
                    # print(current_user.username)
                if current_user.is_authenticated:
    
                    session['username'] = username
                    return render_template('index.html')
        
    # entry = User(loginID='shreashthkumarjaiswal',Password='sjaiswal1')
    # db.session.add(entry)
    # db.session.commit()
    # 
    
    
    return render_template('signin.html')







@app.route('/index.html')
@app.route('/home')
@login_required
def hello():   
    
    if 'username' in session:
        
        return render_template('index.html')
    
    else:
        return redirect('/')





    
@app.route('/charts.html')
@login_required
def charts():
    return render_template('charts.html')    








@app.route('/layout-static.html')
@login_required
def layout_static():
    return render_template('layout-static.html')    








@app.route('/tables.html')
@login_required
def tables():
    return render_template('tables.html')    








@app.route('/authentication')
@login_required
def authentication():
    return render_template('login.html')    









@app.route('/activeposition.html')
@login_required
def activeposition():
    
    databaseprofit = Profit.query.all()

    return render_template('activeposition.html', databaseprofit=databaseprofit)







# Add Order in the Orders database


@app.route('/addorder', methods=['POST'])
@login_required
def addorder():

    order                 = request.form['order']
    Max_Profit            = request.form['Max_Profit']
    Max_Loss              = request.form['Max_Loss']
    Profit_Percentage     = request.form['Profit_Percentage']

    entry = Orders( Order = order, Date = datetime.now(), Max_Profit = Max_Profit, Max_Loss = Max_Loss, 
    Profit_Percentage = Profit_Percentage )

    db.session.add(entry)
    db.session.commit()

    return order



@app.route('/maxprofit', methods=['POST'])
@login_required
def maxprofit():
    
    db.session.query(Profit).delete()
    db.session.commit()
    
    Take_Profit            = request.form['Take_Profit']
    
    entry = Profit(Take_Profit=Take_Profit)
    
    db.session.add(entry)
    db.session.commit()
    
    databaseprofit = Profit.query.all()
    
    return Take_Profit
    









# Delete Order from the Orders database

@app.route('/deleteorder',methods=['POST'])
@login_required
def deleteorder():

    deleteorder                 = request.form['deleteorder']
    deleteorder                 = int(deleteorder)
    Order                       = Orders.query.all()
    
    ordertodelete = Orders.query.get(deleteorder)
    
    
    db.session.delete(ordertodelete)
    db.session.commit()
    
    for order in Order:
        if order.SNo > deleteorder:
            order.SNo = order.SNo - 1
            
    
    db.session.commit()
    
    return render_template('activeposition.html')














# Add Order in the closedposition database

@app.route('/closedposition.html')
@app.route('/closedposition',methods=['GET','POST'])
@login_required
def closedposition():
    

    
    

    return render_template('closedposition.html')













@app.route('/profile')
@login_required
def profile():
    

    return render_template('profile.html')
    




@app.route('/base')
@login_required
def base():
    
    orderindatabase = Orders.query.all()

    return render_template('base.html', orderindatabase = orderindatabase)





@app.route('/addoptionchain',methods=['POST'])
@login_required
def addoptionchain():
    
    optionchain                 = request.form['Optionchain']
    
    optionchain = json.loads(optionchain)
    
     
    for option in optionchain:
        if 'bestBids' and 'bestAsks' in option:
            del option["bestBids"]
            del option["bestAsks"]
  
    optionchain = json.dumps(optionchain,indent=2)
    
        
    with open('static/jsondata/optionchain.json','w') as f:
        f.write(optionchain)
    


    return 'xyz'





    


@app.route('/logout')
def logout():
    
    session.pop('username')
    logout_user()
    
    return redirect('/')



if __name__=="__main__":
    app.run(debug=True)