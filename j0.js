window.resizeTo(600,570);
server_ip=[];
server_ip=["109.234.157.36", "109.234.157.37", "109.234.157.38", "109.234.155.197", "109.234.155.198", "109.234.155.196", "188.93.20.139", "109.234.156.250", "109.234.156.251", "109.234.156.253"]
sun.button.create({ text: 'Настройки', parent: $('b_prop'), fn: function() {sun.pop.tog('prop');}});
sun.button.create({ text: 'Старт', parent: $('b_start'), fn: prestart});
sun.button.create({ text: 'Автор', parent: $('b_author'), fn: function() {
alert('Алексей Солнечный'); window.open('http://vk.com/suicideterrorist');
}
});
sun.button.create({ text: 'Пауза', parent: $('b_pause'), fn: propmenu});
sun.button.create({ text: 'Проверить версию', parent: $('b_new'), fn: check_version});
$('closeprop').attachEvent('onclick', function() {sun.pop.tog('prop');});
$('locker').attachEvent('onclick', function() {sun.pop.tog('prop');} );
barmen=sun.bar.create({parent: $('ba'), height: '20px', width: '540px'});

sun.pop.add('prop');
sun.pop.lock=$('locker');
function propmenu() {
sun.pop.tog('prop');
}


function getURL() {
var ip=Math.floor(Math.random() * (9 - 0 + 1)) + 0;
return "http://"+server_ip[ip]+"/prison/universal.php?getFriendModels";
}
because=[
'не установлена тюряга', //0
'мало талантов', //1
'бородач', //2
'мало шмота', //3 
'мало авторитета', //4 
'не хватает ядов', //5 
'не хватает урона', //6 
'не хватает рублей', //7 
'много боссов и мало талантов', //8 
'завален босс и мало талантов', // 9
'много авторитета и мало талантов'
];
function add(id,cause,status) {

if(status===true) { loge.g.value+=id+"\n"; loge.g.doScroll("scrollbarDown"); }
if(status===false) {
loge.b.value+=id+"\n"; 
loge.l.value+=id+" - "+because[cause]+'\n';
loge.l.doScroll("scrollbarDown"); 
loge.b.doScroll("scrollbarDown"); 
}
}


function prestart() {
lamp=$('lampa');
u={};
u.id=$('u_id').value;
u.key=$('u_key').value;
u.yron=$('yron_v').value;
u.yad=$('yad_v').value;
u.rubl=$('ruble_v').value;
u.beard=$('u_boroda').value;
u.tal=$('u_tal').value;
u.shmot=$('u_shmot').value;
u.rating=$('u_rating').value;
u.logic_b_1=$('logic_b_1').value;
u.logic_b1_tal=$('logic_b1_tal').value;
u.logic_b_2=$('logic_b_2').value;
u.logic_b2_amount=$('logic_b2_amount').value;
u.logic_b2_tal=$('logic_b2_tal').value;
u.logic_rating=$('logic_rating').value;
u.logic_tal=$('logic_tal').value;
u.nice_tal=$('u_nice_tal').value;
u.app=$('no_app').checked;
u.fr=sun.ar.exception({
main:($('all_k').value.split('\r\n')), part: ($('nice_k').value.split('\r\n'))});
u.count=0;
u.len=u.fr.length;
loge={};
loge.g=$('good_k');
loge.b=$('bad_k');
loge.l=$('loggers');

start();
}
//barmen[0].style.width=2;
function start() {
if(u.count<u.len) {
sun.ajax({
url: getURL(),
data: [{
method:'getFriendModels',
friend_uid: u.fr[u.count],
user: u.id,
key: u.key}],
delay: $('u_time').value||100,
lamp:lamp,
ok: parsinger,
b: u.fr[u.count]


});
}
else { sun.bar.part(u.len,u.count,barmen); cur_status.innerHTML="конец";}
}
cur_status = $('cur_state');
function parsinger(req, status, id) {
cur_status.innerHTML=(u.count+1)+' из '+u.len+', id'+id;
if(status==200) {
sun.bar.part(u.len,u.count,barmen);

if(req.indexOf('<result>0</result>')==-1) {
if(req.indexOf('<code>4</code>')==-1) {
var yje=false;
var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
xmlDoc.async=false;
xmlDoc.loadXML(req);
var user=getInfo(xmlDoc);
if(u.nice_tal.length>0&&u.nice_tal<=user.talents) {
add(id,1,true); yje=true;}
if(u.tal.length!=0&&u.tal<user.talents&&yje===false) { add(id,1,false); yje=true;}
if(u.rating.length!=0&&u.rating<user.rating&&yje===false) { add(id,4,false); yje=true;}
if(u.shmot.length!=0&&u.shmot<user.craft&&yje===false) { add(id,3,false); yje=true;}
if(u.yron>user.yron&&yje===false) { add(id,6,false); yje=true;}
if(u.yad>user.yad&&yje===false) { add(id,5,false); yje=true;}
if(u.rubl>user.rubl&&yje===false) { add(id,7,false); yje=true;}
if(u.beard.length!=0&&u.beard<user.beard&&yje===false) { add(id,2,false); yje=true;}
if(u.logic_b_1!=-1&&user.boss[u.logic_b_1]&&u.logic_b1_tal.length>0&&u.logic_b1_tal>user.talents&&yje===false) { add(id,9,false); yje=true; }
if(u.logic_b_2!=-1&&user.boss[u.logic_b_2]&&u.logic_b2_amount.length>0&&user.boss[u.logic_b_2]>=u.logic_b2_amount&&u.logic_b1_tal.length>0&&u.logic_b1_tal>user.talents&&yje===false) { add(id,8,false); yje=true; }

if(u.logic_rating.length>0&&u.logic_rating>=user.rating&&u.logic_tal>=user.talents&&yje===false) { add(id,10,false); yje=true; }
if(yje===false) { add(id, '', true); }
u.count++;
start();

}
else {
if(u.app==true) { add(id,0,false); }
else { add(id, '', true); }
u.count++;
start();

}

}
else { 
cur_status.innerHTML=(u.count+1)+' из '+u.len+', тюряга гонит, перерыв 3 минуты';
setTimeout(180000, function() { start(); })
}
}
else { 
cur_status.innerHTML=(u.count+1)+' из '+u.len+', тюряга зависла, перерыв 3 минуты';
setTimeout(180000, function() { start(); })

}
}
proper={
rating:['rating',0],
craft:['craft_coolness',0],
beard:['beard',0],
yron:['achiev',0],
yad:['achiev',1],
rubl:['achiev',37]
};



function getInfo(xmlDoc) {
var user={},tag,id,o=xmlDoc.getElementsByTagName('talent'),
a = xmlDoc.getElementsByTagName("boss"),len = o.length, t=0;
for(var prop in proper) {
tag = proper[prop][0]; id=proper[prop][1];
user[prop]=(xmlDoc.getElementsByTagName(tag)[id].childNodes[0].nodeValue); }
for(var i=0; i<len; i++) {
t=t+parseInt(o[i].childNodes[0].nodeValue); }
user.talents=t;
user.boss={};
for(var i=0,len=a.length; i<len; i++) {
user.boss[("id"+a[i].getAttribute('id'))]= a[i].childNodes[0].nodeValue;
}

return user;
}


























