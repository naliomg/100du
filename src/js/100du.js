//100du 
var zIndex=1;

$(function(){

	// 搜索切换选项卡
	(function(){
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var $aLi=$('#search .searchNav li');
		var $oTextInput=$('#search form .textInput');
		var iNow=0;

		$oTextInput.val(arrText[iNow])
			.focus(function(){
				if($(this).val()==arrText[iNow]){
					$(this).val('');
				}
			})
			.blur(function(){
				if ($(this).val()=='') {
					$(this).val(arrText[iNow]);
				}
			});
		$aLi.each(function(index){
			$(this).click(function(){
				$aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow=index;
				$oTextInput.val(arrText[iNow]);
			});
		});
	})();

	// update文字滚动
	(function(){
		var arrData = [
			{ 'name':'小红', 'time':1, 'title':'那些灿烂华美的瞬间...', 'url':'#' },
			{ 'name':'小明', 'time':2, 'title':'哪些瞬间呢？', 'url':'#' },
			{ 'name':'小黑', 'time':3, 'title':'有好吃的吗？', 'url':'#' },
			{ 'name':'nali', 'time':4, 'title':'春熙路大甩卖', 'url':'#' },
			{ 'name':'OMG', 'time':5, 'title':'单身如何过双十一', 'url':'#' }
		];
		var $oUl=$('#search .update ul');	
		var str='';
		for (var i = 0; i < arrData.length; i++) {
			str+='<li><a href="'+arrData[i].url+'"><span class="users">'+arrData[i].name
			+'</span> <span class="updateTime">'+arrData[i].time
			+'分钟前 写了一篇新文章：</span> '+arrData[i].title+'</a></li>';
		}
		str+='<li><a href="'+arrData[0].url+'"><span class="users">'+arrData[0].name
			+'</span> <span class="updateTime">'+arrData[0].time
			+'分钟前 写了一篇新文章：</span> '+arrData[0].title+'</a></li>';
		$oUl.html(str);	
		var updateTimer=null;			
		var topValue='-='+$oUl.find('li').css('height');
		var bottomValue="+="+$oUl.find('li').css('height');
		var maxTop=-parseInt($oUl.find('li').css('height'))*arrData.length+'px';
		clearInterval(updateTimer);
		updateTimer=setInterval(up,3000);

		var $up=$('#search .update .triangleUp');
		var $down=$('#search .update .triangleDown');
		var $update=$('#search .update');
		var flag=true;
		$update.on({'mouseover':function(){clearInterval(updateTimer);},
			'mouseout':function(){updateTimer=setInterval(up,2000);}
		});

		$up.on('click',function(){
				if (flag) {
					flag=false;
					down();
				}
			});
		$down.on('click',function(){
				if (flag) {
					flag=false;
					up();
				}
			});
		function up(){
			$oUl.stop(false,true).animate({'top':topValue},500,function(){
				if ($oUl.css('top')==maxTop) {
					$oUl.css('top',0);
				}
				flag=true;
			});
		}
		function down(){
			if ($oUl.css('top')=='0px') {
					$oUl.css('top',maxTop);
				}
			$oUl.stop(false,true).animate({'top':bottomValue},500,function(){				
				flag=true;
			});
		}
	})();

	// 区域选项卡切换
	(function(){
		var $shopChange=$('#shopChange');
		var $mapChange=$('#mapChange');
		var $zhidao=$('.zhidao');
		var $qiangquan=$('#qiangquan');
		tabChange($shopChange,'click');
		tabChange($mapChange,'click');
		tabChange($zhidao,'mouseover');
		tabChange($qiangquan,'mouseover');
	})();

	//推荐轮播图
	(function(){
		var $recommendShow=$('.recommendShow');
		var $aImg=$recommendShow.find('.mainShow img');
		var $aImgList=$recommendShow.find('li');
		var $p=$recommendShow.find('p');
		var timer=null;
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow=0;
		autoChange();
		$recommendShow.hover(function(){clearInterval(timer);},autoChange);
		$aImgList.on('click',function(){
			if(iNow!=$(this).index()){
				$aImg.eq(iNow).fadeOut().removeClass('active');	
				$aImgList.eq(iNow).removeClass('active');
				iNow=$(this).index();
				$aImg.eq(iNow).fadeIn().addClass('active');	
				$aImgList.eq(iNow).addClass('active');
				$p.html(arr[iNow]);					
			}
		});
		function autoChange(){
			clearInterval(timer);
			timer=setInterval(function(){
				$aImg.eq(iNow).fadeOut().removeClass('active');	
				$aImgList.eq(iNow).removeClass('active');		
				if (iNow==arr.length-1) {
					iNow=0;				
				}else{
					iNow++;
				}
				$aImg.eq(iNow).fadeIn().addClass('active');	
				$aImgList.eq(iNow).addClass('active');
				$p.html(arr[iNow]);
			},1500);			
		}
	})(); 

	// 日历显示的层级增加
	(function(){
		var $next=$('.calendar .next');
		$next.on('mouseover',function(){
			zIndex++;
			$(this).css('z-index',zIndex);
		});
	})();

	// BBS滑动变换
	(function(){
		var $aLi=$('.bbs li');
		$aLi.filter(':even').css('background','#f8f8f8');		
		$aLi.filter(':odd').css('background','#f1f1f1');
		$aLi.on('mouseenter',function(){
			$aLi.removeClass('active');
			$(this).addClass('active');
		});
	})();
})

function tabChange($obj,str){
	var $aTab=$obj.find('.tabChangeJs li');
	var $triangle=$aTab.find('div');
	var $aCon=$obj.find('.tabCon');
	$aTab.each(function(index){
		$(this).on(str,function(){
			$aTab.removeClass('active').addClass('gradient');
			$(this).removeClass('gradient').addClass('active');
			$triangle.attr('class','triangleDownGray');
			$triangle.eq(index).attr('class','triangleDown');
			$aCon.css('display','none');
			$aCon.eq(index).css('display','block');
		});
	});
}
