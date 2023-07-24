from flask import Flask,request,jsonify
from pymongo import MongoClient
from bson import ObjectId

uri = "mongodb+srv://soumit:soumit@cluster0.kyjj0rq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

# Portfolio Manger Table
db = client["Portfolio_Management_Application"]
Portfolio_Managers_collection = db["Portfolio_Manager"]

# Projects Table
Projects_collection = db["Projects"]


# Tasks Table
Tasks_collection = db["Tasks"]


# Resource Table
Resource_collection = db["Resource"]

# Developer Table
Developer_collection = db["Developer"]

app = Flask(__name__)


@app.route("/")
def hello():
    return "hello"




# Login

@app.route("/login",methods = ['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    print(username,password)

    # Check if the user is an admin

    if username == 'admin' and password == 'admin':
        return jsonify({'message':'success','role':'admin'})


    # Check if the user is a portfolio manager

    portfolio_managers =  Portfolio_Managers_collection.find_one({'username':username,'password':password})
    print(portfolio_managers)
    if portfolio_managers:
        return jsonify({'message':'sucess','role':'portfolio_manger'})

    return jsonify({'message':'Invalid username and password'}) 





# Portfolio CRUD

# Create
# @app.route("/addPortfolioManager",methods = ['POST'])
# def addPortfolioManager():
#     db = client["Portfolio_Management_Application"]
#     data = request.get_json()
#     portfolio_manager_data = {
#         "id" : generate_portfolio_manager_id(db),
#         "fullname":data["fullname"],
#         "status":data["status"],
#         "username":data["username"],
#         "password":data["password"],
#         "email":data["email"],
#         "description":data["description"],
#         "start_date":data["start_date"],
#         "projects":[]
#     }

#     result = db.Portfolio_Manager.insert_one(portfolio_manager_data)
#     return jsonify({'message':'Portfolio Manager inserted successfully' , 'portfolio_manager_id':str(result.inserted_id)})

@app.route("/addPortfolioManager", methods=['POST'])
def addPortfolioManager():
    db = client["Portfolio_Management_Application"]
    data = request.form
    portfolio_manager_data = {
        "id": generate_portfolio_manager_id(db),
        "fullname": data["fullname"],
        "status": data["status"],
        "username": data["username"],
        "password": data["password"],
        "email": data["email"],
        "description": data["description"],
        "start_date": data["start_date"],
        "projects": []
    }

    result = db.Portfolio_Manager.insert_one(portfolio_manager_data)
    return jsonify({'message': 'Portfolio Manager inserted successfully', 'portfolio_manager_id': str(result.inserted_id)})

# Get

@app.route("/portfolio_managers",methods = ['GET'])
def get_portfolio_managers():
    db = client["Portfolio_Management_Application"]
    portfolio_managers = db.Portfolio_Manager.find()
    return jsonify([{
        "id":item["id"],
        "fullname":item["fullname"],
        "status":item["status"],
        "username":item["username"],
        "password":item["password"],
         "email":item["email"],
        "description":item["description"],
        "start_date":item["start_date"],
        "projects":item["projects"]
    } for item in portfolio_managers])


# Update

@app.route("/portfolio_manager/<manager_id>",methods=['PUT'])
def update_portfolio_manager(manager_id):
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    updated_manager = {
        "fullname":data["fullname"],
        "status":data["status"],
        "username":data["username"],
        "password":data["password"],
        "email":data["email"],
        "description":data["description"],
        "start_date":data["start_date"],
        "projects":data["projects"]
    }
    result = db.Portfolio_Manager.update_one({"id":manager_id}, {"$set" : updated_manager})
    if result.matched_count > 0:
        return jsonify({"message":"Portfolio Manager Updated Successfully"})
    else:
        return jsonify({"message":"Portfolio Manager not found"})


# Delete

@app.route("/deleteportfolio_manager/<manager_id>" , methods = ['DELETE'])
def delete_portfolio_manager(manager_id):
    db = client["Portfolio_Management_Application"]
    result = db.Portfolio_Manager.delete_one({"id":manager_id})
    if result.deleted_count > 0:
        return jsonify({"message":"portfolio manager deleted successfully"})
    else:
        return jsonify({"message":"portfolio manager not found"})



# Get by id

@app.route("/getportfolio_managerbyId/<manager_id>" , methods = ['GET'])
def find_by_Id(manager_id):
    db = client["Portfolio_Management_Application"]
    data = db.Portfolio_Manager.find_one({"id":manager_id})
    if data:
        return jsonify({
        "id":data["id"],
        "fullname":data["fullname"],
        "status":data["status"],
        "username":data["username"],
        "password":data["password"],
        "email":data["email"],
        "description":data["description"],
        "start_date":data["start_date"],
        "projects":data["projects"]
        })
    else:
        return jsonify({"message":"Portfolio Manager not found"})


def generate_portfolio_manager_id(db):
    last_portfolio_manager = db.Portfolio_Manager.find_one({}, sort=[('_id', -1)], projection={'id': True})
    if last_portfolio_manager:
        last_id = int(last_portfolio_manager["id"][2:])
        new_id = f"PM{str(last_id+1).zfill(3)}"
    else:
        new_id = "PM001"
    return new_id




# Projects CRUD

@app.route("/addProjects",methods = ['POST'])
def addProjects():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    # Project Name (Text), Status (Dropdown: Planned, In Progress, Completed), Start Date (Date), End Date (Date).
    projects_data = {
        "id" : generate_project_id(db),
        "ProjectName":data["ProjectName"],
        "status":data["status"],
        "Start_Date":data["Start_Date"],
        "End_Date":data["End_Date"],
        "description":data["description"],
        "tasks":[]
    }

    result = db.Projects.insert_one(projects_data)
    return jsonify({'message':'Project inserted successfully' , 'project_id':str(result.inserted_id)})

# Get

@app.route("/Projects",methods = ['GET'])
def get_projects():
    db = client["Portfolio_Management_Application"]
    projects = db.Projects.find()
    return jsonify([{
        "id" : data["id"],
        "ProjectName":data["ProjectName"],
        "status":data["status"],
        "Start_Date":data["Start_Date"],
        "End_Date":data["End_Date"],
        "description":data["description"],
        "tasks":[]
    } for data in projects])



# Update

@app.route("/Updateprojects/<project_id>",methods=['PUT'])
def update_projects(project_id):
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    updated_project = {
        "ProjectName":data["ProjectName"],
        "status":data["status"],
        "Start_Date":data["Start_Date"],
        "End_Date":data["End_Date"],
        "description":data["description"],
        "tasks":[]
    }
    result = db.Projects.update_one({"id":project_id}, {"$set" : updated_project})
    if result.matched_count > 0:
        return jsonify({"message":"Project Updated Successfully"})
    else:
        return jsonify({"message":"Project not found"})



# Delete

@app.route("/deleteProject/<project_id>" , methods = ['DELETE'])
def delete_project(project_id):
    db = client["Portfolio_Management_Application"]
    result = db.Projects.delete_one({"id":project_id})
    if result.deleted_count > 0:
        return jsonify({"message":"Project deleted successfully"})
    else:
        return jsonify({"message":"Project not found"})


# Get by id

@app.route("/getProjectbyId/<project_id>" , methods = ['GET'])
def find_project_by_Id(project_id):
    db = client["Portfolio_Management_Application"]
    data = db.Projects.find_one({"id":project_id})
    if data:
        return jsonify({
        "id" : data["id"],
        "ProjectName":data["ProjectName"],
        "status":data["status"],
        "Start_Date":data["Start_Date"],
        "End_Date":data["End_Date"],
        "description":data["description"],
        "tasks":[]
        })
    else:
        return jsonify({"message":"Project not found"})



def generate_project_id(db):
    last_project = db.Projects.find_one({}, sort=[('_id', -1)], projection={'id': True})
    if last_project:
        last_id = int(last_project["id"][2:])
        new_id = f"PJ{str(last_id+1).zfill(3)}"
    else:
        new_id = "PJ001"
    return new_id


# Assign project to portfolio manager(Not working)

@app.route("/assignProject", methods=['POST'])
def assignProject():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    project_id = data["project_id"]
    portfolio_manager_id = data["portfolio_manager_id"]
    
    # Check if project exists
    project = db.Projects.find_one({"id": project_id})
    if project is None:
        return jsonify({'message': 'Project with ID {} does not exist'.format(project_id)})
    
    # Check if portfolio manager exists
    portfolio_manager = db.Portfolio_Managers.find_one({"_id": portfolio_manager_id})
    if portfolio_manager is None:
        return jsonify({'message': 'Portfolio Manager with ID {} does not exist'.format(portfolio_manager_id)})
    
    # Add project to portfolio manager's list of projects
    db.Portfolio_Managers.update_one({"_id": portfolio_manager_id}, {"$push": {"projects": project_id}})
    
    return jsonify({'message': 'Project with ID {} assigned to Portfolio Manager with ID {}'.format(project_id, portfolio_manager_id)})


# --------------------Tasks----------------------------



# Tasks CRUD

@app.route("/addTasks",methods = ['POST'])
def addTasks():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    tasks_data = {
        "id" : generate_project_id(db),
        "TaskName":data["TaskName"],
        "status":data["status"]
    }

    result = db.Tasks.insert_one(tasks_data)
    return jsonify({'message':'Tasks inserted successfully' , 'tasks_id':str(result.inserted_id)})


# Get

@app.route("/Tasks",methods = ['GET'])
def get_tasks():
    db = client["Portfolio_Management_Application"]
    tasks = db.Tasks.find()
    return jsonify([{
        "id" : data["id"],
        "TaskName":data["TaskName"],
        "status":data["status"]
    } for data in tasks])



# Update

@app.route("/Updatetasks/<task_id>",methods=['PUT'])
def update_tasks(task_id):
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    updated_tasks = {
        "TaskName":data["TaskName"],
        "status":data["status"]
    }
    result = db.Tasks.update_one({"id":task_id}, {"$set" : updated_tasks})
    if result.matched_count > 0:
        return jsonify({"message":"Tasks Updated Successfully"})
    else:
        return jsonify({"message":"Tasks not found"})



# Delete

@app.route("/deleteTasks/<task_id>" , methods = ['DELETE'])
def delete_tasks(task_id):
    db = client["Portfolio_Management_Application"]
    result = db.Tasks.delete_one({"id":task_id})
    if result.deleted_count > 0:
        return jsonify({"message":"Tasks deleted successfully"})
    else:
        return jsonify({"message":"Tasks not found"})


# Get by id

@app.route("/getTaskbyId/<task_id>" , methods = ['GET'])
def find_tasks_by_Id(task_id):
    db = client["Portfolio_Management_Application"]
    data = db.Tasks.find_one({"id":task_id})
    if data:
        return jsonify({
       "id" : data["id"],
        "TaskName":data["TaskName"],
        "status":data["status"]
        })
    else:
        return jsonify({"message":"Tasks not found"})


def generate_tasks_id(db):
    last_task = db.Tasks.find_one({}, sort=[('_id', -1)], projection={'id': True})
    if last_task:
        last_id = int(last_task["id"][2:])
        new_id = f"T{str(last_id+1).zfill(3)}"
    else:
        new_id = "T001"
    return new_id



# --------------------Tasks end------------------------







# --------------------Resource-------------------------

# Resource CRUD

@app.route("/addResource",methods = ['POST'])
def addResource():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    resource_data = {
        "id" : generate_resource_id(db),
        "ResourceName":data["ResourceName"]
    }

    result = db.Resource.insert_one(resource_data)
    return jsonify({'message':'Resource inserted successfully' , 'resource_id':str(result.inserted_id)})



# Get

@app.route("/Resource",methods = ['GET'])
def get_resource():
    db = client["Portfolio_Management_Application"]
    resource = db.Resource.find()
    return jsonify([{
        "id" : data["id"],
        "ResourceName":data["ResourceName"]
    } for data in resource])



# Update

@app.route("/Updateresource/<resource_id>",methods=['PUT'])
def update_resource(resource_id):
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    updated_resource = {
        "ResourceName":data["ResourceName"]
    }
    result = db.Resource.update_one({"id":resource_id}, {"$set" : updated_resource})
    if result.matched_count > 0:
        return jsonify({"message":"Resource Updated Successfully"})
    else:
        return jsonify({"message":"Resource not found"})



# Delete

@app.route("/deleteResource/<resource_id>" , methods = ['DELETE'])
def delete_resource(resource_id):
    db = client["Portfolio_Management_Application"]
    result = db.Resource.delete_one({"id":resource_id})
    if result.deleted_count > 0:
        return jsonify({"message":"Resource deleted successfully"})
    else:
        return jsonify({"message":"Resource not found"})


# Get by id

@app.route("/getResourcebyId/<resource_id>" , methods = ['GET'])
def find_resource_by_Id(resource_id):
    db = client["Portfolio_Management_Application"]
    data = db.Resource.find_one({"id":resource_id})
    if data:
        return jsonify({
       "id" : data["id"],
        "ResourceName":data["ResourceName"]
        })
    else:
        return jsonify({"message":"Resource not found"})





def generate_resource_id(db):
    last_task = db.Resource.find_one({}, sort=[('_id', -1)], projection={'id': True})
    if last_task:
        last_id = int(last_task["id"][2:])
        new_id = f"R{str(last_id+1).zfill(3)}"
    else:
        new_id = "R001"
    return new_id


# Developer CRUD


# Create

@app.route("/addDeveloper",methods = ['POST'])
def addDeveloper():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    developer_data = {
        "id" : generate_developer_id(db),
        "DeveloperName":data["DeveloperName"],
        "Projects":[]

    }

    result = db.Developer.insert_one(developer_data)
    return jsonify({'message':'Developer inserted successfully' , 'developer_id':str(result.inserted_id)})



# Get

@app.route("/Developer",methods = ['GET'])
def get_developer():
    db = client["Portfolio_Management_Application"]
    developer = db.Developer.find()
    return jsonify([{
        "id" : data["id"],
        "DeveloperName":data["DeveloperName"],
        "Projects":data["Projects"]
    } for data in developer])



# Update

@app.route("/UpdateDeveloper/<developer_id>",methods=['PUT'])
def update_developer(developer_id):
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    updated_developer = {
        "DeveloperName":data["DeveloperName"]
    }
    result = db.Developer.update_one({"id":developer_id}, {"$set" : updated_developer})
    if result.matched_count > 0:
        return jsonify({"message":"Developer Updated Successfully"})
    else:
        return jsonify({"message":"Developer not found"})



# Delete

@app.route("/deleteDeveloper/<developer_id>" , methods = ['DELETE'])
def delete_developer(developer_id):
    db = client["Portfolio_Management_Application"]
    result = db.Developer.delete_one({"id":developer_id})
    if result.deleted_count > 0:
        return jsonify({"message":"developer deleted successfully"})
    else:
        return jsonify({"message":"developer not found"})


# Get by id

@app.route("/getDeveloperbyId/<developer_id>" , methods = ['GET'])
def find_developer_by_Id(developer_id):
    db = client["Portfolio_Management_Application"]
    data = db.Developer.find_one({"id":developer_id})
    if data:
        return jsonify({
       "id" : data["id"],
        "DeveloperName":data["DeveloperName"],
        "Projects":data["Projects"]
        })
    else:
        return jsonify({"message":"Developer not found"})


# Assign project to developer

@app.route("/assignProjectToDeveloper", methods=['POST'])
def assignProjectToDeveloper():
    db = client["Portfolio_Management_Application"]
    data = request.get_json()
    project_id = data["project_id"]
    portfolio_manager_id = data["portfolio_manager_id"]
    developer_id = data["developer_id"]
    
    # Check if project exists
    project = db.Projects.find_one({"id": project_id})
    if project is None:
        return jsonify({'message': 'Project with ID {} does not exist'.format(project_id)})
    
    # Check if portfolio manager exists
    portfolio_manager = db.Portfolio_Managers.find_one({"_id": portfolio_manager_id})
    if portfolio_manager is None:
        return jsonify({'message': 'Portfolio Manager with ID {} does not exist'.format(portfolio_manager_id)})
    
    # Check if developer exists
    developer = db.Developer_collection.find_one({"id": developer_id})
    if developer is None:
        return jsonify({'message': 'Developer with ID {} does not exist'.format(developer_id)})
    
    # Check if project is in portfolio manager's list of projects
    if project_id not in portfolio_manager["projects"]:
        return jsonify({'message': 'Project with ID {} is not assigned to Portfolio Manager with ID {}'.format(project_id, portfolio_manager_id)})
    
    # Assign project to developer
    db.Projects.update_one({"id": project_id}, {"$set": {"developer_id": developer_id}})
    
    return jsonify({'message': 'Project with ID {} assigned to Developer with ID {}'.format(project_id, developer_id)})


def generate_developer_id(db):
    last_task = db.Developer.find_one({}, sort=[('_id', -1)], projection={'id': True})
    if last_task:
        last_id = int(last_task["id"][2:])
        new_id = f"D{str(last_id+1).zfill(3)}"
    else:
        new_id = "D001"
    return new_id



if __name__ == "__main__":
    app.run(port=8088)