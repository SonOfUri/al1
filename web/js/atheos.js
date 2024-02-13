// Compiled with JS++ v.0.10.0

!function(){var f=(Object.hasOwnProperty('create'))?Object.create:function(p){function f(){}f.prototype=p;return new f();};function m(p,q){p=p+'';q=q|0;return(q>=0&&q<p.length?p.charCodeAt(q)&65535:void 0);}function B(C,D){C=C+'';var i=0;return(C.replace(new RegExp('%([sdc%\\d])','g'),(function(matched,submatches){ ++i;switch(submatches[0]){case "%":return("%");case "d":case "s":return((D[i-1]||"").toString());default:return((D[submatches[0]|0]||"").toString());}})));}function F(G,H){G=G+'';var stringified=[];for(var I=0;I<(H.length|0); ++I){var J=H[I];var o=J;stringified.push(o.toString()+'');}return(B(G,stringified)+'');}var K={L:'System.String',M:false,N:function(P){return(!!(P instanceof System.String));},Q:function(R){return(R.mValue+'');},S:[],U:function(){return(V);}};var W={L:'System.Date?',M:true,N:function(X){return(!!(X instanceof System.Date));},Q:function(Y){if(Y==null){return('null');}return(Z.call(Y)+'');},S:[],U:function(){return(W);}};var aa={L:'System.Date',M:false,N:function(ab){return(!!(ab instanceof System.Date));},Q:function(ac){return(Z.call(ac)+'');},S:[],U:function(){return(W);}};var V={L:'System.String?',M:true,N:function(ad){return(!!(ad instanceof System.String));},Q:function(ae){if(ae==null){return('null');}return(this.mValue+'');},S:[],U:function(){return(V);}};var af={L:'System.Integer32?',M:true,N:function(ag){return(!!(ag instanceof System.Integer32));},Q:function(ah){if(ah==null){return('null');}return(this.mValue+'');},S:[],U:function(){return(af);}};var ai={L:'System.Integer32',M:false,N:function(aj){return(!!(aj instanceof System.Integer32));},Q:function(ak){return(ak.mValue+'');},S:[],U:function(){return(af);}};var al={L:'double?',M:true,N:function(am){return(false);},Q:function(an){if(an==null){return('null');}return(an+'');},S:[],U:function(){return(al);}};var ao={L:'double',M:false,N:function(ap){return(false);},Q:function(aq){aq= +aq;return(aq+'');},S:[],U:function(){return(al);}};var System;System={};System.Object=function(){};System.Object.prototype.ar="System.Object";System.Object.prototype.toString=as;function as(){return('[object '+this.ar+']');}System.String=function(initialValue){System.Object.call(this);this.mValue="";initialValue=initialValue+'';this.mValue=initialValue+'';};System.String.prototype=f(System.Object.prototype);System.String.prototype.ar="System.String";System.String.prototype.toString=at;function at(){return(this.mValue+'');}System.Integer32=function(initialValue){System.Object.call(this);this.mValue=0|0;initialValue=initialValue|0;this.mValue=initialValue|0;};System.Integer32.prototype=f(System.Object.prototype);System.Integer32.prototype.ar="System.Integer32";System.Integer32.prototype.toString=au;function au(){return(this.mValue+"");}System.Exceptions={};System.Exception=function(message,av){this.mMessage='';message=message+'';av=av+'';this.mMessage=message+'';this.stack=av;};System.Exception.prototype.ar="System.Exception";System.Exception.prototype.getMessage=aw;function aw(){return(this.mMessage+'');}System.Exception.prototype.toString=ax;function ax(){return(this.ar+': '+aw.call(this));}System.Exceptions.InvalidURIException=function(message,ay){System.Exception.call(this,message,ay);message=message+'';ay=ay+'';};System.Exceptions.InvalidURIException.prototype=f(System.Exception.prototype);System.Exceptions.InvalidURIException.prototype.ar="System.Exceptions.InvalidURIException";System.Exceptions.CastException=function(message,az){System.Exception.call(this,message,az);message=message+'';az=az+'';};System.Exceptions.CastException.prototype=f(System.Exception.prototype);System.Exceptions.CastException.prototype.ar="System.Exceptions.CastException";System.Errors={};System.Error=function(aA){this.mMessage='';aA=aA+'';this.mMessage="";this.stack=aA;};System.Error.prototype.ar="System.Error";System.Error.prototype.toString=aB;function aB(){return(this.ar+': '+aw.call(this));}System.Errors.AssertError=function(aC){System.Error.call(this,aC);aC=aC+'';};System.Errors.AssertError.prototype=f(System.Error.prototype);System.Errors.AssertError.prototype.ar="System.Errors.AssertError";function aD(numberAsStr,defaultValue){numberAsStr=numberAsStr+'';defaultValue= +defaultValue;var res= +numberAsStr;if(0==res){return( +(numberAsStr.replace(new RegExp('^[\\s\\xA0\\uFEFF]+'),"").replace(new RegExp('[\\s\\xA0\\uFEFF]+$'),"")?res:defaultValue));}else if(!isFinite(res)){var trimmed=numberAsStr.replace(new RegExp('^[\\s\\xA0\\uFEFF]+'),"").replace(new RegExp('[\\s\\xA0\\uFEFF]+$'),"")+'';var resAsStr=res+'';return( +(trimmed==resAsStr||trimmed=='+'+resAsStr?res:defaultValue));}else {return( +(!isNaN(res)||numberAsStr.replace(new RegExp('^[\\s\\xA0\\uFEFF]+'),"").replace(new RegExp('[\\s\\xA0\\uFEFF]+$'),"")==res+""?res:defaultValue));}}System.Date=function(){this.mDate=void 0;this.mDate=new Date();};System.Date.prototype.ar="System.Date";System.Date.prototype.toString=Z;function Z(){var week=aE.call(this)+'';var month=aF.call(this)+'';var aG=this.mDate.getDate()|0;var aH=(aG<10?'0'+aG:aG+'')+'';var day=aH+'';var aI=this.mDate.getFullYear()|0;var aJ=aI+'';var yeah=aJ+'';var aK=this.mDate.getHours()|0;var aL=(aK<10?'0'+aK:aK+'')+'';var hour=aL+'';var aM=this.mDate.getMinutes()|0;var aN=(aM<10?'0'+aM:aM+'')+'';var min=aN+'';var aO=this.mDate.getSeconds()|0;var aP=(aO<10?'0'+aO:aO+'')+'';var sec=aP+'';var offset=aQ.call(this)+'';return(week+' '+month+' '+day+' '+yeah+' '+hour+':'+min+':'+sec+' UTC'+offset+'');}function aQ(){var rawOffsetWithSign=this.mDate.getTimezoneOffset()|0;var sign=(rawOffsetWithSign>0?"-":"+")+'';var rawOffset=Math.abs(rawOffsetWithSign)|0;var aR=rawOffset|0;var aS= +(aR/60);var aT= +Math.floor(aS);var aU=aT|0;var aV=(aU<10?'0'+aU:aU+'')+'';var hours=aV+'';var aW=rawOffset|0;var aX=aW%60|0;var aY=(aX<10?'0'+aX:aX+'')+'';var minutes=aY+'';return(sign+hours+minutes+'');}function aE(){switch(this.mDate.getDay()|0){case 0:return('Sun');case 1:return('Mon');case 2:return('Tue');case 3:return('Wed');case 4:return('Thu');case 5:return('Fri');case 6:return('Sat');default:return('');}}function aF(){switch(this.mDate.getMonth()|0){case 0:return('Jan');case 1:return('Feb');case 2:return('Mar');case 3:return('Apr');case 4:return('May');case 5:return('Jun');case 6:return('Jul');case 7:return('Aug');case 8:return('Sep');case 9:return('Oct');case 10:return('Nov');case 11:return('Dec');default:return('');}}System.Assert={void_assert_PB_bool_PE:function(condition){condition=!!condition;if(!condition)throw(new System.Errors.AssertError(new Error().stack));}};System.Encoding={};System.Encoding.URI={decodeURIComponent:function(uriComponent){uriComponent=uriComponent+'';try{return(decodeURIComponent(uriComponent));}catch(aZ){if(!(aZ instanceof System.Exception||aZ instanceof System.Error)){var ba=aZ;var bb=ba.message;var bc=bb!=null?bb+'':'';throw(new System.Exceptions.InvalidURIException(bc,new Error().stack));}else {throw(aZ);}}}};var sily;sily={};sily.web={};sily.web.storage={setCookie:function(cname,cvalue,exdays){cname=cname+'';cvalue=cvalue+'';exdays=exdays|0;var d=new System.Date(); +d.mDate.setTime( +d.mDate.getTime()+exdays*24*60*60*1000);var expires="expires="+(Z.call(d)+'')+'';document.cookie=cname+"="+cvalue+"\;"+expires+"\;path=/";},getCookie:function(cname){cname=cname+'';var name=cname+'=';var bd=document.cookie;var be=bd!=null?bd+'':'';var bf=System.Encoding.URI.decodeURIComponent(be)+'';var decodedCookie=bf+'';var ca=decodedCookie.split("\;");var bg=ca;for(var i=0;i<(bg.length|0); ++i){var bh=ca;var bi=i|0;var bj=bh[bi];var bk=(bj!=null?bj:"")+'';var c=bk+'';while(m(c,0)==32){c=c.substring(1)+'';}if((c.indexOf(name)|0)==0){var bl=c+'';var bm=name+'';var bn=bm.length|0;var bo=c+'';var bp=bo.length|0;var bq=bl.substring(bn,bp)+'';return(bq+'');}}return("");},getOrInitCookie:function(cname,cdef){cname=cname+'';var c=sily.web.storage.getCookie(cname)+'';if(c==""){c=cdef!=null?cdef+'':'';sily.web.storage.setCookie(cname,c,365);}return(c+'');}};function br(){return(new sily.math.Vector2(ao,sily.conv.double_to_PB__Double_external_PE(0,window.innerWidth),sily.conv.double_to_PB__Double_external_PE(0,window.innerHeight)));}function void_href_PB_string_PE(_href){_href=_href+'';window.location.replace(_href);}function string_href_PB_PE(){return(sily.conv.string_to_PB__String_external_PE(0,window.location.href)+'');}sily.math={lerp:function(v0,v1,t){v0= +v0;v1= +v1;t= +t;return( +(v0*(1-t)+v1*t));}};sily.math.Vector2=function(bs,_x,_y){this.bt=bs;this.ar='sily.math.Vector2<'+bs.L+'>';this.x=void 0;this.y=void 0;this.x=_x;this.y=_y;};sily.math.Vector2.prototype.ar="sily.math.Vector2";sily.math.Vector2.prototype.toString=bu;function bu(){return("\("+this.bt.Q(this.x)+", "+this.bt.Q(this.y)+')');}sily.conv={double_to_PB__Double_external_PE:function(type,from){var bv=""+from;var bw=bv!=null?bv+'':'';var bx= +aD(bw,0);return( +bx);},string_to_PB__String_external_PE:function(type,from){var by=from.toString();var bz=by!=null?by+'':'';return(bz+'');}};function bA(index){index=index|0;System.Assert.void_assert_PB_bool_PE((bB.length|0)>0);System.Assert.void_assert_PB_bool_PE(index<(bB.length|0));var bC=bB;var bD=bC[index];if(bD==null){throw(new System.Exceptions.CastException("Failed to cast `"+bD+'\' to `window.OSWindow\'',new Error().stack));}var bE=bD;return(bE);}function void_remove_PB_int_PE(index){index=index|0;if(index<(bB.length|0)){bB.splice(index,1);}}function bF(){return(bB.length|0);}var bB=[];var bG;bG={deployWindow:function(url,name,link,icon){url=url+'';name=name+'';link=link+'';icon=icon+'';for(var i=0|0;i<bF();i=i+1|0){if(bH.call(bA(i))==name){var idx=bI.call(bA(i))|0;bG.focusWindow(idx);return(idx|0);}}var win=new bG.OSWindow(url,name,link,icon);bG.windowCounter();return(bI.call(win)|0);},__maxWindow:function(id,type){id=id|0;type=!!type;var $win=$("#win-id-"+(id+""));var pos=new sily.math.Vector2(ao,sily.conv.double_to_PB__Double_external_PE(0,$win.offset().left),sily.conv.double_to_PB__Double_external_PE(0,$win.offset().top));var size=new sily.math.Vector2(ao,sily.conv.double_to_PB__Double_external_PE(0,$win.width()),sily.conv.double_to_PB__Double_external_PE(0,$win.height()));var oleft= +sily.conv.double_to_PB__Double_external_PE(0,$win.attr("data-pos-x"));var otop= +sily.conv.double_to_PB__Double_external_PE(0,$win.attr("data-pos-y"));var ow= +sily.conv.double_to_PB__Double_external_PE(0,$win.attr("data-size-w"));var oh= +sily.conv.double_to_PB__Double_external_PE(0,$win.attr("data-size-h"));var displaySize=br();var lerpPos=type?new sily.math.Vector2(ao,0,0):new sily.math.Vector2(ao,oleft,otop);var lerpSize=type?new sily.math.Vector2(ao,displaySize.x-9,displaySize.y-9):new sily.math.Vector2(ao,ow,oh);var newPos={left:sily.math.lerp(pos.x,lerpPos.x,0.2),top:sily.math.lerp(pos.y,lerpPos.y,0.2)};var newSize={w:sily.math.lerp(size.x,lerpSize.x,0.2),h:sily.math.lerp(size.y,lerpSize.y,0.2)};$win.offset(newPos);$win.width(newSize.w);$win.height(newSize.h);if(type==true){if(newPos.left<1&&newPos.top<1&&newSize.w>displaySize.x-12&&newSize.h>displaySize.y-12)return;}else {if(newPos.left>oleft-1&&newPos.top>otop-1&&newSize.w<ow+1&&newSize.h<oh+1)return;}setTimeout((function(bJ,bK){bJ=(bJ|0)===bJ?bJ|0:0|0;bK=typeof bK=='boolean'?!!bK:false;var bL=bG.__maxWindow;var bM=bL.call(this,bJ,bK);bM=bM;return(bM);}),1000/60,id,type);},closeWindow:function(id){id=id|0;$("#win-id-"+(id+"")).remove();for(var i=0|0;i<bN;i=i+1|0){var _id=bI.call(bA(i))|0;if(_id==id){void_remove_PB_int_PE(i);break;}}bG.windowCounter();bN=bN-1|0;},windowCounter:function(){$("#infomenu").html(F("Win: %s",[new System.Integer32(bN)]));return(bN-1|0);},focusWindow:function(id){id=id|0;$("#win-id-"+(id+"")).css("display","inline-block");var actIndex=$("#win-id-"+(id+"")).css("z-index")|0;for(var i=0|0;i<bF();i=i+1|0){var _id=bI.call(bA(i))|0;if(_id==id){continue;}var $window=$("#win-id-"+(_id+""));var newIndex=$window.css("z-index")|0;if(actIndex<newIndex){$window.css("z-index",newIndex-1);}}$("#win-id-"+(id+"")).css("z-index","50");},minimizeWindow:function(id){id=id|0;$("#win-id-"+(id+"")).css("display","none");},updateWindow:function(id){id=id|0;$("#win-frame-id-"+(id+"")).attr("src",(function(i,val){return(val);}));},maximizeWindow:function(id){id=id|0;var $win=$("#win-id-"+(id+""));var pos=new sily.math.Vector2(ao,sily.conv.double_to_PB__Double_external_PE(0,$win.offset().left),sily.conv.double_to_PB__Double_external_PE(0,$win.offset().top));var size=new sily.math.Vector2(ao,sily.conv.double_to_PB__Double_external_PE(0,$win.width()),sily.conv.double_to_PB__Double_external_PE(0,$win.height()));var displaySize=br();var type=!!(pos.x<2&&pos.y<2&&size.x>displaySize.x-12&&size.y>displaySize.y-12?false:true);if(type==true){$win.attr(({"data-pos-x":pos.x,"data-pos-y":pos.y,"data-size-w":size.x,"data-size-h":size.y}));}setTimeout((function(bO,bP){bO=(bO|0)===bO?bO|0:0|0;bP=typeof bP=='boolean'?!!bP:false;var bQ=bG.__maxWindow;var bR=bQ.call(this,bO,bP);bR=bR;return(bR);}),1000/60,id,type);}};bG.OSWindow=function(url,name,link,icon){this._url='';this._name='';this._link='';this._id=0|0;this._icon='';url=url+'';name=name+'';link=link+'';icon=icon+'';this._url=url+'';this._name=name+'';this._link=link+'';this._id=bS|0;this._icon=icon+'';bS=bS+1|0;bN=bN+1|0;bT(this);bU.call(this);};bG.OSWindow.prototype.ar="window.OSWindow";function bH(){return(this._name+'');}function bI(){return(this._id|0);}function bV(){var $window=$("#win-id-"+(this._id+""));var id=this._id|0;$window.on("mousedown",(function(bW){var bX=function(e){bG.focusWindow(id);};var bY=bX.call(this,bW);bY=bY;return(bY);}));var $iframe=$window.find(".win-frame");$iframe.iframeTracker(false);$iframe.iframeTracker((function(){var bZ=function(){bG.focusWindow(id);};var cb=bZ.call(this);cb=cb;return(cb);}));$(F("#win-id-%s .win-close",[new System.Integer32(this._id)])).on("click",(function(){var cc=function(){bG.closeWindow(id);};var cd=cc.call(this);cd=cd;return(cd);}));$(F("#win-id-%s .win-full",[new System.Integer32(this._id)])).on("click",(function(){var ce=function(){bG.maximizeWindow(id);};var cf=ce.call(this);cf=cf;return(cf);}));$(F("#win-id-%s .win-min",[new System.Integer32(this._id)])).on("click",(function(){var cg=function(){bG.minimizeWindow(id);};var ch=cg.call(this);ch=ch;return(ch);}));$(F("#win-id-%s .win-upd",[new System.Integer32(this._id)])).on("click",(function(){var ci=function(){bG.updateWindow(id);};var cj=ci.call(this);cj=cj;return(cj);}));}function ck(){var minWidth=500;var minHeight=200;var $window=$("#win-id-"+(this._id+""));$window.attr(({"data-pos-x":$window.offset().left,"data-pos-y":$window.offset().top,"data-size-w":$window.width(),"data-size-h":$window.height()}));var $list=$window.find(".resizer");$list.on("mousedown",(function(){var cl=function(){$window.draggable("disable");$(this).css(({width:600,height:600,right: -300,bottom: -300}));$(this).on("mousemove",(function(cm){var cn=function(e){var offset=new sily.math.Vector2(ao,$(this).offset().left,$(this).offset().top);var x= +(e.pageX-offset.x);var y= +(e.pageY-offset.y);var $par=$(this).parent();var newWidth= +($par.width()+(x-300));var newHeight= +($par.height()+(y-300));if(newWidth>=minWidth){$par.width(newWidth);}if(newHeight>=minHeight){$par.height(newHeight);}};var co=cn.call(this,cm);co=co;return(co);}));};var cq=cl.call(this);cq=cq;return(cq);})).on("mouseup",(function(){var cr=function(){$(this).off("mousemove");$window.draggable("enable");$(this).css(({width:10,height:10,right: -5,bottom: -5}));};var cs=cr.call(this);cs=cs;return(cs);}));}function bU(){var $window=$(F("<div class=\"window\" id=\"win-id-%s\"></div>",[new System.Integer32(bI.call(this))]));$window.draggable();$("#page").append($window);$window.css(({position:"absolute",top:F("%s%",[new System.Integer32(16+bN*2)]),left:F("%s%",[new System.Integer32(23+bN*2)])}));var frameId=!!(this._url.indexOf("?")!== -1)?F("&id=%s",[new System.Integer32(this._id)]):F("?id=%s",[new System.Integer32(this._id)]);$window.append(B("<div class=\"win-bar\"> \r\n    <button class=\"win-close button\"></button>\r\n    <button class=\"win-full button\"></button>\r\n    <button class=\"win-min button\"></button>\r\n    <button class=\"win-upd button\"></button>\r\n    <div class=\"win-text\">%s</div>\r\n</div>\r\n<div class=\"win-content\">\r\n    <iframe class=\"win-frame\" id=\"win-frame-id-%s\" src=\"%s%s\"></iframe>\r\n</div>\r\n<div class=\"resizer\"></div>",[this._link,this._id,this._url,frameId])+'');bV.call(this);ck.call(this);bG.focusWindow(this._id);}bG.OSWindow.prototype.toString=as;var bN=0|0;var bS=0|0;function bT(win){Array.prototype.push.apply(bB,[win])|0;}!function(){var version="1.0.3.0";var purgeCookie=true;var usr="/home/al1-ce";var imgp="/assets/images/oc-img";var chatLink="https://www5.cbox.ws/box/?boxid=918017&boxtag=DNtl2E";var rownum= -1|0;var ct=string_href_PB_PE()+'';var cu=!!(ct.indexOf("al1-ce.neocitiesDELETEMELATER")!== -1);if(cu){var cv="http://al1-ce.dev";void_href_PB_string_PE(cv+'');}function appendToPageLine(lineidx,elem){lineidx=lineidx|0;$(F("#icon-line-%s",[new System.Integer32(lineidx)])).append(elem);}function addIcon(page,name,address,icon,text){page=page+'';name=name+'';address=address+'';icon=icon+'';text=text+'';var $icon=$(F("<div class=\"dLink\" id=\"dLink-%s\"><button class=\"button\">\r\n    <div class=\"dIcon\" style=\"background-image: url('%s' );\"></div>\r\n    %s\r\n</button></div>",[new System.String(text),new System.String(icon),new System.String(text)]));$icon.on("dblclick",(function(){var cw=function(){bG.deployWindow(page,name,address,icon);};var cx=cw.call(this);cx=cx;return(cx);}));appendToPageLine(rownum,$icon);}function addIconLink(link,icon,text){link=link+'';icon=icon+'';text=text+'';var $icon=$(F("<div class=\"dLink\" id=\"dLink-%s\"><button class=\"button\" ondblclick=\"window.open('%s', '_blank')\">\r\n    <div class=\"dIcon\" style=\"background-image: url('%s');\">\r\n        <img src=\"assets/images/oc-img/link.png\" >\r\n    </div>\r\n    %s\r\n</button></div>",[new System.String(text),new System.String(link),new System.String(icon),new System.String(text)]));appendToPageLine(rownum,$icon);}function addLine(){rownum=rownum+1|0;$("#page").append($(F("<div class=\"icon-line\" id=\"icon-line-%s\"></div> <!-- LINE %s -->",[new System.Integer32(rownum),new System.Integer32(rownum)])));}function addIconEmpty(){appendToPageLine(rownum,$("<div class=\"dLink\"></div>"));}function setDockerListener(winidx){winidx=winidx|0;var $docker=$("#docker");var $name=$("<div class=\"dock-names\">"+bH.call(bA(winidx))+"</div>");$docker.append($name);var idx=bI.call(bA(winidx))|0;$name.on("click",(function(cy){var cz=function(_e){bG.focusWindow(idx);};var cA=cz.call(this,cy);cA=cA;return(cA);}));}function main(){$("#infomenu").on("mouseenter",(function(){var cB=function(){if(bF()==0||$("#docker").length){return;}var $docker=$("<div id=\"docker\"></div>");$("body").append($docker);for(var i=0|0;i<bF();i=i+1|0){setDockerListener(i);}$("#docker").mouseleave((function(cC){var cD=function(_e){$("#docker").remove();};var cE=cD.call(this,cC);cE=cE;return(cE);}));};var cF=cB.call(this);cF=cF;return(cF);}));addLine();addIcon("/web/html/about.html","about",F("%s/about.inf",[new System.String(usr)]),F("%s/l-about.png",[new System.String(imgp)]),"About");addIcon("/web/html/blog.html","blog","attr://layers-blog.neocities.io/",F("%s/l-blog.png",[new System.String(imgp)]),"Blog");addIcon("/web/html/login.html","login",F("%s/login.bat",[new System.String(usr)]),F("%s/l-login.png",[new System.String(imgp)]),"Login");addIcon(chatLink,"chat","attr://open-chat.io/void/",F("%s/l-prog.png",[new System.String(imgp)]),"Chat");addIcon("/web/html/music.html","music","attr://open-sound.io/bootleg-boy/",F("%s/l-fsnd.png",[new System.String(imgp)]),"Music");addIcon("/web/html/todo.html","todo",F("%s/todo.txt",[new System.String(usr)]),F("%s/l-ftxt.png",[new System.String(imgp)]),"Todo");addIcon("/web/html/console.html","console",F("%s/terminal.bat",[new System.String(usr)]),F("%s/l-bat.png",[new System.String(imgp)]),"Bash");addLine();addIconEmpty();addLine();addIconLink("http://pub49.bravenet.com/guestbook/4164040818/",F("%s/l-guest.png",[new System.String(imgp)]),"Guest");addIconLink("mailto:alice_beyond@list.ru",F("%s/l-mail.png",[new System.String(imgp)]),"Mail");addIconLink("https://discord.gg/X34tg9UQcd",F("%s/l-discor.png",[new System.String(imgp)]),"Talk");addLine();addIconEmpty();addLine();addIcon("/web/html/backs.html","wallpaper",F("%s/wallpaper.bat",[new System.String(usr)]),F("%s/l-fopen.png",[new System.String(imgp)]),"Backs");addIcon("/web/html/soul_n_amy.html","cats",F("%s/cats/",[new System.String(usr)]),F("%s/caticon.png",[new System.String(imgp)]),"Cats");addIcon("/web/html/jspp.html","js++",F("%s/jspp.md",[new System.String(usr)]),F("%s/l-jspp.png",[new System.String(imgp)]),"js++");addLine();addIconEmpty();addLine();addIconLink("https://github.com/syxanash/awesome-web-desktops",F("%s/l-awd.png",[new System.String(imgp)]),"AWD");addIconLink("https://tinytools.directory/",F("%s/l-tinytools.png",[new System.String(imgp)]),"ttools");addLine();addIconEmpty();addLine();addIcon("/web/html/settings.html","theme",F("%s/settings.bat",[new System.String(usr)]),F("%s/l-bat.png",[new System.String(imgp)]),"Option");addIcon("/web/html/release-notes.html","release","127.0.0.1:0/release-notes/",F("%s/l-blog.png",[new System.String(imgp)]),"Log");if(sily.web.storage.getOrInitCookie("version","0.0.0")!=version){sily.web.storage.setCookie("version",version,365);if(purgeCookie){sily.web.storage.getOrInitCookie("background","6");sily.web.storage.setCookie("background","6",365);sily.web.storage.getOrInitCookie("doBoot","1");sily.web.storage.getOrInitCookie("theme","0");sily.web.storage.setCookie("theme","0",365);}}bG.deployWindow("/web/html/release-notes.html","release","127.0.0.1:8080/release-notes/",F("%s/l-blog.png",[new System.String(imgp)]));}document.addEventListener("DOMContentLoaded",(function(){var cG=main;var cH=cG.call(this);cH=cH;return(cH);}));}();}();