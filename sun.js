function $(id) { var a = document.getElementById(id); return a; }

sun={};
sun.headers =  [["content-type","application/x-www-form-urlencoded"],["Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"],["User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7"],["Accept-Language","ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4"],["Accept-Charset","windows-1251,utf-8;q=0.7,*;q=0.3"],["Accept-Encoding", "gzip, deflate"],["If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT"]];

sun.ajax=function (obj) {
if(typeof obj.lamp!='undefined') { obj.lamp.style.backgroundColor='red'; }
var send='';
var a=0;
var b='';
var tmp_add='&';
var method='POST';
if( typeof obj.data != 'undefined') {
var tmp_arr=obj.data[0];
for(var prop in tmp_arr) {
a++; if(a==sun.hlen(tmp_arr)) { tmp_add='';}
send+=prop+'='+tmp_arr[prop]+tmp_add; } }
var est = new XMLHttpRequest();
if(typeof obj.method != 'undefined') { method=obj.method; }
est.open( method, obj.url, true );
for(var i=0; i<sun.headers.length; i++) {
est.setRequestHeader(sun.headers[i][0],sun.headers[i][1]);}
est.send(send);
est.onreadystatechange= function() { 
if (est.readyState == 4) {
if(est.status!=500) { 
if( typeof obj.b != 'undefined' ) { b=obj.b; }
var req=est.responseText;
if(typeof obj.lamp!='undefined') { obj.lamp.style.backgroundColor='green';
 }
if(typeof obj.delay !='undefined') {
setTimeout(function() { if(obj.lamp!='undefined') {  }
obj.ok(req, est.status,b); }, (1*obj.delay)); 
 
 }
else {

obj.ok(req, est.status,b);

 }}
if(est.status==500) {  obj.ok('', est.status,'...'); }
 }
}
}
/*                               bar                       */
sun.bar={};
sun.bar.value=function(idbar, idbor) {
var t='<div class="bBorder" id="'+idbor+'"><div class="bBar" id="'+idbar+'"></div></div>';
return t;}

sun.bar.count=0;
sun.bar.m=function() {
sun.bar.count++;
return sun.bar.count; };
sun.bar.create=function(o) {
var i=sun.bar.m;
var a='Bbarmen'+i;
var c='Bborder'+i;
var b = sun.bar.value(a,c);
o.parent.innerHTML=b;
var border=$(c);
var barmen=$(a);
barmen.style.width=0;
barmen.style.height=o.height;
border.style.height=o.height;
border.style.width=o.width;
return [barmen,border];
};
sun.bar.part=function(all,part,b) {
var q=parseInt(b[1].style.width);
var p=((part*100)/all);
var x=((p*q)/100);
b[0].style.width=x;
};

/*                              functions                                  */
sun.fn={};
sun.hlen=function(o) {
var i=0;
for(var prop in o) { i++; }
return i; 
};

sun.fn.getD=function(txt,str) {
var begin = '<'+str+'>';
var end='</'+str+'>';
var txt = txt.substring( (txt.indexOf(begin)+begin.length), txt.indexOf(end));
return txt; } 
sun.ar={};
sun.ar.clear=function (obj) {
var a=[];
var b = 0;
var len = obj.length;
for(var i = 0; i<len; i++) {
if(obj[i].length>1) {
a[b]=obj[i]; b++; } }
return a; }
sun.ar.exception=function(o) {
var main=o.main;
var part=o.part;
var len_main=main.length;
var len_part=part.length;
for(var i=0; i<len_main; i++) {
for(var y=0; y<len_part; y++) {
if(main[i]==part[y]) { main[i]=''; }
}
}

var t=sun.ar.clear(main);
return t;
}


sun.fn.getClass=function(classList) {		
var list,length,classArray,classes;
var node = node || document;
list = node.getElementsByTagName('*');
length = list.length;
classArray = classList.split(/\s+/);
classes = classArray.length;
var result = [], i,j;
for(i = 0; i < length; i++) {
for(j = 0; j < classes; j++)  {
if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
result.push(list[i]);
break;
}
}
}

return result;
}
sun.json={};
sun.json.toString=function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
    // simple data type
    if (t == "string") obj = '"'+obj+'"';
    return String(obj);
    }
    else {
    // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);
    for (n in obj) {
    v = obj[n]; t = typeof(v);
    if (t == "string") v = '"'+v+'"';
    else if (t == "object" && v !== null) v = JSON.stringify(v);
    json.push((arr ? "" : '"' + n + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
    };
sun.json.parse= function (str) {
    if (str === "") { str = '""'; }
    eval("var p=" + str + ";");
	return p;
    };
sun.button={};
sun.button.count=0;
sun.button.i=function() { sun.button.count++; return 'sunbutton'+sun.button.count; }
sun.button.create=function(o) { // { text: 'click me', parent: html.obj, fn: somefun}
var t=sun.button.i;
var txt = ''; 
if(typeof o.text != 'undefined' ) { txt = o.text; }
var but = '<a href="#" class="but white-orange normal" ><b id="'+t+'">'+txt+'</b></a>';
o.parent.innerHTML=but;

if(typeof o.fn!='undefined') {
o.parent.onclick=o.fn;}
return $(t);
};

sun.hide=function(o) {
o.style.visibility="hidden";
}
sun.show=function(o) {
o.style.visibility="visible";
}
sun.pop={};
sun.pop.arr={};
// {'id_of_el':'hid'}


sun.pop.add=function(id) {

var obj = $(id);

var cls = obj.className;
sun.pop.arr[id]={cls:cls, obj: obj};
return obj;
}


sun.pop.tog=function(id) {
var ch=0;
if(sun.pop.arr[id].cls=='hid') {
 sun.pop.arr[id].obj.className="visib"; 
sun.pop.lock.className="LockOn";
 ch=1;sun.pop.arr[id].cls="visib";}
if(sun.pop.arr[id].cls=='visib'&&ch==0) { 
sun.pop.arr[id].obj.className="hid";
sun.pop.lock.className="LockOff";

sun.pop.arr[id].cls="hid"; }
}
