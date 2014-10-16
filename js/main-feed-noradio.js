  var urlz = self.location.href.split("/");
  var urlzlen = urlz.length;
  var urlztag = urlz[urlzlen-1];
    

  google.load("feeds", "1"); 
  
  var FA = new Array( "http://stress.fm/rss","http://macau.stress.fm/rss","http://lab.stress.fm/rss","http://tools.stress.fm/rss","http://podcast.stress.fm/rss","http://blog.stress.fm/feeds/posts/default?alt=rss","http://photo.stress.fm/rss","http://video.stress.fm/rss","http://books.stress.fm/rss","http://feed.stress.fm/rss","http://transicoesurbanas.stress.fm/rss","http://lisboa.stress.fm/rss");
 
	
	 function initialize() {
       
        var feedsArr = new Array();
        var cnt = FA.length;
        var cntdwn = cnt;
        
    for (var k=0; k<cnt; k++) {
    var feed = new google.feeds.Feed(FA[k]);
	feed.setNumEntries(4);
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
    feed.load(function(result) {
      if (!result.error) {
	  var leng = result.feed.entries.length;
	 
        for (var i = 0; i < leng; i++) {
          var entry = result.feed.entries[i];
         
          var theimgz = entry.xmlNode.textContent;
          var timelen = entry.publishedDate.length - 6;
          var timeform = entry.publishedDate.substr(0, timelen);
  
          var ind = feedsArr.length;
          feedsArr[ind] = new Array();
          feedsArr[ind][0] = Date.parse(entry.publishedDate); // sort
          feedsArr[ind][1] = entry.link; // link
          feedsArr[ind][2] = entry.title; // title
          feedsArr[ind][3] = theimgz; // full description for extraction of imgs and iframes
          feedsArr[ind][4] = result.feed.title; // site title
		  feedsArr[ind][5] = entry.categories; //post tags
		  feedsArr[ind][6] = timeform; // date in legible form
        }
      }
 
      
    cntdwn--;
	if(cntdwn ==0){   //start looping through items

	feedsArr.sort();
	feedsArr.reverse();
		
	var container = document.getElementById("feedz");
	var loadingimg = document.getElementById("loadingimg");
	var loaded = false;
    for (var j = 0; j < 63;  j++) {
		var div = document.createElement("div");
		
		switch (feedsArr[j][4]) {
  case "photo.stress.fm":
    div.className = "fitem fphoto";
    break;
  case "video.stress.fm":
    div.className = "fitem fvideo"; 
    break;
  case "feed.stress.fm":
    div.className = "fitem ffeed";
    break;
  case "tools.stress.fm":
    div.className = "fitem ftools";
    break;
  case "blog stress.fm":
    div.className = "fitem fblog";
    break;
  case "podcast.stress.fm":
    div.className = "fitem fpodcast";
    break;
	case "books.stress.fm":
    div.className = "fitem fbooks";
    break;
	case "Transições Urbanas":
    div.className = "fitem ftrans";
    break;
	case "macau.stress.fm":
    div.className = "fitem fmacau";
    break;
	case "lisboa.stress.fm":
    div.className = "fitem flisboa";
    break;
    case "lab.stress.fm":
    div.className = "fitem flab";
    break;
  default:
    div.className = "fitem fother";
}

		var src = feedsArr[j][3].match(/src="([^\"]*)"/gim);
		
	if (src != null){	
			var image = src[0].replace(/src=|"/gim, "");
		
			if(/iframe/.test(image)==true||/embed/.test(image)==true||/vimeo/.test(image)==true){
			    if (/tumblr_video_iframe/.test(image)==true){
			        div.innerHTML ='<p><a href="' + feedsArr[j][1] + '">' + feedsArr[j][2] + '</a></p><p class="datesmall">' + feedsArr[j][4] +' / '+ feedsArr[j][6] + '</p>';
			    }
			    else{
				div.innerHTML ='<p><a href="' + feedsArr[j][1] + '">' + feedsArr[j][2] + '</a></p><div class="iframe-container"><iframe src="'+ image +'"></iframe></div><p class="datesmall">' + feedsArr[j][4] +' / '+ feedsArr[j][6] + '</p>';
			    }
				}
			else if(feedsArr[j][2] == "Photo"){
				div.innerHTML ='<a href="' + feedsArr[j][1] + '"><img src="'+ image +'"/></a><p class="datesmall">' + feedsArr[j][4] +' / '+ feedsArr[j][6] + '</p>';
				}
			else{
				div.innerHTML ='<h3><a href="' + feedsArr[j][1] + '">' + feedsArr[j][2] + '</a></h3><a href="' + feedsArr[j][1] + '"><img src="'+ image +'"/></a><p class="datesmall">' + feedsArr[j][4] +' / '+ feedsArr[j][6] + '</p>';
				}
		}
		else{
				div.innerHTML ='<h3><a href="' + feedsArr[j][1] + '">' + feedsArr[j][2] + '</a></h3><p class="datesmall">' + feedsArr[j][4] +' / '+ feedsArr[j][6] + '</p>';
		}
		if(loaded == false){container.removeChild(loadingimg); loaded = true;}
		container.appendChild(div);
        }
	}
	  });
	  
	} //end k loop through feeds

	} //end initialize funct

	google.setOnLoadCallback(initialize);