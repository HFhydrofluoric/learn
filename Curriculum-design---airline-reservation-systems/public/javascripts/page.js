function setPage(url, selector, page, callback){
	(function ($, han) {
	// view pages分页设置
		var $pages = page;
		var $length = 10;

		// 列出最基本的页数
		var $page = '<ul  class="pagination"><li class="first"><a href="javascript:void(0)">|&lt;</a></li><li class="pre"><a href="javascript:void(0)">&lt;</a></li><span class="ellpsis1"></span>';
		var $minLen = Math.min($pages,$length);//获取总长度

		for(var i = 0;i < $minLen;i++){
			if (i > 1) {
				$page += "<li class='" + i +"'><a class='sure' href='javascript:void(0)'>" + (i+1) + "</a></li>";
			} else {
				$page += "<li class='pageActive " + i +"'><a class='sure' href='javascript:void(0)'>" + (i+1) + "</a></li>";
			}
		}

		$page += "<span class='ellpsis2'></span><li class='next'><a href='javascript:void(0)'>&gt;</a></li><li class='last'><a href='javascript:void(0)'>&gt;|</a></li></ul>";

		$("#page").append($page);

		// ellpsis();

		// 添加省略号
		function ellpsis(){
			if($("#page li:eq(2)").text() != "1"){
				$("#page .ellpsis1").text("...");
			} else {
				$("#page .ellpsis1").text("");
			}

			if($("#page li:eq(" + ($minLen + 1) +")").text() != page){
				$("#page .ellpsis2").text("...");
			} else {
				$("#page .ellpsis2").text("");
			}
		}
		
		// click function
		function changePage(num){
			$.ajax({
				url : url + '?page=' + num,
				type : "GET",
				dataType : "json",
				success : function(response){
					if(response.status == 0){
						han.repeat(selector, response.value, callback);
					}
				},
				error : function(){
					alert("failure");
				}
			})
		}
		// 当前显示的页码click
		$("#page li").on("click","a.sure",function(){
			var classname = $(this).parent("li").attr('class');
			
			$(this).parent("li").addClass("pageActive")
				.siblings("li").removeClass("pageActive");

			var $index = $(this).text();
			
			changePage($index - 1);
		})
		//next按钮 

		$("#page").on("click",".next",function(){
			var $active = $("#page li.pageActive");
			// 判断active按钮的位置
			if($active.attr("class") != ($minLen - 1 + " pageActive")){
		
				$active.next("li")
					.children("a.sure").click()
		
			} else {
				if(parseInt($("#page li:eq(" + ($minLen + 1) + ")").text()) < page){
				
					for(var i = 0;i < $minLen;i++){
						$pageNum = $("#page li:eq(" + (i + 2) + ") a");
						$pageNum.text(parseInt($pageNum.text()) + 1);
					}
				
					$active.find("a.sure").click();
				}
			}
		})
		// pre 按钮
		$("#page").on("click",".pre",function(){
			var $active = $("#page li.pageActive");
			// 判断active按钮的位置
			if($active.attr("class") != "0 pageActive"){

				$active.prev("li")
					.children("a.sure").click()
			
			} else {
			
				if(parseInt($("#page li:eq(2)").text()) > 1){

					for(var i = 0;i < $minLen;i++){
						$pageNum = $("#page li:eq(" + (i + 2) + ") a");
						$pageNum.text(parseInt($pageNum.text()) - 1);
					}

					$active.find("a.sure").click();
				}
			}
		})
		//first 按钮
		$("#page").on("click",".first",function(){
			for(var i = 0;i < $minLen;i++){
				$pageNum = $("#page li:eq(" + (i + 2) + ") a");
				$pageNum.text(i + 1);
			}
			$("#page li:eq(2) a.sure").click();
		})
		//last 按钮
		$("#page").on("click",".last",function(){
			if(page > 10){
				var $num = page - 9;
			} else {
				var $num = 1;
			}

			for(var i = 0;i < $minLen;i++){
				$pageNum = $("#page li:eq(" + (i + 2) + ") a");
				$pageNum.text(i + $num);
			}
			
			$("#page li:eq("+ ($minLen + 1) +") a.sure").click();
		})
	})(jQuery, $);
}