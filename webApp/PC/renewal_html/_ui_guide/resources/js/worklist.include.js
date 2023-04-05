/**
 * worklist.include
 * --------------------------------------
 * @version 1.33
**/


// ------------------------
// InfoSection >> LinkInfo
// ------------------------
function incLinkInfo(){
  var path_PC = 		'../../../PC/renewal_html/_ui_guide/';
  var path_MO = 		'../../../MO/renewal_html/_ui_guide/';
  // var path_ADMIN = 	'../../../ADMIN/html/_ui_guide/';

	var str=''
		+'<table>'
		+'	<caption>Link info</caption>'
		+'	<colgroup><col width="100px" /><col width="auto" /></colgroup>'
		+'	<tbody>'
		+'		<tr>'
		+'			<th scope="row" rowspan="2">Publish</th>'
		+'			<td class="tobe_section">'
		+'				<div class="pc">'
		+'					<a href="'+path_PC+'worklist.html" class="btn btn_front"><span>PC</span></a>'
		+'					<a href="'+path_PC+'worklist.guide.html" class="btn btn_guide"><span>Guide</span></a>'
		+'					<a href="'+path_PC+'worklist.directory.html" class="btn btn_directory"><span>Dir</span></a>'
		+'					<a href="'+path_PC+'worklist.todo.html" class="btn btn_todo"><span>Todo</span></a>'
		+'				</div>'
		+'			</td>'
		+'		</tr>'

		+'		<tr>'
		+'			<td class="tobe_section">'
		+'				<div class="mo">'
		+'					<a href="'+path_MO+'worklist.html" class="btn btn_front"><span>MO</span></a>'
		+'					<a href="'+path_MO+'worklist.guide.html" class="btn btn_guide"><span>Guide</span></a>'
		+'					<a href="'+path_MO+'worklist.directory.html" class="btn btn_directory"><span>Dir</span></a>'
		+'					<a href="'+path_MO+'worklist.todo.html" class="btn btn_todo"><span>Todo</span></a>'
		+'				</div>'
		+'			</td>'
		+'		</tr>'

		+'		<tr>'
		+'			<th scope="row">Link</th>'
		+'			<td class="link_section">'
		+'				<div>'
		+'					<a href="'+path_PC+'worklist.asis.html" class="btn btn_pcasis"><span>PC.ASIS</span></a>'
		+'					<a href="'+path_MO+'worklist.asis.html" class="btn btn_moasis"><span>MO.ASIS</span></a>'
		+'					<a href="https://devdirectadmin.hi.co.kr/bin/CO/ST/COST0230G.jsp" class="btn" target="_blank"><span>일정</span></a>'
		+'					<a href="http://10.149.228.96:82/redmine/projects/hsp_001" class="btn" target="_blank"><span>Redmine</span></a>'
		+'				</div>'
		+'			</td>'
		+'		</tr>'

		+'		<tr>'
		+'			<th scope="row">Util</th>'
		+'			<td class="etc_section">'
		+'				<div>'
		+'					<a href="'+path_PC+'tools.table.html" class="btn" target="_blank"><span>Data</span></a>'
		+'					<a href="'+path_PC+'tools.urlEncoderSVG.html" class="btn" target="_blank"><span>Svg</span></a>'
		+'				</div>'
		+'			</td>'
		+'		</tr>'
		+'	</tbody>'
		+'</table>'
	;
	document.write(str);
}



