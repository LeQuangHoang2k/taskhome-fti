create database taskhome
use taskhome

create table Account(
	AccountId int(10) not null auto_increment,
    Username varchar(50),
    PasswordHash varchar(60),
    AccountName varchar(50),
    AccountRole varchar(50),
    Primary Key (AccountId)
)

create table Cart(
	CartId int(10) not null auto_increment,
	AccountId int(10),
    Primary Key (CartId)
)

create table OrderDetail(
	Id int(10) not null auto_increment,
    CartId int(10),
	ProductId int(10),
    Amount int(10),
    Primary Key (Id)
)

create table Product(
	ProductId int(10) not null auto_increment,
    ProductType varchar(50),
	ProductName varchar(50),
    ProductImage varchar(50),
    ProductPrice int(50),
    ProductAmount int(10),
    Primary Key (ProductId)
)

ALTER TABLE Cart ADD FOREIGN KEY (AccountId) REFERENCES Account(AccountId);
ALTER TABLE OrderDetail ADD FOREIGN KEY (CartId) REFERENCES Cart(CartId);
ALTER TABLE OrderDetail ADD FOREIGN KEY (ProductId) REFERENCES Product(ProductId);
