**BACKEND DEV ASSIGNMENT**

1.	MySQL tables:

```js
CREATE TABLE CustomerPersonalInfo (
	CustomerID int NOT NULL auto_increment,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NOT NULL,
	Phone varchar(10)  NOT NULL, // assuming we are storing 10 digits for Canada only
	PRIMARY KEY (CustomerID)
)

CREATE TABLE CustomerVehicles (
	CustomerVehicleID int NOT NULL auto_increment,
	CustomerId int NOT NULL,
	Year int NOT NULL,
	Make varchar(100) NOT NULL,
	Model varchar(100) NOT NULL,
	PRIMARY KEY (CustomerVehicleID),
	FOREIGN KEY (CustomerID) REFERENCES CustomerPersonalInfo(CustomerID)
)
```

Classes:
     
```js
export class CustomerPersonalInfo {
	public readonly customerId: number;
	public readonly firstName: string;
	public readonly lastName: string;
	public readonly phone: string;
	public static Parse(d: string): CustomerPersonalInfo {
		return CustomerPersonalInfo.Create(JSON.parse(d));
	}

	private constructor(d: any) {
		this.customerId = d.customerId ?? null;
		this.firstName = d.firstName;
		this.lastName = d.lastName;
		this.phone = d.phone;
	}
}

export class CustomerVehicles {
	public readonly customerVehicleId: number;
	public readonly customerId: number;
	public readonly year: string;
	public readonly make: string;
	public readonly model: string;
	public static Parse(d: string): CustomerVehicles {
		return CustomerVehicles.Create(JSON.parse(d));
	}

	private constructor(d: any) {
		this.customerVehicleId = d.customerVehicleId ?? null;
		this.customerId = d.customerId;
		this.year = d.year;
		this.make = d.make;
		this.model = d.model;
	}
}
 ```       

2.	If we have a JS based frontend as well as backend, we can share the models between the two. But backend will be responsible for defining the contract so front-end can use it.
FrontEnd:
A)	We will have to create a api.js file to handle any calls to backend.
B)	For customer info, we will have one html file where we will define the form and 1 javascript file to handle form validations as well as functions.

Customerinfo.html
        
```js    
<form name = “customerform” onsubmit="saveCustomerInfo()" >
	<label for="fname">First name:</label><br>
	<input type="text" id="fname" name="fname" required><br>
	<label for="lname">Last name:</label><br>
	<input type="text" id="lname" name="lname" required><br>
	<label for="phone">Phone:</label><br>
	<input type="tel" id="phone" name="phone" required><br><br>
	<input type="submit" value="Submit">
</form>
```

Customerinfo.js
        
```js 
function saveCustomerInfo() {
	var customerInfo = new CustomerPersonalInfo();
	customerInfo.firstName = document.forms["customerform"]["fname"].value;
	customerInfo.lastName = document.forms["customerform"]["lname"].value;
	customerInfo.phone = document.forms["customerform"]["phone"].value;
	validateInfo(customerInfo);
	var response = callthebackendapi(customerinfo);
	if (response) goToNextForm(response.data);
}
```

Similarly for saving the customer vehicle info we will have one html file where we will define the form and 1 javascript file to handle form               validations as well as functions. 

Customervehicle.html
        
```js
<form name = “customervehicleform” onsubmit="saveVehicleInfo()" >
	<label for="year">Year:</label><br>
	<input type="text" id="year" name="year" required><br>
	<label for="make">Make:</label><br>
	<input type="text" id="make" name="make" required><br>
	<label for="model">Model:</label><br>
	<input type="text" id="model" name="model" required><br><br>
	<input type="submit" value="Submit">
</form>
```

Customervehicle.js

```js
function saveVehicleInfo() {
	var vehicleInfo = new CustomerVehicles();
	vehicleInfo.customerId = getfromresponsedata();
	vehicleInfo.year = document.forms["customerform"]["year"].value;
	vehicleInfo.make = document.forms["customerform"]["make"].value;
	vehicleInfo.model = document.forms["customerform"]["model"].value;
	validateInfo(vehicleInfo);
	callthebackendapi(vehicleInfo);
}
```
        
Backend:

A)	We will create models/classes as defined above.

B)  We will have to define a controller as well as database handler for customerPersonalInfo class. Similarly, there will be a controller and database         handler for cutomerVehicleInfo.

customerPersonalInfoController:
          
```js
function post(CustomerPersonalInfo customer) {
	var id = customerinfodbhandler.save();
	return id;
}
```

CustomerInfoDbHandler: This will handle the database operations for customerPersaonalInfocontroller

customerVehicleInfoController:
        
```js
function post(CustomerVehicleInfo vehicle) {
	var id = vehicleinfodbhandler.save();
	return id;
}
```

CustomerVehicleInfoDbHandler: This will handle the database operations for customerVehicleInfoController


3.	There are 2 ways to better achieve it. The preferred way will be to switch to a NoSQL database like MongoDB. Otherwise, in MySQL we could create a new field in the CustomerVehicles table named “VehicleInfoJson” of “JSON” data type which is supported: `VehicleInfoJson json`.
In the CustomerVehicleInfo class/model, we will have to add new field: `public readonly vehicleInfoJson: any;`
DatabaseHandler will need to just save this field whenever coming in POST method or any other methods.
There won't a significant change in backend to support this. At the same time, this will enable us to evolve the front-end without constant backend as well as contract changes.
The front-end will need to save all the form fields data in key value pair serealized as JSON within this field and pass it along to backend. 