// ------------------------
// Table >> Thead
// ------------------------
function incThead(){
	var pageType = document.body.getAttribute('data-page');
	var str = '';

	if(pageType == 'worklist'){
		str=''
			+'<caption>작업 리스트: worklist</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:35px"	 	/> 		<!-- 번호 -->'
			+'	<col class="depth2" 		style="width:7%"		 	/> 		<!-- 2Depth -->'
			+'	<col class="depth3" 		style="width:8%"		 	/> 		<!-- 3Depth -->'
			+'	<col class="depth4" 		style="width:8%"		 	/> 		<!-- 4Depth -->'
			+'	<col class="depth5" 		style="width:8%"		 	/> 		<!-- 5Depth -->'
			+'	<col class="depth6" 		style="width:8%"		 	/> 		<!-- 6Depth -->'
			+'	<col class="page" 			style="width:8%"		 	/> 		<!-- 화면명 -->'
			+'	<col class="path" 			style="width:120px"	 	/> 		<!-- 화면 ID -->'
			+'	<col class="type" 			style="width:58px"		/> 		<!-- Type -->'
			+'	<col class="planner" 		style="width:60px"		/> 		<!-- 기획 -->'
			+'	<col class="designer"		style="width:60px"		/> 		<!-- 디자인 -->'
			+'	<col class="corder" 		style="width:60px"		/> 		<!-- 담당자 -->'
			+'	<col class="ddate" 			style="width:60px"		/> 		<!-- 예정일 -->'
			+'	<col class="rdate" 			style="width:60px"		/> 		<!-- 완료일 -->'
			+'	<col class="pdate" 			style="width:70px"		/> 		<!-- 검수대상 -->'
			+'	<col class="mdate" 			style="width:70px"		/> 		<!-- 고객검수 -->'
			+'	<col class="tag" 				style="width:9%"		 	/> 		<!-- Tag -->'
			+'	<col class="log" 				style="width:auto"		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"  			scope="col">No</th>'
			+'		<th class="depth2"  	scope="col">2Depth</th>'
			+'		<th class="depth3"  	scope="col">3Depth</th>'
			+'		<th class="depth4"  	scope="col">4Depth</th>'
			+'		<th class="depth5"  	scope="col">	5Depth</th>'
			+'		<th class="depth6"  	scope="col">6Depth</th>'
			+'		<th class="page"  		scope="col">Page</th>'
			+'		<th class="path"  		scope="col">Path</th>'
			+'		<th class="type"  		scope="col">Type</th>'
			+'		<th class="planner"  	scope="col">기획</th>'
			+'		<th class="designer"	scope="col">디자인</th>'
			+'		<th class="corder"  	scope="col">담당자</th>'
			+'		<th class="ddate"  		scope="col">예정</th>'
			+'		<th class="rdate"  		scope="col">완료</th>'
			+'		<th class="pdate"  		scope="col">검수대상</th>'
			+'		<th class="mdate"  		scope="col">고객검수</th>'
			+'		<th class="tag"  			scope="col">Tag</th>'
			+'		<th class="log"  			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	else if(pageType == 'guide'){
		str=''
			+'<caption>작업 리스트: guide</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:3%" 			/> 		<!-- 번호 -->'
			+'	<col class="depth2" 		style="width:11%" 		/> 		<!-- 2Depth -->'
			+'	<col class="depth3" 		style="width:11%" 		/> 		<!-- 3Depth -->'
			+'	<col class="depth4" 		style="width:11%" 		/> 		<!-- 4Depth -->'
			+'	<col class="depth5" 		style="width:11%" 		/> 		<!-- Page -->'
			+'	<col class="path" 			style="width:9%" 			/> 		<!-- 경로 -->'
			+'	<col class="corder" 		style="width:60px" 		/> 		<!-- 담당자 -->'
			+'	<col class="rdate" 			style="width:60px" 		/> 		<!-- Date -->'
			+'	<col class="info" 			style="width:12%" 		/> 		<!-- Info -->'
			+'	<col class="tag" 				style="width:12%" 		/> 		<!-- Tag -->'
			+'	<col class="log" 				style="width:auto" 		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"				scope="col">No</th>'
			+'		<th class="depth2" 		scope="col">2Depth</th>'
			+'		<th class="depth3" 		scope="col">3Depth</th>'
			+'		<th class="depth4" 		scope="col">4Depth</th>'
			+'		<th class="depth5" 		scope="col">Page</th>'
			+'		<th class="path" 			scope="col">Path</th>'
			+'		<th class="corder" 		scope="col">담당자</th>'
			+'		<th class="rdate" 		scope="col">Date</th>'
			+'		<th class="info" 			scope="col">Info</th>'
			+'		<th class="tag" 			scope="col">Tag</th>'
			+'		<th class="log" 			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	else if(pageType == 'todo'){
		str=''
			+'<caption>작업 리스트: todo</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:35px" 		/> 		<!-- 번호 -->'
			+'	<col class="id" 				style="width:60px" 		/> 		<!-- index -->'
			+'	<col class="depth2" 		style="width:7%" 			/> 		<!-- Cate -->'
			+'	<col class="depth3" 		style="width:25%" 		/> 		<!-- Description -->'
			+'	<col class="path" 			style="width:20%" 		/> 		<!-- path -->'
			+'	<col class="request" 		style="width:60px" 		/> 		<!-- 요청자 -->'
			+'	<col class="corder" 		style="width:60px" 		/> 		<!-- 담당자 -->'
			+'	<col class="ddate" 			style="width:60px" 		/> 		<!-- 요청일 -->'
			+'	<col class="rdate" 			style="width:60px" 		/> 		<!-- 완료일 -->'
			+'	<col class="tag" 				style="width:10%" 		/> 		<!-- Tag -->'
			+'	<col class="log" 				style="width:auto" 		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"  			scope="col">No</th>'
			+'		<th class="id"  			scope="col">ID</th>'
			+'		<th class="depth2"  	scope="col">Cate</th>'
			+'		<th class="depth3"  	scope="col">Description</th>'
			+'		<th class="path"  		scope="col">Path</th>'
			+'		<th class="request"  	scope="col">요청자</th>'
			+'		<th class="corder"  	scope="col">담당자</th>'
			+'		<th class="ddate"  		scope="col">요청일</th>'
			+'		<th class="rdate"  		scope="col">완료일</th>'
			+'		<th class="tag"  			scope="col">Tag</th>'
			+'		<th class="log"  			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	else if(pageType == 'directory'){
		str=''
			+'<caption>작업 리스트: directory</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:3%" 			/> 		<!-- 번호 -->'
			+'	<col class="depth2" 		style="width:7%" 			/> 		<!-- 2Depth -->'
			+'	<col class="depth3" 		style="width:7%" 			/> 		<!-- 3Depth -->'
			+'	<col class="depth4" 		style="width:7%" 			/> 		<!-- 4Depth -->'
			+'	<col class="depth5" 		style="width:7%" 			/> 		<!-- 5Depth -->'
			+'	<col class="depth6" 		style="width:7%" 			/> 		<!-- 6Depth -->'
			+'	<col class="type" 			style="width:60px" 		/> 		<!-- Type -->'
			+'	<col class="path" 			style="width:120px" 	/> 		<!-- path -->'
			+'	<col class="path2" 			style="width:120px" 	/> 		<!-- path2 -->'
			+'	<col class="corder" 		style="width:60px" 		/> 		<!-- 담당자 -->'
			+'	<col class="rdate" 			style="width:60px" 		/> 		<!-- 작업일 -->'
			+'	<col class="info" 			style="width:15%" 		/> 		<!-- Tag -->'
			+'	<col class="tag" 				style="width:11%" 		/> 		<!-- Tag -->'
			+'	<col class="log" 				style="width:auto" 		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"  			scope="col">No</th>'
			+'		<th class="depth2"  	scope="col">2Depth</th>'
			+'		<th class="depth3"  	scope="col">3Depth</th>'
			+'		<th class="depth4"  	scope="col">4Depth</th>'
			+'		<th class="depth5"  	scope="col">5Depth</th>'
			+'		<th class="depth6"  	scope="col">6Depth</th>'
			+'		<th class="type"  		scope="col">Type</th>'
			+'		<th class="path"  		scope="col">Path</th>'
			+'		<th class="path2"  		scope="col">Path2</th>'
			+'		<th class="corder"  	scope="col">담당자</th>'
			+'		<th class="rdate"  		scope="col">작업일</th>'
			+'		<th class="info"  		scope="col">Info</th>'
			+'		<th class="tag"  			scope="col">Tag</th>'
			+'		<th class="log"  			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	else if(pageType == 'check'){
		str=''
			+'<caption>작업 리스트: check</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:2%" 			/> 		<!-- 번호 -->'
			+'	<col class="path" 			style="width:3%" 			/> 		<!-- 2Depth -->'
			+'	<col class="depth2" 		style="width:8%" 			/> 		<!-- 3Depth -->'
			+'	<col class="depth3" 		style="width:8%" 			/> 		<!-- 4Depth -->'
			+'	<col class="depth4" 		style="width:8%" 			/> 		<!-- 5Depth -->'
			+'	<col class="type" 			style="width:60px" 		/> 		<!-- 5Depth -->'
			+'	<col class="page" 			style="width:20%" 		/> 		<!-- Page -->'
			// +'	<col class="path" 			style="width:9%" 			/> 		<!-- 경로 -->'
			+'	<col class="corder" 		style="width:60px" 		/> 		<!-- 작성자 -->'
			+'	<col class="rdate" 			style="width:60px" 		/> 		<!-- Date -->'
			+'	<col class="info" 			style="width:15%" 		/> 		<!-- Info -->'
			+'	<col class="tag" 				style="width:14%" 		/> 		<!-- Tag -->'
			+'	<col class="log" 				style="width:auto" 		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"				scope="col">No</th>'
			+'		<th class="path" 			scope="col">ID</th>'
			+'		<th class="depth2" 		scope="col">D2</th>'
			+'		<th class="depth3" 		scope="col">D3</th>'
			+'		<th class="depth4" 		scope="col">D4</th>'
			+'		<th class="type" 			scope="col">Type</th>'
			+'		<th class="page" 			scope="col">내용</th>'
			// +'		<th class="path" 			scope="col">Path</th>'
			+'		<th class="corder" 		scope="col">확인자</th>'
			+'		<th class="rdate" 		scope="col">확인일</th>'
			+'		<th class="info" 			scope="col">Etc</th>'
			+'		<th class="tag" 			scope="col">Tag</th>'
			+'		<th class="log" 			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	document.write(str);
}


	
function incThead_ASIS(){
	var pageType = document.body.getAttribute('data-page');
	var str = '';

	if(pageType == 'worklist.asis'){
		str=''
			+'<caption>작업 리스트: worklist</caption>'
			+'<colgroup>'
			+'	<col class="num" 				style="width:35px"	 	/> 		<!-- 번호 -->'
			+'	<col class="depth2" 		style="width:8%"		 	/> 		<!-- 2Depth -->'
			+'	<col class="depth3" 		style="width:17%"		 	/> 		<!-- 3Depth -->'
			+'	<col class="depth4" 		style="width:18%"		 	/> 		<!-- 4Depth -->'
			+'	<col class="depth5" 		style="width:18%"		 	/> 		<!-- 5Depth -->'
			// +'	<col class="depth6" 		style="width:8%"		 	/> 		<!-- 6Depth -->'
			+'	<col class="page" 			style="width:120px"		 	/> 		<!-- 화면명 -->'
			+'	<col class="path" 			style="width:auto"	 	/> 		<!-- 화면 ID -->'
			+'	<col class="rdate" 			style="width:90px"		/> 		<!-- 완료일 -->'
			+'	<col class="tag" 				style="width:13%"		/> 		<!-- 완료일 -->'
			+'	<col class="log" 				style="width:13%"		/> 		<!-- Log -->'
			+'</colgroup>'
			+'<thead>'
			+'	<tr>'
			+'		<th class="num"  			scope="col">No</th>'
			+'		<th class="depth2"  	scope="col">2Depth</th>'
			+'		<th class="depth3"  	scope="col">3Depth</th>'
			+'		<th class="depth4"  	scope="col">4Depth</th>'
			+'		<th class="depth5"  	scope="col">	5Depth</th>'
			// +'		<th class="depth6"  	scope="col">6Depth</th>'
			+'		<th class="page"  		scope="col">Cate</th>'
			+'		<th class="path"  		scope="col">Path</th>'
			+'		<th class="rdate"  		scope="col">완료</th>'
			+'		<th class="tag"  			scope="col">Tag</th>'
			+'		<th class="log"  			scope="col">Log</th>'
			+'	</tr>'
			+'</thead>'
		;
	}

	document.write(str);
}




/**
 * Worklist Setting
 * --------------------------------------
 * 'O': 	Disibled Checked
 * 'X': 	Disibled Unchecked
 * true: 	Enabled Checked
 * false or blank: Enabled Unchecked
 **/
$(document).ready(function() {
	var pageType = document.body.getAttribute('data-page')

	var pageOption = {
		version : 'worklist'
		, desktop:{
			setting:{
				data:['O', true, true, true]
				, option:[true, true, true, false]
							//:[No,		2D,		3D,			4D,			5D, 		6D, 		Page, 	Path, 	Type, 	기획, 		디자인,	담당자,	예정,		완료, 		검대상,		고객검,		Tag,		Log
				, search:['X',	'X', 	'X', 		'X', 		'X', 		'X', 		'X', 		'X', 		true, 	true, 	true,		true, 	true, 	true, 	false, 		false, 		true, 	true]
				, table :['O', 	'O', 	true, 	true, 	true, 	true, 	false, 	'O', 		true, 	true, 	true,		true, 	true, 	true, 	false,		false, 		true,		true]
			}
		}
		, mobile : {
			setting:{
				data:['O', 'X', false, false] 
				, option:[false, true, false, false]
							//:[No,		2D,		3D,			4D,			5D, 		6D, 		Page, 	Path, 	Type, 	기획, 		디자인,	담당자,	예정,		완료, 		검대상,		고객검,		Tag,		Log
				, search:['X', 	'X', 	'X', 		'X', 		'X', 		'X', 		'X', 		'X', 		'X', 		true, 	true,		'X', 		'X', 		'X', 		'X', 			'X', 			'X', 		'X']
				, table: ['O', 	'O',	false,	false, 	false, 	false, 	true, 	'O',		false, 	true, 	true,		false,  false, 	false, 	false, 		false, 		false, 	false]
			}
			, headerFolding :{
				headerClose:true
			}
		}
	}

	if(pageType === "worklist.asis"){
		pageOption = {
			version : 'worklist.asis'
			, desktop:{
				setting:{
					data:['O', true, true, true]
					, option:[true, true, false, false]
								//:[No,		2D,		3D,			4D,			5D, 		Page, 	Path, 	완료, 		Tag,		Log
					, search:['X',	'X', 	'X', 		'X', 		'X', 		'X', 		'X', 		true, 	true,		false]
					, table :['O', 	'O', 	true, 	true, 	true, 	false, 	'O', 		true, 	true,		false]
				}
			}
			, mobile : {
				setting:{
					data:['O', 'X', false, false] 
					, option:[false, true, false, false]
								//:[No,		2D,		3D,			4D,			5D, 			Page, 	Path, 	완료, 			Tag,		Log
					, search:['X', 	'X', 	'X', 		'X', 		'X', 		 	'X', 		'X', 		'X', 		 	'X', 		'X']
					, table: ['O', 	'O',	false,	false, 	false, 		true, 	'O',		false, 	 	false,	false]
				}
				, headerFolding :{
					headerClose:true
				}
			}
		}
	}

	else if(pageType === "guide"){
		pageOption = {
			version : 'worklist.guide'
			, desktop:{
				setting:{
					data:['O', false, true, true]
					, option:[false, true, false, false] 
								//:[No,		2D,			3D,			4D,			page, 	path,		담당자,	Date,		Info,		Tag, 		Log
					, search:['X',	'X', 		'X', 		'X', 		'X', 		'X', 		true, 	true, 	false,	false, 	true]
					, table :['O', 	'O', 		true, 	true, 	false, 	true, 	true,		true,		true,		false, 	true]
				}
			}
			, mobile : {
				setting:{
					data:['O', 'X', false, false] 
					, option:[false, true, false, false]
								//:[No,		2D,			3D,			4D,			page, 	path,		담당자,	Date,		Info,		Tag, 		Log
					, search:['X',	'X', 		'X', 		'X', 		'X', 		'X', 		'X',		'X', 		'X',		'X', 		'X']
					, table :['O', 	'O', 		false, 	false,	 true, 	true, 	false,	false, 	false,	false, 	false]
				}
				, headerFolding :{
					headerClose:true
				}
			}
		}
	}

	else if(pageType === "todo"){
		pageOption = {
			version : 'worklist.todo'
			, desktop:{
				setting:{
					data:['O', false, false, true]
					, option:[true, true, true, true] 
								//:[No,		ID,		Cate,		내용,		path,		요청자,	담당자,	요청일, 완료일,  	Tag, 		Log
					, search:['X',	'X', 	'X', 		'X', 		false,	true, 	true,  	true, 	true,	 	true,		true]
					, table :['O', 	'O', 	true, 	true, 	true,		true, 	true,		true, 	true,  	true, 	true]
				}
			}
			, mobile : {
				setting:{
					data:['O', 'X', false, false] 
					, option:[false, true, false, false]
								//:[No,		ID,		Cate,		내용,		path,  	요청자,	담당자,	요청일, 완료일, 		Tag, 		Log
					, search:['X',	'X', 	'X', 		'X', 		'X', 		'X', 		'X', 		'X', 		'X', 		 	'X',		'X']
					, table :['O', 	'O', 	false, 	false, 	false,  true, 	false, 	false, 	false, 		false,	false]
				}
				, headerFolding :{
					headerClose:true
				}
			}
		}
	}

	else if(pageType === "directory"){
		pageOption = {
			version : 'worklist.directory'
			, desktop:{
				setting:{
					data:['O', false, true, false]
					, option:[false, true, false, false] 
								//:[No,		2D,			3D,			4D,			5D, 		6D, 		Type, 	path,		path2,	담당,		완료,		Info, 	Tag, 		Log
					, search:['X',	'X', 		'X', 		'X', 		'X', 		'X',	 	true,		'X', 		'X', 		true, 	true, 	true,		true, 	true]
					, table :['O', 	'O', 		true, 	true, 	true, 	true,		true,		true,		true,		true,		true,		true,		true, 	true]
				}
			}
			, mobile : {
				setting:{
					data:['O', 'X', false, false] 
					, option:[false, true, false, false]
								//:[No,		2D,			3D,			4D,			5D, 		6D, 		Type, 	path,		path2,	담당,		완료,		Info,		Tag, 		Log
					, search:['X',	'X', 		'X', 		'X', 		'X', 		'X',		'X', 		'X', 		'X', 		'X', 		'X', 		true,		true, 	true]
					, table :['O', 	'O', 		true, 	true, 	true, 	true,		true, 	true,		true,		true,		true,		true, 	true, 	true]
				}
				, headerFolding :{
					headerClose:true
				}
			}
		}
	}

	else if(pageType === "check"){
		pageOption = {
			version : 'worklist.check'
			, desktop:{
				setting:{
					data:['O', false, true, true]
					, option:[false, true, false, false] 
								//:[No,		id,	 		2D,			3D,			4D,			type, 	page, 	담당자,	Date,		Info,		Tag, 		Log
					, search:['X',	true,  	false, 	false, 	false, 	true,		'X', 		true, 	true, 	'X',		true, 	true]
					, table :['O', 	'O', 		'O', 		true, 	true, 	true, 	true, 	true,		true,		true,		true, 	true]
				}
			}
			, mobile : {
				setting:{
					data:['O', 'X', false, false] 
					, option:[false, true, false, false]
								//:[No,		id,			2D,			3D,			4D,			type, 		page, 		담당자,	Date,		Info,		Tag, 		Log
					, search:['X',	true,		'X', 		'X', 		'X', 		'X',			'X', 			'X',		'X', 		'X',		'X', 		'X']
					, table :['O', 	'O',		'O', 		false, 	false,	 false, 	true, 	 	false,	false, 	false,	false, 	false]
				}
				, headerFolding :{
					headerClose:true
				}
			}
		}
	}

	Worklist.initModule(pageOption);
});


