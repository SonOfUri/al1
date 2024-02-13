// Compiled with JS++ v.0.10.0

!function(){var f=(Object.hasOwnProperty('create'))?Object.create:function(p){function f(){}f.prototype=p;return new f();};function g(h,m){h=h+'';m=m|0;return(m>=0&&m<h.length?h.charCodeAt(m)&65535:void 0);}var p={q:'System.Date?',u:true,w:function(z){return(!!(z instanceof System.Date));},B:function(C){if(C==null){return('null');}return(D.call(C)+'');},F:[],G:function(){return(p);}};var H={q:'System.Date',u:false,w:function(I){return(!!(I instanceof System.Date));},B:function(J){return(D.call(J)+'');},F:[],G:function(){return(p);}};var Themes;Themes={getCurrentTheme:function(){var theme=Sily.WebStorage.getOrInitCookie("theme","void")+'';var css=document.createElement("link");css.rel="stylesheet";css.type="text/css";css.href="/web/css/theme-mars.css";switch(theme){case "mars":css.href="/web/css/theme-mars.css";break;case "void":css.href="/web/css/theme-void.css";break;case "automata":css.href="/web/css/theme-automata.css";break;default:Sily.WebStorage.setCookie("theme","void",365);}document.getElementsByTagName('head')[0].appendChild(css);return(theme+'');}};var Sily;Sily={};Sily.WebStorage={setCookie:function(cname,cvalue,exdays){cname=cname+'';cvalue=cvalue+'';exdays=exdays|0;var d=new System.Date(); +d.mDate.setTime( +d.mDate.getTime()+exdays*24*60*60*1000);var expires="expires="+(D.call(d)+'')+'';document.cookie=cname+"="+cvalue+"\;"+expires+"\;path=/";},getCookie:function(cname){cname=cname+'';var name=cname+'=';var K=document.cookie;var L=K!=null?K+'':'';var M=System.Encoding.URI.decodeURIComponent(L)+'';var decodedCookie=M+'';var ca=decodedCookie.split("\;");var N=ca;for(var i=0;i<(N.length|0); ++i){var P=ca;var Q=i|0;var R=P[Q];var S=(R!=null?R:"")+'';var c=S+'';while(g(c,0)==32){c=c.substring(1)+'';}if((c.indexOf(name)|0)==0){var U=c+'';var V=name+'';var W=V.length|0;var X=c+'';var Y=X.length|0;var Z=U.substring(W,Y)+'';return(Z+'');}}return('');},getOrInitCookie:function(cname,cdef){cname=cname+'';var c=Sily.WebStorage.getCookie(cname)+'';if(c==""){c=cdef!=null?cdef+'':'';Sily.WebStorage.setCookie(cname,c,365);}return(c+'');}};var System;System={};System.Exceptions={};System.Exception=function(message,aa){this.mMessage='';message=message+'';aa=aa+'';this.mMessage=message+'';this.stack=aa;};System.Exception.prototype.ab="System.Exception";System.Exception.prototype.getMessage=ac;function ac(){return(this.mMessage+'');}System.Exception.prototype.toString=ad;function ad(){return(this.ab+': '+ac.call(this));}System.Exceptions.InvalidURIException=function(message,ae){System.Exception.call(this,message,ae);message=message+'';ae=ae+'';};System.Exceptions.InvalidURIException.prototype=f(System.Exception.prototype);System.Exceptions.InvalidURIException.prototype.ab="System.Exceptions.InvalidURIException";System.Error=function(af){this.mMessage='';af=af+'';this.mMessage="";this.stack=af;};System.Error.prototype.ab="System.Error";System.Error.prototype.toString=ag;function ag(){return(this.ab+': '+ac.call(this));}System.Date=function(){this.mDate=void 0;this.mDate=new Date();};System.Date.prototype.ab="System.Date";System.Date.prototype.toString=D;function D(){var week=ah.call(this)+'';var month=ai.call(this)+'';var aj=this.mDate.getDate()|0;var ak=(aj<10?'0'+aj:aj+'')+'';var day=ak+'';var al=this.mDate.getFullYear()|0;var am=al+'';var yeah=am+'';var an=this.mDate.getHours()|0;var ao=(an<10?'0'+an:an+'')+'';var hour=ao+'';var ap=this.mDate.getMinutes()|0;var aq=(ap<10?'0'+ap:ap+'')+'';var min=aq+'';var ar=this.mDate.getSeconds()|0;var as=(ar<10?'0'+ar:ar+'')+'';var sec=as+'';var offset=at.call(this)+'';return(week+' '+month+' '+day+' '+yeah+' '+hour+':'+min+':'+sec+' UTC'+offset+'');}function at(){var rawOffsetWithSign=this.mDate.getTimezoneOffset()|0;var sign=(rawOffsetWithSign>0?"-":"+")+'';var rawOffset=Math.abs(rawOffsetWithSign)|0;var au=rawOffset|0;var av= +(au/60);var aw= +Math.floor(av);var ax=aw|0;var ay=(ax<10?'0'+ax:ax+'')+'';var hours=ay+'';var az=rawOffset|0;var aA=az%60|0;var aB=(aA<10?'0'+aA:aA+'')+'';var minutes=aB+'';return(sign+hours+minutes+'');}function ah(){switch(this.mDate.getDay()|0){case 0:return('Sun');case 1:return('Mon');case 2:return('Tue');case 3:return('Wed');case 4:return('Thu');case 5:return('Fri');case 6:return('Sat');default:return('');}}function ai(){switch(this.mDate.getMonth()|0){case 0:return('Jan');case 1:return('Feb');case 2:return('Mar');case 3:return('Apr');case 4:return('May');case 5:return('Jun');case 6:return('Jul');case 7:return('Aug');case 8:return('Sep');case 9:return('Oct');case 10:return('Nov');case 11:return('Dec');default:return('');}}System.Encoding={};System.Encoding.URI={decodeURIComponent:function(uriComponent){uriComponent=uriComponent+'';try{return(decodeURIComponent(uriComponent));}catch(aC){if(!(aC instanceof System.Exception||aC instanceof System.Error)){var aD=aC;var aE=aD.message;var aF=aE!=null?aE+'':'';throw(new System.Exceptions.InvalidURIException(aF,new Error().stack));}else {throw(aC);}}}};!function(){function loadWallpaper(){var wallpaper=Sily.WebStorage.getOrInitCookie("background","6")+'';var url="url(\"/assets/images/backgrounds/ocback"+wallpaper+'.gif\")';$("#page").css("background-image",url);}var theme=Themes.getCurrentTheme()+'';switch(theme){case "mars":loadWallpaper();break;case "void":loadWallpaper();break;default:break;}}();}();