use ORGANICSHOP
go
delete from Products;
insert into Products(name, description, cost, photo) values
('YELLOW PAPPER', 'yummmy and sunny', 1, 'https://sun2.dataix-by-minsk.userapi.com/RekF1pUGayaJMpFlB4FwG2KKC_1EifpsFcavjQ/PHl3gAnX6T8.jpg'),
('CIABATTA BREAD', 'LOVELOVELOVE', 1, 'https://sun2.dataix-by-minsk.userapi.com/QIsXLVODndcUNefjT3V-2emorTgC1hrOkrzagw/t0AA0fWWiyY.jpg')


select * from Products;	
select * from Users;

select p3.name , p2.count from orders p1 inner join orderedProducts p2 on p1.Id = p2.OrderId inner join products p3 on p2.ProductId = p3.Id where p1.UserId = 1 ; count(p2.count), group by p3.name;