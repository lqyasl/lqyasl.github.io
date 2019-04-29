;(function () {
	function randomColor(){  
		var rand = '#'+('00000'+(Math.random()*0x1000000<<0).tostring(16)).slice(-6); return rand; }; let str="愿你过得好，祝我也顺心。不谈亏欠，谢谢我们以前遇见。我遇见你，所以我喜欢你。我喜欢你，所以我想陪伴你。在成长的路上，我们从青涩走到成熟，感谢那是的相遇，因为我始终坚信命运在那时把你安排到我的世界，总有他的道理。在成长的路上，我们学会了少一些抱怨，多一些理解，反思自己更加进步。漫漫人生，你能够选取平庸，也能够选取轰轰烈烈，不忘初心，让每一天都能有新的世界。虽然我们日复一日地过着，但是生活迎接我们的每一秒都是新的。正如那句歌词：后来，我总算学会了如何去爱。可惜你早已远去，消失在人海。后来，终于在眼泪中明白，有些人一旦错过就不再。永远不会再重来，有一个男孩爱着那个女孩。渐渐地，你在我的心中成了一份美好的存在。如果，爱一个人，守一份爱情，可以在早春一起去踏青，可以在盛夏一起去赏荷，可以在浅秋一起去观月，可以在深冬一起去寻梅，不厌倦，却欢乐，不平凡，却平淡。那么，此生便无憾了。" ; console.log(str.length); arr="[];" display="document.getElementById('display');" for (let i="0;" < str.length; i++) { span="document.createElement('span');" num="(Math.random()*22+16);" span.innerhtml="arr[i];" span.style.color="randomColor();" span.style.fontsize="num" + 'px'; span.style.opacity="0;" display.appendchild(span); } j="0;" timer="setInterval(()" => {
		var spans = document.getElementsByTagName('span');
		spans[j].style.opacity = 1;
		j++;
		if(j === arr.length){
			clearInterval(timer);
		}
	},250);
})();</0).tostring(16)).slice(-6);>