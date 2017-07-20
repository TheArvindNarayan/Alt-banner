(function($) {
	
	$.blades = function(data) {
		
		var doc, 
		imgOne, 
		imgTwo, 
		imgWidth, 
		imgHeight, 
		totThumbs, 
		iThumbs, 
		thumbW, 
		thumbH, 
		tSpacing, 
		posObj,  
		thumbsTwo, 
		fadeTimer, 
		delay,
		ran, 
		extraW,
		extraH,
		store,
		trans,
		imgLeg,
		left,
		right,
		breaker,
		direct,
		tCount, 
		infoOn, 
		conList,
		useArrows,
		columns,
		cols,
		rows,
		iType,
		auto,
		randomize,
		colCount,
		lTarget,
		links = [],
		infos = [],
		images = [],
		posObj = [],
		thumbsOne = [],
		numOn = 0;
		thumbOn = 0,
		isOver = false,
		firstRun = true,
		grabOnce = true,
		readyToFire = false,
		ranColor = data.randomColors;
		
		init(data);
		
		function init(settings) {
			
			var titles, 
			banner,
			positions, 
			styles, 
			ar, 
			ul, 
			obj, 
			middleCol, 
			middleRow, 
			theX, 
			theY, 
			xx, 
			yy, 
			theCol, 
			theRow, 
			midX, 
			midY, 
			txt,
			colVal, 
			rowVal,
			i,
			leg,
			tempInfos = [],
			tempImages = [],
			tempLinks = [],
			agent = navigator.userAgent;
			
			cols = settings.cols;
			rows = settings.rows;
			auto = settings.autoPlay;
			imgWidth = settings.width;
			imgHeight = settings.height;
			randomize = settings.randomizeSlides;
			tSpacing = -(settings.thumbSpacing);
			delay = settings.slideDelay;
			useArrows = settings.useArrows;
			lTarget = settings.linkTarget;
			
			$("#cj-banner > ul > li").each(function(i) {
					
				tempImages[i] = $(this).attr("title");
					
				ul = $(this).find("ul");
					
				(ul.attr("title")) ? tempLinks[i] = ul.attr("title") : tempLinks[i] = "";	
				
				txt = $(this).find("li");
				
				if(txt.length) {
					
					titles = [];
					positions = [];
					styles = [];
					
					txt.each(function(j) {
						
						if(txt.html() != "") {
							
							ar = $(this).attr("class").split("x");
								
							titles[j] = $(this).html();
							positions[j] = {x: parseInt(ar[0]), y: parseInt(ar[1])};
							styles[j] = {color: $(this).css("color"), backgroundColor: $(this).css("background-color")};
							
						}
						else {
						
							titles[j] = 0;
							positions[j] = 0;
							styles[j] = 0;
							
						}
							
					});
					
					tempInfos[i] = {content: titles, position: positions, style: styles, align: ul.attr("class").split("-")[1]};
					
				}
				else {
					
					tempInfos[i] = 0;
					
				}
					
			});
			
			leg = tempImages.length;
			
			if(!randomize) {
						
				images = tempImages;
				infos = tempInfos;
				links = tempLinks;
							
			}
						
			else {
				
				var shuf = [], shuf2 = [], shuf3 = [], placer, iOn;
						   
				for(var i = 0; i < leg; i++) {
					
					shuf[i] = tempImages[i];
					shuf2[i] = tempInfos[i];
					shuf3[i] = tempLinks[i];
					
				}
								
				while(shuf.length > 0) { 
								
					placer = Math.floor(Math.random() * shuf.length);
					
					iOn = images.length;
					
					images[iOn] = shuf[placer];
					infos[iOn] = shuf2[placer];
					links[iOn] = shuf3[placer];
					
					shuf.splice(placer, 1);
					shuf2.splice(placer, 1);
					shuf3.splice(placer, 1);
								
				}
				
			}
			
			doc = $(document);
			banner = $("#cj-banner").css({width: imgWidth, height: imgHeight});
			container = $("<div />").appendTo(banner);
			imgLeg = leg - 1;
			
			if(auto) {
				
				if(agent.search("iPhone") == -1 && agent.search("iPad") == -1 && agent.search("iPod") == -1) {
					container.mouseenter(overMouse).mouseleave(outMouse);
				}
				
			}
			
			switch(settings.transitionType.toLowerCase()) {
			
				case "whiteflash":
				
					iType = 0;
					trans = 0;
					
				break;
				
				case "basicfade":
				
					iType = 0;
					trans = 2;
					
				break;
				
				case "whiteflashrandom":
					
					iType = 1;
					trans = 0;
					
				break;
				
				case "basicfaderandom":
					
					iType = 1;
					trans = 2;
					
				break;
				
				case "colorsrandom":
					
					iType = 1;
					trans = 1;
					
				break;
				
			}
				
			totThumbs = cols * rows;
			iThumbs = totThumbs - 1;
			thumbW = Math.floor(imgWidth / cols);
			thumbH = Math.floor(imgHeight / rows);
				
			obj = container.offset();
			midX = (cols - 1) / 2;
			midY = (rows - 1) / 2;
			
			if(cols % 2 === 1) {
				middleCol = Math.floor(cols / 2);
				colVal = true;
			}
			else {
				colVal = false;
			}
				
			if(rows % 2 === 1) {
				middleRow = Math.floor(rows / 2);
				rowVal = true;
			}
			else {
				rowVal = false;
			}
			
			if(iType === 0) {
				
				columns = [];
				numbers = [];
				iCount = 0;
				countPlus = 0;
				
				for(i = 0; i < cols; i++) {
					
					for(var j = 0; j < rows; j++) {
					
						numbers[numbers.length] = (j * cols) + countPlus;
						
					}
					
					columns[i] = numbers;
					numbers = [];
					
					countPlus++;
					
				}
				
			}
			
			for(i = 0; i < totThumbs; i++) {
				
				theCol = (i % cols);
				theRow = Math.floor(i / cols);
				
				theX = thumbW * theCol;
				theY = thumbH * theRow;
					
				if(colVal) {
					
					if(theCol !== middleCol) {
							
						if(theCol < middleCol) {
							xx = theX + (tSpacing * (middleCol - theCol));
						}
						else if(theCol > middleCol) { 
							xx = theX - tSpacing * ((theCol - middleCol));
						}
						else {
							xx = theX;
						}
							
					}
						
					else {
						xx = theX;
					}
							   
				}
				else {
					
					if(theCol < midX) {
						xx = theX + (tSpacing * (midX - theCol));
					}
					else {
						xx = theX - tSpacing * ((theCol - midX));
					}
						
				}
					
				if(rowVal) {
					
					if(theRow !== middleRow) {
								
						if(theRow < middleRow) {
							yy = theY + (tSpacing * (middleRow - theRow));
						}
						else if(theRow > middleRow) {
							yy = theY - tSpacing * ((theRow - middleRow));
						}
						else {
							yy = theY;
						}
							
					}
						
					else {
						yy = theY;
					}
						
					
							   
				}
				else {
						
					if(theRow < midY) {
						yy = theY + (tSpacing * (midY - theRow));
					}
					else {
						yy = theY - tSpacing * ((theRow - midY));
					}
						
				}
					
				posObj[i] = {x: thumbW * theCol, y: thumbH * theRow, xx: xx, yy: yy, bgX: -(thumbW * theCol), bgY: -(thumbH * theRow)};
					
			}
				
			if(useArrows) {
					
				var pad = settings.arrowPadding;
					
				left = $("<div />").addClass("cj-left-arrow").appendTo(container);
				right = $("<div />").addClass("cj-right-arrow").appendTo(container);
					
				left.css({
						
					display: "none",
					position: "absolute",
					left: pad, 
					top: imgHeight - pad - parseInt(left.css("height"))
						
				});
					
				right.css({
						
					display: "none",
					position: "absolute", 
					left: imgWidth - pad - parseInt(right.css("width")), 
					top: imgHeight - pad - parseInt(right.css("height"))
						
				});
					
			}
			
			imgOne = $("<img />").load(loaded);
			imgOne.attr("src", images[0]);
				
		}
			
		function leftClick(event) {
				
			event.stopImmediatePropagation();
				
			if(breaker) clearTimeout(breaker);
				
			(numOn > 0) ? numOn-- : numOn = imgLeg;
				
			breakApart(true);
				
		}
			
		function rightClick(event) {
				
			event.stopImmediatePropagation();
				
			if(breaker) clearTimeout(breaker);
				
			(numOn < imgLeg) ? numOn++ : numOn = 0;
				
			breakApart(true);
				
		}
		
		function loaded() {
				
			counter = 0;
			colCount = 0;
			
			if(iType === 0) {
				fadeTimer = setInterval(ripCols, 100);
			}
			else {
				
				var shuf = [], placer;
				ran = [];
							   
				for(var i = 0; i < totThumbs; i++) shuf[i] = i;
									
				while(shuf.length > 0) { 
									
					placer = Math.floor(Math.random() * shuf.length);
					ran[ran.length] = shuf[placer];
					shuf.splice(placer, 1);
									
				}
				
				fadeTimer = setInterval(showSquares, 50);
			}
				
		}
		
		function ripCols() {
			
			if(colCount < cols) {
				
				var ar = columns[colCount];
				
				for(var i = 0; i < rows; i++) showSquares(ar[i], true);
				
				colCount++;
				
			}
			else {
				
				clearInterval(fadeTimer);
				
			}
			
		}
		
		function showSquares(i, col) {
			
			var isOn, func, thumb, color, white;
			
			(col === true) ? isOn = i : isOn = ran[counter];
				
			if(counter < iThumbs) {
					
				counter++;
				func = null;
						
			}
			else {		
			
				clearInterval(fadeTimer);
				func = squeeze;			
				
			}
			
			cssObj = {
				
				width: thumbW, 
				height: thumbH, 
				background: "url('" + images[numOn] + "')" + " " + posObj[isOn].bgX + "px " + posObj[isOn].bgY + "px", 
				position: "absolute", 
				left: posObj[isOn].xx,
				top: posObj[isOn].yy
					
			}
				
			thumb = $("<div />").css(cssObj).appendTo(container);
			
			if(trans !== 2) {
				
				if(trans === 0) {
					color = "#FFF";
				}
				else {
					
					color = "#" + Math.floor(Math.random() * 16777215).toString(16);
					
					while(color.length !== 7) {
						color = "#" + Math.floor(Math.random() * 16777215).toString(16);	
					}
					
				}
				
				white = $("<div />").css({
					
					width: thumbW, 
					height: thumbH, 
					backgroundColor: color
					
				}).appendTo(thumb).fadeOut(500, func);
				
			}
			else {
				thumb.css("display", "none").fadeIn(500, func);
			}
				
			(thumbOn === 0) ? thumbsOne[isOn] = thumb : thumbsTwo[isOn] = thumb;
				
		}
			
		function cleanSquares() {
				
			var i = totThumbs;
				
			if(thumbOn === 1) {
				
				while(i--) thumbsOne[i].remove();
				imgOne.remove();
				thumbsOne = null;
				imgOne = null;
					
			}
			else {
					
				while(i--) thumbsTwo[i].remove();
				imgTwo.remove();
				thumbsTwo = null;
				imgTwo = null;
					
			}
			
		}
			
		function squeeze() {
				
			(!firstRun) ? cleanSquares() : firstRun = false;
				
			var i = totThumbs;
				
			if(thumbOn === 0) {
					
				while(i--) thumbsOne[i].animate({left: posObj[i].x, top: posObj[i].y}, 200, i != 0 ? null : squeezeDone);
					
			}
			else {
				
				while(i--) thumbsTwo[i].animate({left: posObj[i].x, top: posObj[i].y}, 200, i != 0 ? null : squeezeDone);
					
			}
				
		}
			
		function squeezeDone() {
			
			if(links[numOn] !== "") container.css("cursor", "pointer").click(gotoURL);
			
			if(useArrows) {	
				left.click(leftClick).fadeIn(300);
				right.click(rightClick).fadeIn(300);
			}
			
			if(infos[numOn] != 0) {	
			
				conList = infos[numOn];
				tCount = conList.content.length - 1;
				direct = conList.align;
				store = [];
				infoOn = 0;
				showContent();
				
			}
			else {
				showDone();
			}
				
		}
			
		function gotoURL() {
			
			(lTarget === "parent") ? window.location = links[numOn] : window.open(links[numOn]);
				
		}
			
		function showContent() {
			
			var cont = conList.content[infoOn];
			
			if(cont === 0) {
				
				if(infoOn < tCount) {
					infoOn++;
					showContent();
				}
				else {
					showDone();
				}
				
				return;
				
			}
			
			var w, h, func, obj, info = $("<div />").html(cont).addClass("cj-info-text").appendTo(container);
				
			if(grabOnce) {
					
				extraW = parseInt(info.css("padding-left")) + parseInt(info.css("padding-right"));
				extraH = parseInt(info.css("padding-top")) + parseInt(info.css("padding-bottom"));
				grabOnce = false;
					
			}
				
			h = info.height() + extraH;
			w = info.width();
				
			info.css(conList.style[infoOn]).css({
					 
				left: (direct === "left") ? conList.position[infoOn].x : imgWidth - w - extraW - conList.position[infoOn].x, 
				top: conList.position[infoOn].y
					
			}).find("a").each(function() {
					
				$(this).css(conList.style[infoOn]);
					
			});
				
			store[infoOn] = info;
			
			if(infoOn < tCount) {
				infoOn++;
				func = showContent;
			}
			else {
				func = showDone;
			}
				
			w += extraW;
			
			if(direct === "left") {
				
				info.css("clip", "rect(0px, 0px, " + h + "px, 0px)").animate(
					
					{zIndex: 100}, {
						
						duration: 300, 
						complete: func,
						
						step: function(now) {
						
							info.css({"clip": "rect(0px, " + ((info.width() + extraW) * (now * .01)) + "px, " + h + "px, 0px)"});
							
						}
						
					}
					
				);
				
			}
			else {
				
				info.css("clip", "rect(0px, " + w + "px, " + h + "px, " + w + "px)").animate(
					
					{zIndex: 100}, {
					
						duration: 300, 
						complete: func,
						
						step: function(now) {
						
							info.css({"clip": "rect(0px, " + w + "px, " + h + "px, " + (w * (1 - (now * .01))) + "px)"}); 
							
						}
						
					}
					
				);
				
			}
				
		}
		
		function showDone() {
			
			readyToFire = true;
			
			if(auto) {
				if(!isOver) breaker = setTimeout(breakApart, delay);
			}
				
		}
		
		function overMouse() {
		
			isOver = true;
			
			if(breaker) clearTimeout(breaker);
			
		}
		
		function outMouse() {
		
			isOver = false;
			
			if(readyToFire) breaker = setTimeout(breakApart, delay);
			
		}
			
		function breakApart(fromClick) {
			
			readyToFire = false;
			
			container.css("cursor", "auto").unbind("click", gotoURL);
			
			if(store != null) {
				
				while(store.length) {
					
					store[0].stop();
					store[0].remove();
					store.shift();
					
				}
					
				store = null;
				
			}
				
			if(useArrows) {
				left.stop(true, true).css("display", "none").unbind("click", leftClick);
				right.stop(true, true).css("display", "none").unbind("click", rightClick);
			}
			
			if(fromClick !== true) {
				(numOn < imgLeg) ? numOn++ : numOn = 0;
			}
			
			var i = totThumbs;
			
			if(thumbOn === 0) {
				
				while(i--) thumbsOne[i].animate({left: posObj[i].xx, top: posObj[i].yy}, 300, i != 0 ? null : loadNext);
				
			}
			else {
			
				while(i--) thumbsTwo[i].animate({left: posObj[i].xx, top: posObj[i].yy}, 300, i != 0 ? null : loadNext);	
				
			}
			
		}
			
		function loadNext() {
				
			if(thumbOn === 0) {
				
				thumbOn = 1;
				thumbsTwo = [];
				imgTwo = $("<img />").load(loaded);
				imgTwo.attr("src", images[numOn]);
				
			}
			else {
				
				thumbOn = 0;
				thumbsOne = [];
				imgOne = $("<img />").load(loaded);
				imgOne.attr("src", images[numOn]);
				
			}
				
		}
		
	}
	
})(jQuery);





