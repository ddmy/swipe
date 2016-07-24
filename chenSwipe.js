		/*
		mrChenSwipe({
			parent : 父盒子[父盒子的高度会继承父级], 必填
			child : 子盒子[ul,子盒子需要用ul>li>a],	必填
			type : 滑动方向[vertical || level],	必填
			parentN : 垂直-父盒子宽度 ~ 默认值200 || 水平-父盒子高度 ~ 默认值200, 选填
			childN : 垂直-li高度 ~ 默认值40 || 水平-li宽度 ~ 默认值80,	选填
			goli : 是否开启点击导航[true || false],	选填
			lisname : 选中标签类名 ~ 默认值 'current'选填

			作者：Mr.chen
			blog: http://www.ddamy.com
		})
		*/



		function mrChenSwipe(obj){
			/*
			startD  		//开始的坐标
			moveD   		//滑动时的坐标
			goD				//改变的距离
			lis   			//获取所有li
			distance        //吸附距离
			maxPosition     //最小定位区间
			minSwipe		//滑动最小定位区间
			maxSwipe		//滑动最大定位区间
			currSwipe		//当前定位
			xy				//XY
			*/

			var parent = obj.parent,
				child = obj.child,
				type = obj.type,
				goli = obj.goli,
				lisname = obj.lisname || 'current',
				startD = 0,
				moveD = 0,
				goD = 0,
				lis = child.querySelectorAll('li'),
				lisLength = lis.length,
				distance = 100,
				maxPosition = 0,
				minSwipe,
				maxSwipe,
				currSwipe = 0,
				xy;


		    /*加过渡*/
		    var addTransition = function(elm){

		        elm.style.webkitTransition = 'all 0.2s';/*兼容*/

		        elm.style.transition = 'all 0.2s';

		    };

		    /*删除过渡*/
		    var removeTransition = function(elm){

		        elm.style.webkitTransition = 'none';/*兼容*/

		        elm.style.transition = 'none';

		    };

			//设置定位
		    var setTranslate = function(elm,direction,num){

		    	if(direction == 'y'){

	        		elm.style.webkitTransform = 'translateY('+num+'px)';/*兼容*/

	       		 	elm.style.transform = 'translateY('+num+'px)';

		    	}

		    	if(direction == 'x'){

	        		elm.style.webkitTransform = 'translateX('+num+'px)';/*兼容*/

	       		 	elm.style.transform = 'translateX('+num+'px)';

		    	}

    		};


			
			//判断如果为上下滑动，获取宽高
			//垂直
			if(type == 'vertical'){

				//默认宽度
				parentN = obj.parentN || 200;

				//li默认高度
				childN = obj.childN || 40;

				parent.style.width = parentN + 'px';

				parent.style.height = '100%';

	       		var parentWH = parent.offsetHeight;

	       		var childWH = childN * lisLength;

		    	//获取定位最小区间
				minPosition = parentWH - childWH;

				minSwipe = minPosition - distance;

				maxSwipe = maxPosition + distance;

				setTranslate(child,'y',0);

				goV();

			}

			//水平
			if(type == 'level'){

				//默认高度
				parentN = obj.parentN || 200;

				//li默认宽度
				childN = obj.childN || 80;

				//父盒子默认100%宽度
				parent.style.width = document.documentElement.clientWidth + 'px';

				parent.style.height = parentN + 'px';

				//子盒子宽度
				child.style.width = lisLength * childN + 'px';

				child.style.height = parentN + 'px';

       		 	var parentWH = parent.offsetWidth;

       		 	var childWH = childN * lisLength;

		    	//获取定位最小区间
				minPosition = parentWH - childWH;

				minSwipe = minPosition - distance;

				maxSwipe = maxPosition + distance;

				setTranslate(child,'x',0);

				goL();

			}

			//水平初始化
			function goL(){
				
				var i = 0;

				for(i; i < lisLength; i += 1){

					lis[i].style.width = childN + 'px';

					lis[i].style.height = '100%';

					lis[i].style.textAlign = 'center';

					lis[i].style.lineHeight = parentN + 'px';

					lis[i].style.float = 'left';

					aStyle(lis[i]);

				}

			}

			//垂直初始化
			function goV(){

				var i =0;

				for(i; i < lisLength; i += 1){

					lis[i].style.width = '100%';

					lis[i].style.height = childN + 'px';

					lis[i].style.textAlign = 'center';

					lis[i].style.lineHeight = childN + 'px';

					aStyle(lis[i]);

				}
			}

			//给a设置style
			function aStyle(dom){

				dom.querySelector('a').style.display = 'block';

				dom.querySelector('a').style.height = '100%';

				dom.querySelector('a').style.color = '#333';

				dom.querySelector('a').style.textDecoration = 'none';

			}
			
			//子盒子绑定滑动事件
			child.addEventListener('touchstart',function(e){

				if(type == 'vertical'){

					startD = e.touches[0].clientY;

				}

				if(type == 'level'){

					startD = e.touches[0].clientX;

				}

			})


			//滑动中
			child.addEventListener('touchmove',function(e){

				if(type == 'vertical'){

					moveD = e.touches[0].clientY;

					xy = 'y';

				}

				if(type == 'level'){

					moveD = e.touches[0].clientX;

					xy = 'x';
				}

				goD = moveD - startD + currSwipe;

				removeTransition(child);

				if(goD > minSwipe && goD < maxSwipe){

					setTranslate(child,xy,goD);

				}

			})

			//滑动结束
			window.addEventListener('touchend',function(){

				//最终定位
				if(goD > maxPosition){

					currSwipe = maxPosition;

					addTransition(child);

					setTranslate(child,xy,currSwipe);

				}else if(goD < minPosition){

					currSwipe = minPosition;

					console.log(minPosition);

					addTransition(child);

					setTranslate(child,xy,currSwipe);
				}else{

					currSwipe = goD;

				}

				startD = 0;
				moveD = 0;
				goD = 0;

			})


            //如果开启单机索引
            if(goli){

                //循环绑定点击事件
                for(var j = 0; j < lisLength; j += 1){

                    lis[j].index = j;

                    tap(lis[j],function(e){

                    	if(type == 'level'){
                    		xy = 'x';
                    	}

                    	if(type == 'vertical'){
                    		xy = 'y';
                    	}

                        //找到父元素
                        var li = e.target.parentNode;

                        for(var n = 0; n < lisLength; n += 1){

                            lis[n].className = '';

                        }

                        li.className = lisname;

                        //计算位置
                        var tapGoD = -li.index * childN;

                        if(tapGoD > minPosition){

                            currSwipe = tapGoD;

                            addTransition(child);

                            setTranslate(child,xy,currSwipe);

                        }else{

                            currSwipe = minPosition;

                            setTranslate(child,xy,currSwipe);

                        }

                    })

                }

            }

            //封装单机事件
			function tap(dom,callback){

			    /*判断dom是不是一个对象 如果是才给他绑定事件*/
			    if(typeof dom == 'object'){

			        /*判断是否滑动过*/
			        var isMove = false;

			        /*记录刚刚触摸到屏幕的时候的时间*/
			        var time = 0;

			        dom.addEventListener('touchstart',function(e){

			            /*刚刚触摸到屏幕的时候的时间*/
			            time = Date.now();

			        });

			        dom.addEventListener('touchmove',function(e){

			            /*设置为true*/
			            isMove = true;

			        });

			        window.addEventListener('touchend',function(e){

			            /*
			            * tap事件的要求
			            *1.没有滑动过
			            *2.响应时间在150ms以内
			            * */
			            if(!isMove && (Date.now()-time) < 150){

			                /*为了提高响应的速度*/
			                callback && callback(e);

			            }

			            isMove = false;
			            time = 0;

			        });

			    }
			};
		}