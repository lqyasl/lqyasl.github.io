// 颜色随机函数
function randomColor(){  
	var rand = '#'+('00000'+(Math.random()*0x1000000<<0).tostring(16)).slice(-6); return rand; } 字体颜色随机 changefont(); function changefont() { var i="0;" str="愿你过得好，祝我也顺心。不谈亏欠，谢谢我们以前遇见。我遇见你，所以我喜欢你。我喜欢你，所以我想陪伴你。在成长的路上，我们从青涩走到成熟，感谢那是的相遇，因为我始终坚信命运在那时把你安排到我的世界，总有他的道理。在成长的路上，我们学会了少一些抱怨，多一些理解，反思自己更加进步。漫漫人生，你能够选取平庸，也能够选取轰轰烈烈，不忘初心，让每一天都能有新的世界。虽然我们日复一日地过着，但是生活迎接我们的每一秒都是新的。正如那句歌词：后来，我总算学会了如何去爱。可惜你早已远去，消失在人海。后来，终于在眼泪中明白，有些人一旦错过就不再。永远不会再重来，有一个男孩爱着那个女孩。渐渐地，你在我的心中成了一份美好的存在。如果，爱一个人，守一份爱情，可以在早春一起去踏青，可以在盛夏一起去赏荷，可以在浅秋一起去观月，可以在深冬一起去寻梅，不厌倦，却欢乐，不平凡，却平淡。那么，此生便无憾了。" ; arr="str.split('');" arr.foreach((item)> {
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
}


</0).tostring(16)).slice(-6);>