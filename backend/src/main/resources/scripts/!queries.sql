--Текущий баланс  пользователя с email
select sum from wallets w
where w.user_id = (select user_id from users where email='shutovna1987@gmail.com');

--Текущий баланс системы
select sum from wallets w
where w.user_id = (select user_id from users where email='system@moyserf.ru');

--Изменение баланса пользователя
update wallets
set sum=100*100
where user_id = (select user_id from users where email='system@moyserf.ru');