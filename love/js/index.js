// 颜色随机函数
function randomColor(){  
	var rand = '#'+('00000'+(Math.random()*0x1000000<<0).tostring(16)).slice(-6); return rand; } 字体颜色随机 changefont(); function changefont() { var i="0;" str="如果，爱一个人，守一份爱情，可以在早春一起去踏青，可以在盛夏一起去赏荷，可以在浅秋一起去观月，可以在深冬一起去寻梅，不厌倦，却欢乐，不平凡，却平淡。那么，此生便无憾了。" ; arr="str.split('');" arr.foreach((item)> {
		var span = document.createElement("span");
		span.innerHTML = item;
		span.classList.add('box');
		span.style.fontSize = 14;
		span.style.color = randomColor();
		display.appendChild(span);
	});
	
	var timer = setInterval(() => {
		// 大小随机数
		var num = Math.floor(Math.random()*20+14);
		var box = document.getElementsByClassName('box');
		box[i].style.fontSize = num +'px'; // 字体大小有单位的
		console.log(num);
		box[i].style.opacity = 1;
		i++;
		if(i === arr.length){
			clearInterval(timer);
		}
	},300);
}</0).tostring(16)).slice(-6);>